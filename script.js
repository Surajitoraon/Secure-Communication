const terminal = document.getElementById("terminal");

function typeLine(text, speed = 30) {
  return new Promise(resolve => {
    let i = 0;
    let line = document.createElement("div");
    terminal.appendChild(line);

    function typing() {
      if (i < text.length) {
        line.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, speed);
      } else {
        terminal.scrollTop = terminal.scrollHeight;
        resolve();
      }
    }
    typing();
  });
}

async function runCommand() {
  const cmd = document.getElementById("command").value;
  document.getElementById("command").value = "";

  await typeLine("> " + cmd);

  if (cmd === "init") {
    await typeLine("Initializing secure protocol...");
    await typeLine("Generating encryption keys...");
    await typeLine("Secure channel established ✔");
  } 
  else if (cmd === "send") {
    await typeLine("Encrypting packet...");
    await typeLine("Routing through secure nodes...");
    await typeLine("⚠ Intrusion attempt detected!");
    await typeLine("Blocking attacker...");
    await typeLine("Transmission successful ✔");
  } 
  else if (cmd === "clear") {
    terminal.innerHTML = "";
  } 
  else {
    await typeLine("Unknown command");
  }
}

/* MATRIX BACKGROUND */
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const letters = "01";
const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = Array(Math.floor(columns)).fill(1);

function drawMatrix() {
  ctx.fillStyle = "rgba(0,0,0,0.05)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#00ff9d";
  ctx.font = fontSize + "px monospace";

  for (let i = 0; i < drops.length; i++) {
    const text = letters[Math.floor(Math.random() * letters.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975)
      drops[i] = 0;

    drops[i]++;
  }
}

setInterval(drawMatrix, 33);
