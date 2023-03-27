const wordText = document.querySelector(".word");
const hintText = document.querySelector(".hint");

initGame = () => {
    randomWord = wordList[Math.floor(Math.random()*wordList.length)];

    wordArray = randomWord.word.split("");

    for (let i = 0; i < wordArray.length; i++) {
        const letterDiv = document.createElement('div');
        letterDiv.className = "letter";
        letterDiv.style.setProperty('width',`calc(100%/${wordArray.length} - 10px)`);
        wordText.appendChild(letterDiv);
    }

    hintText.innerText = randomWord.hint;
}
initGame();