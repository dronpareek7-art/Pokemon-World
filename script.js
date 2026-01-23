let wrapper = document.querySelector(".wrapper");
let input = document.querySelector(".input");
let loadMore = document.querySelector(".load-more");
let select = document.querySelector("select");

let limit = 20;
let offset = 0;

let searchPokemon = [];

async function getpok() { 
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    );
    let data = await response.json();
    console.log(data);
    display(data);
  } catch (error) {
    console.log(error);
  }
}
getpok();

async function display(data) {
  data.results.forEach(async (item) => {
    try {
      let result = await fetch(item.url);
      let details = await result.json();
      console.log(details);
      searchPokemon.push(details);
      displaypokemon(details);
    } catch (error) {
      console.log(error);
    }
  });
}

function displaypokemon(details) {
  let card = document.createElement("div");
  card.classList.add("card");

  let front = document.createElement("div");
  front.classList.add("card-front");

  let back = document.createElement("div");
  back.classList.add("card-back");

  back.innerHTML = `
      <p>Weight: ${details.weight}kg</p>
      <p>Height: ${details.height}m</p>
      <p>Ability: ${details.abilities[0].ability.name}</p>
      <p>Type: ${details.types[0].type.name}</p>
      <p>Moves: ${details.moves[0].move.name}</p>
      `;

  let inner = document.createElement("div");
  inner.classList.add("card-inner");

  let nameofpokemon = document.createElement("p");
  nameofpokemon.classList.add("namepok");
  nameofpokemon.innerHTML = details.name;

  let div = document.createElement("div");
  div.classList.add("card");

  let image = document.createElement("img");
  image.classList.add("pok-image");
  image.src = details.sprites.other.dream_world.front_default;

  front.append(image, nameofpokemon);
  inner.append(front, back);
  card.append(inner);
  wrapper.append(card);
}

loadMore.addEventListener("click", () => {
  offset += 20;
  getpok();
});

input.addEventListener("keyup", (e) => {
  wrapper.innerHTML = "";

  let filtered = searchPokemon.filter((poke) =>
    poke.name.includes(e.target.value.toLowerCase()),
  );
    if(filtered.length>0){
    filtered.forEach(displaypokemon)
  }
  else{
    wrapper.innerHTML = `<p class = "error-pokemon"> Error : No Pokémon found</p>`
  }

});

select.addEventListener("change", (e) => {
  let value = e.target.value.toLowerCase();
  wrapper.innerHTML = "";

  let filteredPokemon = searchPokemon.filter((pokemon) => {
    let searchbyname = pokemon.name.includes(value);
    let searchbytype = pokemon.types.some((t) => {
      return t.type.name.includes(value);
    });
    return searchbyname || searchbytype;
  });
  if(filteredPokemon.length>0){
    filteredPokemon.forEach(displaypokemon)
  }
  else{
    wrapper.innerHTML = `<p class = "error-pokemon"> Error : No Pokémon found</p>`
  }
});

function textanimation() {
  const texts = [
    "Welcome to Pokémon World",
    "Discover Amazing Pokémons",
    "Catch Them All",
  ];
  let t = 0,
    c = 0,
    del = false;
  const el = document.querySelector(".text");
  setInterval(() => {
    del ? c-- : c++;
    el.textContent = texts[t].slice(0, c);
    if (c === texts[t].length + 1) del = true;
    if (c === 0 && del) {
      del = false;
      t = (t + 1) % texts.length;
    }
  }, 120);
}
textanimation();
