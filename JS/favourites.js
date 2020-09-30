const favouriteHeroesList = document.getElementById('favouriteHeroesList');
const heroesFound = document.getElementById('heroes-found');

let favouriteHeroesArr = JSON.parse(localStorage.getItem('favouriteHeroes'));

function removeFromFavourites(id) {
    for(let i = 0; i < favouriteHeroesArr.length; i++)
    {
        if(favouriteHeroesArr[i].id == id)
        {
            favouriteHeroesArr.splice(i,1);
            localStorage.setItem('favouriteHeroes', JSON.stringify(favouriteHeroesArr));
            favouriteHeroesList.innerHTML = '';
            showFavouriteHeroes();
        }
    }
}

function detailsOfHero(hero) {
    localStorage.setItem('heroDetails', JSON.stringify(hero));
}

function showFavouriteHeroes() {

    if(favouriteHeroesArr.length == 0)
    {
        heroesFound.innerHTML = 'No SuperHero Found...';
    }
    else
    {
        heroesFound.innerHTML = 'My Favourite Heros:';
    }

    for(let i = 0; i < favouriteHeroesArr.length; i++)
    {
        const li = document.createElement('li');

        const a = document.createElement('a');
        a.innerHTML = favouriteHeroesArr[i].name;
        a.href = "details.html"
        a.addEventListener('click', () => {detailsOfHero(favouriteHeroesArr[i])});

        const button = document.createElement('button');
        button.style.backgroundColor = ' rgb(248, 64, 64)'
        button.innerHTML = 'Remove From Favourites';
        button.addEventListener('click', () => removeFromFavourites(favouriteHeroesArr[i].id));

        li.innerHTML = `<img src="${favouriteHeroesArr[i].image.url}">`;
        li.appendChild(a);
        li.appendChild(button);
        favouriteHeroesList.appendChild(li)
    }
    
}

showFavouriteHeroes();