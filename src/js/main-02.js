//VARIABLES
let homeList;
let details;
const brand = document.getElementById("brand");
const loadMask = document.getElementById("loadMask");
const header = document.getElementById("header")
const headerDetail = document.getElementById("headerDetail")
brand.addEventListener("click", () => {
  getHome();
});
//INPUT ELEMENTS
let inputSearch = document.getElementById("inputSearch");
inputSearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getSearch();
    inputSearch.value = ""
  }
});
let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", () => {
  getSearch();
});
//BOXES
let mainBox = document.getElementById("mainBox");
//FUNCTIONS
// 1º PRINT A LIST OF RANDOM GAMES IN THE HOME PAGE
function getHome() {
  loadMask.classList.add("visible");
  loadMask.classList.remove("hidden");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
      "X-RapidAPI-Key": "6150e4d77bmsh04abafa6114ef03p1ce7e0jsncc8a1386169e",
    },
  };
  fetch(
    `https://rawg-video-games-database.p.rapidapi.com/games?key=f62da0af1d41486894d3adad81cbd732`,
    options
  )
    .then((response) => response.json())
    .then((response) => (homeList = response.results))
    .then(() => printList(homeList))
    .then(() => {
      loadMask.classList.remove("visible");
      loadMask.classList.add("hidden");
    });
}
getHome();
//  FUNCTION THAT PRINT A LIST OF ELEMENTS FROM AN ARRAY
function printList(arr) {
  mainBox.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    //--------------------------------------------
    // CARD BODY
    //--------------------------------------------
    const gameCard = document.createElement("div");
    gameCard.classList =
      "card game d-flex flex-column justify-content-between  m-auto my-2";
    //---------------------------------------------
    // CARD IMAGE
    //---------------------------------------------
    //
    const gameImage = document.createElement("div");
    gameImage.classList = "card-img-top";
    if (arr[i].background_image !== null) {
      gameImage.style.backgroundImage = `url(${arr[i].background_image})`;
    } else {
      gameImage.style.backgroundImage = `url('/src/img/no-imagen.png')`;
      gameImage.src = "/src/img/no-imagen.png";
    }
    gameImage.style.height = "300px";
    gameImage.style.backgroundSize = "cover";
    gameImage.style.backgroundPosition = "center";
    gameImage.addEventListener("click", function () {
      getDetails(arr[i]);
    });

    //---------------------------------------------
    // CARD TITLE
    //---------------------------------------------
    const gameTitle = document.createElement("h2");
    gameTitle.textContent = arr[i].name;
    gameTitle.classList = "card-title";
    //---------------------------------------------
    // CARD METACRITIC
    //---------------------------------------------
    const gameRating = document.createElement("h2");
    gameRating.textContent = `Metacritic ${arr[i].metacritic}`;
    gameRating.classList = "m-1 fs-6 text-danger";
    //---------------------------------------------
    // ADD TO CARD
    gameCard.append(gameImage, gameTitle, gameRating);
    // ADD TO DOM
    mainBox.append(gameCard);
    //---------------------------------------------
  }
}
// FUNCTION THAT PRINT A DETAILS CARD FOR THE SELECTED GAME FROM AN OBJECT
//- FRIST USE THE ID OF THE SELECTED GAME TO GET THE DETAILS
function getDetails(obj) {
  loadMask.classList.remove("hidden");
  loadMask.classList.add("visible");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
      "X-RapidAPI-Key": "6150e4d77bmsh04abafa6114ef03p1ce7e0jsncc8a1386169e",
    },
  };

  fetch(
    `https://rawg-video-games-database.p.rapidapi.com/games/${obj.id}?key=f62da0af1d41486894d3adad81cbd732&`,
    options
  )
    .then((response) => response.json())
    .then((response) => (details = response))
    .then((response) => printDetails(details))
    .then(() => {
      loadMask.classList.remove("visible");
      loadMask.classList.add("hidden");
    });
}

function printDetails(obj) {
  mainBox.innerHTML = "";
  header.style.height = '300px'
  header.style.backgroundImage = `url(${obj.background_image})`  
  headerDetail.innerHTML = `
  <div class="row">
      <div class="col">${obj.released}</div>
      <div class="col">${obj.playtime}</div>
    </div>
    <h2>${obj.name}</h2>
  `
  
  const detailCard = document.createElement("div");
  detailCard.innerHTML = `
  <div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
      <div class="col-md-4">
        <img src="${obj.background_image}" class="img-fluid rounded-start" alt="...">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h2 class="card-title">${obj.name}</h2>
          <p>
            <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
              Description
            </button>
          </p>
          <div style="min-height: 120px;">
            <div class="collapse collapse-horizontal" id="collapseWidthExample">
            <div class="card card-body" style="width: 300px;">
                  ${obj.description_raw}
            </div>
          </div>
          </div>             
          <p class="card-text"><small class="text-muted">ESRB ${obj.esrb_rating.name}</small></p>
        </div>
      </div>
    </div>
  </div>`;
  // const gameName = document.createElement("h2");
  // gameName.textContent = obj.name;
  // const gameImage = document.createElement("div");
  // //gameImage.classList = "card-img-top";
  // if (obj.background_image !== null) {
  //   gameImage.style.backgroundImage = `url(${obj.background_image})`;
  // } else {
  //   gameImage.style.backgroundImage = `url('/src/img/no-imagen.png')`;
  //   gameImage.src = "/src/img/no-imagen.png";
  // }
  // gameImage.style.height = "300px";
  // gameImage.style.backgroundSize = "cover";
  // gameImage.style.backgroundPosition = "center";
  // detailCard.classList = "card border border-primary";
  // detailCard.append(gameName, gameImage);
  mainBox.append(detailCard);
}
//-----------------------------------------------------------------------
//2º PRINT THE RESULTS OF A SEARCH
// FUNCION TO GET SEARCH RESULTS
function getSearch() {
  loadMask.classList.remove("hidden");
  loadMask.classList.add("visible");
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
      "X-RapidAPI-Key": "6150e4d77bmsh04abafa6114ef03p1ce7e0jsncc8a1386169e",
    },
  };

  fetch(
    `https://rawg-video-games-database.p.rapidapi.com/games?key=f62da0af1d41486894d3adad81cbd732&search=${inputSearch.value}&ordering=-metacritic&search_exact=true`,
    options
  )
    .then((response) => response.json())
    .then((response) => (homeList = response.results))
    .then(() => printList(homeList))
    .then(() => {
      loadMask.classList.remove("visible");
      loadMask.classList.add("hidden");
    });
}
//3º PRINT A LIST OF TOP RATED GAMES
function getTops() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
      "X-RapidAPI-Key": "6150e4d77bmsh04abafa6114ef03p1ce7e0jsncc8a1386169e",
    },
  };
  fetch(
    `https://rawg-video-games-database.p.rapidapi.com/games?key=f62da0af1d41486894d3adad81cbd732&ordering=-rating`,
    options
  )
    .then((response) => response.json())
    .then((response) => (homeList = response.results))
    .then(() => printList(homeList));
}
//4º PRINT THE LIST OF PLATAFORMS

function test(arr) {
  for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
  }
}
