document.getElementById("detail-devices-info").onclick = async () => {
  let md = `# 设备信息报告\n\n`;

  /** 🖥 屏幕信息 **/
  md += `## 屏幕\n`;
  md += `- 分辨率: ${screen.width}x${screen.height}\n`;
  md += `- 可用分辨率: ${screen.availWidth}x${screen.availHeight}\n`;
  md += `- 像素密度: ${window.devicePixelRatio}\n`;
  md += `- 色深: ${screen.colorDepth}\n`;
  md += `- 像素深度: ${screen.pixelDepth}\n`;
  md += `- 方向: ${screen.orientation?.type || '未知'}\n\n`;

  /** 🌐 网络信息 **/
  const net = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (net) {
    md += `## 网络\n`;
    md += `- 类型: ${net.effectiveType}\n`;
    md += `- 下行带宽: ${net.downlink} Mbps\n`;
    md += `- RTT 估计: ${net.rtt} ms\n`;
    md += `- 节流模式: ${net.saveData}\n\n`;
  }

  /** 🔋 电池信息 **/
  if (navigator.getBattery) {
    const battery = await navigator.getBattery();
    md += `## 电池\n`;
    md += `- 电量: ${(battery.level * 100).toFixed(0)}%\n`;
    md += `- 充电中: ${battery.charging}\n`;
    md += `- 充满所需时间: ${battery.chargingTime} 秒\n`;
    md += `- 放完所需时间: ${battery.dischargingTime} 秒\n\n`;
  }

  /** 🧠 硬件信息 **/
  md += `## 硬件\n`;
  md += `- CPU 核心数: ${navigator.hardwareConcurrency}\n`;
  md += `- 设备内存(GB): ${navigator.deviceMemory || '未知'}\n`;
  md += `- 最大触摸点数: ${navigator.maxTouchPoints}\n`;
  md += `- 是否触摸屏: ${'ontouchstart' in window}\n\n`;

  /** 🌍 系统/浏览器信息 **/
  md += `## 系统信息\n`;
  md += `- 平台: ${navigator.platform}\n`;
  md += `- 语言: ${navigator.language} (${navigator.languages.join(', ')})\n`;
  md += `- 时区: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n`;
  md += `- 在线状态: ${navigator.onLine}\n`;
  md += `- Cookie 启用: ${navigator.cookieEnabled}\n`;
  md += `- User-Agent: ${navigator.userAgent}\n`;
  md += `- User-Agent 数据: ${navigator.userAgentData ? JSON.stringify(navigator.userAgentData.toJSON()) : '不支持'}\n\n`;

  /** 📅 时间信息 **/
  const now = new Date();
  md += `## 当前时间\n`;
  md += `- 本地时间: ${now.toLocaleString()}\n`;
  md += `- UTC 时间: ${now.toUTCString()}\n`;
  md += `- 时区偏移(分钟): ${now.getTimezoneOffset()}\n\n`;

  /** 🎮 功能支持检测 **/
  md += `## 功能支持\n`;
  md += `- Service Worker: ${'serviceWorker' in navigator}\n`;
  md += `- WebGL: ${!!document.createElement('canvas').getContext('webgl')}\n`;
  md += `- WebGL2: ${!!document.createElement('canvas').getContext('webgl2')}\n`;
  md += `- WebRTC: ${'RTCPeerConnection' in window}\n`;
  md += `- 本地存储: ${'localStorage' in window}\n`;
  md += `- 会话存储: ${'sessionStorage' in window}\n`;
  md += `- IndexedDB: ${'indexedDB' in window}\n`;
  md += `- Push API: ${'PushManager' in window}\n`;
  md += `- Clipboard API: ${'clipboard' in navigator}\n`;
  md += `- 屏幕共享: ${'getDisplayMedia' in (navigator.mediaDevices || {})}\n\n`;

  /** ⏱ 性能信息 **/
  const perf = performance.getEntriesByType('navigation')[0];
  const mem = performance.memory || {};
  md += `## 性能\n`;
  if (perf) {
    md += `- 页面加载耗时: ${(perf.loadEventEnd - perf.startTime).toFixed(2)} ms\n`;
    md += `- DOM 解析耗时: ${perf.domInteractive?.toFixed(2) || '未知'} ms\n`;
  }
  if (mem.jsHeapSizeLimit) {
    md += `- JS 堆限制: ${(mem.jsHeapSizeLimit / 1048576).toFixed(2)} MB\n`;
    md += `- 已分配 JS 堆: ${(mem.totalJSHeapSize / 1048576).toFixed(2)} MB\n`;
    md += `- 已使用 JS 堆: ${(mem.usedJSHeapSize / 1048576).toFixed(2)} MB\n`;
  }
  md += `- 高精度时间支持: ${'now' in performance}\n\n`;

  /** 🎨 Canvas & GPU 信息 **/
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  md += `## 渲染能力\n`;
  md += `- Canvas 2D 支持: ${!!ctx}\n`;
  if (ctx) {
    md += `- Canvas 最大尺寸: ${canvas.width}x${canvas.height}\n`;
  }
  md += `- OffscreenCanvas 支持: ${'OffscreenCanvas' in window}\n`;

  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (gl) {
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      md += `- GPU Vendor: ${gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)}\n`;
      md += `- GPU Renderer: ${gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)}\n`;
    }
  }
  md += `\n`;

  /** 🔊 音频信息 **/
  if ('AudioContext' in window) {
    const ac = new AudioContext();
    md += `## 音频\n`;
    md += `- 采样率: ${ac.sampleRate} Hz\n\n`;
    ac.close();
  }

  /** 📺 媒体能力（示例：H.264 视频） **/
  if (navigator.mediaCapabilities && navigator.mediaCapabilities.decodingInfo) {
    try {
      const mediaInfo = await navigator.mediaCapabilities.decodingInfo({
        type: 'file',
        video: {
          contentType: 'video/mp4; codecs="avc1.42E01E"',
          width: 1920,
          height: 1080,
          bitrate: 8000000,
          framerate: 30
        }
      });
      md += `## 媒体解码能力 (H.264)\n`;
      md += `- 支持: ${mediaInfo.supported}\n`;
      md += `- 流畅: ${mediaInfo.smooth}\n`;
      md += `- 功耗效率: ${mediaInfo.powerEfficient}\n\n`;
    } catch(e) {}
  }

  /** 🔒 隐私声明 **/
  md += `:::center
**隐私声明**：本页面所显示的所有数据仅在本地浏览器中获取与处理，不会与服务器通信或上传任何信息。
:::`;

  // 调用渲染
  renderDirectly(md);
};
