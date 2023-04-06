textEle = document.querySelector(".text-view");
inputEle = document.querySelector("input");
mistakeEle = document.querySelector(".mistake span");
timerEle = document.querySelector(".timer span");
wpmEle = document.querySelector(".wpm span");

let text;
let mistakeCount = 0;
let timercount = 60;
let wordCount = 0;

const init = () => {
    //Get random paragraph
    text = paragraphs[Math.floor(Math.random()*paragraphs.length)];

    let allWords = text.split(" ");

    // Assign All text for display, with first letter blicking.
    currentLetter = text.slice(0,1);
    remainText = text.slice(1,text.length);
    htmlTag = `<span class="next-letter">${currentLetter}</span>${remainText}`;

    // Assign all text
    textEle.innerHTML = htmlTag
}

const checkText = () => {

    let userInputText = inputEle.value;
    
    // reset the count to avoid double counting
    mistakeCount = 0;

    //  Wrap all text with correct-letter and wrap around the incoorect letters inside this wrapper
    let htmlTag = `<span class="correct-letter">`
    for (let i = 0; i < userInputText.length; i++) {
        
        if(text[i] !== userInputText[i]){
            mistakeCount ++;
            htmlTag += `<span class="incorrect-letter">${text[i]}</span>`
        }else{
            htmlTag += text[i];
        }
    }
    htmlTag += `</span>`
    let nextLetter = text.slice(userInputText.length,userInputText.length+1);

    htmlTag += `<span class="next-letter">${nextLetter}</span>`
    
    let remainText = text.slice(userInputText.length+1,text.length)
    htmlTag += `${remainText}`

    mistakeEle.innerHTML = mistakeCount;
    textEle.innerHTML = htmlTag;

}

setInterval(()=>{
    timercount --;
    timerEle.innerHTML = timercount
}, 1000);
init();

// Focus the input box when user click browser panel
document.addEventListener("click",()=>{inputEle.focus();});
inputEle.addEventListener("input",checkText);