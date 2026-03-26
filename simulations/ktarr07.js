{
let kt07Arr = [];
let kt07N = 0;
let kt07Idx = -1;
let kt07IsSimulating = false;
let kt07Phase = 0;
let kt07Freq = {};
let kt07Lonely = [];

function initKtarr07Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;
    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Món Hàng Độc Nhất</div>
            <div style="display:flex; flex-direction:column; gap:15px; margin-bottom:25px;">
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                    <label><b>Mã hàng:</b></label>
                    <input type="text" id="kt07-input" style="flex:1; padding:8px; border-radius:4px; border:1px solid #cbd5e1;">
                    <button onclick="kt07Update()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                    <button onclick="kt07Random()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">📋 Mảng ban đầu:</div>
                <div id="kt07-array" style="display:flex; gap:6px; background:#f8fafc; padding:15px; border-radius:8px; border:1px solid #e2e8f0; flex-wrap:wrap; min-height:50px;"></div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">📊 Bảng tần suất:</div>
                <div id="kt07-freq" style="display:flex; gap:8px; background:#f0f9ff; padding:15px; border-radius:8px; border:1px solid #0284c7; flex-wrap:wrap; min-height:50px;"></div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr 1fr; gap:15px; margin-bottom:20px; background:#f0fdf4; padding:15px; border-radius:8px; border:1px solid #29c702;">
                <div><b>Hàng độc nhất:</b> <span id="kt07-stat-count" style="color:#0284c7; font-weight:bold;">—</span></div>
                <div><b>Min:</b> <span id="kt07-stat-min" style="color:#16a34a; font-weight:bold;">—</span></div>
                <div><b>Max:</b> <span id="kt07-stat-max" style="color:#dc2626; font-weight:bold;">—</span></div>
                <div><b>Phase:</b> <span id="kt07-stat-phase" style="font-weight:bold;">—</span></div>
            </div>
            <div style="display:grid; grid-template-columns:200px 1fr; gap:20px;">
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button onclick="kt07Auto()" id="kt07-btn-play" class="toggle-btn" style="justify-content:center;">▶ Chạy tự động</button>
                    <button onclick="kt07Step()" class="toggle-btn" style="background:#29c702; color:white; justify-content:center;">⏭ Từng bước</button>
                    <button onclick="kt07Reset()" class="toggle-btn" style="background:#64748b; color:white; justify-content:center;">🔄 Reset</button>
                </div>
                <div id="kt07-log-box" style="background:#1e1e1e; color:#d4d4d4; padding:12px; border-radius:6px; font-family:Consolas,monospace; font-size:0.85rem; height:150px; overflow-y:auto; border-left:4px solid #f59e0b;">
                    <div id="kt07-log"></div>
                </div>
            </div>
        </div>`;
    kt07Random();
}

function kt07Update() {
    kt07Arr = document.getElementById('kt07-input').value.split(/[\s,]+/).map(Number).filter(n=>!isNaN(n)&&n>=0).slice(0,15);
    kt07N = kt07Arr.length; kt07Reset();
}

function kt07Random() {
    kt07N = 8 + Math.floor(Math.random()*5);
    kt07Arr = Array.from({length:kt07N}, ()=> Math.floor(Math.random()*10));
    document.getElementById('kt07-input').value = kt07Arr.join(' ');
    kt07Reset();
}

function kt07Reset() {
    kt07IsSimulating = false; kt07Idx = -1; kt07Phase = 0; kt07Freq = {}; kt07Lonely = [];
    document.getElementById('kt07-stat-count').innerText = '—';
    document.getElementById('kt07-stat-min').innerText = '—';
    document.getElementById('kt07-stat-max').innerText = '—';
    document.getElementById('kt07-stat-phase').innerText = '—';
    document.getElementById('kt07-btn-play').innerText = '▶ Chạy tự động';
    document.getElementById('kt07-log').innerHTML = '<div style="color:#6a9955;">// Đếm tần suất → tìm số xuất hiện 1 lần</div>';
    kt07RenderArray(-1); kt07RenderFreq();
}

function kt07RenderArray(hiIdx) {
    const area = document.getElementById('kt07-array');
    if (!area) return; area.innerHTML = '';
    kt07Arr.forEach((v,i) => {
        const box = document.createElement('div');
        let bg = 'white', border = '#cbd5e1';
        if (i === hiIdx) { bg = '#fef08a'; border = '#f59e0b'; }
        else if (i < hiIdx && hiIdx >= 0) { bg = '#dbeafe'; border = '#3b82f6'; }
        // Highlight độc nhất
        if (kt07Phase >= 2 && kt07Lonely.includes(v)) { bg = '#bbf7d0'; border = '#16a34a'; }
        box.style.cssText = `min-width:38px; height:42px; display:flex; align-items:center; justify-content:center; background:${bg}; border:2px solid ${border}; border-radius:6px; font-weight:bold; font-size:16px; transition:all 0.2s;`;
        if (i===hiIdx) box.style.transform='scale(1.12)';
        box.innerText = v;
        area.appendChild(box);
    });
}

function kt07RenderFreq() {
    const area = document.getElementById('kt07-freq');
    if (!area) return;
    const keys = Object.keys(kt07Freq).map(Number).sort((a,b)=>a-b);
    if (keys.length === 0) { area.innerHTML = '<span style="color:#94a3b8;">Chưa đếm</span>'; return; }
    let html = '';
    keys.forEach(k => {
        const f = kt07Freq[k];
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

function kt07Log(msg) {
    document.getElementById('kt07-log').innerHTML += `<div><span style="color:#38bdf8;">></span> ${msg}</div>`;
    document.getElementById('kt07-log-box').scrollTop = 999999;
}

function kt07Step() {
    if (kt07Phase >= 3) return false;
    if (kt07Phase === 0) {
        kt07Log(`<span style="color:#f59e0b;"><b>═══ Phase 1: Đếm tần suất ═══</b></span>`);
        document.getElementById('kt07-stat-phase').innerText = 'Đếm tần suất';
        kt07Phase = 1; kt07Idx = 0; return true;
    }
    if (kt07Phase === 1) {
        if (kt07Idx >= kt07N) {
            kt07Log(`<span style="color:#f59e0b;"><b>═══ Phase 2: Tìm hàng độc nhất ═══</b></span>`);
            document.getElementById('kt07-stat-phase').innerText = 'Tìm độc nhất';
            kt07Phase = 2;
            // Tìm độc nhất
            kt07Lonely = [];
            for (const [k,v] of Object.entries(kt07Freq)) {
                if (v === 1) kt07Lonely.push(Number(k));
            }
            kt07Lonely.sort((a,b)=>a-b);
            if (kt07Lonely.length > 0) {
                kt07Log(`Các hàng độc nhất: [${kt07Lonely.join(', ')}]`);
                kt07Log(`Số lượng: <b>${kt07Lonely.length}</b>, Min: <b style="color:#16a34a;">${kt07Lonely[0]}</b>, Max: <b style="color:#dc2626;">${kt07Lonely[kt07Lonely.length-1]}</b>`);
                document.getElementById('kt07-stat-count').innerText = kt07Lonely.length;
                document.getElementById('kt07-stat-min').innerText = kt07Lonely[0];
                document.getElementById('kt07-stat-max').innerText = kt07Lonely[kt07Lonely.length-1];
            } else {
                kt07Log(`<span style="color:#dc2626;">Không có hàng độc nhất → xuất -1</span>`);
                document.getElementById('kt07-stat-count').innerText = '-1';
            }
            kt07RenderArray(-1); kt07RenderFreq();
            kt07Phase = 3; return false;
        }
        const v = kt07Arr[kt07Idx];
        kt07Freq[v] = (kt07Freq[v] || 0) + 1;
        kt07Log(`a[${kt07Idx}] = ${v} → đếm[${v}] = ${kt07Freq[v]}`);
        kt07RenderArray(kt07Idx); kt07RenderFreq();
        kt07Idx++; return true;
    }
    return false;
}

async function kt07Auto() {
    if (kt07IsSimulating) { kt07IsSimulating = false; return; }
    kt07IsSimulating = true;
    document.getElementById('kt07-btn-play').innerText = '⏸ Tạm dừng';
    while (kt07IsSimulating && kt07Step()) await new Promise(r=>setTimeout(r,500));
    kt07IsSimulating = false;
    document.getElementById('kt07-btn-play').innerText = '▶ Chạy tự động';
}
}
