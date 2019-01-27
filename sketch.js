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
const faceAnimation = 3;
let faceAnimationCurrent = 0;
let faceAnimationIncrement = 1;
let isTouching = false;
const fadeInDuration = 12;
let fadeInCurrentCount = 0;
let isFading = false;
const quoteArray = ["THAT'S WILD.", "FUCK YEAH."];
let quoteIndex = 0;
const quoteMaximum = 3;
let quoteCurrentCount;
let quote;
const quoteDisplayDuration = 9;
let quoteDisplayCurrentCount = 0;
let isDisplaying = false;
let quoteFont;

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
}
function setup() {
    angleMode(DEGREES);
    ellipseMode(CENTER);
    if (windowWidth > windowHeight) isDesktop = true;
    foodIndex = Math.floor(random(0, 4));
  	createCanvas(windowWidth, windowHeight);
    frameRate(6);
    background(colorArray[foodIndex]);
    quote = new Quote(200, 200, 200, quoteArray[0]);
}

function draw() {
    background(colorArray[foodIndex]);

    if(!isTouching) {
        faceAnimationCurrent += faceAnimationIncrement; 
        if (faceAnimationCurrent % faceAnimation == 0) faceAnimationIncrement = -faceAnimationIncrement;    
    }

    if (keyIsPressed === true) {
        foodIndex = getRandomNoRepeat(0, foodArray.length, foodIndex);
    }

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
    // load image
    image(bodyImage, bodyX, bodyY, bodyWidth, bodyHeight);
    push();
    // rotate(faceAnimationCurrent);
    translate(faceX, faceY + faceAnimationCurrent);
    rotate(faceAnimationCurrent / 4);
    image(faceImage, 0, 0, faceWidth, faceHeight);
    // image(faceImage, faceX, faceY + faceAnimationCurrent, faceWidth, faceHeight);
    pop();
    image (foodArray[foodIndex], foodX, foodY, foodWidth, foodHeight);
    image(handsImage, handsX, handsY, handsWidth, handsHeight);

    if (isTouching) {
        if (fadeInCurrentCount < fadeInDuration) {
            quote.displayDialogBox();
            fadeInCurrentCount ++;    
        } else {
            if (quoteDisplayCurrentCount < quoteDisplayDuration) {
                quote.displayDialogBox();
                quote.displayQuote();    
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
    isTouching = false;
}

function getRandomNoRepeat(min, max, prev) {
    let ran = prev;
    while (ran == prev) {
        ran = Math.floor(random(min, max));
    }
    return ran;
}

class Quote {
    constructor(x, y, size, quote) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.quote = quote;
        this.ratio = 1 / 2;
    }
    displayDialogBox() {
        let currentFadeRatio = fadeInCurrentCount / fadeInDuration;
        fill(255);
        stroke(0);
        strokeWeight(4);
        ellipse(this.x, this.y, this.size * currentFadeRatio, this.size * this.ratio * currentFadeRatio);
    }
    displayQuote() {
        fill(0)
        textFont(quoteFont);
        textSize(36);
        text(this.quote, 10, 50);
    }
}