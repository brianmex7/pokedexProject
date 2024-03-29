const pokedex = document.getElementById("pokedex");

const fetchPokemon = () => {
  promises = [];
  for (let i = 1; i <= 250; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then((res) => res.json()));
  }
  Promise.all(promises).then((results) => {
    const pokemon = results.map((data) => ({
      name: data.name,
      id: data.id,
      image: data.sprites["front_default"],
      type: data.types.map((type) => type.type.name).join(", "),
    }));
    console.log(pokemon[0]);
    displayPokemon(pokemon);
  });
};

const displayPokemon = (pokemon) => {
  const pokemonHTMLString = pokemon
    .map(
      (poke) =>
        `
  <li class="card">
    <img class="card-img" src="${poke.image}"/>
    <h2 class="card-title">${poke.id}. ${poke.name}</h2>
    <p class="card-subtitle">Type: ${poke.type}</p>
  </li>
  `
    )
    .join("");
  pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();
