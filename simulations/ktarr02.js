{
let kt02Num = '';
let kt02Digits = [];
let kt02Count = new Array(10).fill(0);
let kt02Idx = -1;
let kt02IsSimulating = false;
let kt02Phase = 0; // 0=init, 1=tách, 2=đếm/sắp, 3=ghép

function initKtarr02Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;
    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Số Lớn Nhất</div>
            <div style="display:flex; flex-direction:column; gap:15px; margin-bottom:25px;">
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                    <label><b>Số N:</b></label>
                    <input type="text" id="kt02-input" value="24101980" style="flex:1; padding:8px; border-radius:4px; border:1px solid #cbd5e1; font-family:Consolas,monospace; font-size:1.1rem;">
                    <button onclick="kt02Update()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                    <button onclick="kt02Random()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">🔢 Các chữ số:</div>
                <div id="kt02-digits" style="display:flex; gap:6px; background:#f8fafc; padding:15px; border-radius:8px; border:1px solid #e2e8f0; flex-wrap:wrap; min-height:50px;"></div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">📊 Bảng đếm (Counting Sort):</div>
                <div id="kt02-count-area" style="display:flex; gap:8px; background:#f0f9ff; padding:15px; border-radius:8px; border:1px solid #0284c7; flex-wrap:wrap;"></div>
            </div>
            <div id="kt02-result-area" style="display:none; margin-bottom:15px; background:#f0fdf4; padding:20px; border-radius:8px; border:2px solid #29c702; text-align:center; font-size:1.3rem; font-family:Consolas,monospace;"></div>
            <div style="display:grid; grid-template-columns:200px 1fr; gap:20px;">
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button onclick="kt02Auto()" id="kt02-btn-play" class="toggle-btn" style="justify-content:center;">▶ Chạy tự động</button>
                    <button onclick="kt02Step()" class="toggle-btn" style="background:#29c702; color:white; justify-content:center;">⏭ Từng bước</button>
                    <button onclick="kt02Reset()" class="toggle-btn" style="background:#64748b; color:white; justify-content:center;">🔄 Reset</button>
                </div>
                <div id="kt02-log-box" style="background:#1e1e1e; color:#d4d4d4; padding:12px; border-radius:6px; font-family:Consolas,monospace; font-size:0.85rem; height:150px; overflow-y:auto; border-left:4px solid #f59e0b;">
                    <div id="kt02-log"></div>
                </div>
            </div>
        </div>`;
    kt02Update();
}

function kt02Update() {
    kt02Num = document.getElementById('kt02-input').value.replace(/[^0-9]/g,'').slice(0,18);
    if (!kt02Num) kt02Num = '0';
    document.getElementById('kt02-input').value = kt02Num;
    kt02Reset();
}

function kt02Random() {
    const len = 5 + Math.floor(Math.random()*8);
    kt02Num = '';
    for (let i = 0; i < len; i++) kt02Num += Math.floor(Math.random()*10);
    if (kt02Num[0] === '0') kt02Num = (Math.floor(Math.random()*9)+1) + kt02Num.slice(1);
    document.getElementById('kt02-input').value = kt02Num;
    kt02Reset();
}

function kt02Reset() {
    kt02IsSimulating = false;
    kt02Idx = -1;
    kt02Phase = 0;
    kt02Digits = kt02Num.split('').map(Number);
    kt02Count = new Array(10).fill(0);
    document.getElementById('kt02-btn-play').innerText = '▶ Chạy tự động';
    document.getElementById('kt02-result-area').style.display = 'none';
    document.getElementById('kt02-log').innerHTML = `<div style="color:#6a9955;">// Counting Sort: đếm rồi ghép từ 9→0</div>`;
    kt02RenderDigits(-1);
    kt02RenderCount();
}

function kt02RenderDigits(hiIdx) {
    const area = document.getElementById('kt02-digits');
    if (!area) return;
    area.innerHTML = '';
    kt02Digits.forEach((d, i) => {
        const box = document.createElement('div');
        let bg = 'white', border = '#cbd5e1';
        if (i === hiIdx) { bg = '#fef08a'; border = '#f59e0b'; }
        else if (i < hiIdx && hiIdx >= 0) { bg = '#dbeafe'; border = '#3b82f6'; }
        box.style.cssText = `min-width:40px; height:45px; display:flex; align-items:center; justify-content:center; background:${bg}; border:2px solid ${border}; border-radius:8px; font-size:20px; font-weight:bold; font-family:Consolas,monospace; transition:all 0.2s;`;
        if (i === hiIdx) box.style.transform = 'scale(1.15)';
        box.innerText = d;
        area.appendChild(box);
    });
}

function kt02RenderCount() {
    const area = document.getElementById('kt02-count-area');
    if (!area) return;
    let html = '';
    for (let d = 9; d >= 0; d--) {
        const active = kt02Count[d] > 0;
        html += `<div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
            <div style="font-size:11px; color:#64748b;">chữ số</div>
            <div style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; background:${active?'#bbf7d0':'#f1f5f9'}; border:2px solid ${active?'#16a34a':'#e2e8f0'}; border-radius:8px; font-size:18px; font-weight:bold;">${d}</div>
            <div style="font-size:14px; font-weight:bold; color:${active?'#dc2626':'#94a3b8'};">×${kt02Count[d]}</div>
        </div>`;
    }
    area.innerHTML = html;
}

function kt02Log(msg) {
    document.getElementById('kt02-log').innerHTML += `<div><span style="color:#38bdf8;">></span> ${msg}</div>`;
    document.getElementById('kt02-log-box').scrollTop = 999999;
}

function kt02Step() {
    if (kt02Phase >= 3) return false;

    if (kt02Phase === 0) {
        kt02Log(`<span style="color:#f59e0b;"><b>═══ Bước 1: Đếm chữ số ═══</b></span>`);
        kt02Phase = 1;
        kt02Idx = 0;
        return true;
    }

    if (kt02Phase === 1) {
        if (kt02Idx >= kt02Digits.length) {
            kt02Log(`<span style="color:#f59e0b;"><b>═══ Bước 2: Ghép từ 9→0 ═══</b></span>`);
            kt02Phase = 2;
            kt02Idx = 9;
            return true;
        }
        const d = kt02Digits[kt02Idx];
        kt02Count[d]++;
        kt02Log(`Chữ số [${kt02Idx}] = ${d} → đếm[${d}] = ${kt02Count[d]}`);
        kt02RenderDigits(kt02Idx);
        kt02RenderCount();
        kt02Idx++;
        return true;
    }

    if (kt02Phase === 2) {
        if (kt02Idx < 0) {
            let result = '';
            for (let d = 9; d >= 0; d--) result += String(d).repeat(kt02Count[d]);
            const resArea = document.getElementById('kt02-result-area');
            resArea.style.display = 'block';
            resArea.innerHTML = `🏆 Số lớn nhất: <b style="color:#dc2626; font-size:1.5rem;">${result}</b>`;
            kt02Log(`<span style="color:#29c702;"><b>KẾT QUẢ: M = ${result}</b></span>`);
            kt02Phase = 3;
            return false;
        }
        if (kt02Count[kt02Idx] > 0) {
            kt02Log(`Chữ số ${kt02Idx}: xuất hiện ${kt02Count[kt02Idx]} lần → ghép "${String(kt02Idx).repeat(kt02Count[kt02Idx])}"`);
        }
        kt02Idx--;
        kt02RenderCount();
        return true;
    }
    return false;
}

async function kt02Auto() {
    if (kt02IsSimulating) { kt02IsSimulating = false; return; }
    kt02IsSimulating = true;
    document.getElementById('kt02-btn-play').innerText = '⏸ Tạm dừng';
    while (kt02IsSimulating && kt02Step()) await new Promise(r=>setTimeout(r,500));
    kt02IsSimulating = false;
    document.getElementById('kt02-btn-play').innerText = '▶ Chạy tự động';
}
}
