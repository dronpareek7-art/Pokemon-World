let wrapper = document.querySelector(".wrapper");
let input =document.querySelector(".input");
let loadMore = document.querySelector(".load-more");

let limit = 20;
let offset = 0;

async function getpok() {
  try {
    let response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
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
        
       let card = document.createElement("div");
      card.classList.add("card");

      let front = document.createElement("div")
      front.classList.add("card-front")

      let back = document.createElement("div")
      back.classList.add("card-back")

      back.innerHTML = `
      <p>Weight: ${details.weight}kg</p>
      <p>Height: ${details.height}m</p>`

      let inner = document.createElement("div")
      inner.classList.add("card-inner")

      let nameofpokemon = document.createElement("p");
      nameofpokemon.classList.add("namepok");
      nameofpokemon.innerHTML = item.name;

      let div = document.createElement("div");
      div.classList.add("card");

      let image = document.createElement("img");
      image.classList.add("pok-image");
      image.src = details.sprites.other.dream_world.front_default;
       
          front.append(image,nameofpokemon);
          inner.append(front,back)
          card.append(inner)
          wrapper.append(card)
    } catch (error) {
      console.log(error);
    }
  });
}

loadMore.addEventListener("click",()=>{
  offset += 20;
  getpok()
})

