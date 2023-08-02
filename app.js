const topLeft = document.querySelector('.topleft');
const topRight = document.querySelector('.topright');
const bottomLeft = document.querySelector('.bottomleft');
const bottomRight = document.querySelector('.bottomright');

const getRandomPanel = () =>{
    const panels = [
        topLeft,
        topRight,
        bottomLeft,
        bottomRight
    ];

    return panels[parseInt(Math.random()*panels.length)]
};

const sequence = [ getRandomPanel() ];
let sequenceToGuess = [...sequence];

const flash = (panel) =>{
    return new Promise((resolve, reject)=>{
        panel.className += ' active';
        setTimeout(()=>{
            panel.className = panel.className.replace('active', '');
            setTimeout(()=>{resolve()}, 250);
        },750);
    });
};

let canClick = false;
let score = 0;

let scoreDisplayElement = document.getElementById("scoreDisplay");
scoreDisplayElement.textContent = score;

const panelClicked = panel =>{
    if (!canClick){return};
    console.log(panel);
    const expectedPanel = sequenceToGuess.shift();
    if (expectedPanel === panel){
        if (sequenceToGuess.length === 0){
            score+=1;
            scoreDisplayElement.textContent = score;
            sequence.push(getRandomPanel());
            sequenceToGuess=[...sequence];
            startFlashing();
        }
    }else{ 
        alert('Game Over! \nLevel Score : ' + score);
        score=0;
        scoreDisplayElement.textContent = score;
    }
};


const startFlashing = async() =>{
    canClick=false;
    for (let panel of sequence){
        await flash(panel);
    };
    canClick = true;
}
