let deck = {};

function getDeck(){

    // This is the long way
    // let aPromise = new Promise((resolve, reject) => {});
    // return aPromise;

    // This is the short way
    return new Promise((resolve, reject) => {
        $.ajax({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
            type: 'GET',
            success:(response) =>{
                resolve(response);
        },
        error: error => {
                reject(error);
        }
        });
    });

}

function getCards(deckId, cardAmount) {

    return new Promise((resolve, reject) => {
        $.ajax({
            url: `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${cardAmount}`,
            type: 'GET',
            success: (response) => {
                resolve(response);
            },
            error: (error) => {
                reject(error);
            }
        })
    })
}

let deckPromise = getDeck();

deckPromise.then(data => {
    getCards(data.deck_id, 4).then((cardData) =>{
            //document.getElementById('card1player1').src = cardData.cards[0].image;
            $('#card1player1').attr('src', cardData.cards[0].image);
            document.getElementById('card2player1').src = cardData.cards[1].image;
            document.getElementById('card1player2').src = cardData.cards[2].image;
            document.getElementById('card2player2').src = cardData.cards[3].image;
    });
});

function hit(playerNum){
    deckPromise.then((data) => {
        getCards(data.deck_id, 1).then((cardData) => {
            if(playerNum == 1){
            $('.flex').append(`<img src=${cardData.cards[0].image}>`);
            }

            else{
                $('.flex2').append(`<img src=${cardData.cards[0].image}>`);
            }
        })
    })
}