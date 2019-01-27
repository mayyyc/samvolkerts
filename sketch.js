let bodyImage;
let bodyWidth;
let bodyHeight;
let bodyX;
let bodyY;
let faceImage;
let faceWidth;
let faceHeight;
let faceX;
let faceY;
let handsImage;
let handsWidth;
let handsHeight;
let handsX;
let handsY;
const ratioBody = 968 / 506 // bodyWidth / bodyHeight
const ratioFace = 587 / 592; // faceWidth / faceHeight
const ratioHand = 842 / 428; // handsWidth / handsHeight
const ratioBodyFace = 968 / 587 // bodyWidth / faceWidth
const ratioBodyHand = 968 / 842; //faceWidth / handsWidth
const offsetHand = 126 / 842; // offsetHands / handsWidth
const offsetFaceX = 164 / 587; // offsetFaceX / faceWidth
const offsetFaceY = -423 / 592 // offsetFaceY / faceHeight
let foodArray = new Array(4);
let foodWidth;
let foodHeight;
let foodX;
let foodY;
const foodRatio = [304 / 235, 398 / 478, 451 / 281, 399 / 406];
let foodIndex = 0;
let colorArray = new Array(4);
let isDesktop = false;
const faceAnimation = 10;
let faceAnimationCurrent = 0;
let faceAnimationIncrement = 1;
let isTouching = false;
const fadeInDuration = 15;
let fadeInCurrentCount = 0;
let currentFade;
let isFading = false;
const quoteArray = ["THAT'S WILD.", "FUCK YEAH."];
let quoteIndex = 0;
let quote;
const quoteDisplayDuration = 60;
let quoteDisplayCurrentCount = 0;
let isDisplaying = false;
let quoteFont;
let nameColor;
let nameFont;
let name;
let isNameVisible = true;

function preload() {
    foodArray[0] = loadImage('burger.png');
    foodArray[1] = loadImage('chips.png');
    foodArray[2] = loadImage('pizza.png');
    foodArray[3] = loadImage('wrap.png');
    bodyImage = loadImage('body.png');
    faceImage = loadImage('face.png');
    handsImage = loadImage('hands.png');
    colorArray[0] = color(150,206,180);
    colorArray[1] = color(255,238,173);
    colorArray[2] = color(255,111,105);
    colorArray[3] = color(255,204,92);
    quoteFont = loadFont('RockSalt.ttf');
    nameColor = color(191, 191, 191);
    nameFont = loadFont('Staatliches.ttf');
}
function setup() {
    angleMode(DEGREES);
    ellipseMode(CENTER);
    if (windowWidth > windowHeight) isDesktop = true;
    foodIndex = Math.floor(random(0, 4));
  	createCanvas(windowWidth, windowHeight);
    frameRate(30);
    background(colorArray[foodIndex]);
    quote = new Quote();
    quote.updateQuote();
    quote.updatePosition();
    name = new Name();


    if (isDesktop) { // on desktop
        // 0 - body
        // height = 2/3 windowHeight
        bodyHeight = windowHeight / 3;
        bodyWidth = bodyHeight * ratioBody;
        // x axis align center
        bodyX = (windowWidth - bodyWidth) / 2;
        // y axis align bottom
        bodyY = windowHeight - bodyHeight;
    } else { // on mobile
        // 0 - body
        // width = windowWidth
        bodyWidth = windowWidth;
        bodyHeight = bodyWidth / ratioBody;
        // x axis align center
        bodyX = 0;
        // y axis align bottom
        bodyY = windowHeight - bodyHeight;
    }
    // 1 - face
    faceWidth = bodyWidth / ratioBodyFace;
    faceHeight = faceWidth / ratioFace;
    faceX = bodyX + offsetFaceX * faceWidth;
    faceY = bodyY + offsetFaceY * faceHeight;
    // 2 - food
    foodWidth = bodyWidth * 3 / 5;
    foodHeight = foodWidth / foodRatio[foodIndex];
    foodX = bodyX + bodyWidth / 8;
    foodY = bodyY - bodyHeight / 9;
    // 3 - hands
    handsWidth = bodyWidth / ratioBodyHand;
    handsHeight = handsWidth / ratioHand;
    handsX = bodyX + offsetHand * handsWidth;
    handsY = windowHeight - handsHeight;    
}

function draw() {
    background(colorArray[foodIndex]);

    if (!isNameVisible) {
        name.moveIn();
    }

    name.displayLastName();
    name.displayFirstName();

    if(!isTouching) {
        faceAnimationCurrent += faceAnimationIncrement; 
        if (faceAnimationCurrent % faceAnimation == 0) faceAnimationIncrement = -faceAnimationIncrement;    
    }

    if (keyIsPressed === true) {
        foodIndex = getRandomNoRepeat(0, foodArray.length, foodIndex);
    }
    // load image
    image(bodyImage, bodyX, bodyY, bodyWidth, bodyHeight);
    push();
    translate(faceX, faceY + faceAnimationCurrent / 5);
    rotate(faceAnimationCurrent / 20);
    image(faceImage, 0, 0, faceWidth, faceHeight);
    // image(faceImage, faceX, faceY + faceAnimationCurrent, faceWidth, faceHeight);
    pop();
    image (foodArray[foodIndex], foodX, foodY, foodWidth, foodHeight);
    image(handsImage, handsX, handsY, handsWidth, handsHeight);

    if (isTouching) {
        if (fadeInCurrentCount < fadeInDuration) {
            currentFade = fadeInCurrentCount / fadeInDuration;
            quote.displayDialogBox();
            name.moveOut();
            fadeInCurrentCount ++;    
        } else {
            if (quoteDisplayCurrentCount < quoteDisplayDuration) {
                quote.displayDialogBox();
                quote.displayQuote();
                quoteDisplayCurrentCount ++;    
            } else {
                resetQuotes();
                isNameVisible = false;
            }
        }
    }
}

function deviceShaken() {
    foodIndex = getRandomNoRepeat(0, foodArray.length, foodIndex);
}
function touchStarted() {
    isTouching = true;
}
function touchEnded() {
    resetQuotes();
    isNameVisible = false;
}

function getRandomNoRepeat(min, max, prev) {
    let ran = prev;
    while (ran == prev) {
        ran = Math.floor(random(min, max));
    }
    return ran;
}

function resetQuotes() {
    isTouching = false;
    quoteCurrentCount = 0;
    fadeInCurrentCount = 0;
    quoteDisplayCurrentCount = 0;
    quote.updateQuote();
    quote.updatePosition();
}

class Name {
    constructor() {
        this.xFirstName = windowWidth / 2;
        this.yFirstName = windowHeight / 4;
        this.sizeFirstName = 260;
        this.xLastName = windowWidth / 2;
        this.yLastName = windowHeight / 2.8;
        this.sizeLastName = 100;
        this.strokeWeight = 8;
        if (! isDesktop) {
            this.sizeFirstName = 460;
            this.sizeLastName = 180;
            this.strokeWeight = 12;
            this.yFirstName = windowHeight / 4;
            this.yLastName = windowHeight / 3;
        }
    }
    displayFirstName() {
        fill(255);
        stroke(0);
        strokeWeight(this.strokeWeight);
        textFont(nameFont);
        textAlign(CENTER);
        textSize(this.sizeFirstName);
        text("SAM", this.xFirstName, this.yFirstName);
    }
    displayLastName() {
        fill(255);
        stroke(0);
        strokeWeight(this.strokeWeight);
        textFont(nameFont);
        textAlign(CENTER);
        textSize(this.sizeLastName);
        text("VOLKERTS", this.xLastName, this.yLastName);
    }
    moveOut() {
        if (this.xFirstName >  - windowWidth / 2) {
            this.xFirstName -= windowWidth / fadeInDuration;
            this.xLastName += windowWidth / fadeInDuration; 
        } else {
            isNameVisible = false;
        }
    }
    moveIn() {
        if (this.xFirstName <  windowWidth / 2) {
            this.xFirstName += windowWidth / fadeInDuration; 
            this.xLastName -= windowWidth  / fadeInDuration; 
        } else {
            isNameVisible = true;
        }
    }
}

class Quote {
    constructor() {
        this.x;
        this.y;
        this.size;
        this.quote;
        this.ratio = 0.4;

        this.updateSize();
    }
    displayDialogBox() {
        let faceCenterX = faceX + faceWidth / 2;
        let faceCenterY = faceY + faceHeight / 2;
        let slopeArrow = (faceCenterX - this.x) / (faceCenterY - this.y);
        fill(255);
        stroke(0);
        strokeWeight(5);
        // draw arrow
        beginShape();
        vertex(this.x, this.y);
        vertex(slopeArrow * this.size * this.ratio * currentFade + this.x, this.y + this.size * this.ratio * currentFade);
        vertex(this.x + this.size  * currentFade / 8, this.y);
        endShape();        
        ellipse(this.x, this.y, this.size * currentFade, this.size * this.ratio * currentFade);
    }
    displayQuote() {
        fill(0);
        stroke(2);
        textFont(quoteFont);
        textAlign(CENTER);
        textSize(this.size / 10);
        text(this.quote, this.x, this.y * 1.05);
    }
    updateQuote() {
        quoteIndex = getRandomNoRepeat(0, quoteArray.length, quoteIndex);
        this.quote = quoteArray[quoteIndex];
    }
    updatePosition() {
        if (isDesktop) {
            this.x = random(this.size, windowWidth - this.size);
            this.y = random(this.size * this.ratio / 2, windowHeight / 3 - this.size * this.ratio / 2);    
        } else {
            this.x = random(this.size / 2, windowWidth - this.size / 2);
            this.y = random(this.size  * this.ratio / 2, windowHeight / 3 - this.size  * this.ratio / 2);    
        }
    }
    updateSize() {
        if (isDesktop) {
            this.size = 500;
        } else {
            this.size = 0.8 * windowWidth;
        }
    }
}