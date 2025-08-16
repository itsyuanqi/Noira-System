
(function(){
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");

  let stars = [];
  const starCount = 150; // 粒子数量
  const layers = 3;      // 深度层数
  let w, h;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = [];

    for (let i = 0; i < starCount; i++) {
      const layer = Math.floor(Math.random() * layers) + 1; // 1=近,3=远
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: (layers - layer + 1) * (Math.random() * 0.6 + 0.2), // 半径
        blur: (layer - 1) * 10 + 2, // 模糊
        layer,
        twinkle: Math.random() * 100,
        drift: Math.random() * Math.PI * 2, // 漂移相位
        driftSpeed: 0.002 + Math.random() * 0.002 // 漂移速度
      });
    }
  }

  function draw(){
    ctx.clearRect(0, 0, w, h);

    for (let s of stars) {
      let alpha = 0.3 + 0.2 * Math.sin(s.twinkle);

      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`;

      ctx.shadowColor = 'white';
      ctx.shadowBlur = s.blur;
      ctx.fill();
      ctx.shadowBlur = 0;

      // 往上飘
      s.y -= 0.02 * (layers - s.layer + 1);
      if (s.y < 0) s.y = h;

      // 横向随机偏移（噪声效果）
      s.x += Math.sin(s.drift) * 0.05 * (4 - s.layer); // 近处偏移大，远处小
      if (s.x > w) s.x -= w;
      if (s.x < 0) s.x += w;

      // 更新状态
      s.twinkle += 0.015;
      s.drift += s.driftSpeed;
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  resize();
  draw();
})();