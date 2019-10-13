import "babel-polyfill";
import "./style.css";

const row = document.querySelector(".image-row");

async function getPhotos() {
  let result = await fetch(
    "https://api.unsplash.com/photos?per_page=20&&client_id=8e6d7f17da6329b45a1641a97fbb024d7d9b8b81b88c74a724dddfd974b80eb5"
  );
  const photoes = await result.json();
  for (let i = 0; i < photoes.length; i++) {
    const imageBox = create_image_col(photoes[i].urls.small);
    row.appendChild(imageBox);
  }
  return photoes;
}

async function search(value) {
  row.innerHTML = "";
  let result = await fetch(
    "https://api.unsplash.com/search/photos?page=1&&query=" +
      value +
      "&&client_id=8e6d7f17da6329b45a1641a97fbb024d7d9b8b81b88c74a724dddfd974b80eb5"
  );
  const search_result = await result.json();

  for (let i = 0; i < search_result.results.length; i++) {
    const imageBox = create_image_col(search_result.results[i].urls.small);
    row.appendChild(imageBox);
  }
}

const create_image_col = src => {
  const imageCol = document.createElement("div");
  imageCol.setAttribute("class", "col-3 right");

  const imageContainer = document.createElement("div");
  imageContainer.setAttribute("class", "img");

  const image = document.createElement("img");
  image.setAttribute("src", src);

  imageContainer.appendChild(image);
  imageCol.appendChild(imageContainer);

  return imageCol;
};

const myButton = document.getElementById("click");
myButton.onclick = function() {
  const search_value = document.getElementById("inputID").value;
  search(search_value);
};

const home = document.getElementById("home");
home.onclick = function() {
  row.innerHTML = "";
  getPhotos();
};

getPhotos();
