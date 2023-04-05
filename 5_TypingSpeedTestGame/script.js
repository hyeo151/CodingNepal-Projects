textEle = document.querySelector(".text-view");
inputEle = document.querySelector("input");

let inputText = "";

const init = () => {
    const texts = paragraphs[Math.floor(Math.random()*paragraphs.length)];
    textEle.innerHTML = texts;
}

const checkText = (e) => {
    inputText += e.key;
    console.log(inputText);
}

init();
document.addEventListener("focus",()=>{console.log("focused")});
// inputEle.addEventListener("keydown",checkText)