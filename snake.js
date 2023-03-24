// Отримуємо елемент canvas зі сторінки
const canvas = document.getElementById("canvas");

// Отримуємо контекст малювання для canvas
const ctx = canvas.getContext("2d");

// Визначаємо розмір клітинки та кількість клітинок на полі гри
const cellSize = 10;
const cellsCount = canvas.width / cellSize;

// Визначаємо початкові значення для змійки та їжі
let snake = [{ x: 0, y: 0 }];
let direction = "right";
let food = generateFood();

// Головний цикл оновлення гри
function update() {
  // Очищаємо поле гри
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Рухаємо змійку
  let head = { x: snake[0].x, y: snake[0].y };
  switch (direction) {
    case "right":
      head.x += cellSize;
      break;
    case "left":
      head.x -= cellSize;
      break;
    case "up":
      head.y -= cellSize;
      break;
    case "down":
      head.y += cellSize;
      break;
  }

  // Додаємо нову голову змійки
  snake.unshift(head);

  // Перевіряємо, чи з'їла змійка їжу
  if (head.x === food.x && head.y === food.y) {
    // Генеруємо нову їжу
    food = generateFood();
  } else {
    // Видаляємо хвіст змійки
    snake.pop();
  }

  // Малюємо змійку та їжу на полі гри
  drawSnake();
  drawFood();

  // Перевіряємо, чи зіткнулася змійка зі стінкою або з собою
  if (checkCollision()) {
    // Кінець гри
    alert("Game Over!");
    location.reload();
  } else {
    // Продовжуємо оновлення гри
    setTimeout(update, 100);
  }
}

// Генеруємо нову їжу на полі гри
function generateFood() {
  let x = Math.floor(Math.random() * cellsCount) * cellSize;
  let y = Math.floor(Math.random() * cellsCount) * cellSize;
  return { x, y };
}

// Малюємо змійку на полі гри
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "#00ff00";
    ctx.fillRect(segment.x, segment.y, cellSize, cellSize);
  });
}

// Малюємо їжу на полі гри
function drawFood() {
  ctx.fillStyle = "#ff0000";
  ctx.fillRect(food.x, food.y, cellSize, cellSize);
}

// Перевіряємо, чи зіткнулася змійка зі стінкою або з собою
function checkCollision() {
  let head = snake[0];

  // Перевіряємо зіткнення зі стінкою
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    return true;
  }

  // Перевіряємо зіткнення з собою
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

// Обробляємо клавіші для зміни напрямку руху змійки
document.addEventListener("keydown", (event) => {
  switch (event.keyCode) {
    case 37:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 38:
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 39:
      if (direction !== "left") {
        direction = "right";
      }
      break;
    case 40:
      if (direction !== "up") {
        direction = "down";
      }
      break;
  }
});

// Запускаємо гру
update();
