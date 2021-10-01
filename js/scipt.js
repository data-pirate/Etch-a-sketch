const container = document.querySelector('.container');
// const textBox = document.querySelector('#txt');

// let val = parseInt(textBox.value);

makeGrid(64);

document.querySelector('#slider').addEventListener('input', (e)=>{
    document.querySelector('#txt').value = e.target.value;
    document.querySelector(".tooltip").style.display = 'block';
    setInterval(removeTooltip, 2000);
});

function removeTooltip(){
    document.querySelector(".tooltip").style.display = 'none'
}


// textBox.addEventListener('input', (e)=>{
//     let count = parseInt(e.target.value);
//     if(count > 64){
//         return;
//     }
//     makeGrid(count);
// });

function colorit(e){
    e.target.style.backgroundColor = 'black';
}



function makeGrid(count){
    while(container.firstChild){
        container.removeChild(container.firstChild);
    }
    let div = document.createElement('div');
    div.setAttribute('class', 'cube');
    div.style.height = `${container.clientHeight / count}px`;
    div.style.width = `${container.clientWidth / count}px`; 
    for(let i = 0; i < count * count; i++){
        container.appendChild(div.cloneNode(true));
    }

    let allDivs = document.querySelectorAll('.cube');
    allDivs.forEach(each => each.addEventListener('mouseenter', colorit));
}