let foodArray = new Array(5);
let faceImage;
let handsImage;

let colorArray = new Array(5);

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
  	createCanvas(windowWidth, windowHeight);
  	frameRate(30);
    background(colorArray[0]);
    image(foodArray[0], 0, 0);
}

function draw() {

}