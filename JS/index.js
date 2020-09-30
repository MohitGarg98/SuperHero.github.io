const url = `https://superheroapi.com/api.php/1190328031323466/`;
const searchHero = document.getElementById('search');
const searchResults = document.getElementById('searchResults');
const searchResultsList = document.getElementById('searchResultsList');

let favouriteHeroesArr = JSON.parse(localStorage.getItem('favouriteHeroes'));

if(favouriteHeroesArr == null)
{
    favouriteHeroesArr = [];
}

function addToFavourites(hero, button) {
    if(button.innerHTML == 'Add To Favourites' )
    {
        favouriteHeroesArr.push(hero);
        localStorage.setItem('favouriteHeroes', JSON.stringify(favouriteHeroesArr));
        button.style.backgroundColor = ' rgb(248, 64, 64)'
        button.innerHTML = 'Remove From Favourites'
    }
    else
    {
        for(let i = 0; i < favouriteHeroesArr.length; i++)
        {
            if(hero.id == favouriteHeroesArr[i].id)
            {
                favouriteHeroesArr.splice(i,1);
                localStorage.setItem('favouriteHeroes', JSON.stringify(favouriteHeroesArr));
                break;
            }
        }   
        button.style.backgroundColor = 'rgb(96, 250, 96)'     
        button.innerHTML = 'Add To Favourites';
    }
}

function buttonContent(id, button) {
    for(let i = 0; i < favouriteHeroesArr.length; i++)
    {
        if(id == favouriteHeroesArr[i].id)
        {
            button.style.backgroundColor = ' rgb(248, 64, 64)'
            return 'Remove From Favourites';
        }
    }
    button.style.backgroundColor = ' rgb(96, 250, 96)'
    return 'Add To Favourites';
}

function detailsOfHero(details) {
    localStorage.setItem('heroDetails', JSON.stringify(details));
}

function showSearchResult(res) {
    const searchResultArr = res.results;
    searchResultsList.innerHTML = '';
    for(let i = 0; i  < searchResultArr.length; i++)
    {
        const image = res.results[i].image;
        const li = document.createElement('LI');
        const button = document.createElement('button');
        button.textContent = buttonContent(searchResultArr[i].id, button);
        button.addEventListener('click', () => addToFavourites(searchResultArr[i], button));

        const a = document.createElement('a');
        a.innerHTML = searchResultArr[i].name;
        a.href = "details.html"
        a.addEventListener('click', () => {detailsOfHero(searchResultArr[i])});

        
        li.innerHTML = `<img src ="${image.url}"> `;
        li.appendChild(a);
        li.appendChild(button);
        searchResultsList.appendChild(li);        
    }
    
}

async function getData() {
    let res = await fetch(`${url}/search/${searchHero.value}`);
    res = res.json();
    return res;
}

function getSearchHeroes() {
    if(searchHero.value.length < 3)
    {
        searchResultsList.innerHTML = '';
        return;
    }
    getData().then(res => showSearchResult(res));
}

searchHero.onkeyup = getSearchHeroes;
