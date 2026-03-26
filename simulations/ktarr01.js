{
let kt01Arr = [];
let kt01H = 5;
let kt01N = 0;
let kt01Idx = -1;
let kt01IsSimulating = false;
let kt01Count = 0;
let kt01Positions = [];

function initKtarr01Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;
    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Quy Hoạch</div>
            <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px;">
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <label><b>Mảng h[]:</b></label>
                    <input type="text" id="kt01-input" style="flex:1; padding:8px; border-radius:4px; border:1px solid #cbd5e1;">
                    <label><b>H =</b></label>
                    <input type="number" id="kt01-h" value="5" style="width:80px; padding:8px; border-radius:4px; border:1px solid #cbd5e1;">
                    <button onclick="kt01Update()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                    <button onclick="kt01Random()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">🏗️ Dãy phố (biểu đồ độ cao):</div>
                <div id="kt01-chart" style="display:flex; align-items:flex-end; gap:6px; background:#f8fafc; padding:20px 15px; border-radius:8px; border:1px solid #e2e8f0; min-height:180px; overflow-x:auto; position:relative;"></div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:15px; margin-bottom:20px; background:#f0fdf4; padding:15px; border-radius:8px; border:1px solid #29c702;">
                <div><b>Giới hạn H:</b> <span id="kt01-stat-h" style="color:#dc2626; font-weight:bold;">5</span></div>
                <div><b>Số vi phạm:</b> <span id="kt01-stat-count" style="color:#0284c7; font-weight:bold;">0</span></div>
                <div><b>Vị trí:</b> <span id="kt01-stat-pos" style="font-weight:bold;">—</span></div>
            </div>
            <div style="display:grid; grid-template-columns:200px 1fr; gap:20px;">
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button onclick="kt01Auto()" id="kt01-btn-play" class="toggle-btn" style="justify-content:center;">▶ Chạy tự động</button>
                    <button onclick="kt01Step()" class="toggle-btn" style="background:#29c702; color:white; justify-content:center;">⏭ Từng bước</button>
                    <button onclick="kt01Reset()" class="toggle-btn" style="background:#64748b; color:white; justify-content:center;">🔄 Reset</button>
                </div>
                <div id="kt01-log-box" style="background:#1e1e1e; color:#d4d4d4; padding:12px; border-radius:6px; font-family:Consolas,monospace; font-size:0.85rem; height:140px; overflow-y:auto; border-left:4px solid #f59e0b;">
                    <div id="kt01-log"></div>
                </div>
            </div>
        </div>`;
    kt01Random();
}

function kt01Update() {
    kt01Arr = document.getElementById('kt01-input').value.split(/[\s,]+/).map(Number).filter(n=>!isNaN(n)).slice(0,15);
    kt01H = parseInt(document.getElementById('kt01-h').value) || 5;
    kt01N = kt01Arr.length;
    kt01Reset();
}

function kt01Random() {
    kt01N = 7 + Math.floor(Math.random()*5);
    kt01H = 4 + Math.floor(Math.random()*6);
    kt01Arr = Array.from({length:kt01N}, ()=> Math.floor(Math.random()*10)+1);
    document.getElementById('kt01-input').value = kt01Arr.join(' ');
    document.getElementById('kt01-h').value = kt01H;
    kt01Reset();
}

function kt01Reset() {
    kt01IsSimulating = false;
    kt01Idx = -1;
    kt01Count = 0;
    kt01Positions = [];
    document.getElementById('kt01-stat-h').innerText = kt01H;
    document.getElementById('kt01-stat-count').innerText = '0';
    document.getElementById('kt01-stat-pos').innerText = '—';
    document.getElementById('kt01-btn-play').innerText = '▶ Chạy tự động';
    document.getElementById('kt01-log').innerHTML = `<div style="color:#6a9955;">// Duyệt mảng, tìm h[i] > H = ${kt01H}</div>`;
    kt01Render();
}

function kt01Render() {
    const area = document.getElementById('kt01-chart');
    if (!area) return;
    const maxH = Math.max(...kt01Arr, kt01H);
    const chartH = 140;
    let html = '';
    // Đường giới hạn H
    const hLineY = chartH - (kt01H / maxH) * chartH;
    kt01Arr.forEach((val, i) => {
        const h = Math.max(8, (val / maxH) * chartH);
        let bg = '#93c5fd', border = '#3b82f6', label = '';
        const violated = val > kt01H;
        if (i < kt01Idx || (i === kt01Idx)) {
            if (violated) { bg = '#fca5a5'; border = '#dc2626'; label = '⚠️'; }
            else { bg = '#bbf7d0'; border = '#16a34a'; label = '✓'; }
        }
        if (i === kt01Idx) { border = '#f59e0b'; }
        html += `<div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
            <div style="font-size:10px;">${label}</div>
            <div style="font-size:12px; font-weight:bold;">${val}</div>
            <div style="width:40px; height:${h}px; background:${bg}; border:2px solid ${border}; border-radius:4px 4px 0 0; transition:all 0.3s;${i===kt01Idx?' transform:scale(1.1);':''}"></div>
            <div style="font-size:11px; font-weight:900; color:#475569;">${i}</div>
        </div>`;
    });
    area.innerHTML = html;
}

function kt01Log(msg) {
    document.getElementById('kt01-log').innerHTML += `<div><span style="color:#38bdf8;">></span> ${msg}</div>`;
    document.getElementById('kt01-log-box').scrollTop = 999999;
}

function kt01Step() {
    if (kt01Idx >= kt01N - 1) {
        if (kt01Idx === kt01N - 1) {
            kt01Log(`<span style="color:#29c702;"><b>HOÀN TẤT.</b> Có ${kt01Count} tòa nhà vi phạm. Vị trí: [${kt01Positions.join(', ')}]</span>`);
            kt01Idx++;
        }
        return false;
    }
    kt01Idx++;
    const val = kt01Arr[kt01Idx];
    if (val > kt01H) {
        kt01Count++;
        kt01Positions.push(kt01Idx);
        kt01Log(`h[${kt01Idx}] = ${val} > H=${kt01H} → <span style="color:#dc2626;"><b>VI PHẠM</b></span>. Đếm = ${kt01Count}`);
    } else {
        kt01Log(`h[${kt01Idx}] = ${val} ≤ H=${kt01H} → Hợp lệ`);
    }
    document.getElementById('kt01-stat-count').innerText = kt01Count;
    document.getElementById('kt01-stat-pos').innerText = kt01Positions.length > 0 ? kt01Positions.join(', ') : '—';
    kt01Render();
    return true;
}

async function kt01Auto() {
    if (kt01IsSimulating) { kt01IsSimulating = false; return; }
    kt01IsSimulating = true;
    document.getElementById('kt01-btn-play').innerText = '⏸ Tạm dừng';
    while (kt01IsSimulating && kt01Step()) await new Promise(r=>setTimeout(r,600));
    kt01IsSimulating = false;
    document.getElementById('kt01-btn-play').innerText = '▶ Chạy tự động';
}
}
