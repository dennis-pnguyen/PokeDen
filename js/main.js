const $pokemonEntryList = document.querySelector('#pokedex-entries');

function getPokemonData() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=100');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.results.length; i++) {
      const currentPokemon = xhr.response.results[i];
      let url;
      if (i + 1 < 10) {
        url = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/00${i + 1}.png`;
      } else if (i + 1 < 100) {
        url = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/0${i + 1}.png`;
      } else {
        url = `https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/${i + 1}.png`;
      }

      const $pokeName = document.createElement('h3');
      $pokeName.textContent = currentPokemon.name;
      const $img = document.createElement('img');
      $img.setAttribute('class', 'pokemon-img');
      $img.src = url;
      $pokemonEntryList.appendChild($img);
      $pokemonEntryList.appendChild($pokeName);
    }
  });
  xhr.send();
}

getPokemonData();

// function createEntry() {
//  const $newLiElement = document.createElement('li');
//  $newLiElement.setAttribute('class', 'pokemon-entry');
//
//  const $newCardWrap = document.createElement('div');
//  $newCardWrap.setAttribute('class', 'card-wrapper');
//
//  const $newPokeCard = document.createElement('div');
//  $newPokeCard.setAttribute('class', 'pokemon-card');
//
//   const $pokeNumber = document.createElement('p');
//   $pokeNumber.textContent = pokemonData.id;
//
//   const $pokeImg = document.createElement('img');
//   $pokeImg.setAttribute('src', 'pokemonData.sprites.other.offical-artwork.front-default'); // insert img src
//   $pokeImg.setAttribute('alt', 'pokemonData.name');
//
//   const $pokeName = document.createElement('h3');
//  $pokeName.textContent = cname;
//
//  $newLiElement.appendChild($newCardWrap);
//
//  $newCardWrap.appendChild($newPokeCard);
//
//  $newPokeCard.appendChild($pokeNumber);
//  $newPokeCard.appendChild($pokeImg);
//  $newPokeCard.appendChile($pokeName);
//
//  return $newLiElement;
// }
