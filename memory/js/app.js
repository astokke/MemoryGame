/*jshint esversion:6, browser:true*/

////////////////////////////////////////
/// Memory Game                     ///
/// MemoryGame.init() to start game///
/////////////////////////////////////

class MemoryGame {
    constructor() {
        this.deck =  [...this.createDeck(), ...this.createDeck()];
        this.cardDeck = "https://i.imgur.com/6FlHDXY.png";
        this.vicImg = "https://i.imgur.com/irGI6hz.png";
        this.container = document.querySelector('#main');
        this.lastCard = null;
        this.inPlay = false;
        this.score = 0;
    }
    // Display game inside container. 
    displayGame() {
        this.container.innerHTML = '';
        let HTML = `<h1>? Member ? </h1><div class="card-deck">`;
        HTML += this.deck.map(image => {  
           return ` <div class="card play-card" data-value="${image.id}" data-key="${this.uniqueID()}">
                        <div class="front">
                            <img class="play-img" src="${this.cardDeck}" width="100" height="100">
                        </div>
                        <div class="back current">
                            <img class="play-img" src="${image.img}" width="90" height="90">
                        </div>

                    </div>`;
           }).join('');  
        HTML += `</div>`;
    
        this.container.innerHTML = HTML;
       
    }
    
    // Set up EventListeners for the cards
    gameListeners() {
        const DOMdeck = document.querySelectorAll('.play-card');
        DOMdeck.forEach(card => card.addEventListener('click', e => this.playCard(e)));
    }
    
    // Play the last flipped card
    playCard(e) {
        e.preventDefault();
        let currentCard = e.currentTarget;
        if(this.inPlay  || this.lastCard !== null && currentCard.dataset.key === this.lastCard.dataset.key ) {
            return;
        }
        
        this.inPlay = true;
        this.rotateCard(currentCard);
        currentCard.addEventListener('transitionend', () => {
            if (this.lastCard === null){
                this.lastCard = currentCard;
                this.inPlay = false;
        } else if(this.lastCard.dataset.value !== currentCard.dataset.value ) {
            this.rotateCard(this.lastCard);
            this.rotateCard(currentCard);
            this.lastCard = null;
            this.inPlay = false;
        }  else if (this.lastCard.dataset.value === currentCard.dataset.value ) {
                currentCard.outerHTML = currentCard.outerHTML;
                this.lastCard.outerHTML = this.lastCard.outerHTML;
                this.lastCard = null;
                this.inPlay = false;
                this.score++;
                this.checkVictory();
        }     
        }, {once: true} );  
    }
    
    // Check if the player won the game
    checkVictory() {
        if(this.score >= this.deck.length / 2) {
            let vicHTML = `<div class="grey"</div>
            <div class="card victory-card">        
            <div class="card-body ">
                <img class="card-img" src="${this.vicImg}" alt="Card image cap">
                <h4 class="card-title p-2">You member!</h4>
                 <a class="btn btn-outline-success btn-block btn-again">Play again</a>
            </div>
        </div>`;
            this.container.insertAdjacentHTML('afterbegin', vicHTML);
            
            let playAgain = document.querySelector('.btn-again');
            playAgain.addEventListener('click', () => this.init());
        }
        
    }
    
    // Rotate the given card
    rotateCard(card) {
        card.classList.toggle('rotate');
        card.querySelector('.back').classList.toggle('current');
        card.querySelector('.front').classList.toggle('current');  
    }
    
    // Start a new game
    init() {
        this.shuffle(this.deck);
        this.score = 0;
        this.displayGame();
        this.gameListeners();
    }
    
    // Initialize the deck - returns containing all cards
    createDeck() {
        let deck = [
            {
                name: "star",
                img: "https://i.imgur.com/sTBh6TR.png",
                id: 1
            },
             {
                name: "yoshi",
                img: "https://i.imgur.com/HaXEFxl.png",
                id: 2
            },
            {
                name: "cherry",
                img: "https://i.imgur.com/IOgn7ov.png",
                id: 3
            },
            {
                name: "shield",
                img: "https://i.imgur.com/MGZpKEB.png",
                id: 4
            },
            {
                name: "red_shovel",
                img: "https://i.imgur.com/FPo4FM2.png",
                id: 5
            },
            {
                name: "shovel",
                img: "https://i.imgur.com/v4uHHXZ.png",
                id: 6
            },
            {
                name: "mega_1up",
                img: "https://i.imgur.com/KsnH1pE.png",
                id: 7
            },
            {
                name: "mega_e",
                img: "https://i.imgur.com/JjLxS1T.png",
                id: 8
            },
            {
                name: "red_ghost",
                img: "https://i.imgur.com/z6bI0UI.png",
                id: 9
            },
            {
                name: "heart",
                img: "https://i.imgur.com/qNL7R1P.png",
                id: 10
            },
            {
                name: "block",
                img: "https://i.imgur.com/egC7wX9.png",
                id: 11
            },
            {
                name: "pacman",
                img: "https://i.imgur.com/qStpzrk.png",
                id: 12
            }  
        ];
        
        return deck;
    }
    
    // Shuffle a given array ( usecase: shuffle the deck)
    shuffle(a) {
        for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
        }
        return a;

    } 
    
    // Create a unique ID for each card, to avoid the user clicking same card twice. 
    uniqueID(){
        return Math.random().toString(36).substr(2, 10);
    }

}
    
let memory = new MemoryGame();

memory.init();