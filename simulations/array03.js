{
let arrA = [];
let currentIdx = -1;
let isSimulating = false;
let sntFound = [];

function initArray03Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;

    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Tìm Số Nguyên Tố</div>
            
            <div style="display: flex; gap: 10px; align-items: center; margin-bottom: 20px;">
                <label><b>Nhập mảng:</b></label>
                <input type="text" id="input-array" placeholder="Ví dụ: 1 2 3 4 5 7 9" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                <button onclick="updateDataSNT()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Lưu</button>
                <button onclick="randomDataSNT()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
            </div>

            <div id="array-display" style="display: flex; justify-content: flex-start; gap: 12px; background: #f8fafc; padding: 30px 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 100px; overflow-x: auto; margin-bottom: 20px;"></div>

            <div style="background: #fff7ed; padding: 15px; border-radius: 8px; border: 1px solid #f59e0b; margin-bottom: 20px;">
                <b>Danh sách SNT tìm thấy (<span id="count-snt">0</span>):</b>
                <div id="snt-list" style="margin-top: 10px; font-weight: bold; color: #c2410c; min-height: 24px;">---</div>
            </div>

            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button onclick="startAutoSNT()" id="btn-play" class="toggle-btn" style="justify-content: center;">▶ Chạy tự động</button>
                    <button onclick="nextStepSNT()" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    <button onclick="resetSNT()" class="toggle-btn" style="background:#64748b; color:white; justify-content: center;">🔄 Reset</button>
                </div>
                <div id="step-log-container" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 120px; overflow-y: auto;">
                    <div id="log-content"></div>
                </div>
            </div>
        </div>
    `;
    randomDataSNT();
}

function updateDataSNT() {
    const val = document.getElementById('input-array').value;
    arrA = val.split(/[\s,]+/).map(Number).filter(n => !isNaN(n)).slice(0, 12);
    resetSNT();
}

function randomDataSNT() {
    arrA = Array.from({ length: 8 }, () => Math.floor(Math.random() * 50));
    document.getElementById('input-array').value = arrA.join(' ');
    resetSNT();
}

function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}

function resetSNT() {
    isSimulating = false; currentIdx = -1; sntFound = [];
    document.getElementById('snt-list').innerText = "---";
    document.getElementById('count-snt').innerText = "0";
    document.getElementById('log-content').innerHTML = `<div style="color: #6a9955;">// Sẵn sàng kiểm tra số nguyên tố...</div>`;
    renderArrSNT();
}

function renderArrSNT() {
    const container = document.getElementById('array-display');
    container.innerHTML = '';
    arrA.forEach((val, i) => {
        const isSNT = isPrime(val) && i <= currentIdx;
        const wrapper = document.createElement('div');
        wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 8px;";
        
        const idxBox = document.createElement('div');
        idxBox.innerText = i;
        idxBox.style.cssText = `font-weight: bold; color: ${i === currentIdx ? '#f59e0b' : '#94a3b8'};`;
        
        const valBox = document.createElement('div');
        valBox.innerText = val;
        valBox.style.cssText = `
            width: 45px; height: 45px; display: flex; align-items: center; justify-content: center;
            background: ${isSNT ? '#fef08a' : (i === currentIdx ? '#bae6fd' : 'white')};
            border: 2px solid ${i === currentIdx ? '#f59e0b' : '#cbd5e1'};
            border-radius: 8px; font-weight: bold; transition: 0.3s;
            box-shadow: ${i === currentIdx ? '0 0 10px #f59e0b' : 'none'};
        `;
        
        wrapper.append(idxBox, valBox);
        container.appendChild(wrapper);
    });
}

function addLog(msg) {
    const logArea = document.getElementById('log-content');
    logArea.innerHTML += `<div><span style="color: #f59e0b;">[Bước ${currentIdx}]</span> ${msg}</div>`;
    document.getElementById('step-log-container').scrollTop = 9999;
}

function nextStepSNT() {
    if (currentIdx >= arrA.length - 1) {
        addLog(`<span style="color:#29c702;">Hoàn tất! Tìm thấy ${sntFound.length} số nguyên tố.</span>`);
        return false;
    }

    currentIdx++;
    let val = arrA[currentIdx];
    if (isPrime(val)) {
        sntFound.push(val);
        addLog(`Số ${val} là số nguyên tố. <b style="color:#29c702;">(OK)</b>`);
        document.getElementById('snt-list').innerText = sntFound.join(', ');
        document.getElementById('count-snt').innerText = sntFound.length;
    } else {
        addLog(`Số ${val} không phải số nguyên tố.`);
    }

    renderArrSNT();
    return true;
}

async function startAutoSNT() {
    if (isSimulating) { isSimulating = false; return; }
    isSimulating = true;
    document.getElementById('btn-play').innerText = "⏸ Tạm dừng";
    while (isSimulating && nextStepSNT()) {
        await new Promise(r => setTimeout(r, 1000));
    }
    isSimulating = false;
    document.getElementById('btn-play').innerText = "▶ Chạy tự động";
}
}