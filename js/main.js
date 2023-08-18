const $pokedexList = document.querySelector('#pokedex-entries');
const $pokemonEntry = document.querySelector('.pokemon-entry');
const $textDiv = document.createElement('div');
$textDiv.setAttribute('id', 'pokemon-entry');
const $textBox = document.createElement('div');
$textBox.setAttribute('class', 'pokemon-textbox');

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
      $pokedexList.appendChild($pokeWrap);
      $pokeWrap.appendChild($pokeCard);
      $pokeCard.appendChild($pokeNum);
      $pokeCard.appendChild($img);
      $pokeCard.appendChild($pokeName);

      $pokeWrap.addEventListener('click', handleClick);
    }
  });
  xhr.send();
}
getPokemonImage();

function handleClick(e) {
  $pokedexList.classList.add('hidden');
  $pokemonEntry.classList.remove('hidden');
  const pokemonNumber = e.target.closest('p').innerText;
  let hash = pokemonNumber.split('#');
  hash = hash[1].trim();

  getPokemonData(hash);
}

function getPokemonData(hash) {
  const xhrData = new XMLHttpRequest();
  xhrData.open('GET', `https://pokeapi.co/api/v2/pokemon/${hash}`);
  xhrData.responseType = 'json';
  xhrData.addEventListener('load', function () {
    const pokeData = xhrData.response;
    const $entryDiv = document.createElement('div');
    $entryDiv.setAttribute('class', 'card-wrapper');
    const $entryCard = document.createElement('div');
    $entryCard.setAttribute('class', 'pokemon-card');
    const $entryNum = document.createElement('p');
    $entryNum.setAttribute('class', 'pokemon-number');
    $entryNum.textContent = '#' + pokeData.id;
    const $entryImg = document.createElement('img');
    $entryImg.setAttribute('class', 'pokemon-img');
    $entryImg.setAttribute('alt', pokeData.name);
    $entryImg.src = pokeData.sprites.other.dream_world.front_default;
    const $entryName = document.createElement('h3');
    $entryName.setAttribute('class', 'pokemon-name');
    $entryName.textContent = pokeData.name;

    $pokemonEntry.appendChild($entryDiv);
    $entryDiv.appendChild($entryCard);
    $entryCard.appendChild($entryNum);
    $entryCard.appendChild($entryImg);
    $entryCard.appendChild($entryName);

    const $typeHeader = document.createElement('div');
    $typeHeader.setAttribute('class', 'pokemon-type-header');
    const $pokeType = document.createElement('p');
    $pokeType.setAttribute('class', 'pokemon-type');
    $pokeType.textContent = pokeData.types[0].type.name;

    $pokemonEntry.appendChild($textDiv);
    $textDiv.appendChild($textBox);
    $textBox.appendChild($typeHeader);
    $typeHeader.appendChild($pokeType);
  });
  xhrData.send();
  const xhrSpecies = new XMLHttpRequest();
  xhrSpecies.open('GET', `https://pokeapi.co/api/v2/pokemon-species/${hash}`);
  xhrSpecies.responseType = 'json';
  xhrSpecies.addEventListener('load', function () {
    const pokeSpecies = xhrSpecies.response;
    const $pokeFlavorText = document.createElement('h3');
    $pokeFlavorText.setAttribute('class', 'pokemon-flavor-text');
    $pokeFlavorText.innerText = pokeSpecies.flavor_text_entries[1].flavor_text;
    $textBox.appendChild($pokeFlavorText);
  });
  xhrSpecies.send();
}
