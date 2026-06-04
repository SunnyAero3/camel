let count = 0;
let virusMode = false;

const btn = document.getElementById("spawnBtn");
const area = document.getElementById("camelArea");
const counter = document.getElementById("counter");
const windowArea = document.getElementById("windowArea");
const sound = document.getElementById("sound");

// 🐫 camel button
btn.onclick = () => {
  spawnCamel();

  count++;
  counter.innerText = "Camels: " + count;

  if (count === 15 && !virusMode) {
    activateVirusMode();
  }
};

// 🐫 clean camel spawn
function spawnCamel() {
  const img = document.createElement("img");
  img.src = "camel.png";
  img.style.width = "60px";

  area.appendChild(img);
}

// 💀 activate virus mode
function activateVirusMode() {
  virusMode = true;

  // 🔊 stable sound
  sound.volume = 0.6;
  sound.loop = true;
  sound.play();

  // 🪟 start spawning windows
  setInterval(() => {
    spawnWindow();
  }, 700);
}

// 🪟 window spawn (draggable + image)
function spawnWindow() {
  const win = document.createElement("div");
  win.className = "window active";

  win.style.position = "absolute";
  win.style.top = Math.random() * 80 + "%";
  win.style.left = Math.random() * 80 + "%";

  win.innerHTML = `
    <div class="title-bar">
      <div class="title-bar-text">YOU ARE AN IDIOT</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>

    <div class="window-body">
      <img src="camel.png" style="width:120px; display:block; margin:auto;" />
      <p style="text-align:center;">camel.exe has taken over</p>
    </div>
  `;

  const closeBtn = win.querySelector("button");

  // 💥 close = spawn 6 more windows
  closeBtn.onclick = () => {
    win.remove();

    for (let i = 0; i < 6; i++) {
      spawnWindow();
    }
  };

  windowArea.appendChild(win);

  enableDrag(win);
}

// 🖱️ draggable windows (title bar only)
function enableDrag(el) {
  const titleBar = el.querySelector(".title-bar");

  let isDown = false;
  let offsetX = 0;
  let offsetY = 0;

  titleBar.style.cursor = "grab";

  titleBar.onmousedown = (e) => {
    isDown = true;

    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;

    titleBar.style.cursor = "grabbing";
  };

  document.onmouseup = () => {
    isDown = false;
    titleBar.style.cursor = "grab";
  };

  document.onmousemove = (e) => {
    if (!isDown) return;

    el.style.left = (e.clientX - offsetX) + "px";
    el.style.top = (e.clientY - offsetY) + "px";
  };
}
