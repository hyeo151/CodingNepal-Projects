const wordEle = document.querySelector(".word");
const hintEle = document.querySelector(".hint span");
const refreshBtn = document.querySelector(".refresh-word");
const checkBtn = document.querySelector(".check-word");
const timeEle = document.querySelector(".time b");
const inputEle = document.querySelector("input");

let correctWord;
let intervalId;
let timer = 30;

const initGame = () => {
    const randomObj = words[Math.floor(Math.random() * words.length)];
    correctWord = randomObj.word;

    let wordArray = randomObj.word.split("");

    for (let i = wordArray.length-1; i > 0; i--) {       
        let j = Math.floor(Math.random() * (i + 1));
        [wordArray[i],wordArray[j]] = [wordArray[j],wordArray[i]];
    }
    timeEle.innerText = timer;
    wordEle.innerText = wordArray.join("");
    hintEle.innerText = randomObj.hint;

    setTime(timer);

    console.log(randomObj.word);
}

const checkWord = () => {
    inputWord = inputEle.value;
    
    if(inputEle.value !== correctWord) return alert(`Oops, ${inputWord} is not a correct word.`);
    
    alert(`Congratulation ${inputWord} is a correct word`);
    inputEle.value = "";
    return initGame();

}

const setTime = time => {
    clearInterval(intervalId);
    intervalId = setInterval(()=>{
        if(time <= 0){
            // alert(`Time up! correct word was ${correctWord}`);
            alert(`Time up! correct word was ${correctWord}`);
            clearInterval(intervalId);
            inputEle.value = "";
            return initGame();
        }
        time--;
        timeEle.innerText = time;
    }, 1000);
}

refreshBtn.addEventListener("click",initGame);
checkBtn.addEventListener("click",checkWord);

initGame();