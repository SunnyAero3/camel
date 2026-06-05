let count = 0;
let virusMode = false;

const btn = document.getElementById("spawnBtn");
const counter = document.getElementById("counter");
const sound = document.getElementById("sound");

// 🐫 generate camel
btn.onclick = () => {
  spawnCamel();

  count++;
  counter.innerText = "Camels: " + count;

  if (count === 10 && !virusMode) {
    activateVirusMode();
  }
};

// 🐫 FAST camel spawn (UNCHANGED LOGIC)
function spawnCamel() {
  const img = document.createElement("img");
  img.src = "camel.png";

  img.style.position = "absolute";
  img.style.left = Math.random() * window.innerWidth + "px";
  img.style.top = (120 + Math.random() * (window.innerHeight - 120)) + "px";

  img.setAttribute("width", "120");
  img.setAttribute("height", "120");

  img.style.width = "120px";
  img.style.height = "auto";
  img.style.maxWidth = "120px";
  img.style.maxHeight = "120px";

  document.body.appendChild(img);
}

// 💀 virus mode (UNCHANGED)
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

// 🪟 spawn window (ONLY AERO FIX)
function spawnWindow() {
  const win = document.createElement("div");

  // 💎 REQUIRED FOR 7.CSS AERO
  win.className = "window glass active";

  win.style.position = "absolute";
  win.style.left = Math.random() * (window.innerWidth - 250) + "px";
  win.style.top = Math.random() * (window.innerHeight - 200) + "px";

  win.innerHTML = `
    <div class="title-bar">
      <div class="title-bar-text">Camel.exe</div>

      <div class="title-bar-controls">
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
    win.remove();

    for (let i = 0; i < 6; i++) {
      spawnWindow();
    }
  };

  document.getElementById("windowArea").appendChild(win);

  enableDrag(win);
}

// 🖱️ drag system (UNCHANGED)
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
