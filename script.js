let container = document.getElementById('container');
let allBoxes = document.getElementsByClassName('box');
let gridContainer = document.getElementById('allBoxes');
let clearBtn = document.getElementById('clearBtn');
let eraseBtn = document.getElementById('eraseBtn');
let colorBtn = document.getElementById('colorBtn');
let slider = document.getElementById('slider');
let colorPicker = document.getElementById("color-picker")
let rainbowBtn = document.getElementById('rainbowBtn');
let currentMode = 'color';
let currentColor = '#666666';
colorBtn.classList.add('active');

resizeGrid(); //displaying grid first time

slider.addEventListener('click', () => {
    resizeGrid();
});

colorPicker.oninput = (e) => currentColor = e.target.value;

clearBtn.addEventListener('click', clearGrid);

eraseBtn.addEventListener('click', () => {
    currentMode = 'erase';
    colorBtn.classList.remove('active');
    eraseBtn.classList.add('active');
    rainbowBtn.classList.remove('active');
});

colorBtn.addEventListener('click', () => {
    currentMode = 'color';
    colorBtn.classList.add('active');
    eraseBtn.classList.remove('active');
    rainbowBtn.classList.remove('active');
});

rainbowBtn.addEventListener('click', () => {
    currentMode = 'rainbow';
    colorBtn.classList.remove('active');
    eraseBtn.classList.remove('active');
    rainbowBtn.classList.add('active');
})
function colorBox(e) {
    let random = Math.random() + 1000;
    switch (currentMode) {
        case 'color':
            if (e.target.style.backgroundColor === 'white')
                e.target.style.backgroundColor = currentColor;
            break;
        case 'erase':
            e.target.style.backgroundColor = 'white';
            break;
        case 'rainbow':
            if (e.target.style.backgroundColor === 'white')
                e.target.style.backgroundColor = "rgb(" + (Math.random() * random) * 1.2 + "," + (Math.random() * random) * 1.3 + ",40)";
    }

}

function clearGrid(e) {
    Array.from(allBoxes).forEach(box => box.style.backgroundColor = "white");
    currentMode = 'color';
}

function resizeGrid() {
    gridContainer.innerHTML = ` `;
    let slideValue = slider.value;
    for (let i = 0; i < slideValue * slideValue; i++) {
        let box = document.createElement('div');
        box.classList.add('box');
        box.addEventListener('mouseenter', colorBox);
        gridContainer.appendChild(box);
    }
    gridContainer.style.gridTemplateColumns = 'repeat(' + slideValue + ', 1fr)';
    gridContainer.style.gridTemplateRows = 'repeat(' + slideValue + ', 1fr)';
    Array.from(allBoxes).forEach(box => {
        box.style.padding = `${450 / (slideValue * 2)}px`;
    })
    allBoxes = document.getElementsByClassName('box');
    Array.from(allBoxes).forEach(box => box.style.backgroundColor = "white");
}


