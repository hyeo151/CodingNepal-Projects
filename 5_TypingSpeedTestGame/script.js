textEle = document.querySelector(".text-view");
inputEle = document.querySelector("input");

let texts;

const init = () => {
    texts = paragraphs[Math.floor(Math.random()*paragraphs.length)];
    textEle.innerHTML = `<span class="next-letter">${texts.slice(0,1)}</span>${texts.slice(1,texts.length)}`;
}

const checkText = () => {

    let inputText = inputEle.value;

    htmlTag = `<span class="correct-letter">`
    for (let i = 0; i < inputText.length; i++) {
        
        if(texts[i] !== inputText[i]){
            console.log("incorrect");
            htmlTag += `<span class="incorrect-letter">${texts[i]}</span>`
        }else{
            htmlTag += texts[i];
        }
    }
    htmlTag += `</span><span class="next-letter">${texts.slice(inputText.length,inputText.length+1)}</span>${texts.slice(inputText.length+1,texts.length)}`
    textEle.innerHTML = htmlTag;

}

init();
document.addEventListener("click",()=>{inputEle.focus();});
inputEle.addEventListener("input",checkText);