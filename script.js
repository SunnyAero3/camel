let count = 0;
let virusMode = false;

const btn = document.getElementById("spawnBtn");
const counter = document.getElementById("counter");
const sound = document.getElementById("sound");

// 🐫 camel spawn button
btn.onclick = () => {
  spawnCamel();

  count++;
  counter.innerText = "Camels: " + count;

  if (count === 15 && !virusMode) {
    activateVirusMode();
  }
};

// 🐫 camel spawn
function spawnCamel() {
  const img = document.createElement("img");
  img.src = "camel.png";

  img.style.left = Math.random() * window.innerWidth + "px";
  img.style.top = (120 + Math.random() * (window.innerHeight - 120)) + "px";

  document.body.appendChild(img);
}

// 💀 virus mode
function activateVirusMode() {
  virusMode = true;

  sound.volume = 0.6;
  sound.loop = true;
  sound.play();

  setInterval(() => {
    spawnWindow();
  }, 700);
}

// 🪟 windows
function spawnWindow() {
  const win = document.createElement("div");
  win.className = "window active";

  win.style.position = "absolute";
  win.style.left = Math.random() * (window.innerWidth - 250) + "px";
  win.style.top = Math.random() * (window.innerHeight - 200) + "px";

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

  closeBtn.onclick = () => {
    win.remove();

    for (let i = 0; i < 6; i++) {
      spawnWindow();
    }
  };

  document.getElementById("windowArea").appendChild(win);

  enableDrag(win);
}

// 🖱️ drag system (still needed)
function enableDrag(el) {
  const titleBar = el.querySelector(".title-bar");

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  titleBar.style.cursor = "grab";

  titleBar.addEventListener("mousedown", (e) => {
    isDragging = true;

    const rect = el.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    titleBar.style.cursor = "grabbing";
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    titleBar.style.cursor = "grab";
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    el.style.left = (e.clientX - offsetX) + "px";
    el.style.top = (e.clientY - offsetY) + "px";
  });
}
