{
let kt06Num = '';
let kt06Digits = [];
let kt06Count = new Array(10).fill(0);
let kt06Idx = -1;
let kt06IsSimulating = false;
let kt06Phase = 0; // 0=init, 1=tách, 2=đếm/sắp, 3=ghép

function initKtarr06Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;
    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Mật Mã Lớn Nhất</div>
            <div style="display:flex; flex-direction:column; gap:15px; margin-bottom:25px;">
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                    <label><b>Mã gốc N:</b></label>
                    <input type="text" id="kt06-input" value="24101980" style="flex:1; padding:8px; border-radius:4px; border:1px solid #cbd5e1; font-family:Consolas,monospace; font-size:1.1rem;">
                    <button onclick="kt06Update()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                    <button onclick="kt06Random()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">🔢 Các chữ số:</div>
                <div id="kt06-digits" style="display:flex; gap:6px; background:#f8fafc; padding:15px; border-radius:8px; border:1px solid #e2e8f0; flex-wrap:wrap; min-height:50px;"></div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">📊 Bảng đếm (Counting Sort):</div>
                <div id="kt06-count-area" style="display:flex; gap:8px; background:#f0f9ff; padding:15px; border-radius:8px; border:1px solid #0284c7; flex-wrap:wrap;"></div>
            </div>
            <div id="kt06-result-area" style="display:none; margin-bottom:15px; background:#f0fdf4; padding:20px; border-radius:8px; border:2px solid #29c702; text-align:center; font-size:1.3rem; font-family:Consolas,monospace;"></div>
            <div style="display:grid; grid-template-columns:200px 1fr; gap:20px;">
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button onclick="kt06Auto()" id="kt06-btn-play" class="toggle-btn" style="justify-content:center;">▶ Chạy tự động</button>
                    <button onclick="kt06Step()" class="toggle-btn" style="background:#29c702; color:white; justify-content:center;">⏭ Từng bước</button>
                    <button onclick="kt06Reset()" class="toggle-btn" style="background:#64748b; color:white; justify-content:center;">🔄 Reset</button>
                </div>
                <div id="kt06-log-box" style="background:#1e1e1e; color:#d4d4d4; padding:12px; border-radius:6px; font-family:Consolas,monospace; font-size:0.85rem; height:150px; overflow-y:auto; border-left:4px solid #f59e0b;">
                    <div id="kt06-log"></div>
                </div>
            </div>
        </div>`;
    kt06Update();
}

function kt06Update() {
    kt06Num = document.getElementById('kt06-input').value.replace(/[^0-9]/g,'').slice(0,18);
    if (!kt06Num) kt06Num = '0';
    document.getElementById('kt06-input').value = kt06Num;
    kt06Reset();
}

function kt06Random() {
    const len = 5 + Math.floor(Math.random()*8);
    kt06Num = '';
    for (let i = 0; i < len; i++) kt06Num += Math.floor(Math.random()*10);
    if (kt06Num[0] === '0') kt06Num = (Math.floor(Math.random()*9)+1) + kt06Num.slice(1);
    document.getElementById('kt06-input').value = kt06Num;
    kt06Reset();
}

function kt06Reset() {
    kt06IsSimulating = false;
    kt06Idx = -1;
    kt06Phase = 0;
    kt06Digits = kt06Num.split('').map(Number);
    kt06Count = new Array(10).fill(0);
    document.getElementById('kt06-btn-play').innerText = '▶ Chạy tự động';
    document.getElementById('kt06-result-area').style.display = 'none';
    document.getElementById('kt06-log').innerHTML = `<div style="color:#6a9955;">// Counting Sort: đếm rồi ghép từ 9→0</div>`;
    kt06RenderDigits(-1);
    kt06RenderCount();
}

function kt06RenderDigits(hiIdx) {
    const area = document.getElementById('kt06-digits');
    if (!area) return;
    area.innerHTML = '';
    kt06Digits.forEach((d, i) => {
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

function kt06RenderCount() {
    const area = document.getElementById('kt06-count-area');
    if (!area) return;
    let html = '';
    for (let d = 9; d >= 0; d--) {
        const active = kt06Count[d] > 0;
        html += `<div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
            <div style="font-size:11px; color:#64748b;">chữ số</div>
            <div style="width:40px; height:40px; display:flex; align-items:center; justify-content:center; background:${active?'#bbf7d0':'#f1f5f9'}; border:2px solid ${active?'#16a34a':'#e2e8f0'}; border-radius:8px; font-size:18px; font-weight:bold;">${d}</div>
            <div style="font-size:14px; font-weight:bold; color:${active?'#dc2626':'#94a3b8'};">×${kt06Count[d]}</div>
        </div>`;
    }
    area.innerHTML = html;
}

function kt06Log(msg) {
    document.getElementById('kt06-log').innerHTML += `<div><span style="color:#38bdf8;">></span> ${msg}</div>`;
    document.getElementById('kt06-log-box').scrollTop = 999999;
}

function kt06Step() {
    if (kt06Phase >= 3) return false;

    if (kt06Phase === 0) {
        kt06Log(`<span style="color:#f59e0b;"><b>═══ Bước 1: Đếm chữ số ═══</b></span>`);
        kt06Phase = 1;
        kt06Idx = 0;
        return true;
    }

    if (kt06Phase === 1) {
        if (kt06Idx >= kt06Digits.length) {
            kt06Log(`<span style="color:#f59e0b;"><b>═══ Bước 2: Ghép từ 9→0 ═══</b></span>`);
            kt06Phase = 2;
            kt06Idx = 9;
            return true;
        }
        const d = kt06Digits[kt06Idx];
        kt06Count[d]++;
        kt06Log(`Chữ số [${kt06Idx}] = ${d} → đếm[${d}] = ${kt06Count[d]}`);
        kt06RenderDigits(kt06Idx);
        kt06RenderCount();
        kt06Idx++;
        return true;
    }

    if (kt06Phase === 2) {
        if (kt06Idx < 0) {
            let result = '';
            for (let d = 9; d >= 0; d--) result += String(d).repeat(kt06Count[d]);
            const resArea = document.getElementById('kt06-result-area');
            resArea.style.display = 'block';
            resArea.innerHTML = `🏆 Mật mã lớn nhất: <b style="color:#dc2626; font-size:1.5rem;">${result}</b>`;
            kt06Log(`<span style="color:#29c702;"><b>KẾT QUẢ: M = ${result}</b></span>`);
            kt06Phase = 3;
            return false;
        }
        if (kt06Count[kt06Idx] > 0) {
            kt06Log(`Chữ số ${kt06Idx}: xuất hiện ${kt06Count[kt06Idx]} lần → ghép "${String(kt06Idx).repeat(kt06Count[kt06Idx])}"`);
        }
        kt06Idx--;
        kt06RenderCount();
        return true;
    }
    return false;
}

async function kt06Auto() {
    if (kt06IsSimulating) { kt06IsSimulating = false; return; }
    kt06IsSimulating = true;
    document.getElementById('kt06-btn-play').innerText = '⏸ Tạm dừng';
    while (kt06IsSimulating && kt06Step()) await new Promise(r=>setTimeout(r,500));
    kt06IsSimulating = false;
    document.getElementById('kt06-btn-play').innerText = '▶ Chạy tự động';
}
}
