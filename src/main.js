let list;
let resultList = [];
let listSearch;
let resultSearch = [];

let inputSearch = document.getElementById("inputSearch");
let btnSearch = document.getElementById("btnSearch");
const resultsGameBox = document.getElementById("resultsGameBox");

inputSearch.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getSearch();
  }
});
btnSearch.addEventListener("click", () => {
  getSearch();
});

function saveResultList() {
  for (const key in list.results) {
    const game = {
      gameName: list.results[key].name,
      gameRating: list.results[key].rating,
      gameBgImage: list.results[key].background_image,
    };
    resultList.push(game);
    console.log(`${list.results[key].name}`);
  }
}
function printResults() {
  const resultsGameBox = document.getElementById("resultsGameBox");
  for (let i = 0; i < resultList.length; i++) {
    const gameCard = document.createElement("div");
    gameCard.classList = "card game m-1";
    // gameCard.innerHTML=
    // `<h1>${resultList[i].gameName}</h1>
    // <h2>${resultList[i].gameRating}</h2>
    // `;
    const gameImage = document.createElement("img");
    gameImage.classList = "card-img-top";
    gameImage.src = resultList[i].gameBgImage;

    const gameTitle = document.createElement("h2");
    gameTitle.textContent = resultList[i].gameName;
    gameTitle.classList = "card-title";

    const gameRating = document.createElement("h2");
    gameRating.textContent = `Metacritic ${resultList[i].gameRating}`;
    gameRating.classList = "m-1 fs-5 text-danger";

    gameCard.append(gameImage, gameTitle, gameRating);

    resultsGameBox.append(gameCard);
  }
}
function printSearchResults() {
  const resultsGameBox = document.getElementById("resultsGameBox");
  resultsGameBox.innerHTML = "";
  for (let i = 0; i < resultSearch.length; i++) {
    const gameCard = document.createElement("div");
    gameCard.classList = "card game m-auto my-2";
    gameCard.style.height = '300px'
    // gameCard.innerHTML=
    // `<h1>${resultSearch[i].gameName}</h1>
    // <h2>${resultSearch[i].gameRating}</h2>
    // `;
    const gameImage = document.createElement("img");
    gameImage.classList = "card-img-top img-fluid";
    gameImage.style.height = '130px'
    gameImage.src = resultSearch[i].gameBgImage;

    const gameTitle = document.createElement("h2");
    gameTitle.textContent = resultSearch[i].gameName;
    gameTitle.classList = "card-title";

    const gameRating = document.createElement("h2");
    gameRating.textContent = `Metacritic ${resultSearch[i].gameRating}`;
    gameRating.classList = "m-1 fs-5 text-danger";

    gameCard.append(gameImage, gameTitle, gameRating);

    resultsGameBox.append(gameCard);
  }
}
function getSearch() {
  resultsGameBox.innerHTML = "";
  resultSearch = [];
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
    .then((response) => (listSearch = response))
    .then(() => saveSearchResult())
    .then(() => printSearchResults())
    .catch((err) => console.error(err));
}
function saveSearchResult() {
  for (const key in listSearch.results) {
    const game = {
      gameName: listSearch.results[key].name,
      gameRating: listSearch.results[key].rating,
      gameBgImage: listSearch.results[key].background_image,
    };
    resultSearch.push(game);
  }
}
function tests() {
  // for (let i = 0; i < resultList.length; i++) {
  // 	console.log(resultList[i])
  // }
}
