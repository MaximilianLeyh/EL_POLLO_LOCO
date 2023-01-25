let canvas;
let world;
let keyboard;


/**
 * loading canvas by visiting the page
 */
function init() {
    canvas = document.getElementById('canvas');
}


/**
 * Starting the game after clicking the start-button
 */
function startGame() {
  initLevel();
  keyboard = new Keyboard();
  world = new World(canvas, keyboard);
  setTimeout(()=>{
    addMenuButtons();
    document.getElementById('hud').classList.add('d-flex');
  }, 1000);
}


/**
 * menu buttons within the game
 */
function addMenuButtons(){
  hideElement('startContainer');
  document.getElementById('menuButtonLine').classList.add('gameMenuButtonLine');
}


/**
 * settings button by startscreen
 */
function settings(){
   hideElementAnimated('controlMenu');
   showElementAnimated('settingsMenu');
}


/**
 * Within the game you can restart the game whenever you want
 */
function GoBackToStartScreen() {
  document.location.reload();
}


/**
 * control button by startscreen
 */
function control(){
   hideElementAnimated('settingsMenu');
   showElementAnimated('controlMenu');
}


/**
 * close button
 */
function closeMenu(){
   hideElementAnimated('settingsMenu');
   hideElementAnimated('controlMenu');
}


function doNotClose(event){
   event.stopPropagation();
}


/* Functions for hiding the elements by clicking the start-button*/

/**
 * @param {string} id - ID of an HTML Element 
 */
function showElement(element) {
  document.getElementById(`${element}`).classList.remove('d-none');
}


/**
 * @param {string} id - ID of an HTML Element 
 */
function showElementAnimated(element) {
  document.getElementById(`${element}`).classList.remove('vis-hidden');
  setTimeout(()=>{
      document.getElementById(`${element}`).classList.remove('d-none');
  }, 400)
}


/**
 * 
 * @param {string} id - ID of an HTML Element 
 */
function hideElement(element) {
  document.getElementById(`${element}`).classList.add('d-none');
}


/**
 * 
 * @param {string} id - ID of an HTML Element 
 */
function hideElementAnimated(element) {
  document.getElementById(`${element}`).classList.add('vis-hidden');
  setTimeout(()=>{
      document.getElementById(`${element}`).classList.add('d-none');
  }, 400)
}


/**
 * on/off sound
 * @returns boolean
 */
function soundOn(){
  return document.getElementById('soundToggle').checked;
}


/**
 * on/off music
 * @returns boolean
 */
function musicOn(){
  return document.getElementById('musicToggle').checked;
}


/**
 * open fullscreen
 */
function fullscreen() {
  let container = document.getElementById('container');
  container.requestFullscreen();
  document.getElementById('container').classList.add('fullscreen');
  document.getElementById('canvas').classList.add('canvasFullscreen');
  document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: closeFullscreen()`);
  closeMenu();
}


/**
 * close fullscreen
 */
function closeFullscreen() {
  document.exitFullscreen();
  document.getElementById('container').classList.remove('fullscreen');
  document.getElementById('fullscreenButton').setAttribute('onclick', `javascript: fullscreen()`);
}



