const wordText = document.querySelector(".word"),
hintText = document.querySelector(".hint span"),
inputTag = document.querySelector("input"),
refreshBtn = document.querySelector(".refresh-word"),
checkBtn = document.querySelector(".check-word");
timeText = document.querySelector(".time b");

let correctWord;
let InitialTime = 5;

const initGame = () => {
    setTimer(InitialTime);
    const randomObj = words[Math.floor(Math.random()*words.length)];
    correctWord = randomObj.word;

    wordArray = randomObj.word.split("");
    
    for (let i = wordArray.length -1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        [wordArray[i],wordArray[j]] = [wordArray[j],wordArray[i]];
    }

    inputTag.setAttribute("maxlength", correctWord.length);
    wordText.innerText = wordArray.join("");
    hintText.innerText = randomObj.hint;
    timeText.innerText = InitialTime;

    console.log(correctWord)
    console.log(wordArray);
}

const checkWord = () => {
    let inputText = inputTag.value;

    if (inputText !== correctWord) {
        return alert(`No, ${inputText} is not a correct word`);
    }

    alert(`Congratulation, You win!`);
    inputTag.value = "";
    initGame();
}

const setTimer = time => {
    intervalId = setInterval(() => {
        if(time <= 0){
            console.log("Time is up");
            clearInterval(intervalId);
            initGame();
        }
        time--;
        timeText.innerText = time;
    }, 1000);
}

setTimer(time);

refreshBtn.addEventListener("click",initGame);
checkBtn.addEventListener("click",checkWord);

initGame();