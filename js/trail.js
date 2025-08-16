const canvas = document.getElementById('trailCanvas');
const ctx = canvas.getContext('2d');

// 高分屏处理
function resizeCanvas() {
  const dpr = Math.max(1, window.devicePixelRatio || 1);
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}
window.addEventListener('resize', resizeCanvas, { passive: true });
resizeCanvas();

let lastX = null, lastY = null;

// 画线
function drawTo(x, y) {
  ctx.globalCompositeOperation = 'source-over';
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2.5;
  ctx.strokeStyle = 'rgba(255,255,255,1)';
  ctx.shadowBlur = 8;
  ctx.shadowColor = '#ffffff';

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  ctx.lineTo(x, y);
  ctx.stroke();
}

// 恒定渐隐擦除
const fadeStrength = 0.06; // 越大消退越快 (0.03~0.12)
function fade() {
  ctx.save();
  ctx.globalCompositeOperation = 'destination-out';
  ctx.fillStyle = `rgba(0,0,0,${fadeStrength})`;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  requestAnimationFrame(fade);
}
fade();

// 鼠标/触摸事件
function update(e) {
  const x = e.clientX;
  const y = e.clientY;
  if (lastX != null && lastY != null) drawTo(x, y);
  lastX = x;
  lastY = y;
}
function reset() {
  lastX = null;
  lastY = null;
}

window.addEventListener('pointermove', update, { passive: true });
window.addEventListener('pointerdown', update, { passive: true });
window.addEventListener('pointerup', reset, { passive: true });
window.addEventListener('pointerleave', reset, { passive: true });
