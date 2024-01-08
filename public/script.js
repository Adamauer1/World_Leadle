//localStorage.clear();
const GREEN = "#9CDD9B";
const YELLOW = "#E0c56E";
const RED = "#9D4545";
let LEADERS
let LEADERS_LIST = [];
let ACTIVE_LIST = [];
let listedNames = [];
const NUMBER_OF_GUESSES = 5;
let guessesRemaining = NUMBER_OF_GUESSES;
let currentGuesses = [];
let rightGuessString = "";
let gameOver = false;
let input = document.getElementById('leader');
// 0 is daily --- 1 is free play
let currentGameMode = 0;
let GAME_STATE = {
    "numOfGuesses": NUMBER_OF_GUESSES,
    "listOfGuesses": [],
    "gameOver": gameOver
};
const date = new Date();

document.getElementById("list").style.width = input.offsetWidth + "px";

async function loadLeaders(){
    const inbound = await fetch("data/leaders.json",)
    .then(function(res){
        return res.json();
    })
    //console.log(inbound)
    LEADERS = new Map(inbound.map((obj) => [obj.name, obj]))
    //console.log(LEADERS);
    LEADERS_LIST = Array.from(LEADERS.keys());
    //console.log(LEADERS_LIST);
    //initGame();
    LEADERS_LIST.sort();
    document.getElementById('nextLeader').onclick = initFreeGame
    initDailyGame()
}

loadLeaders()


function initDailyGame(){
    hideElements();
    if (localStorage.getItem('current-date') && localStorage.getItem('current-date') == (date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString())){
        guessesRemaining = parseInt(localStorage.getItem('guessesLeft'));
        gameOver = (localStorage.getItem('gameOver') === 'true');
        if (localStorage.getItem('guess0')){
            currentGuesses.push(localStorage.getItem('guess0'));
        }
        if (localStorage.getItem('guess1')){
            currentGuesses.push(localStorage.getItem('guess1'));
        }
        if (localStorage.getItem('guess2')){
            currentGuesses.push(localStorage.getItem('guess2'));
        }
        if (localStorage.getItem('guess3')){
            currentGuesses.push(localStorage.getItem('guess3'));
        }
        if (localStorage.getItem('guess4')){
            currentGuesses.push(localStorage.getItem('guess4'));
        }
        //console.log(currentGuesses);
        // console.log(guessesRemaining)
        // console.log(gameOver)
    }
    else{
        localStorage.clear();
        localStorage.setItem('current-date', date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString());
        localStorage.setItem('guessesLeft', NUMBER_OF_GUESSES.toString());
        guessesRemaining = NUMBER_OF_GUESSES;
        gameOver = false;
        currentGuesses = [];
        document.getElementById("playMode").checked = false;
    }
    const generator = new Math.seedrandom(date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString());
    const randomNumber = Math.floor((generator()* LEADERS_LIST.length));
    rightGuessString = LEADERS_LIST[randomNumber];

    initBoard();

}

function initFreeGame(){
    guessesRemaining = NUMBER_OF_GUESSES;
    gameOver = false;
    input.value = ''
    //currentGuesses = [];
    hideElements();
    if (ACTIVE_LIST.length < 5){
        ACTIVE_LIST = LEADERS_LIST;
    }
    // console.log("test");
    let index = Math.floor(Math.random()*ACTIVE_LIST.length)
    // console.log(index);
    // console.log(ACTIVE_LIST.length)
    // console.log(LEADERS_LIST.length);
    rightGuessString = ACTIVE_LIST[index];
    ACTIVE_LIST.splice(index,1)
    initBoard();
}

function initBoard(){
    let board = document.getElementById("game-board");
    let button = document.getElementById('guess-button');
    button.onclick = fun =>{
        let error = document.getElementById('error-span');
        error.style.display = 'none';
        //let guess = LEADERS.get(input.value);
        let guess = input.value;
        if (gameOver){
            return;
        }
        //let guess = LEADERS.get(input.value);
        if (currentGuesses.includes(guess)){
            //console.log("Already guessed");
            //alert("You have already guessed this person try again.")
            //let error = document.getElementById('error-span');
            error.innerHTML = "You have already guessed this leader!";
            error.style.display = 'block';
            return;
        }
        if (LEADERS.get(guess) == undefined){
            //alert("Invalid input try again");
            error.innerHTML = "Invalid guess try again!"
            error.style.display = 'block'
            //console.log("invalid input try again.");
            return;
        }
        guessesRemaining = guessesRemaining - 1;
        currentGuesses.push(guess);
        displayGuessResult(LEADERS.get(guess));
    }
    let gameMode = document.getElementById('playMode');
    gameMode.onclick = changeGameMode;
    //display image
    let image = document.getElementById('famous-picture');
    image.src = LEADERS.get(rightGuessString).image;
    for (let i = 0; i < currentGuesses.length; i++){
        //console.log(currentGuesses[i]);
        displayGuessResult(LEADERS.get(currentGuesses[i]))
    }

}

function displayGuessResult(guess){
    //guessesRemaining = guessesRemaining - 1;
    //currentGuesses.push(guess);
    input.value = '';
    if (!currentGameMode){
        //console.log(currentGameMode)
        saveGame()
    }
    let container = document.getElementById('guess-feedback-container');
    let row = document.createElement('div');
    row.className = 'result-row';
    let box1 = document.createElement('div');
    box1.className = 'result-box result-box-name';
    let box2 = document.createElement('div');
    box2.className = 'result-box result-box-title';
    let box3 = document.createElement('div');
    box3.className = 'result-box result-box-nationality';
    let box4 = document.createElement('div');
    box4.className = 'result-box result-box-continent';
    let box5 = document.createElement('div');
    box5.className = 'result-box result-box-century';
    let box6 = document.createElement('div');
    box6.className = 'result-box result-box-arrow';
    box1.textContent = guess.name;
    box1.style.backgroundColor = RED;
    if (guess.name === LEADERS.get(rightGuessString).name){
        box1.style.backgroundColor = GREEN;
        gameOver = true;
        endGame(guess.name === LEADERS.get(rightGuessString).name);
    } else if (guessesRemaining <= 0) {
        gameOver = true;
        endGame(guess.name === LEADERS.get(rightGuessString).name);
    }
    row.appendChild(box1);
    box2.textContent = guess.title;
    if (guess.title === LEADERS.get(rightGuessString).title){
        box2.style.backgroundColor = GREEN;
    } else {
        box2.style.backgroundColor = RED;
    }
    row.appendChild(box2);
    box3.textContent = guess.nationality;
    if (guess.nationality === LEADERS.get(rightGuessString).nationality){
        box3.style.backgroundColor = GREEN;
    } else {
        box3.style.backgroundColor = RED;
    }
    row.appendChild(box3);
    box4.textContent = guess.continent;
    if (guess.continent === LEADERS.get(rightGuessString).continent){
        box4.style.backgroundColor = GREEN;
    } else {
        box4.style.backgroundColor = RED;
    }
    row.appendChild(box4);
    box5.textContent = guess.century;

    let color = RED;
    let check = false;
    for (let time of guess.century){
        if (LEADERS.get(rightGuessString).century.includes(time)){
            color = YELLOW;
        } else {
            check = true;
        }
    }
    if (guess.century.length != LEADERS.get(rightGuessString).century.length){
        check = true;
    }
    if (color === YELLOW && !check){
        color = GREEN;
    }
    box5.style.backgroundColor = color;
    row.appendChild(box5);
    let arrow = "";

    switch(color){
        case GREEN:
            arrow = "\u{02713}";
            break;
        case YELLOW:
            arrow = "\u{2248}";
            break;
        case RED:
            if (guess.century[0] > LEADERS.get(rightGuessString).century[0]){
                arrow = "\u{02193}";
            }
            else{
                arrow = "\u{02191}";
            }
            break;
        default:
            break;
    }

    box6.textContent = arrow;
    box6.style.backgroundColor = color;
    row.append(box6);

    container.appendChild(row);

    // if (gameOver){
    //     endGame(guess.name === LEADERS.get(rightGuessString).name);
    // }
}

function endGame(winner){
    if (currentGameMode){
        document.getElementById("nextLeader").style.display = 'block'
    }
    else{
        document.getElementById("nextLeader").style.display = 'none'
    }
    // setTimeout(function(){
    //     if (winner){
    //         //console.log("You won");
    //         //alert(`You Win\n You found out the right person with ${guessesRemaining} guesses remaining!`)
    //     }
    //     else {
    //         //console.log("Nice Try")
    //         //alert(`Nice try.\n Play again tomorrow!`);
    //     }  
    // }, 0)

    //display right leader
    let container = document.getElementById('answer-container');

    let para = document.createElement('p');
    para.className = "leader-name";
    para.textContent = LEADERS.get(rightGuessString).name;
    container.appendChild(para);
    let anchor = document.createElement('a');
    anchor.className = "leader-url";
    anchor.href = LEADERS.get(rightGuessString).wikiLink;
    anchor.textContent = "Wikipedia";
    anchor.target = "_blank";
    container.appendChild(anchor);
    //container.style.display = "block";
}

function changeGameMode(){
    currentGameMode = !currentGameMode
    if (currentGameMode){
        saveGame();
        ACTIVE_LIST = [].concat(LEADERS_LIST);
        initFreeGame()
    }
    else{
        initDailyGame()
    }
    //console.log(currentGameMode)
}

input.addEventListener("keyup", (e) => {
    removeElements();
    if (input.value == ""){
        return;
    }

    let regex = new RegExp(input.value.toLowerCase());
    listedNames = LEADERS_LIST.filter(word => regex.test(word.toLowerCase()));
    //console.log(listedNames);
    if (listedNames.length == 0){
        return;
    }

    for (let n of listedNames){
        let listItem = document.createElement("li");

        listItem.classList.add("list-items");
        listItem.style.cursor = "pointer";

        //add <b> using the regex function to find the start of the regex

        listItem.innerHTML = n;
        listItem.addEventListener("click", function(){
            displayNames(n);
        }, false);
        document.getElementById("list").appendChild(listItem);
    }

});

function displayNames(value){
    input.value = value;
    removeElements();
}

function removeElements(){
    let items = document.querySelectorAll(".list-items");
    items.forEach((item) => {
        item.remove();
    });
}

function hideElements(){
    currentGuesses = []
    input.value = ''
    document.getElementById("nextLeader").style.display = 'none';
    let infoContainer = document.getElementById("answer-container");
    while (infoContainer.firstChild){
        infoContainer.removeChild(infoContainer.firstChild);
    }

    let guessContainer = document.getElementById("guess-feedback-container");
    while (guessContainer.firstChild){
        guessContainer.removeChild(guessContainer.firstChild);
    }
}

function saveGame(){
    // console.log("TEST")
    // console.log(currentGuesses)
    localStorage.setItem('guessesLeft', guessesRemaining.toString());
    if (gameOver){
        localStorage.setItem('gameOver', 'true');
    }
    else{
        localStorage.setItem('gameOver', 'false')
    }
    for (let i = 0; i < currentGuesses.length; i++){
        // localStorage.setItem('guess' + i, JSON.stringify(currentGuesses[i]));
        localStorage.setItem('guess' + i, currentGuesses[i]);
    }
}

window.addEventListener('beforeunload', function (event) {
    if (!currentGameMode){
        saveGame();
    }
})