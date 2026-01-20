let wrapper = document.querySelector(".wrapper");

async function getpok() {
  try {
    let response = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=100&offset=0",
    );
    let data = await response.json();
    console.log(data);
    displaydata(data);
  } catch (error) {
    console.log(error);
  }
}
getpok();

async function displaydata(data) {
  data.results.forEach(async (item) => {
    try {
      let result = await fetch(item.url);
      let details = await result.json();
      console.log(details);

      let nameofpokemon = document.createElement("p");
      let div = document.createElement("div");
      div.classList.add("card")
      nameofpokemon.classList.add("namepok");
      nameofpokemon.innerHTML = item.name;
      let image = document.createElement("img");
      image.classList.add("pok-image");

      image.src = details.sprites.other.dream_world.front_default;
      div.append(image, nameofpokemon);
      wrapper.append(div);
    } catch (error) {
      console.log(error);
    }
  });
}
