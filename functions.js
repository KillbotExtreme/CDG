/////////////////////////////MOUSE PRESS/////////////////////////////
function mouseReleased() {
    //Lock or Unlock Dice
    if (mouseY > 0 && mouseY < 180) {
        for (i = 0; i < 6; i++) {
            if (diceHover(i)) {
                if (swappingDice == false) {
                    if (lock[i] == false) {lock[i] = true;} else {lock[i] = false;} break;
                }
                else {
                    if (d[i] != 6) {
                        d[i] = swapTo;
                    swappingDice = false;
                    } 
                }
            }
        }
    }
    //Buy Objects
    else {
        for (i in objects) {
            if (objectHover()) {
                if (objects[i].active == false && objects[i].checkActiveParents() == true &&
                    isBuildable(objects[i].type) == true && rollNum != 0) {
                    objects[i].active = true;
                    turnScore += objects[i].sc;
                    deleteRes(objects[i].type);
                }      
            }
        }
    //Use Knight Resources
        for (i in resObjects) {
            if (knightHover()) {
                if (resObjects[i].mode == 1) {
                    resObjects[i].mode = 2;
                    if (i == 5) {
                        selectSwapResource = true;
                    }
                    else {
                        swappingDice = true;
                        swapTo = resObjects[i].resType;
                    }
                }
                else if (resObjects[i].mode == 2 && swappingDice == true && swapTo == resObjects[i].resType ||
                         selectSwapResource == true && i == 5) {
                    resObjects[i].mode = 1;
                    swappingDice = false;
                    swapTo = 0;
                    selectSwapResource = false;
                }
            }
        }
        if (selectSwapResource == true) {
            for (i in goldObjects) {
                if (goldHover()) {
                        swappingDice = true;
                        swapTo = goldObjects[i].type;
                        selectSwapResource = false;
                }
            }
        }
    //Trade Gold
        if (resCount[5] > 1 && selectSwapResource == false && rollNum != 0) {
            for (i in goldObjects) {
                if (goldHover()) {
                        swapGold(goldObjects[i].type);
                }
            }
        }
    }
}

/////////////////////////////BUTTON PRESS/////////////////////////////
function rollClicked() {
    if (selectSwapResource == true) {
        resObjects[5].mode = 1;
    }
    if (swappingDice == true) {
        for (i in resObjects) {
            if (swapTo == resObjects[i].resType) {
                resObjects[i].mode = 1;
            }
        }

    }
    swappingDice = false; swapTo = 0; selectSwapResource = false;
    //Check for final roll and unlock
    rollNum ++;
    if (rollNum > 3) {
        score[turn-1].value(turnScore);
        turnScore = 0;
    }
    if (rollNum > 3 || rollNum == 1) {
        rollNum = 1;
        turn ++;
        for (i = 0; i < 6; i++) {
            lock[i] = false;
            if (d[i] == 6) {
                d[i] = 5;
            }
        }
    }
    //Roll Unlocked Dice
    rollTimer = 60;
    //Update Button Text
    document.querySelector('#btn-1').innerHTML = 'Roll ' + rollNum;
}

function roll0Clicked() {
    if (selectSwapResource == true) {
        resObjects[5].mode = 1;
    }
    if (swappingDice == true) {
        for (i in resObjects) {
            if (swapTo == resObjects[i].resType) {
                resObjects[i].mode = 1;
            }
        }

    }
    swappingDice = false; swapTo = 0; selectSwapResource = false;
    //Check for final roll and unlock
    rollNum = 1;
    score[turn-1].value(turnScore);
    turnScore = 0;
    turn ++;
    for (i = 0; i < 6; i++) {
        lock[i] = false;
        if (d[i] == 6) {
            d[i] = 5;
        }
    }
    //Roll Unlocked Dice
    rollTimer = 60;
    //Update Button Text
    document.querySelector('#btn-1').innerHTML = 'Roll 1';
}

function resetClicked() {
    rollNum = 0; turn = 0; turnScore = 0;
    swappingDice = false; swapTo = 0; selectSwapResource = false;
    document.querySelector('#btn-1').innerHTML = 'Roll ';
    for (i = 0; i < 6; i++) {lock[i] = false; d[i] = 5}
    for (i = 0; i < 15; i++) { score[i].value('') }
    for (i in objects) { objects[i].active = false; }
    for (i in resObjects) { resObjects[i].mode = 0; }    
}

/////////////////////////////CALCULATION/////////////////////////////
function Random() { return Math.floor(Math.random()*6); } // Random number between 0 and 5

function resCalc() {
    resCount = [0, 0, 0, 0, 0, 0];
    for (i = 0; i < 6; i ++) {
        switch (d[i]) {
            case 0:
                resCount[0] += +1;
                break;
            case 1:
                resCount[1] += 1;
                break;
            case 2:
                resCount[2] += 1;
                break;
            case 3:
                resCount[3] += 1;
                break;
            case 4:
                resCount[4] += 1;
                break;
            case 5:
                resCount[5] += 1;
                break;
        }
    }
}

function calcFinalScore() {
    finalScore = 0;
    for (i = 0; i < 15; i++) {
        if (score[i].value() == 0) { finalScore = finalScore - 2; } else { finalScore += +score[i].value() }
    }
}


/////////////////////////////FUNCTIONAL/////////////////////////////
function rollDice() {
    if (rollTimer > 0) {
        rollTimer--;
        if (rollTimer % 5 ==0) {
            for (i = 0; i < 6; i++) { if (lock[i]==false && d[i] != 6) {d[i] = Random();} }
        }
    }
}

function swapGold(res) {
    for (i in d) {
        if (d[i] == 5) {
            d[i] = res;
            break;
        }
    }
    for (i in d) {
        if (d[i] == 5) {
            d[i] = 6;
            break;
        }
    }
}

function deleteRes(type) {
    switch (type) {
        case 0:
            delRes(0);
            delRes(1);
            break;
        case 1:
            delRes(2);
            delRes(3);
            delRes(4);
            break;
        case 2:
            delRes(0);
            delRes(1);
            delRes(2);
            delRes(3);
            break;
        case 3:
            delRes(3);
            delRes(3);
            delRes(4);
            delRes(4);
            delRes(4);
        default:
            break;
    }
}

function delRes(type) {
    for (i in d) {
        if (d[i] == type) {
            d[i] = 6;
            break;
        }
    }
}

/////////////////////////////CHECKS/////////////////////////////
function isBuildable(type) {
    switch (type) {
        case 0:
            if (resCount[0] != 0 && resCount[1] != 0) {
                return true;
            }
            else {
                return false;
            }
        case 1:
            if (resCount[2] != 0 && resCount[3] != 0 && resCount[4] != 0) {
                return true;
            }
            else {
                return false;
            }
        case 2:
            if (resCount[0] != 0 && resCount[1] != 0 && resCount[2] != 0 && resCount[3] != 0) {
                return true;
            }
            else {
                return false;
            }
        case 3:
            if (resCount[3] >= 2 && resCount[4] >= 3) {
                return true;
            }
            else {
                return false;
            }
    }
}

/////////////////////////////MOUSE HOVER/////////////////////////////
function diceHover(arg1) {
    if (mouseX > diceXStart + (arg1 * imgOS) && mouseX < imgOS + (arg1 * imgOS))
        { return true;   }
    else { return false; }
}

function objectHover() {
    if (mouseX < objects[i].x + 10 && mouseX > objects[i].x -10 &&
        mouseY < objects[i].y +10 && mouseY > objects[i].y -10)
        { return true;  }
        else { return false; }
}

function goldHover() {
    if (mouseX < goldObjects[i].x + diceImages[goldObjects[i].type].width/4 &&
        mouseX > goldObjects[i].x -diceImages[goldObjects[i].type].width/4 &&
        mouseY < goldObjects[i].y +diceImages[goldObjects[i].type].height/4 &&
        mouseY > goldObjects[i].y -diceImages[goldObjects[i].type].height/4)
         { return true;  }
    else { return false; }
}

function knightHover() {
    if (mouseX < objects[resObjects[i].parentObject-1].x + 10 && mouseX > objects[resObjects[i].parentObject-1].x - 10 &&
        mouseY < objects[resObjects[i].parentObject-1].y + 50 && mouseY > objects[resObjects[i].parentObject-1].y + 30)
         { return true;  }
    else { return false; }
}

/////////////////////////////DRAW FUNCTIONS/////////////////////////////
function drawObjects() {
    for (i in resObjects) {
        resObjects[i].draw();
    }
    for (i in objects) {
        objects[i].draw();
    }
    for (i in goldObjects) {
        goldObjects[i].draw();
    }
}

function drawInfo() {
    push();
    stroke(255);
    fill(128,128,0);
    strokeWeight(2);
    textAlign(CENTER);
    textSize(24);
    if (selectSwapResource == true) {
        text("SELECT RESOURCE", 783, 200);
    }
    else if (swappingDice == true) {
        text("SELECT DICE", 783, 200);
    }
    else {
        text("GOLD TRADE", 783, 200);
    }
    pop();
}

function drawBoard() {
    background(0);
    image(board, 200, 180, board.width*1.3, board.height*1.3);
}

function drawFinalScore() {
    if (score[14].value() != '') {
        stroke(0);
        fill(0);
        textSize(16);
        textAlign(CENTER);
        calcFinalScore();
        text(str(finalScore), 621, 412);
    }
}

function drawDice() {
    for (i = 0; i < 6; i++) {
        //Dice
        image(diceImages[d[i]], diceXStart + (i * imgOS), 20, 145);
        //Locks
        if (lock[i]==true) {
            image(lockImg, lockXStart + (i * imgOS), 150);
        }
    }
}

function drawBuildableImages() {
    if (resCount[0] != 0 && resCount[1] != 0) {
        image(blankRoadRed, 237 - (blankRoad.width/2), 276 - (blankRoad.height/2),
        blankRoad.width*1.3, blankRoad.height*1.3);
    }
    if (resCount[2] != 0 && resCount[3] != 0 && resCount[4] != 0) {
        image(blankKnightRed, 237 - (blankKnight.width/2), 316 - (blankKnight.height/2),
        blankKnight.width*1.3, blankKnight.height*1.3);
    }
    if (resCount[0] != 0 && resCount[1] != 0 && resCount[2] != 0 && resCount[3] != 0) {
        image(blankSetRed, 237 - (blankSet.width/2), 357  - (blankSet.height/2),
        blankSet.width*1.3, blankSet.height*1.3);
    }
    if (resCount[3] >= 2 && resCount[4] >= 3) {
        image(blankCityRed, 236 - (blankCity.width/2), 399  - (blankCity.height/2),
        blankCity.width*1.3, blankCity.height*1.3);
    }
}

/////////////////////////////LOAD FUNCTIONS/////////////////////////////
function allowHTMLButtons() {
    document.getElementById('btn-0').addEventListener("click", roll0Clicked);
    document.getElementById('btn-1').addEventListener("click", rollClicked);
    document.getElementById('btn-2').addEventListener("click", resetClicked);
}

function createInputs() {
    for (i = 0; i < 15; i++) {
        score[i] = createInput();
        score[i].parent("main-container");
        if (i < 5) {score[i].position(707 + (33.3*i), 267);}
        else if (i < 6) {score[i].position(707 + (33.3*4), 267 + 33.5);}
        else if (i < 11) {score[i].position(1040 - (33.3*(i)), 267 + 67);}
        else if (i < 12) {score[i].position(707, 267 + 67 + 33);}
        else {score[i].position(707 + (33.3*(i-12)), 267 + 133.5);}
        score[i].size(30);
    }
}

function loadImages() {
    wood = loadImage('Images/wood.png'); brick = loadImage('Images/brick.png');
    wheat = loadImage('Images/wheat.png'); sheep = loadImage('Images/sheep.png');
    ore = loadImage('Images/ore.png'); gold = loadImage('Images/gold.png');
    lockImg = loadImage('Images/lock.png'); board = loadImage('Images/board.jpeg');
    blankRoad = loadImage('Images/blankRoad.png'); blankRoadRed = loadImage('Images/blankRoadRed.png');
    blankKnight = loadImage('Images/blankKnight.png'); blankKnightRed = loadImage('Images/blankKnightRed.png');
    blankSet = loadImage('Images/blankSettlement.png'); cross = loadImage('Images/cross.png');
    blankSetRed = loadImage('Images/blankSettlementRed.png');
    blankCity = loadImage('Images/blankCity.png'); blankCityRed = loadImage('Images/blankCityRed.png');
    blankRoadGreen = loadImage('Images/blankRoadGreen.png');
    blankKnightGreen = loadImage('Images/blankKnightGreen.png');
    blankSetGreen = loadImage('Images/blankSettlementGreen.png');
    blankCityGreen = loadImage('Images/blankCityGreen.png');
    diceImages = [wood, brick, sheep, wheat, ore, gold, cross];
}

function loadDice() {
    for (i = 0; i < 6; i++) { d.push(5); lock.push(false); } //Set up initial dice values and set to unlocked
}

function loadObjects() {
    //(type, img, img2, img3, x, y, rot, id, parentId, parentId2, score)
    objects[0] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 368, 633, 120, 1, 0, 0, 1);
    objects[1] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 315, 660, 0, 2, 1, 0, 1);
    objects[2] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 368, 693, 58, 3, 1, 0, 1);
    objects[3] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 368, 773, 120, 4, 3, 0, 1);
    objects[4] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 315, 800, 0, 5, 4, 0, 1);
    objects[5] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 370, 829, 58, 6, 4, 0, 1);
    objects[6] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 438, 867, 0, 7, 6, 0, 1);
    objects[7] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 490, 840, 120, 8, 7, 0, 1);
    objects[8] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 490, 759, 58, 9, 8, 0, 1);
    objects[9] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 488, 701, 120, 10, 9, 0, 1);
    objects[10] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 490, 619, 58, 11, 10, 0, 1);
    objects[11] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 491, 558, 120, 12, 11, 0, 1);
    objects[12] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 557, 797, 0, 13, 8, 0, 1);
    objects[13] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 608, 769, 120, 14, 13, 0, 1);
    objects[14] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 608, 689, 58, 15, 14, 0, 1);
    objects[15] = new ClickableObject(0, blankRoad, blankRoadRed, blankRoadGreen, 608, 629, 120, 16, 15, 0, 1);
    objects[16] = new ClickableObject(1, blankKnight, blankKnightRed, blankKnightGreen, 313, 550, 0, 17, 0, 0, 1);
    objects[17] = new ClickableObject(1, blankKnight, blankKnightRed, blankKnightGreen, 313, 690, 0, 18, 17, 0, 2);
    objects[18] = new ClickableObject(1, blankKnight, blankKnightRed, blankKnightGreen, 433, 759, 0, 19, 18, 0, 3);
    objects[19] = new ClickableObject(1, blankKnight, blankKnightRed, blankKnightGreen, 553, 692, 0, 20, 19, 0, 4);
    objects[20] = new ClickableObject(1, blankKnight, blankKnightRed, blankKnightGreen, 553, 554, 0, 21, 20, 0, 5);
    objects[21] = new ClickableObject(1, blankKnight, blankKnightRed, blankKnightGreen, 434, 480, 0, 22, 21, 0, 6);
    objects[22] = new ClickableObject(2, blankSet, blankSetRed, blankSetGreen, 388, 587, 0, 23, 0, 0, 3);
    objects[23] = new ClickableObject(2, blankSet, blankSetRed, blankSetGreen, 388, 732, 0, 24, 23, 3, 4);
    objects[24] = new ClickableObject(2, blankSet, blankSetRed, blankSetGreen, 397, 865, 0, 25, 24, 6, 5);
    objects[25] = new ClickableObject(2, blankSet, blankSetRed, blankSetGreen, 514, 798, 0, 26, 25, 8, 7);
    objects[26] = new ClickableObject(2, blankSet, blankSetRed, blankSetGreen, 510, 660, 0, 27, 26, 10, 9);
    objects[27] = new ClickableObject(2, blankSet, blankSetRed, blankSetGreen, 510, 515, 0, 28, 27, 12, 11);
    objects[28] = new ClickableObject(3, blankCity, blankCityRed, blankCityGreen, 265, 653, 0, 29, 0, 2, 7);
    objects[29] = new ClickableObject(3, blankCity, blankCityRed, blankCityGreen, 265, 795, 0, 30, 29, 5, 12);
    objects[30] = new ClickableObject(3, blankCity, blankCityRed, blankCityGreen, 629, 728, 0, 31, 30, 14, 20);
    objects[31] = new ClickableObject(3, blankCity, blankCityRed, blankCityGreen, 626, 585, 0, 32, 31, 16, 30);
    resObjects[0] = new ResObject(0, 17, 4);
    resObjects[1] = new ResObject(1, 18, 3);
    resObjects[2] = new ResObject(2, 19, 2);
    resObjects[3] = new ResObject(3, 20, 0);
    resObjects[4] = new ResObject(4, 21, 1);
    resObjects[5] = new ResObject(5, 22, 5);
    goldObjects[0] = new GoldObject(0, 783, 250);
    goldObjects[1] = new GoldObject(1, 783, 313);
    goldObjects[2] = new GoldObject(2, 783, 376);
    goldObjects[3] = new GoldObject(3, 783, 439);
    goldObjects[4] = new GoldObject(4, 783, 502);
}