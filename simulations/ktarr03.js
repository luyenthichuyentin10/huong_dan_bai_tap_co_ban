{
let kt03Arr = [];
let kt03N = 0;
let kt03Idx = -1;
let kt03IsSimulating = false;
let kt03Phase = 0;
let kt03Freq = {};
let kt03Lonely = [];

function initKtarr03Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;
    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Số Đơn Độc</div>
            <div style="display:flex; flex-direction:column; gap:15px; margin-bottom:25px;">
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                    <label><b>Dãy A:</b></label>
                    <input type="text" id="kt03-input" style="flex:1; padding:8px; border-radius:4px; border:1px solid #cbd5e1;">
                    <button onclick="kt03Update()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                    <button onclick="kt03Random()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">📋 Mảng ban đầu:</div>
                <div id="kt03-array" style="display:flex; gap:6px; background:#f8fafc; padding:15px; border-radius:8px; border:1px solid #e2e8f0; flex-wrap:wrap; min-height:50px;"></div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">📊 Bảng tần suất:</div>
                <div id="kt03-freq" style="display:flex; gap:8px; background:#f0f9ff; padding:15px; border-radius:8px; border:1px solid #0284c7; flex-wrap:wrap; min-height:50px;"></div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:15px; margin-bottom:20px; background:#f0fdf4; padding:15px; border-radius:8px; border:1px solid #29c702;">
                <div><b>Số đơn độc:</b> <span id="kt03-stat-count" style="color:#0284c7; font-weight:bold;">—</span></div>
                <div><b>Min:</b> <span id="kt03-stat-min" style="color:#16a34a; font-weight:bold;">—</span></div>
                <div><b>Max:</b> <span id="kt03-stat-max" style="color:#dc2626; font-weight:bold;">—</span></div>
                <div><b>Phase:</b> <span id="kt03-stat-phase" style="font-weight:bold;">—</span></div>
            </div>
            <div style="display:grid; grid-template-columns:200px 1fr; gap:20px;">
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button onclick="kt03Auto()" id="kt03-btn-play" class="toggle-btn" style="justify-content:center;">▶ Chạy tự động</button>
                    <button onclick="kt03Step()" class="toggle-btn" style="background:#29c702; color:white; justify-content:center;">⏭ Từng bước</button>
                    <button onclick="kt03Reset()" class="toggle-btn" style="background:#64748b; color:white; justify-content:center;">🔄 Reset</button>
                </div>
                <div id="kt03-log-box" style="background:#1e1e1e; color:#d4d4d4; padding:12px; border-radius:6px; font-family:Consolas,monospace; font-size:0.85rem; height:150px; overflow-y:auto; border-left:4px solid #f59e0b;">
                    <div id="kt03-log"></div>
                </div>
            </div>
        </div>`;
    kt03Random();
}

function kt03Update() {
    kt03Arr = document.getElementById('kt03-input').value.split(/[\s,]+/).map(Number).filter(n=>!isNaN(n)&&n>=0).slice(0,15);
    kt03N = kt03Arr.length; kt03Reset();
}

function kt03Random() {
    kt03N = 8 + Math.floor(Math.random()*5);
    kt03Arr = Array.from({length:kt03N}, ()=> Math.floor(Math.random()*10));
    document.getElementById('kt03-input').value = kt03Arr.join(' ');
    kt03Reset();
}

function kt03Reset() {
    kt03IsSimulating = false; kt03Idx = -1; kt03Phase = 0; kt03Freq = {}; kt03Lonely = [];
    document.getElementById('kt03-stat-count').innerText = '—';
    document.getElementById('kt03-stat-min').innerText = '—';
    document.getElementById('kt03-stat-max').innerText = '—';
    document.getElementById('kt03-stat-phase').innerText = '—';
    document.getElementById('kt03-btn-play').innerText = '▶ Chạy tự động';
    document.getElementById('kt03-log').innerHTML = '<div style="color:#6a9955;">// Đếm tần suất → tìm số xuất hiện 1 lần</div>';
    kt03RenderArray(-1); kt03RenderFreq();
}

function kt03RenderArray(hiIdx) {
    const area = document.getElementById('kt03-array');
    if (!area) return; area.innerHTML = '';
    kt03Arr.forEach((v,i) => {
        const box = document.createElement('div');
        let bg = 'white', border = '#cbd5e1';
        if (i === hiIdx) { bg = '#fef08a'; border = '#f59e0b'; }
        else if (i < hiIdx && hiIdx >= 0) { bg = '#dbeafe'; border = '#3b82f6'; }
        // Highlight đơn độc
        if (kt03Phase >= 2 && kt03Lonely.includes(v)) { bg = '#bbf7d0'; border = '#16a34a'; }
        box.style.cssText = `min-width:38px; height:42px; display:flex; align-items:center; justify-content:center; background:${bg}; border:2px solid ${border}; border-radius:6px; font-weight:bold; font-size:16px; transition:all 0.2s;`;
        if (i===hiIdx) box.style.transform='scale(1.12)';
        box.innerText = v;
        area.appendChild(box);
    });
}

function kt03RenderFreq() {
    const area = document.getElementById('kt03-freq');
    if (!area) return;
    const keys = Object.keys(kt03Freq).map(Number).sort((a,b)=>a-b);
    if (keys.length === 0) { area.innerHTML = '<span style="color:#94a3b8;">Chưa đếm</span>'; return; }
    let html = '';
    keys.forEach(k => {
        const f = kt03Freq[k];
        const lonely = f === 1;
        html += `<div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
            <div style="width:42px; height:42px; display:flex; align-items:center; justify-content:center;
                background:${lonely?'#bbf7d0':'#fecaca'}; border:2px solid ${lonely?'#16a34a':'#dc2626'};
                border-radius:8px; font-size:16px; font-weight:bold;">${k}</div>
            <div style="font-size:12px; font-weight:bold; color:${lonely?'#16a34a':'#dc2626'};">×${f} ${lonely?'✓':'✗'}</div>
        </div>`;
    });
    area.innerHTML = html;
}

function kt03Log(msg) {
    document.getElementById('kt03-log').innerHTML += `<div><span style="color:#38bdf8;">></span> ${msg}</div>`;
    document.getElementById('kt03-log-box').scrollTop = 999999;
}

function kt03Step() {
    if (kt03Phase >= 3) return false;
    if (kt03Phase === 0) {
        kt03Log(`<span style="color:#f59e0b;"><b>═══ Phase 1: Đếm tần suất ═══</b></span>`);
        document.getElementById('kt03-stat-phase').innerText = 'Đếm tần suất';
        kt03Phase = 1; kt03Idx = 0; return true;
    }
    if (kt03Phase === 1) {
        if (kt03Idx >= kt03N) {
            kt03Log(`<span style="color:#f59e0b;"><b>═══ Phase 2: Tìm số đơn độc ═══</b></span>`);
            document.getElementById('kt03-stat-phase').innerText = 'Tìm đơn độc';
            kt03Phase = 2;
            // Tìm đơn độc
            kt03Lonely = [];
            for (const [k,v] of Object.entries(kt03Freq)) {
                if (v === 1) kt03Lonely.push(Number(k));
            }
            kt03Lonely.sort((a,b)=>a-b);
            if (kt03Lonely.length > 0) {
                kt03Log(`Các số đơn độc: [${kt03Lonely.join(', ')}]`);
                kt03Log(`Số lượng: <b>${kt03Lonely.length}</b>, Min: <b style="color:#16a34a;">${kt03Lonely[0]}</b>, Max: <b style="color:#dc2626;">${kt03Lonely[kt03Lonely.length-1]}</b>`);
                document.getElementById('kt03-stat-count').innerText = kt03Lonely.length;
                document.getElementById('kt03-stat-min').innerText = kt03Lonely[0];
                document.getElementById('kt03-stat-max').innerText = kt03Lonely[kt03Lonely.length-1];
            } else {
                kt03Log(`<span style="color:#dc2626;">Không có số đơn độc → xuất -1</span>`);
                document.getElementById('kt03-stat-count').innerText = '-1';
            }
            kt03RenderArray(-1); kt03RenderFreq();
            kt03Phase = 3; return false;
        }
        const v = kt03Arr[kt03Idx];
        kt03Freq[v] = (kt03Freq[v] || 0) + 1;
        kt03Log(`a[${kt03Idx}] = ${v} → đếm[${v}] = ${kt03Freq[v]}`);
        kt03RenderArray(kt03Idx); kt03RenderFreq();
        kt03Idx++; return true;
    }
    return false;
}

async function kt03Auto() {
    if (kt03IsSimulating) { kt03IsSimulating = false; return; }
    kt03IsSimulating = true;
    document.getElementById('kt03-btn-play').innerText = '⏸ Tạm dừng';
    while (kt03IsSimulating && kt03Step()) await new Promise(r=>setTimeout(r,500));
    kt03IsSimulating = false;
    document.getElementById('kt03-btn-play').innerText = '▶ Chạy tự động';
}
}
