const container = document.querySelector('.container');

const slider = document.querySelector('#slider');

slider.addEventListener('input', makeGridAndUpdateTooltip);

function makeGridAndUpdateTooltip(e){
    const val = Number(slider.value);
    makeGrid(val);
    document.querySelector("#number").textContent = val;
}

makeGrid(16);

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


function colorit(e){
    e.target.style.backgroundColor = 'rgb(88, 75, 133)';
}