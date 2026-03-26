{
let kt04Arr = [];
let kt04N = 0;
let kt04Queries = [];
let kt04IsSimulating = false;
let kt04Phase = 0;
let kt04PhaseStep = 0;
let kt04Freq = {};
let kt04Gems = [];
let kt04Prefix = [];
let kt04UniqueVals = []; // Danh sách giá trị duy nhất để duyệt từng bước

function initKtarr04Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;
    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Đá Quý</div>
            <div style="display:flex; flex-direction:column; gap:15px; margin-bottom:25px;">
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                    <label><b>Mảng A:</b></label>
                    <input type="text" id="kt04-input" style="flex:1; padding:8px; border-radius:4px; border:1px solid #cbd5e1;">
                </div>
                <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap;">
                    <label><b>Truy vấn (L R mỗi dòng):</b></label>
                    <input type="text" id="kt04-queries" placeholder="1 4, 3 8, 1 8" style="flex:1; padding:8px; border-radius:4px; border:1px solid #cbd5e1;">
                </div>
                <div style="display:flex; gap:10px;">
                    <button onclick="kt04Update()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                    <button onclick="kt04Random()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">📋 Mảng ban đầu:</div>
                <div id="kt04-array" style="display:flex; gap:6px; background:#f8fafc; padding:15px; border-radius:8px; border:1px solid #e2e8f0; flex-wrap:wrap; min-height:50px;"></div>
            </div>
            <div style="margin-bottom:15px;">
                <div style="font-weight:bold; margin-bottom:8px;">💎 Đá quý (giảm dần) + Prefix Sum:</div>
                <div id="kt04-gems" style="display:flex; gap:8px; background:#f0fdf4; padding:15px; border-radius:8px; border:1px solid #29c702; flex-wrap:wrap; min-height:50px;"></div>
            </div>
            <div id="kt04-query-result" style="margin-bottom:15px;"></div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:15px; margin-bottom:20px; background:#fffbeb; padding:15px; border-radius:8px; border:1px solid #f59e0b;">
                <div><b>Số đá quý:</b> <span id="kt04-stat-gems" style="color:#7c3aed; font-weight:bold;">—</span></div>
                <div><b>Phase:</b> <span id="kt04-stat-phase" style="font-weight:bold;">—</span></div>
            </div>
            <div style="display:grid; grid-template-columns:200px 1fr; gap:20px;">
                <div style="display:flex; flex-direction:column; gap:10px;">
                    <button onclick="kt04Auto()" id="kt04-btn-play" class="toggle-btn" style="justify-content:center;">▶ Chạy tự động</button>
                    <button onclick="kt04Step()" class="toggle-btn" style="background:#29c702; color:white; justify-content:center;">⏭ Từng bước</button>
                    <button onclick="kt04Reset()" class="toggle-btn" style="background:#64748b; color:white; justify-content:center;">🔄 Reset</button>
                </div>
                <div id="kt04-log-box" style="background:#1e1e1e; color:#d4d4d4; padding:12px; border-radius:6px; font-family:Consolas,monospace; font-size:0.85rem; height:200px; overflow-y:auto; border-left:4px solid #f59e0b;">
                    <div id="kt04-log"></div>
                </div>
            </div>
        </div>`;
    kt04Random();
}

// Kiểm tra nguyên tố bằng vòng lặp (có trả về chi tiết)
function kt04IsPrime(n) {
    if (n < 2) return false;
    if (n < 4) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    for (let i = 5; i * i <= n; i += 6) {
        if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    return true;
}

// Trả về chuỗi giải thích quá trình kiểm tra nguyên tố
function kt04ExplainPrime(n) {
    if (n < 2) return { prime: false, explain: `${n} < 2 → không phải nguyên tố` };
    if (n === 2) return { prime: true, explain: `2 là nguyên tố (chẵn duy nhất)` };
    if (n === 3) return { prime: true, explain: `3 là nguyên tố` };
    if (n % 2 === 0) return { prime: false, explain: `${n} ÷ 2 = ${n/2} (chia hết) → không NT` };
    if (n % 3 === 0) return { prime: false, explain: `${n} ÷ 3 = ${n/3} (chia hết) → không NT` };
    
    let tried = [];
    for (let i = 2; i * i <= n; i++) {
        if (n % i === 0) {
            return { prime: false, explain: `${n} ÷ ${i} = ${n/i} (chia hết) → không NT` };
        }
        tried.push(i);
    }
    const sqrtN = Math.floor(Math.sqrt(n));
    return { prime: true, explain: `thử chia 2..${sqrtN}, không chia hết → <b>nguyên tố ✓</b>` };
}

function kt04Update() {
    kt04Arr = document.getElementById('kt04-input').value.split(/[\s,]+/).map(Number).filter(n=>!isNaN(n)&&n>0).slice(0,15);
    kt04N = kt04Arr.length;
    const qStr = document.getElementById('kt04-queries').value;
    kt04Queries = [];
    const parts = qStr.split(/[,;]+/).map(s=>s.trim()).filter(s=>s);
    parts.forEach(p => {
        const nums = p.split(/\s+/).map(Number);
        if (nums.length >= 2 && !isNaN(nums[0]) && !isNaN(nums[1])) kt04Queries.push([nums[0], nums[1]]);
    });
    if (kt04Queries.length === 0) kt04Queries = [[1, kt04N]];
    kt04Reset();
}

function kt04Random() {
    kt04N = 8 + Math.floor(Math.random() * 5);
    kt04Arr = Array.from({length: kt04N}, () => Math.floor(Math.random() * 20) + 2);
    // Thêm vài số trùng để minh họa
    if (kt04N > 4) kt04Arr[3] = kt04Arr[0];
    document.getElementById('kt04-input').value = kt04Arr.join(' ');
    kt04Queries = [[1, 3], [2, 10], [1, 10]];
    document.getElementById('kt04-queries').value = '1 3, 2 10, 1 10';
    kt04Reset();
}

function kt04Reset() {
    kt04IsSimulating = false;
    kt04Phase = 0;
    kt04PhaseStep = 0;
    kt04Freq = {};
    kt04Gems = [];
    kt04Prefix = [];
    kt04UniqueVals = [];
    document.getElementById('kt04-stat-gems').innerText = '—';
    document.getElementById('kt04-stat-phase').innerText = '—';
    document.getElementById('kt04-btn-play').innerText = '▶ Chạy tự động';
    document.getElementById('kt04-query-result').innerHTML = '';
    document.getElementById('kt04-log').innerHTML = '<div style="color:#6a9955;">// Đếm tần suất → kiểm tra nguyên tố → lọc → prefix sum</div>';
    kt04RenderArray(-1);
    kt04RenderGems();
}

function kt04RenderArray(hiIdx) {
    const area = document.getElementById('kt04-array');
    if (!area) return;
    area.innerHTML = '';
    kt04Arr.forEach((v, i) => {
        const prime = kt04Phase >= 2 ? kt04IsPrime(v) : null;
        const unique = kt04Phase >= 2 ? (kt04Freq[v] === 1) : null;
        const isGem = prime === true && unique === true;
        const box = document.createElement('div');
        let bg = 'white', border = '#cbd5e1', label = '';

        if (kt04Phase >= 2) {
            if (isGem) { bg = '#bbf7d0'; border = '#16a34a'; label = '💎'; }
            else if (prime && !unique) { bg = '#fef3c7'; border = '#f59e0b'; label = 'NT×' + (kt04Freq[v] || 0); }
            else if (!prime) { bg = '#fee2e2'; border = '#fca5a5'; label = '✗'; }
        }
        if (i === hiIdx) { bg = '#fef08a'; border = '#f59e0b'; }

        box.style.cssText = `display:flex; flex-direction:column; align-items:center; gap:2px;`;
        box.innerHTML = `<div style="font-size:10px; min-height:14px;">${label}</div>
            <div style="min-width:38px; height:38px; display:flex; align-items:center; justify-content:center;
            background:${bg}; border:2px solid ${border}; border-radius:6px; font-weight:bold; font-size:15px;
            transition:all 0.2s;${i===hiIdx?' transform:scale(1.1);':''}">${v}</div>
            <div style="font-size:9px; color:#94a3b8;">[${i}]</div>`;
        area.appendChild(box);
    });
}

function kt04RenderGems() {
    const area = document.getElementById('kt04-gems');
    if (!area) return;
    if (kt04Gems.length === 0) { area.innerHTML = '<span style="color:#94a3b8;">Chưa lọc</span>'; return; }
    let html = '';
    kt04Gems.forEach((v, i) => {
        html += `<div style="display:flex; flex-direction:column; align-items:center; gap:4px;">
            <div style="min-width:42px; height:42px; display:flex; align-items:center; justify-content:center;
                background:#dcfce7; border:2px solid #16a34a; border-radius:8px; font-size:15px; font-weight:bold;">💎${v}</div>
            <div style="font-size:10px; color:#64748b;">S[${i+1}]=${kt04Prefix[i+1] !== undefined ? kt04Prefix[i+1] : '?'}</div>
        </div>`;
    });
    area.innerHTML = html;
}

function kt04Log(msg) {
    document.getElementById('kt04-log').innerHTML += `<div><span style="color:#38bdf8;">></span> ${msg}</div>`;
    document.getElementById('kt04-log-box').scrollTop = 999999;
}

function kt04Step() {
    // Phase 0: init → đếm tần suất
    // Phase 1: kiểm tra từng giá trị (nguyên tố + duy nhất) — TỪNG BƯỚC
    // Phase 2: sắp xếp + prefix sum
    // Phase 3: truy vấn từng câu
    // Phase 4: done

    if (kt04Phase >= 4) return false;

    // === Phase 0: Đếm tần suất ===
    if (kt04Phase === 0) {
        kt04Log(`<span style="color:#f59e0b;"><b>═══ Bước 1: Đếm tần suất ═══</b></span>`);
        document.getElementById('kt04-stat-phase').innerText = 'Đếm tần suất';
        kt04Freq = {};
        kt04Arr.forEach(v => { kt04Freq[v] = (kt04Freq[v] || 0) + 1; });

        // Sắp xếp keys để hiển thị đẹp
        const keys = Object.keys(kt04Freq).map(Number).sort((a, b) => a - b);
        keys.forEach(k => {
            const f = kt04Freq[k];
            kt04Log(`  Giá trị <b>${k}</b>: xuất hiện <b>${f}</b> lần ${f === 1 ? '<span style="color:#16a34a;">(duy nhất ✓)</span>' : '<span style="color:#dc2626;">(trùng ✗)</span>'}`);
        });

        // Chuẩn bị danh sách giá trị duy nhất để duyệt từng bước
        kt04UniqueVals = [];
        const seen = new Set();
        kt04Arr.forEach(v => {
            if (!seen.has(v)) { seen.add(v); kt04UniqueVals.push(v); }
        });

        kt04Phase = 1;
        kt04PhaseStep = 0;
        return true;
    }

    // === Phase 1: Kiểm tra nguyên tố từng giá trị ===
    if (kt04Phase === 1) {
        if (kt04PhaseStep === 0) {
            kt04Log(`<span style="color:#f59e0b;"><b>═══ Bước 2: Kiểm tra nguyên tố từng giá trị ═══</b></span>`);
            document.getElementById('kt04-stat-phase').innerText = 'Kiểm tra nguyên tố';
        }

        if (kt04PhaseStep >= kt04UniqueVals.length) {
            kt04Phase = 2;
            return true;
        }

        const v = kt04UniqueVals[kt04PhaseStep];
        const unique = kt04Freq[v] === 1;
        const { prime, explain } = kt04ExplainPrime(v);

        // Log chi tiết quá trình kiểm tra
        kt04Log(`  <b>${v}</b>: ${explain}`);
        
        if (prime && unique) {
            kt04Gems.push(v);
            kt04Log(`    → Nguyên tố ✓ + Duy nhất ✓ → <span style="color:#16a34a;"><b>💎 ĐÁ QUÝ</b></span>`);
        } else if (prime && !unique) {
            kt04Log(`    → Nguyên tố ✓ nhưng xuất hiện ${kt04Freq[v]} lần → <span style="color:#f59e0b;">Loại (trùng)</span>`);
        } else {
            kt04Log(`    → Không phải nguyên tố → <span style="color:#dc2626;">Loại</span>`);
        }

        // Highlight phần tử đang xét trong mảng
        const firstIdx = kt04Arr.indexOf(v);
        kt04RenderArray(firstIdx);
        kt04PhaseStep++;
        return true;
    }

    // === Phase 2: Sắp xếp + Prefix Sum ===
    if (kt04Phase === 2) {
        kt04Gems.sort((a, b) => b - a);
        kt04Log(`<span style="color:#f59e0b;"><b>═══ Bước 3: Sắp xếp giảm dần ═══</b></span>`);
        kt04Log(`  Đá quý: [${kt04Gems.join(', ')}]`);
        document.getElementById('kt04-stat-gems').innerText = kt04Gems.length;

        kt04Log(`<span style="color:#f59e0b;"><b>═══ Bước 4: Tổng tiền tố (Prefix Sum) ═══</b></span>`);
        document.getElementById('kt04-stat-phase').innerText = 'Prefix Sum';
        kt04Prefix = [0];
        for (let i = 0; i < kt04Gems.length; i++) {
            kt04Prefix.push(kt04Prefix[i] + kt04Gems[i]);
            kt04Log(`  S[${i+1}] = S[${i}] + ${kt04Gems[i]} = <b>${kt04Prefix[i+1]}</b>`);
        }

        kt04RenderArray(-1);
        kt04RenderGems();
        kt04Phase = 3;
        kt04PhaseStep = 0;
        return true;
    }

    // === Phase 3: Trả lời truy vấn ===
    if (kt04Phase === 3) {
        if (kt04PhaseStep === 0) {
            kt04Log(`<span style="color:#f59e0b;"><b>═══ Bước 5: Trả lời truy vấn ═══</b></span>`);
            document.getElementById('kt04-stat-phase').innerText = 'Truy vấn';
        }

        if (kt04PhaseStep >= kt04Queries.length) {
            kt04Log(`<span style="color:#29c702;"><b>═══ HOÀN TẤT ═══</b></span>`);
            kt04Phase = 4;
            return false;
        }

        const [L, R0] = kt04Queries[kt04PhaseStep];
        const gemCount = kt04Gems.length;
        const R = Math.min(R0, gemCount);
        const qIdx = kt04PhaseStep + 1;
        let ans = 0;

        if (L >= 1 && L <= gemCount) {
            ans = kt04Prefix[R] - kt04Prefix[L - 1];
            kt04Log(`  Truy vấn ${qIdx}: [${L}, ${R0}]${R0 > gemCount ? ` → R' = min(${R0}, ${gemCount}) = ${R}` : ''}`);
            kt04Log(`    Tổng = S[${R}] - S[${L-1}] = ${kt04Prefix[R]} - ${kt04Prefix[L-1]} = <b style="color:#dc2626;">${ans}</b>`);
        } else {
            kt04Log(`  Truy vấn ${qIdx}: [${L}, ${R0}] → L vượt số lượng đá quý → Tổng = <b>0</b>`);
        }

        const qArea = document.getElementById('kt04-query-result');
        qArea.innerHTML += `<div style="background:#f0f9ff; padding:8px 15px; border-radius:6px; border:1px solid #0284c7; margin-bottom:6px;">
            Truy vấn ${qIdx}: [${L}, ${R0}] → <b style="color:#dc2626;">${ans}</b></div>`;

        kt04PhaseStep++;
        return true;
    }

    return false;
}

async function kt04Auto() {
    if (kt04IsSimulating) { kt04IsSimulating = false; return; }
    kt04IsSimulating = true;
    document.getElementById('kt04-btn-play').innerText = '⏸ Tạm dừng';
    while (kt04IsSimulating && kt04Step()) await new Promise(r => setTimeout(r, 700));
    kt04IsSimulating = false;
    document.getElementById('kt04-btn-play').innerText = '▶ Chạy tự động';
}
}
