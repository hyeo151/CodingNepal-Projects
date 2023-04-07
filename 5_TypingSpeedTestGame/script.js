textEle = document.querySelector(".text-view");
inputEle = document.querySelector("input");
mistakeEle = document.querySelector(".mistake span");
timerEle = document.querySelector(".timer span");
wpmEle = document.querySelector(".wpm span");
cpmEle = document.querySelector(".cpm span");

let text = "In modern times the first scrawny kitten is, in its own way, an input. An ostrich is the beginner of a roast. An appressed exhaust is a gun of the mind. A recorder is a grade from the right perspective. A hygienic is the cowbell of a skin. Few can name a dun brazil that isn't a highbrow playroom. The unwished beast comes from a thorny oxygen. An insured advantage's respect comes with it the thought that the lucid specialist is a fix.";
let mistakeCount = 0;
let timerCount = 60;
let grossWPM;
let GameStarted = 0;
let userInputText = "";
let setIntervalId;

const init = () => {
    //Get random paragraph
    // text = paragraphs[Math.floor(Math.random()*paragraphs.length)];

    // Assign All text for display, with first letter blicking.
    currentLetter = text.slice(0,1);
    remainText = text.slice(1,text.length);
    htmlTag = `<span class="next-letter">${currentLetter}</span>${remainText}`;

    // Assign all text
    textEle.innerHTML = htmlTag
}

const checkText = () => {

    userInputText = inputEle.value;

    if(userInputText.length == text.length){
        calcWPM();
        inputEle.disabled = true;
        clearInterval(setIntervalId);
    }

    if(GameStarted === 0){
        GameStarted += 1;
        console.log("helo");
        setTimer();
    }
    
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

calcWPM = () => {
    // Calculate the net WPM
    const elapsedTime = 60 - timerCount; // in seconds
    let netWPM = ((userInputText.length / 5) - mistakeCount) / (elapsedTime / 60); //words per minute
    if (netWPM < 0) {
        netWPM = 0;
    } 
    let netCPM = (userInputText.length- mistakeCount) / (elapsedTime / 60); // Char per minute

    wpmEle.innerHTML = Math.floor(netWPM); 
    cpmEle.innerHTML = Math.floor(netCPM); 
}



setTimer = () => {
    setIntervalId = setInterval(()=>{
        console.log("setInterval")
        if(timerCount <= 0) {
            calcWPM();
            inputEle.disabled = true;
            clearInterval(setIntervalId);
            console.log("buye")
        }    

        timerEle.innerHTML = timerCount;
        timerCount --;
        calcWPM();
    }, 1000);
}




init();

// Focus the input box when user click browser panel
document.addEventListener("click",()=>{inputEle.focus();});
inputEle.addEventListener("input",checkText);