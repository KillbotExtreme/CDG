/////////////////////////////INITIALISE/////////////////////////////
let wood, brick, wheat, sheep, ore, gold, lockImg, board, cross, i, myCanvas;
let blankRoad, blankKnight, blankSet, blankCity;
let blankRoadRed, blankKnightRed, blankSetRed, blankCityRed;
let blankRoadGreen, blankKnightGreen, blankSetGreen, blankCityGreen;
let d = [], lock = [], diceImages = [], resCount = [], score = []; objects = []; resObjects = [];
let goldObjects = [];
let rollNum = 0, rollTimer = 0, finalScore = 0, turn = 0; turnScore = 0;
let diceXStart = 5, lockXStart = 67; imgOS = 150;
let swappingDice = false; swapTo = 0; selectSwapResource = false;

/////////////////////////////SETUP/////////////////////////////
function setup() {
    angleMode(DEGREES);
    myCanvas = createCanvas(905, 900); myCanvas.parent("main-container") //Create Canvas
    loadImages();
    loadObjects();
    loadDice();
    createInputs(); //For Score
    allowHTMLButtons();
}

/////////////////////////////DRAW/////////////////////////////
function draw() {
    drawBoard();
    rollDice();
    drawDice();
    resCalc();
    drawBuildableImages();
    drawFinalScore();
    drawObjects();
    drawInfo();
}

