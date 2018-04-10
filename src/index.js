const forceWebpackToFailBecauseChunksAreTooBig = (() => require("lodash-es"))();

// import {a} from "./bar";
import imgSrc from "./webpack-logo.png";
import jk from "./js.txt";
import "./index.css";

jk();

//This is the dynamic import (note not importing at top of file), that webpack will split into its own chunk
const foo = () => import("./foo");

// Foo exports "default", so you can grab that
// const foo = () => import("./foo").then(module => module.default);

// console.log(imgSrc);   shows base64 contents when

//Image - just using Webpack
const myImg = document.createElement("img");
myImg.src = imgSrc;
document.body.appendChild(myImg);

//Button - using static code splitting
const button = document.createElement("button");
button.innerText = "Button";

document.body.appendChild(button);
button.addEventListener("click", e => {
  // foo().then(module => {
  //   //module is: {default: [1, 3, 4, 5, 6, 7]}
  //   //module is: [1, 3, 4, 5, 6, 7]
  //   debugger;
  // });

  import("date-fns").then(dateFnsModule => {
    const today = new Date();
    const tomorrow = dateFnsModule.addDays(today, 1);
    console.log(tomorrow);
    debugger;
  });
});

//Select - using dynamic code splitting (at runtime, one or the other is fetched)
const select = document.createElement("div");
select.innerHTML = `
<select>
  <option value=""></option>
  <option value="a">Theme A</option>
  <option value="b">Theme B</option>
</select>
`;

const getTheme = themeName => import(`./themes/${themeName}`);

select.firstElementChild.addEventListener("change", e => {
  getTheme(e.target.value).then(m => {
    m.default();
    // use "default" because the  module has "export DEFULT function..."
  });
});

document.body.appendChild(select);
