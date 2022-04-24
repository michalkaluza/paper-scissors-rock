// Zobacz gotowy projekt: https://websamuraj.pl/examples/js/projekt7/


const gameSummary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0
}

const game = {
    playerHand: "",
    aiHand: "",
}

const hands = [...document.querySelectorAll(".select img")]

// addEventListener na każdy element tablicy:

const handSelection = function() {
    game.playerHand = this.dataset.option
    hands.forEach((hand) => {
        hand.style.boxShadow = ''
    })
    this.style.boxShadow = "0 0 0 4px yellow"
    console.log(game.playerHand)
}

hands.forEach((hand) => {
    hand.addEventListener("click", handSelection)
})

// funkcja losująca opcję komputera

function aiChoice() {
return hands[Math.floor(Math.random()*3)].dataset.option
}

// funkcja sprawdzająca wynik (tu jest tylko konstrukcja funkcji - przy wywołaniu podstawia pod player i ai wpisane parametry)

function checkResult(player, ai) {
    if (player === ai) {
        return 'remis'
    } else if (player === "kamień" && ai === "nożyczki" || player === "papier" && ai === "kamień" || player === "nożyczki" && ai === "papier") {
        return 'wygrana'
    } else {return 'przegrana'}
}

// funkcja publikująca wynik

function publishResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = player
    document.querySelector('[data-summary="ai-choice"]').textContent = ai
    document.querySelector("p.numbers span").textContent = ++gameSummary.numbers

    if (result === "wygrana") {
    document.querySelector("p.wins span").textContent = ++gameSummary.wins
    document.querySelector('[data-summary="who-win"]').textContent = "Gracz"
    } else if (result === "przegrana") {
        document.querySelector("p.losses span").textContent = ++gameSummary.losses
        document.querySelector('[data-summary="who-win"]').textContent = "komputer"
    } else {
        document.querySelector("p.draws span").textContent = ++gameSummary.draws
        document.querySelector('[data-summary="who-win"]').textContent = "remis"
    }
}

// funkcja, która usuwa obramowanie i wybraną rękę

function endGame() {
document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = ""
game.playerHand = ""
}


// funkcja sterująca

const startGame = function() {

    //  sprawdzam czy jest wybrana opcja

    if (!game.playerHand) {
        return alert("wybierz dłoń")
    }

    // przypisuję funkcję losującą opcje do aiHand (wynik return funkcji aiChoice zostaje przypisany do game.aiHand)

    game.aiHand = aiChoice();
    console.log(game.aiHand)

    const gameResult = checkResult(game.playerHand, game.aiHand)

    publishResult(game.playerHand, game.aiHand, gameResult)

    endGame()
}

const btn = document.querySelector(".start")
btn.addEventListener("click", startGame)