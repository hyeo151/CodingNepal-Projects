const cards = document.querySelectorAll(".card");

let card_1, card_2;
let boardDisabled = false;
let cardMatched = 0;

function flip({target:clickedCard}) {

    if( clickedCard !== card_1 && !boardDisabled){
        clickedCard.classList.add("flip");
        if(!card_1){
            card_1 = clickedCard;
            return;
        }
        card_2 = clickedCard;
    
        let img_1 = card_1.querySelector(".back-view img").src,
        img_2 = card_2.querySelector(".back-view img").src;

        matchCards(img_1,img_2)
    }
}

function matchCards(img_1,img_2){

    boardDisabled = true;

    if(img_1 === img_2){
        card_1 = card_2 = "";
        cardMatched++;

        if(cardMatched === 8){
            shuffleCard();
        }

        boardDisabled = false;
        return;
    }
    
    setTimeout(() => {
        card_1.classList.add("shake");
        card_2.classList.add("shake");        
    }, 500);

    setTimeout(() => {
        card_1.classList.remove("shake","flip");
        card_2.classList.remove("shake","flip");
        card_1 = card_2 = "";
        boardDisabled = false;        
    }, 1000);

}

function shuffleCard(){
    cardMatched = 0;

    let arr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8];
    arr.sort(()=> Math.random() > 0.5 ? 1:-1);

    cards.forEach((card,i) => {
        card.classList.remove("flip");

        let imgTag = card.querySelector(".back-view img")
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flip);
    });
        
}

shuffleCard();

cards.forEach(card => {
    card.addEventListener("click",flip)
});
