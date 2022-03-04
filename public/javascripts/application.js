// const searchButton = document.querySelector('#searchButton');
const mealList = document.getElementById('meal');
const searchBtn = document.getElementById('search-btn');
const mealResult = document.querySelector('.mealResult');
const searchForm = document.querySelector('#search-input');
// const searchResultDiv = document.querySelector('#meal-result');
const container = document.querySelector('.container');
const app_id = '2831a396';
const app_key = '9b604f5dd143321560c71fa88d2972a9';
let searchInput = '';

// https://api.edamam.com/api/recipes/v2?type=public&q=pizza&app_id=2831a396&app_key=9b604f5dd143321560c71fa88d2972a9
searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
 searchInput = e.target.querySelector('input').value;
  // let searchInputTxt = document.getElementById('search-input').value.trim();
  console.log(searchInput)
  apiFetch();
  // = async () => {
  //   const response = await fetch(apiUrl);
  //   const data = await response.json();
  //   createHTML(data.hits);
  //   console.log(data);
  // }
});

async function apiFetch() {
  const apiUrl = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchInput}&app_id=${app_id}&app_key=${app_key}&from=0&to=20`;
  const response = await fetch(apiUrl);
  if (response.ok) {
    const data = await response.json();
  createHTML(data.hits);
  console.log(data);
  } else {
    
  }

}

function createHTML(results) {
  container.classList.remove('initial');
  let generatedHTML = '';
  results.map((result) => {
    generatedHTML += `
      <div class="item">
        <img src="${result.recipe.image}" alt="img">
        <div class="flex-container">
          <h1 class="title">${result.recipe.label}</h1>
          <a class="view-btn" target="_blank" href="${result.recipe.url}">View Recipe</a>
        </div>
        <p class="item-data">Calories: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels : 'No Data Found'}</p>
        <p class="item-data">Health labels: ${result.recipe.healthLabels}</p>
      </div>
    `;
  });
  mealResult.innerHTML = generatedHTML;
}
