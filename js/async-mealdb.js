const searchFood = async () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value ;
    // clear value 
    searchField.value = '';
    if(searchText == ''){
        alert('please add something');
    }
    else{
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
        const res = await fetch(url);
        const data = await res.json();
        displayResult(data.meals);
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => displayResult(data.meals));
    }
}

const displayResult = meals => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';
    if(meals.length == 0){
        alert('no result found this food, try another food.');
        // const div = document.createElement('div');
        // div.classList.add('col');
        // div.innerHTML = `<p>no result found this food, try another food.</p>`;
        // searchResult.appendChild(div);
    }
    else{
        meals.forEach(meal => {
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
            <div onclick = "loadMealDetails(${meal.idMeal})" class="card">
                <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${meal.strMeal}</h5>
                    <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
                </div>
            </div>
            `;
            searchResult.appendChild(div);
        })
    }
}

const loadMealDetails = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i= ${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetailResult(data.meals[0]);
    // fetch(url)
    // .then(res => res.json())
    // .then(data => displayDetailResult(data.meals[0]));
}

const displayDetailResult = meal => {
    // console.log(meal);
    const mealDetails = document.getElementById('meal-details');
    mealDetails.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,150)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    mealDetails.appendChild(div);
}