// const button = document.createElement("button");

// button.innerText = "my button";
// button.addEventListener("click", e => {
//   console.log(`Yeah you clicked that button boo`, e);
// });

// document.body.appendChild(button);

import imgSrc from "./webpack-logo.png";
import "./index.css";

console.log(imgSrc);

const myImg = document.createElement("img");
myImg.src = imgSrc;
document.body.appendChild(myImg);
