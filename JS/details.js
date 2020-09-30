const detailsOfHero = document.getElementById('detailsOfHero');

const hero = JSON.parse(localStorage.getItem('heroDetails'));

function showHeroDetails() {
    detailsOfHero.innerHTML = `<img src="${hero.image.url}">
                    <h2>${hero.name}</h2>
                    <p>Combat: ${hero.powerstats.combat}</p>
                    <p>Durability: ${hero.powerstats.durability}</p>
                    <p>Intelligence: ${hero.powerstats.intelligence}</p>
                    <p>Power: ${hero.powerstats.power}</p>
                    <p>Speed: ${hero.powerstats.speed}</p>
                    <p>Strength: ${hero.powerstats.strength}</p>
                    `;
}
showHeroDetails();