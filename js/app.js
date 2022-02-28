const cardShowDiv = document.getElementById('cards-show')
const loadCocktailByButton = () => {
    const searchInput = document.getElementById('search-field')
    const error = document.getElementById('error')
    const searchText = searchInput.value
    searchInput.value = ''
    error.innerText = ''
    cardShowDiv.innerHTML = ''
    if (isNaN(searchText)) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchText}`)
            .then(response => response.json())
            .then(data => displayCocktail(data.drinks))
    } else {
        error.innerText = "please enter a letter!"
    }
}

const displayCocktail = (cocktails) => {
    for (const cocktail of cocktails) {
        console.log(cocktail)
        const div = document.createElement('div')
        div.classList.add('col-lg-3')

        div.classList.add('mt-3')
        div.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${cocktail.strDrink}</h5>
            <p class="card-text"></p>
            <button onclick="cardDetails(${cocktail.idDrink})" class="btn btn-primary">See Details</button>
        </div>
    </div>
    `
        cardShowDiv.appendChild(div)
    }
}

const cardDetails = (info) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${info}`
    fetch(url)
        .then(response => response.json())
        .then(data => displayCocktailDetails(data.drinks[0]))
}
const displayCocktailDetails = cocktailDetails => {
    const div = document.createElement('div')
    div.classList.add('see-details-div')
    cardShowDiv.innerHTML = ''
    div.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${cocktailDetails.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${cocktailDetails.strDrink}</h5>
            <p class="card-text"><span class="fw-bold">Date Modified:</span> ${cocktailDetails.dateModified}</p>
            <p class="card-text"><span class="fw-bold">Alcoholic:</span> ${cocktailDetails.strAlcoholic}</p>
            <p class="card-text"><span class="fw-bold">Category:</span> ${cocktailDetails.strCategory}</p>
            <p class="card-text"><span class="fw-bold">Glass:</span> ${cocktailDetails.strGlass}</p>
            <p class="card-text"><span class="fw-bold">Instructions:</span> ${cocktailDetails.strInstructions}</p>
            <p class="card-text"><span class="fw-bold">Measure1:</span> ${cocktailDetails.strMeasure1}</p>
            <p class="card-text"><span class="fw-bold">Measure2:</span> ${cocktailDetails.strMeasure2}</p>
            <button onclick="cardDetails()" class="btn btn-primary">Order Now</button>
        </div>
    </div>
    `
    cardShowDiv.appendChild(div)
}