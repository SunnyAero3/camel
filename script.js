let count = 0;
let virusMode = false;
const btn = document.getElementById("spawnBtn");
const counter = document.getElementById("counter");
const sound = document.getElementById("sound");

// track all bouncing windows
const bouncingWindows = [];

// animation loop
function animateWindows() {
  for (const w of bouncingWindows) {
    w.x += w.vx;
    w.y += w.vy;

    const maxX = window.innerWidth - w.el.offsetWidth;
    const maxY = window.innerHeight - w.el.offsetHeight;

    if (w.x < 0)    { w.x = 0;    w.vx = Math.abs(w.vx); }
    if (w.y < 0)    { w.y = 0;    w.vy = Math.abs(w.vy); }
    if (w.x > maxX) { w.x = maxX; w.vx = -Math.abs(w.vx); }
    if (w.y > maxY) { w.y = maxY; w.vy = -Math.abs(w.vy); }

    w.el.style.left = w.x + "px";
    w.el.style.top  = w.y + "px";
  }
  requestAnimationFrame(animateWindows);
}
animateWindows();

// 🐫 generate camel
btn.onclick = () => {
  spawnCamel();
  count++;
  counter.innerText = "Camels: " + count;
  if (count === 10 && !virusMode) {
    activateVirusMode();
  }
};

function spawnCamel() {
  const img = document.createElement("img");
  img.src = "camel.png";
  img.style.position = "absolute";
  img.style.left = Math.random() * window.innerWidth + "px";
  img.style.top = (120 + Math.random() * (window.innerHeight - 120)) + "px";
  img.style.width = "120px";
  img.style.height = "auto";
  img.style.maxWidth = "120px";
  img.style.maxHeight = "120px";
  document.body.appendChild(img);
}

function activateVirusMode() {
  virusMode = true;
  sound.volume = 0.3;
  sound.loop = true;
  sound.play();
  let interval = 700;
  function spawnLoop() {
    spawnWindow();
    interval = Math.max(100, interval * 0.97);
    setTimeout(spawnLoop, interval);
  }
  spawnLoop();
}

function randSpeed() {
  const s = 2 + Math.random() * 2;
  return Math.random() < 0.5 ? s : -s;
}

function spawnWindow() {
  const win = document.createElement("div");
  win.className = "window glass active";
  win.style.position = "absolute";

  const startX = Math.random() * (window.innerWidth - 250);
  const startY = Math.random() * (window.innerHeight - 200);
  win.style.left = startX + "px";
  win.style.top  = startY + "px";

  win.innerHTML = `
    <div class="title-bar" style="background-attachment: local;">
      <div class="title-bar-text">Camel.exe</div>
      <div class="title-bar-controls">
        <button aria-label="Minimize"></button>
        <button aria-label="Close"></button>
      </div>
    </div>
    <div class="window-body has-space">
      <img src="camel.png" style="width:120px; display:block; margin:auto;" />
      <p style="text-align:center;">camel.exe has taken over</p>
    </div>
  `;

  const closeBtn = win.querySelector('[aria-label="Close"]');
  closeBtn.onclick = () => {
    const idx = bouncingWindows.findIndex(w => w.el === win);
    if (idx !== -1) bouncingWindows.splice(idx, 1);
    win.remove();
    for (let i = 0; i < 6; i++) spawnWindow();
  };

  const minimizeBtn = win.querySelector('[aria-label="Minimize"]');
  minimizeBtn.onclick = () => {
    const body = win.querySelector(".window-body");
    body.style.display = body.style.display === "none" ? "" : "none";
  };

  document.getElementById("windowArea").appendChild(win);

  const bounceObj = { el: win, x: startX, y: startY, vx: randSpeed(), vy: randSpeed() };
  bouncingWindows.push(bounceObj);

  enableDrag(win, bounceObj);
}

function enableDrag(el, bounceObj) {
  const titleBar = el.querySelector(".title-bar");
  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  titleBar.style.cursor = "grab";

  titleBar.addEventListener("mousedown", (e) => {
    isDragging = true;
    bounceObj.vx = 0;
    bounceObj.vy = 0;
    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;
    titleBar.style.cursor = "grabbing";
  });

  document.addEventListener("mouseup", () => {
    if (!isDragging) return;
    isDragging = false;
    titleBar.style.cursor = "grab";
    bounceObj.vx = randSpeed();
    bounceObj.vy = randSpeed();
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    bounceObj.x = e.clientX - offsetX;
    bounceObj.y = e.clientY - offsetY;
    el.style.left = bounceObj.x + "px";
    el.style.top  = bounceObj.y + "px";
  });
}
