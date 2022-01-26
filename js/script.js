`use strict`;
const user = {};

getJSON = async link =>{
    let myArr = await fetch(link)   
    .then(res => res.json());
    return myArr;
};

getShapes = async () => {
    let shapesArr = [];
    await getJSON(`https://pokeapi.co/api/v2/pokemon-shape`)
    .then(res => res.results)
    .then(res => res.forEach(e => shapesArr.push(e.name)));
    return shapesArr;
};
getSpecies = async myShape => {
    user.shape = myShape;
    const speciesArr = [];
    await getJSON(`https://pokeapi.co/api/v2/pokemon-shape/${myShape}`)
    .then(res => res[`pokemon_species`])
    .then(res => res.forEach(e => speciesArr.push(e.name)));
    return speciesArr;
};
getPokemons = async mySpecie => {
    user.specie = mySpecie;
    const pokemonArr = [];
    await getJSON(`https://pokeapi.co/api/v2/pokemon-species/${mySpecie}`)
    .then(res => res.varieties)
    .then(res => res.forEach(e => pokemonArr.push(e.pokemon.name)));
    return pokemonArr;
};
getMyPokemon = async myPokemon => {
    const pokemon = {
        name: myPokemon,
    };
    await getJSON(`https://pokeapi.co/api/v2/pokemon/${myPokemon}`)
    .then(res => {
        pokemon.img = res.sprites[`front_default`];        
    });
    user.pokemon = pokemon;
};
