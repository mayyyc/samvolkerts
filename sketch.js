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
let ratioFace = 904 / 929; // faceWidth / faceHeight
let ratioHand = 842 / 428; // handsWidth / handsHeight
let ratioFaceHand = 904 / 842; //faceWidth / handsWidth
let offsetHand = 126 / 842; // offsetHands / handsWidth
let foodArray = new Array(5);
let foodWidth;
let foodHeight;
let foodX;
let foodY;
let foodRatio = [408 / 312, 349 / 529, 373 / 360, 305 / 401, 224 / 656];
let foodIndex;
let colorArray = new Array(5);
let isDesktop = false;

function preload() {
    foodArray[0] = loadImage('img/burger.png');
    foodArray[1] = loadImage('img/chips.png');
    foodArray[2] = loadImage('img/pizza.png');
    foodArray[3] = loadImage('img/shake.png');
    foodArray[4] = loadImage('img/wrap.png');
    faceImage = loadImage('img/face.png');
    handsImage = loadImage('img/hands.png');
    colorArray[0] = color(150,206,180);
    colorArray[1] = color(255,238,173);
    colorArray[2] = color(255,111,105);
    colorArray[3] = color(255,204,92);
    colorArray[4] = color(170,216,176);
}
function setup() {
    if (windowWidth > windowHeight) isDesktop = true;
    foodIndex = Math.floor(random(0, 5));
  	createCanvas(windowWidth, windowHeight);
    frameRate(30);
    background(colorArray[foodIndex]);
}

function draw() {
    if (isDesktop) { // on desktop
        // 1 - face
        // height = 2/3 windowHeight
        faceHeight = windowHeight * 2 / 3;
        faceWidth = faceHeight * ratioFace;
        // x axis align center
        faceX = (windowWidth - faceWidth) / 2;
        // y axis align bottom
        faceY = windowHeight - faceHeight;
        // load image
        image(faceImage, faceX, faceY, faceWidth, faceHeight);
        // 2 - food
        // width = 1/2 faceWidth
        foodWidth = faceWidth / 2;
        foodHeight = foodWidth / foodRatio[foodIndex];
        foodX = faceX + 1 * faceWidth / 4;
        foodY = faceY + faceHeight / 3;
        image (foodArray[foodIndex], foodX, foodY, foodWidth, foodHeight);
        // 3 - hands
        handsWidth = faceWidth / ratioFaceHand;
        handsHeight = handsWidth / ratioHand;
        // x axis faceX + offset
        handsX = faceX + offsetHand * handsWidth;
        // y axis align bottom
        handsY = windowHeight - handsHeight;
        // load image
        image(handsImage, handsX, handsY, handsWidth, handsHeight);            
    } else { // on mobile
        // align center, bottom
        // width = windowWidth
        image(faceImage, 0, 0);
        image(handsImage, 0, 0);    
    }
}