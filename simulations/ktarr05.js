{
let kt05Arr = [];
let kt05H = 5;
let kt05N = 0;
let kt05Idx = -1;
let kt05IsSimulating = false;
let kt05Count = 0;
let kt05Positions = [];

function initKtarr05Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;
    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Đăng Kiểm</div>
            <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px;">
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <label><b>Cân nặng xe:</b></label>
                    <input type="text" id="kt05-input" style="flex:1; padding:8px; border-radius:4px; border:1px solid #cbd5e1;">
                    <label><b>H =</b></label>
                    <input type="number" id="kt05-h" value="5" style="width:80px; padding:8px; border-radius:4px; border:1px solid #cbd5e1;">
                    <button onclick="kt05Update()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                    <button onclick="kt05Random()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">🚛 Danh sách xe (biểu đồ cân nặng):</div>
                <div id="kt05-chart" style="display:flex; align-items:flex-end; gap:6px; background:#f8fafc; padding:20px 15px; border-radius:8px; border:1px solid #e2e8f0; min-height:180px; overflow-x:auto; position:relative;"></div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:15px; margin-bottom:20px; background:#f0fdf4; padding:15px; border-radius:8px; border:1px solid #29c702;">
                <div><b>Ngưỡng H:</b> <span id="kt05-stat-h" style="color:#dc2626; font-weight:bold;">5</span></div>
                <div><b>Số vượt ngưỡng:</b> <span id="kt05-stat-count" style="color:#0284c7; font-weight:bold;">0</span></div>
                <div><b>Vị trí:</b> <span id="kt05-stat-pos" style="font-weight:bold;">—</span></div>
            </div>
            <div style="display:grid; grid-template-columns:200px 1fr; gap:20px;">
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button onclick="kt05Auto()" id="kt05-btn-play" class="toggle-btn" style="justify-content:center;">▶ Chạy tự động</button>
                    <button onclick="kt05Step()" class="toggle-btn" style="background:#29c702; color:white; justify-content:center;">⏭ Từng bước</button>
                    <button onclick="kt05Reset()" class="toggle-btn" style="background:#64748b; color:white; justify-content:center;">🔄 Reset</button>
                </div>
                <div id="kt05-log-box" style="background:#1e1e1e; color:#d4d4d4; padding:12px; border-radius:6px; font-family:Consolas,monospace; font-size:0.85rem; height:140px; overflow-y:auto; border-left:4px solid #f59e0b;">
                    <div id="kt05-log"></div>
                </div>
            </div>
        </div>`;
    kt05Random();
}

function kt05Update() {
    kt05Arr = document.getElementById('kt05-input').value.split(/[\s,]+/).map(Number).filter(n=>!isNaN(n)).slice(0,15);
    kt05H = parseInt(document.getElementById('kt05-h').value) || 5;
    kt05N = kt05Arr.length;
    kt05Reset();
}

function kt05Random() {
    kt05N = 7 + Math.floor(Math.random()*5);
    kt05H = 4 + Math.floor(Math.random()*6);
    kt05Arr = Array.from({length:kt05N}, ()=> Math.floor(Math.random()*10)+1);
    document.getElementById('kt05-input').value = kt05Arr.join(' ');
    document.getElementById('kt05-h').value = kt05H;
    kt05Reset();
}

function kt05Reset() {
    kt05IsSimulating = false;
    kt05Idx = -1;
    kt05Count = 0;
    kt05Positions = [];
    document.getElementById('kt05-stat-h').innerText = kt05H;
    document.getElementById('kt05-stat-count').innerText = '0';
    document.getElementById('kt05-stat-pos').innerText = '—';
    document.getElementById('kt05-btn-play').innerText = '▶ Chạy tự động';
    document.getElementById('kt05-log').innerHTML = `<div style="color:#6a9955;">// Duyệt danh sách, tìm xe vượt ngưỡng H = ${kt05H}</div>`;
    kt05Render();
}

function kt05Render() {
    const area = document.getElementById('kt05-chart');
    if (!area) return;
    const maxH = Math.max(...kt05Arr, kt05H);
    const chartH = 140;
    let html = '';
    // Đường giới hạn H
    const hLineY = chartH - (kt05H / maxH) * chartH;
    kt05Arr.forEach((val, i) => {
        const h = Math.max(8, (val / maxH) * chartH);
        let bg = '#93c5fd', border = '#3b82f6', label = '';
        const violated = val > kt05H;
        if (i < kt05Idx || (i === kt05Idx)) {
            if (violated) { bg = '#fca5a5'; border = '#dc2626'; label = '⚠️'; }
            else { bg = '#bbf7d0'; border = '#16a34a'; label = '✓'; }
        }
        if (i === kt05Idx) { border = '#f59e0b'; }
        html += `<div style="display:flex; flex-direction:column; align-items:center; gap:2px;">
            <div style="font-size:10px;">${label}</div>
            <div style="font-size:12px; font-weight:bold;">${val}</div>
            <div style="width:40px; height:${h}px; background:${bg}; border:2px solid ${border}; border-radius:4px 4px 0 0; transition:all 0.3s;${i===kt05Idx?' transform:scale(1.1);':''}"></div>
            <div style="font-size:11px; font-weight:900; color:#475569;">${i}</div>
        </div>`;
    });
    area.innerHTML = html;
}

function kt05Log(msg) {
    document.getElementById('kt05-log').innerHTML += `<div><span style="color:#38bdf8;">></span> ${msg}</div>`;
    document.getElementById('kt05-log-box').scrollTop = 999999;
}

function kt05Step() {
    if (kt05Idx >= kt05N - 1) {
        if (kt05Idx === kt05N - 1) {
            kt05Log(`<span style="color:#29c702;"><b>HOÀN TẤT.</b> Có ${kt05Count} xe tải vượt ngưỡng. Vị trí: [${kt05Positions.join(', ')}]</span>`);
            kt05Idx++;
        }
        return false;
    }
    kt05Idx++;
    const val = kt05Arr[kt05Idx];
    if (val > kt05H) {
        kt05Count++;
        kt05Positions.push(kt05Idx);
        kt05Log(`xe[${kt05Idx}] = ${val} > H=${kt05H} → <span style="color:#dc2626;"><b>VƯỢT NGƯỠNG</b></span>. Đếm = ${kt05Count}`);
    } else {
        kt05Log(`xe[${kt05Idx}] = ${val} ≤ H=${kt05H} → Đạt chuẩn`);
    }
    document.getElementById('kt05-stat-count').innerText = kt05Count;
    document.getElementById('kt05-stat-pos').innerText = kt05Positions.length > 0 ? kt05Positions.join(', ') : '—';
    kt05Render();
    return true;
}

async function kt05Auto() {
    if (kt05IsSimulating) { kt05IsSimulating = false; return; }
    kt05IsSimulating = true;
    document.getElementById('kt05-btn-play').innerText = '⏸ Tạm dừng';
    while (kt05IsSimulating && kt05Step()) await new Promise(r=>setTimeout(r,600));
    kt05IsSimulating = false;
    document.getElementById('kt05-btn-play').innerText = '▶ Chạy tự động';
}
}
