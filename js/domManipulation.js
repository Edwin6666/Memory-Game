const board = document.querySelector(".game-board");
const reset = document.getElementById("reset");
const replay = document.getElementById("replay");
const form = document.getElementById("form");
const difficulties = document.querySelectorAll("input[name='difficulty']");
const timer = document.getElementById("timer");
const ratingPerfect = document.getElementById("rating-perfect");
const ratingAverage = document.getElementById("rating-average");
const modal = document.querySelector(".modal");

function shuffleCards() {
    const cards = document.querySelectorAll(".card-container");
    cards.forEach((card) => {
        const randomPos = Math.floor(Math.random() * cards.length);
        card.style.order = randomPos;
    });
}

function flipCardsFaceDown() {
    const cards = document.querySelectorAll(".card");
    if (cards) {
        cards.forEach((card) => {
            if (card) {
                card.classList.remove("front-open");
                if (card.nextElementSibling) {
                    card.nextElementSibling.classList.remove("back-open");
                }
            }
        });
    }
}

function matchChecker(e) {
    if (
        e.target.classList.contains("card") &&
        !e.target.classList.contains("front-open")
    ) {
        e.target.classList.add("front-open");
        e.target.nextElementSibling.classList.add("back-open");
        emojiClasses.push(e.target.nextElementSibling.firstChild.textContent);
        selectedCards.push(e.target);
        clickCount += 1;
        if (clickCount === 1) {
            clearInterval(setTimer);
            setTimer = setInterval(stopwatch, 1000);
        }
        if (clickCount === 2) {
            clickCount = 0;
            moves += 1;
            document.getElementById("moves").innerHTML = moves;
            board.removeEventListener("click", matchChecker);
            setTimeout(function () {
                board.addEventListener("click", matchChecker);
            }, 1000);
            if (emojiClasses[0] === emojiClasses[1]) {
                correctMoves += 1;
                checkwin(correctMoves);
                emojiClasses = [];
                [].forEach.call(selectedCards, (c) => {
                    c.classList.add("front-correct");
                    c.nextElementSibling.classList.add("back-correct");
                });
            } else {
                wrongMoves += 1;
                rating(wrongMoves);
                setTimeout(function () {
                    emojiClasses = [];
                    [].forEach.call(selectedCards, (c) => {
                        c.classList.remove("front-open");
                        c.nextElementSibling.classList.remove("back-open");
                        selectedCards = [];
                    });
                }, 1000);
            }
        }
    }
}

// Event Listeners
reset.addEventListener("click", startGame);
replay.addEventListener("click", startGame);
form.addEventListener("change", startGame);
window.addEventListener("click", function (e) {
    if (e.target === modal) {
        startGame();
    }
});
board.addEventListener("click", matchChecker);
window.addEventListener("load", startGame);
