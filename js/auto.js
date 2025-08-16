async function updateNavRightStatus() {
  const batteryLevelDiv = document.querySelector('.battery .battery-level');
  const batteryText = document.querySelector('.battery .battery-text');
  const chargingText = document.querySelector('.charging');
  const networkText = document.querySelector('.network');

  // ---------- 电池 ----------
  if (navigator.getBattery) {
    const battery = await navigator.getBattery();

    function updateBattery() {
        const level = (battery.level * 100).toFixed(0);
        batteryLevelDiv.style.width = level + '%';
        batteryText.textContent = level + '%';
        chargingText.textContent = battery.charging ? '(Charging)' : '';
        if(level > 50) batteryLevelDiv.style.background = 'rgba(0, 51, 0, 1)';
        else if(level > 20) batteryLevelDiv.style.background = 'rgba(59, 59, 0, 1)';
        else batteryLevelDiv.style.background = 'rgba(59, 0, 0, 1)';
    }

    updateBattery();
    battery.addEventListener('levelchange', updateBattery);
    battery.addEventListener('chargingchange', updateBattery);
  } else {
    batteryText.textContent = 'Battery API not supported';
  }

  // ---------- 网络 ----------
  function updateNetwork() {
    let type = 'Unknown';
    if(navigator.onLine) {
      if(navigator.connection) type = navigator.connection.effectiveType.toUpperCase();
      else type = 'Online';
    } else type = 'Offline';
    networkText.textContent = type;
  }

  updateNetwork();
  window.addEventListener('online', updateNetwork);
  window.addEventListener('offline', updateNetwork);
  if(navigator.connection) navigator.connection.addEventListener('change', updateNetwork);
}

updateNavRightStatus();

function updateTime() {
  const hoursDiv = document.getElementById('time-hours');
  const dateDiv = document.getElementById('time-date');

  const now = new Date();

  // 时间 HH:MM:SS AM/PM
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2,'0');
  const seconds = now.getSeconds().toString().padStart(2,'0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const timeStr = `${hours.toString().padStart(2,'0')}:${minutes}:${seconds} ${ampm}`;

  // 日期 DD/MM/YYYY
  const day = now.getDate().toString().padStart(2,'0');
  const month = (now.getMonth()+1).toString().padStart(2,'0');
  const year = now.getFullYear();
  const dateStr = `${day}/${month}/${year}`;

  hoursDiv.textContent = timeStr;
  dateDiv.textContent = dateStr;
}

updateTime();
setInterval(updateTime, 1000);