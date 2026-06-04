let count = 0;
let virusMode = false;

const btn = document.getElementById("spawnBtn");
const area = document.getElementById("camelArea");
const counter = document.getElementById("counter");
const windowArea = document.getElementById("windowArea");
const sound = document.getElementById("sound");

btn.onclick = () => {
  spawnCamel();
  count++;
  counter.innerText = "Camels: " + count;

  if (count === 15 && !virusMode) {
    activateVirusMode();
  }
};

function spawnCamel() {
  const img = document.createElement("img");
  img.src = "camel.png";
  area.appendChild(img);
}

function activateVirusMode() {
  virusMode = true;

  sound.play();

  setInterval(() => {
    spawnWindow();
  }, 700);
}

function spawnWindow() {
  const win = document.createElement("div");
  win.className = "window active";
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
      <p>🐫 camel.exe has taken over</p>
    </div>
  `;

  const closeBtn = win.querySelector("button");

  closeBtn.onclick = () => {
    win.remove();

    for (let i = 0; i < 6; i++) {
      spawnWindow();
    }
  };

  windowArea.appendChild(win);
}
