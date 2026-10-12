const canvas = document.querySelector('#board');
const context = canvas.getContext('2d');
const scoreLabel = document.querySelector('#score');
const statusLabel = document.querySelector('#status');
const size = 20;
const cell = canvas.width / size;
const directions = {
  up: { x: 0, y: -1 }, down: { x: 0, y: 1 },
  left: { x: -1, y: 0 }, right: { x: 1, y: 0 },
};
let snake, direction, nextDirection, food, score, running, ended, turned;

function same(a, b) { return a.x === b.x && a.y === b.y; }

function placeFood() {
  const empty = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (!snake.some(part => same(part, { x, y }))) empty.push({ x, y });
    }
  }
  return empty[Math.floor(Math.random() * empty.length)];
}

function draw() {
  context.fillStyle = '#19241c';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#213025';
  for (let i = 1; i < size; i++) {
    context.beginPath();
    context.moveTo(i * cell, 0); context.lineTo(i * cell, canvas.height);
    context.moveTo(0, i * cell); context.lineTo(canvas.width, i * cell);
    context.stroke();
  }
  if (food) {
    context.fillStyle = '#f4a261';
    context.beginPath();
    context.arc(food.x * cell + cell / 2, food.y * cell + cell / 2, 6, 0, Math.PI * 2);
    context.fill();
  }
  snake.forEach((part, index) => {
    context.fillStyle = index === 0 ? '#c4f196' : '#8fc95f';
    context.fillRect(part.x * cell + 2, part.y * cell + 2, cell - 4, cell - 4);
  });
}

function restart() {
  snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  direction = nextDirection = directions.right;
  score = 0; running = ended = turned = false;
  food = placeFood();
  scoreLabel.textContent = score;
  statusLabel.textContent = 'Press an arrow key or tap a direction to start.';
  draw();
}

function steer(name) {
  const next = directions[name];
  if (ended || turned || (next.x === -direction.x && next.y === -direction.y)) return;
  nextDirection = next;
  turned = true;
  running = true;
  statusLabel.textContent = 'Keep going!';
}

function tick() {
  if (!running) return;
  direction = nextDirection;
  turned = false;
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  const eating = same(head, food);
  const body = eating ? snake : snake.slice(0, -1);
  if (head.x < 0 || head.x >= size || head.y < 0 || head.y >= size || body.some(part => same(part, head))) {
    running = false; ended = true;
    statusLabel.textContent = 'Game over. Press Restart to try again.';
    return;
  }
  snake.unshift(head);
  if (eating) {
    scoreLabel.textContent = ++score;
    food = placeFood();
    if (!food) {
      running = false; ended = true;
      statusLabel.textContent = 'You won! The board is full.';
    }
  } else snake.pop();
  draw();
}

document.addEventListener('keydown', event => {
  const name = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right' }[event.key];
  if (name && !event.altKey && !event.ctrlKey && !event.metaKey) {
    event.preventDefault();
    steer(name);
  }
});
document.querySelectorAll('[data-direction]').forEach(button => {
  button.addEventListener('click', () => steer(button.dataset.direction));
});
document.querySelector('#restart').addEventListener('click', restart);
document.addEventListener('visibilitychange', () => {
  if (document.hidden && running) {
    running = false; turned = false;
    statusLabel.textContent = 'Paused. Press a direction to continue.';
  }
});
setInterval(tick, 140);
restart();
