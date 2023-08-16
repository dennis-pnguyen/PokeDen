const $pokemonEntryList = document.querySelector('#pokedex-entries');

function getPokemonImage() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://pokeapi.co/api/v2/pokemon?limit=151');
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
      const $pokeWrap = document.createElement('div');
      $pokeWrap.setAttribute('class', 'card-wrapper');
      const $pokeCard = document.createElement('div');
      $pokeCard.setAttribute('class', 'pokemon-card');
      const $pokeNum = document.createElement('p');
      $pokeNum.setAttribute('class', 'pokemon-number');
      $pokeNum.textContent = `#${i + 1}`;
      const $pokeName = document.createElement('h2');
      $pokeName.textContent = currentPokemon.name;
      const $img = document.createElement('img');
      $img.setAttribute('class', 'pokemon-img');
      $img.src = url;
      $pokemonEntryList.appendChild($pokeWrap);
      $pokeWrap.appendChild($pokeCard);
      $pokeCard.appendChild($pokeNum);
      $pokeCard.appendChild($img);
      $pokeCard.appendChild($pokeName);
    }
  });
  xhr.send();
}
getPokemonImage();
