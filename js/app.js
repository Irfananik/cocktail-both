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
        div.classList.add('col-lg-3')
        div.classList.add('mt-3')
        div.innerHTML = `
    <div class="card" style="width: 18rem;">
        <img src="${cocktail.strDrinkThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${cocktail.strDrink}</h5>
            <p class="card-text"></p>
            <button onclick="cardDetails()" class="btn btn-primary">See Details</button>
        </div>
    </div>
    `
        cardShowDiv.appendChild(div)
    }
}