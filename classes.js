/////////////////////////////CLASSES/////////////////////////////
class ClickableObject {
    constructor(type, img, img2, img3, x, y, rot, id, parentObject, parentObject2, sc) {
        this.type = type; this.img = img; this.img2 = img2; this.img3 = img3;
        this.x = x; this.y = y; this.rot = rot;
        this.id = id; this.parentObject = parentObject; this.parentObject2 = parentObject2;
        this.sc = sc;
        this.active = false;
        this.imgCurrent = img;
    }

    draw() {
        push();
        if (this.active == true) {
            this.imgCurrent = this.img2;
        }
        else if (this.checkActiveParents() && isBuildable(objects[i].type)) {
            this.imgCurrent = this.img3;
        }
        else {
            this.imgCurrent = this.img;
        }
        translate(this.x, this.y);
        imageMode(CENTER);
        rotate(this.rot);
        if (objectHover() && this.active == false && this.checkActiveParents() == true &&
            isBuildable(objects[i].type) == true && rollNum != 0) {
            if (this.type==2 || this.type==3) { image(this.imgCurrent, 0, 0, this.img.width*1.8, this.img.height*1.8); }
            else { image(this.imgCurrent, 0, 0, this.img.width*2.5, this.img.height*2.2); }
            textSize(14);
        }
        else {
            if (this.type==2 || this.type==3) { image(this.imgCurrent, 0, 0, this.img.width*1.5, this.img.height*1.5); }
            else { image(this.imgCurrent, 0, 0, this.img.width*2, this.img.height*1.8); }
            textSize(12);
        }
        stroke(0);
        fill(0);
        textAlign(CENTER);
        if (this.type==0) { rotate(-90); text(this.sc, 0, 4);}
        else if (this.type==1 || this.type==2) { text(this.sc, 0, 10); }
        else { text(this.sc, 5, 11); }
        pop();
    }

    checkActiveParents() {
        if ((this.parentObject == 0 || objects[this.parentObject-1].active == true)
        &&  (this.parentObject2 == 0 || objects[this.parentObject2-1].active == true)) {
            return true;
        }
        else {
            return false;
        }
    }
}

class ResObject {
    constructor(id, parentObject, resType) {
        this.id = id; this.parentObject = parentObject;
        this.resType = resType;
        this.mode = 0;
    }

    draw() {
        //Activate
        if (objects[this.parentObject-1].active == true && this.mode == 0) {
            this.mode = 1;
        }
        if (this.mode == 1 || this.mode ==2) {
            push();
            noFill();
            if ((knightHover() && this.mode == 1) || (this.mode == 2 && (swappingDice == true && swapTo == this.resType)
             ||  (selectSwapResource == true))) {
                strokeWeight(12);
            }
            else {
                strokeWeight(6);
            }
            if (this.mode == 1) { stroke(0, 255, 0); }
            else { stroke(255, 0, 0); }
            circle(objects[this.parentObject-1].x, objects[this.parentObject-1].y+40, 43);
            pop();
        }
    }
}

class GoldObject {
    constructor(type, x, y) {
        this.type = type;
        this.x = x; this.y = y;
    }

    draw() {
        push();
        translate(this.x, this.y);
        imageMode(CENTER);
        if (goldHover() && (resCount[5] > 1 || selectSwapResource == true)) {
            image(diceImages[this.type], 0, 0, diceImages[this.type].width/1.8, diceImages[this.type].height/1.8);
            }
        else {
            image(diceImages[this.type], 0, 0, diceImages[this.type].width/2, diceImages[this.type].height/2);
        }
        pop();
    }
}

