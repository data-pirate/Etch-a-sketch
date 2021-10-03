/***
 * Author: Damanpreet singh
 * Dated: Oct 3, 2021
 * Project: Etch-A-Sketch
 * Summary: The project works as a drawing pad
 *          when someone hovers over a box it is
 *          filled with the color selected
 */


/** Global Declarations
 * container: It is the central part which contains the drawing pad
 * slider: Range slider to adjust the size of the drawing pad
 * colorBox: Container for all the colors available
 * otherUtils: Tools present ont the Right side of the window
 * activeColor: set to none initially, will be the color to be filled in the box
**/ 
const container = document.querySelector(".container");
const slider = document.querySelector("#slider");
const colorBox = document.querySelector(".colors");
const otherUtils = document.querySelector(".other-utils");
var activeColor = "";

// whenever some one slides the slider the value is updated and shown at the tooltio
slider.addEventListener("input", makeGridAndUpdateTooltip);

/**
 * function `makeGridAndUpdateTooltip`
 * gets the value of the slider
 * updates the grid accordingly and updates in the tooltip too
 */
function makeGridAndUpdateTooltip(){
    const val = Number(slider.value);
    makeGrid(val);
    document.querySelector("#number").textContent = val;
}

/**
 * function `makeGrid`
 * @param {integer} count Count of the cells to be inserted into the box
 * makes and updates the grid based upon the selection of the cells
 */
function makeGrid(count){
    // remover all the cubes already present or they will clash with each other
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    // create a div
    let div = document.createElement("div");
    div.setAttribute("class", "cube");
    //adjust its height and width so it fits perfectly in the box
    div.style.height = `${container.clientHeight / count}px`;
    div.style.width = `${container.clientWidth / count}px`;
    for(let i = 0; i < count * count; i++){
        // append it to the parent
        container.appendChild(div.cloneNode(true));
    }
    
    // set Event listener to all the cubes
    let allDivs = document.querySelectorAll(".cube");
    allDivs.forEach(each => each.addEventListener("mouseenter", colorIt));
}

/**
 * function `colorIt`
 * @param {object} event will contain all information about the event 
 * fills the target cube with active color
 */
function colorIt(e){
    e.target.style.backgroundColor = activeColor;
}


/**
 * function `addColorsToBox`
 * creates the colors box
 */
function addColorsToBox(){
    // create a div
    let colorCube = document.createElement("div");
    colorCube.setAttribute("class", "color-cube");
    // adjust its height and width accordingly to the parent
    colorCube.style.height = `${colorBox.clientHeight / 5}px`;
    colorCube.style.width = `${colorBox.clientWidth / 5}px`;
    for(let i = 0; i < 25; i++){
        // get a random color, set it and append the div to parent
        colorCube.style.backgroundColor = randomColor();
        colorBox.appendChild(colorCube.cloneNode(true));
    }
    
    // select the first color cube and set as active
    let first = document.querySelector(".color-cube");
    first.classList.add("active");
    first.style.backgroundColor = "rgb(88, 75, 133)";
    // set the current active color
    activeColor = document.querySelector(".active").style.backgroundColor;
}

/**
 * function `randomColor`
 * make a random color and return it
 * @returns {string} color string
 */
function randomColor(){
    let color = "#";
    for(let i = 0; i < 3; i++){
        color += Math.floor(Math.random() * 17).toString(16);
    }
    return color;
}

/**
 * add event listener to the tools present on the right
 * and preform the task accordingly
 */
otherUtils.addEventListener("click", e =>{
    // if it is a color cube then set the active class and color
    // if eraser is clicked set active color to transparent to erase the contents
    // pencil, as one would require to click pencil to draw again
    // clear, as the name suggests clears alll te cells
    if(e.target.classList.contains("color-cube")){
        toggleActiveClass(e.target, document.querySelector(".active"));
    }else if(e.target.id === "eraser"){
        activeColor = "transparent";
    }else if(e.target.id === "pencil"){
        activeColor = document.querySelector(".active").style.backgroundColor;
    }else if(e.target.id === "clear"){
        makeGrid(slider.value);
    }
});

/**
 * function `toggleActiveClass`
 * @param {Node} active currently selected color
 * @param {Node} prevActive prev selected color
 * removes the active state from the previously selected color
 * and adds it to the new selecteds
 */
function toggleActiveClass(active, prevActive){
    prevActive.classList.remove("active");
    active.classList.add("active");
    activeColor = active.style.backgroundColor;
}


// once the site loads add content
makeGrid(16); 
addColorsToBox();