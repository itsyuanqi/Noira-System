document.getElementById("detail-devices-info").onclick = async () => {
  let md = '';

  md += `
:::center
# ────── ⋆⋅☆⋅⋆ ──────
:::
  `

md += `
<div style="display: flex; align-items: center; justify-content: center; border-bottom: 1px solid white; padding:30px 0;">
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; margin-right: 24px;">
    <div style="font-size: 200px; line-height: 1;">🖳</div>
    <div style="font-size: 20px; font-weight: bold;">Noira System</div>
    <div style="font-size: 15px;">ノイラ システム</div>
  </div>
  <div style="display: flex; flex-direction: column; align-items: flex-start;">
    <div style="font-size: 24px; font-weight: bold; margin-bottom: 8px;">Noira Prism</div>
    <div style="margin-bottom: 12px; font-size: 12px; font-style: italic; line-height: 1.4;">
      观察星海的眼睛，捕捉每一丝光影的波动。
    </div>
    <table style="border-collapse: collapse; line-height: 1.5; font-size: 14px;">
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">分辨率</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${screen.width}x${screen.height}（${screen.availWidth}x${screen.availHeight} 可用）</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">像素密度</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${window.devicePixelRatio}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">像素深度</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${screen.pixelDepth}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">色深</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${screen.colorDepth}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px;">方向</td>
      <td style="padding: 4px 12px;">${screen.orientation?.type || '未知'}</td>
    </tr>
  </table>
  </div>
</div>
`;

  /** 🌐 网络信息 **/
  const net = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  md += `
<div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">Starlink Node</div>
  <div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
    量子丝线般的连结，瞬息传递每份信息。
  </div>
<div style="display: flex; border-bottom: 1px solid white; padding: 40px 0; gap: 24px; justify-content: center;">
  <div style="flex: 1 1 220px; padding: 16px; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; display: flex; align-items: center; justify-content: center; gap: 12px; max-width: 200px;">
    <div style="font-size: 48px; line-height: 1;">ᯤ</div>
    <div style="display: flex; flex-direction: column; justify-content: center; ">
      <div style="font-size: 14px; font-weight: bold;">类型</div>
      <div style="font-size: 18px;">${net.effectiveType}</div>
    </div>
  </div>
  <div style="flex: 1 1 300px; display: flex; flex-direction: column; gap: 12px; max-width: 400px;">
    <div style="padding: 16px; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; text-align: center;">
      <div style="font-size: 14px; font-weight: bold; margin-bottom: 6px;">下行带宽</div>
      <div style="font-size: 16px;">${net.downlink} Mbps</div>
    </div>
    <div style="display: flex; gap: 12px;">
      <div style="flex: 1; padding: 16px; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; text-align: center;">
        <div style="font-size: 14px; font-weight: bold; margin-bottom: 6px;">RTT 估计</div>
        <div style="font-size: 16px;">${net.rtt} ms</div>
      </div>
      <div style="flex: 1; padding: 16px; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; text-align: center;">
        <div style="font-size: 14px; font-weight: bold; margin-bottom: 6px;">节流模式</div>
        <div style="font-size: 16px;">${net.saveData}</div>
      </div>
    </div>
  </div>
</div>
`;


  /** 🔋 电池信息 **/
  if (navigator.getBattery) {
    const battery = await navigator.getBattery();md += `
<div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">Stellar Cell</div>
  <div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
    以星海之力为驱动，保持系统稳定
  </div>
<div style="display: flex; justify-content: center; gap: 24px; border-bottom: 1px solid white; padding: 40px 0;">
  <div style="flex: 1 1 300px; padding: 16px; border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; display: flex; flex-direction: column; gap: 12px; align-items: center;">
<div style="font-size: 48px; font-weight: bold; color: ${
      battery.level > 0.7 ? '#00ff88' : battery.level > 0.3 ? '#ffff66' : '#ff6666'
    };">${(battery.level * 100).toFixed(0)}%</div>
<div style="position: relative; width: 100%; height: 24px; background: rgba(255,255,255,0.1); border-radius: 12px; overflow: hidden;">
      <div style="width: ${(battery.level * 100).toFixed(0)}%; height: 100%; background: ${
      battery.level > 0.7 ? '#00ff88' : battery.level > 0.3 ? '#ffff66' : '#ff6666'
    }; transition: width 0.3s;"></div>
    </div>
<div style="display: flex; width: 100%; font-size: 14px; justify-content: center; gap: 30px; margin-top: 8px;">
      <div style="text-align: center;">${battery.charging ? "充电中" : "未充电"}</div>
      <div style="text-align: center;">预计充满时间: ${formatTime(battery.chargingTime)}</div>
      <div style="text-align: center;">预计放完时间: ${formatTime(battery.dischargingTime)}</div>
    </div>
</div>
</div>

\n`;

  }
function formatTime(sec) {
  if (sec === Infinity) return '∞';
  if (sec === 0) return '-';
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return `${h}小时 ${m}分`;
}

  md += `
<div style="padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
<div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">Noira Frame</div>
  <div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
    星海般广阔的承载架构，守护系统稳定运作。
  </div>
  <table style="border-collapse: collapse; font-size: 14px; line-height: 1.5; margin: auto;">
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">CPU 核心数</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2); min-width: 200px;">${navigator.hardwareConcurrency}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">设备内存(GB)</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${navigator.deviceMemory || '未知'}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">最大触摸点数</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${navigator.maxTouchPoints}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px;">是否触摸屏</td>
      <td style="padding: 4px 12px;">${'ontouchstart' in window}</td>
    </tr>
  </table>
</div>
\n`;

  md += `
<div style="padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
  <div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">System Core</div>
  <div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
    系统运行环境与浏览器特征，一览无余。
  </div>
  <table style="border-collapse: collapse; font-size: 14px; line-height: 1.5; margin: auto;">
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">平台</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2); min-width: 200px;">${navigator.platform}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">语言</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${navigator.language} (${navigator.languages.join(', ')})</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">时区</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${Intl.DateTimeFormat().resolvedOptions().timeZone}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">在线状态</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${navigator.onLine}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">Cookie 启用</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${navigator.cookieEnabled}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">User-Agent</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${navigator.userAgent}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px;">User-Agent 数据</td>
      <td style="padding: 4px 12px;">${navigator.userAgentData ? JSON.stringify(navigator.userAgentData.toJSON()) : '不支持'}</td>
    </tr>
  </table>
</div>
\n`;


const now = new Date();
md += `
<div style="padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
  <div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">Celestia Clock</div>
  <div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
    流转的时光，铭刻着天与地的呼吸。
  </div>
  <table style="border-collapse: collapse; font-size: 14px; line-height: 1.5; margin: auto;">
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">本地时间</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2); min-width: 200px;">${now.toLocaleString()}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">UTC 时间</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${now.toUTCString()}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">时区偏移(分钟)</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${now.getTimezoneOffset()}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px;">时区名称</td>
      <td style="padding: 4px 12px;">${Intl.DateTimeFormat().resolvedOptions().timeZone}</td>
    </tr>
  </table>
</div>
\n`;

/** 🎮 功能支持检测 **/
md += `
<div style="padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
  <div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">Noira Verify</div>
  <div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
    确认功能可用性，保障任务顺利进行。
  </div>
  <table style="border-collapse: collapse; font-size: 14px; line-height: 1.5; margin: auto;">
    <tr><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">Service Worker</td><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${'serviceWorker' in navigator}</td></tr>
    <tr><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">WebGL</td><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${!!document.createElement('canvas').getContext('webgl')}</td></tr>
    <tr><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">WebGL2</td><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${!!document.createElement('canvas').getContext('webgl2')}</td></tr>
    <tr><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">WebRTC</td><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${'RTCPeerConnection' in window}</td></tr>
    <tr><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">本地存储</td><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${'localStorage' in window}</td></tr>
    <tr><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">会话存储</td><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${'sessionStorage' in window}</td></tr>
    <tr><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">IndexedDB</td><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${'indexedDB' in window}</td></tr>
    <tr><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">Push API</td><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${'PushManager' in window}</td></tr>
    <tr><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">Clipboard API</td><td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${'clipboard' in navigator}</td></tr>
    <tr><td style="padding: 4px 12px;">屏幕共享</td><td style="padding: 4px 12px;">${'getDisplayMedia' in (navigator.mediaDevices || {})}</td></tr>
  </table>
</div>
\n`;


/** ⏱ 性能信息 **/
const perf = performance.getEntriesByType('navigation')[0];
const mem = performance.memory || {};

md += `
<div style="padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
<div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">Noira Insight</div>
<div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
以星际尺度解读性能趋势，寻找最佳运行轨迹。
</div>
<table style="border-collapse: collapse; font-size: 14px; line-height: 1.5; margin: auto;">
${perf ? `
<tr>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">页面加载耗时</td>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${(perf.loadEventEnd - perf.startTime).toFixed(2)} ms</td>
</tr>
<tr>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">DOM 解析耗时</td>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${perf.domInteractive?.toFixed(2) || '未知'} ms</td>
</tr>` : ''}
${mem.jsHeapSizeLimit ? `
<tr>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">JS 堆限制</td>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${(mem.jsHeapSizeLimit / 1048576).toFixed(2)} MB</td>
</tr>
<tr>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">已分配 JS 堆</td>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${(mem.totalJSHeapSize / 1048576).toFixed(2)} MB</td>
</tr>
<tr>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">已使用 JS 堆</td>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${(mem.usedJSHeapSize / 1048576).toFixed(2)} MB</td>
</tr>` : ''}
<tr>
<td style="padding: 4px 12px;">高精度时间支持</td>
<td style="padding: 4px 12px;">${'now' in performance}</td>
</tr>
</table>
</div>
\n`;

  /** 🎨 Canvas & GPU 信息 **/
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

md += `
<div style="padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
<div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">Photon Forge</div>
<div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
在光与色的熔炉中，锻造每一帧画面。
</div>
<table style="border-collapse: collapse; font-size: 14px; line-height: 1.5; margin: auto;">
<tr>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">Canvas 2D 支持</td>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${!!ctx}</td>
</tr>
${ctx ? `
<tr>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">Canvas 最大尺寸</td>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${canvas.width} x ${canvas.height}</td>
</tr>
` : ''}
<tr>
<td style="padding: 4px 12px;">OffscreenCanvas 支持</td>
<td style="padding: 4px 12px;">${'OffscreenCanvas' in window}</td>
</tr>
</table>
</div>
\n`;

const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
if (gl) {
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  if (debugInfo) {
md += `
<div style="padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
<div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">Noira Graphics</div>
<div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
绘制每一帧的细节，让虚拟世界生动流畅。
</div>
<table style="border-collapse: collapse; font-size: 14px; line-height: 1.5; margin: auto;">
<tr>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">GPU Vendor</td>
<td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2); min-width: 200px;">
${gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL)}
</td>
</tr>
<tr>
<td style="padding: 4px 12px;">GPU Renderer</td>
<td style="padding: 4px 12px;">
${gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)}
</td>
</tr>
</table>
</div>
\n`;
  }
}

/** 🔊 音频信息 **/
if ('AudioContext' in window) {
  const ac = new AudioContext();
  md += `
<div style="padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
  <div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">Stellar Resonance</div>
  <div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
    回荡于星海的回声，传递每一丝声音细节。
  </div>
  <table style="border-collapse: collapse; font-size: 14px; line-height: 1.5; margin: auto;">
    <tr>
      <td style="padding: 4px 12px;">采样率</td>
      <td style="padding: 4px 12px;">${ac.sampleRate} Hz</td>
    </tr>
  </table>
</div>
\n`;
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

    md += `
<div style="padding: 24px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
  <div style="font-size: 24px; font-weight: bold; margin: 20px 0 5px 0; text-align: center;">Noira Streamline (H.264)</div>
  <div style="font-size: 12px; font-style: italic; line-height: 1.4; text-align: center;">
    将星海中的影像讯号还原为清晰画面。
  </div>
  <table style="border-collapse: collapse; font-size: 14px; line-height: 1.5; margin: auto;">
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">支持</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${mediaInfo.supported}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">流畅播放</td>
      <td style="padding: 4px 12px; border-bottom: 1px solid rgba(255,255,255,0.2);">${mediaInfo.smooth}</td>
    </tr>
    <tr>
      <td style="padding: 4px 12px;">功耗效率</td>
      <td style="padding: 4px 12px;">${mediaInfo.powerEfficient}</td>
    </tr>
  </table>
</div>
\n`;
  } catch(e) {}
}


  /** 🔒 隐私声明 **/
  md += `:::center
这里的讯息，就像星海深处的私语，只在你的设备中回响，不会传到任何别的地方。
:::`;

  md += `
:::center
# ────── ⋆⋅☆⋅⋆ ──────
:::
  `

  // 调用渲染
  renderDirectly(md);
};
