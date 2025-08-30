// Configurações do Canvas
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const tileSize = 32; // Tamanho de cada "quadrado" do nosso grid
const gameMap = [ // Representação do mapa do quarto (0 = vazio, 1 = parede, 2 = lareira)
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1],
];

// Posições dos elementos
let player = {
    x: 4,
    y: 8,
};

let raven = {
    x: 10,
    y: 4,
};

// Funções de Desenho
function drawGrid() {
    ctx.strokeStyle = '#222';
    for (let x = 0; x < canvas.width; x += tileSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y < canvas.height; y += tileSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function drawMap() {
    for (let row = 0; row < gameMap.length; row++) {
        for (let col = 0; col < gameMap[row].length; col++) {
            const tileType = gameMap[row][col];
            if (tileType === 1) { // Parede
                ctx.fillStyle = '#333';
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else if (tileType === 2) { // Lareira
                ctx.fillStyle = '#964B00';
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            } else { // Chão
                ctx.fillStyle = '#222';
                ctx.fillRect(col * tileSize, row * tileSize, tileSize, tileSize);
            }
        }
    }
}

function drawPlayer() {
    ctx.fillStyle = '#FFF'; // Branco para o jogador
    ctx.fillRect(player.x * tileSize, player.y * tileSize, tileSize, tileSize);
}

function drawRaven() {
    ctx.fillStyle = '#6A0DAD'; // Roxo escuro para o corvo
    ctx.fillRect(raven.x * tileSize, raven.y * tileSize, tileSize, tileSize);
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawMap();
    drawGrid();
    drawPlayer();
    drawRaven();
}

// Lógica do Jogo
document.addEventListener('keydown', (e) => {
    let newX = player.x;
    let newY = player.y;

    if (e.key === 'ArrowUp') newY--;
    if (e.key === 'ArrowDown') newY++;
    if (e.key === 'ArrowLeft') newX--;
    if (e.key === 'ArrowRight') newX++;

    if (newX >= 0 && newX < gameMap[0].length && newY >= 0 && newY < gameMap.length && gameMap[newY][newX] !== 1) {
        player.x = newX;
        player.y = newY;
    }

    render();
});

// Inicialização
function init() {
    canvas.width = gameMap[0].length * tileSize;
    canvas.height = gameMap.length * tileSize;
    render();
}

init();