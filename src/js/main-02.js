//VARIABLES
let homeList;
//INPUT ELEMENTS
let inputSearch = document.getElementById("inputSearch");
inputSearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getSearch();
  }
});
let btnSearch = document.getElementById("btnSearch");
btnSearch.addEventListener("click", () => {
  getSearch();
});

//BOXES
let mainBox = document.getElementById("mainBox");
//FUNCTIONS
// 1º FUNCTION THAT PRINT A LIST OF ELEMENTS FROM AN ARRAY
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
      printDetails(arr[i]);
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
//2º FUNCTION THAT PRINT A DETAILS CARD FOR THE SELECTED GAME FROM AN OBJECT
//- FRIST USE THE ID OF THE SELECTED GAME TO PRINT THE DETAILS
function printDetails(obj) {
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
    .then((response) => console.log(response))
    .then(()=> mainBox.innerHTML = '')
  
  const detailCard = document.createElement('div')
  detailCard.textContent = obj.name
  mainBox.append(detailCard)  
}
//-----------------------------------------------------------------------
// 1º PRINT A LIST OF RANDOM GAMES IN THE HOME PAGE

function getHome() {
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
    .then(() => printList(homeList));
}
getHome();
//2º PRINT THE RESULTS OF A SEARCH

// FUNCION TO GET SEARCH RESULTS
function getSearch() {
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
    .then(() => printList(homeList));
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
