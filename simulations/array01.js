let arrA = [];
let currentIdx = -1;
let isSimulating = false;
let accumulator = 0; // Đóng vai trò là Sum hoặc Product
let countElements = 0;
let simType = 'TBC'; // 'TBC' hoặc 'TBN'

function initArray01Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;

    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng TBC & TBN</div>
            
            <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px;">
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <label><b>Mảng A:</b></label>
                    <input type="text" id="input-array" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                    <button onclick="updateData01()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                    <button onclick="randomData01()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <label><b>Chế độ mô phỏng:</b></label>
                    <select id="sim-mode" onchange="reset01()" style="padding: 8px; border-radius: 4px;">
                        <option value="TBC">Tính TBC số ÂM</option>
                        <option value="TBN">Tính TBN số DƯƠNG</option>
                    </select>
                </div>
            </div>

            <div id="array-display" style="display: flex; justify-content: flex-start; gap: 12px; background: #f8fafc; padding: 30px 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 100px; overflow-x: auto; margin-bottom: 20px;"></div>

            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 20px; margin-bottom: 20px; background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #29c702;">
                <div><b id="label-acc">Tổng (Sum):</b> <span id="stat-acc" style="color:red; font-weight:bold;">0</span></div>
                <div><b>Số lượng (Count):</b> <span id="stat-count" style="color:blue; font-weight:bold;">0</span></div>
                <div><b>Kết quả hiện tại:</b> <span id="stat-res" style="font-weight:bold;">0</span></div>
            </div>

            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button onclick="startAuto01()" id="btn-play" class="toggle-btn" style="justify-content: center;">▶ Chạy tự động</button>
                    <button onclick="nextStep01()" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    <button onclick="reset01()" class="toggle-btn" style="background:#64748b; color:white; justify-content: center;">🔄 Reset</button>
                </div>
                <div id="step-log-container" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 120px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                    <div id="log-content"></div>
                </div>
            </div>
        </div>
    `;
    randomData01();
}

function updateData01() {
    const val = document.getElementById('input-array').value;
    arrA = val.split(/[\s,]+/).map(Number).filter(n => !isNaN(n)).slice(0, 15);
    reset01();
}

function randomData01() {
    arrA = Array.from({ length: 8 }, () => Math.floor(Math.random() * 100) - 50);
    document.getElementById('input-array').value = arrA.join(' ');
    reset01();
}

function reset01() {
    isSimulating = false; 
    currentIdx = -1; 
    simType = document.getElementById('sim-mode').value;
    
    if (simType === 'TBC') {
        accumulator = 0; // Tổng bắt đầu từ 0
        document.getElementById('label-acc').innerText = "Tổng (Sum):";
        document.getElementById('log-content').innerHTML = `<div style="color: #6a9955;">// Chế độ: Tính TBC các số < 0</div>`;
    } else {
        accumulator = 1; // Tích bắt đầu từ 1
        document.getElementById('label-acc').innerText = "Tích (Product):";
        document.getElementById('log-content').innerHTML = `<div style="color: #6a9955;">// Chế độ: Tính TBN các số > 0</div>`;
    }
    
    countElements = 0;
    updateStats();
    renderArr01();
}

function renderArr01() {
    const container = document.getElementById('array-display');
    container.innerHTML = '';
    arrA.forEach((val, i) => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 8px;";
        
        const idxBox = document.createElement('div');
        idxBox.innerText = i;
        idxBox.style.cssText = `font-size: 16px; font-weight: 900; color: ${i === currentIdx ? '#f59e0b' : '#94a3b8'};`;
        
        const valBox = document.createElement('div');
        valBox.innerText = val;
        
        // Highlight logic
        let isTarget = (simType === 'TBC' && val < 0) || (simType === 'TBN' && val > 0);
        valBox.style.cssText = `
            width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;
            background: ${isTarget && i <= currentIdx ? '#fee2e2' : 'white'};
            border: 2px solid ${i === currentIdx ? '#f59e0b' : '#0284c7'};
            border-radius: 6px; font-weight: bold; transition: 0.2s;
            color: ${val < 0 ? '#dc2626' : '#1e293b'};
        `;
        if(i === currentIdx) valBox.style.transform = "scale(1.15)";
        
        wrapper.append(idxBox, valBox);
        container.appendChild(wrapper);
    });
}

function updateStats() {
    document.getElementById('stat-acc').innerText = accumulator.toLocaleString();
    document.getElementById('stat-count').innerText = countElements;
    let res = 0;
    if (countElements > 0) {
        res = (simType === 'TBC') ? (accumulator / countElements) : Math.pow(accumulator, 1.0 / countElements);
    }
    document.getElementById('stat-res').innerText = res.toFixed(2);
}

function addLog(msg) {
    const logArea = document.getElementById('log-content');
    logArea.innerHTML += `<div><span style="color: #38bdf8;">></span> ${msg}</div>`;
    document.getElementById('step-log-container').scrollTop = 9999;
}

function nextStep01() {
    if (currentIdx >= arrA.length - 1) {
        if (currentIdx === arrA.length - 1) {
            addLog(`<span style="color:#29c702;">HOÀN TẤT. Kết quả ${simType} cuối cùng là ${document.getElementById('stat-res').innerText}</span>`);
            currentIdx++;
        }
        return false;
    }

    currentIdx++;
    let val = arrA[currentIdx];
    
    if (simType === 'TBC') {
        if (val < 0) {
            accumulator += val;
            countElements++;
            addLog(`A[${currentIdx}] = ${val} (Âm). Tổng mới: ${accumulator}, Đếm: ${countElements}`);
        } else {
            addLog(`A[${currentIdx}] = ${val} (Không phải âm). Bỏ qua.`);
        }
    } else {
        if (val > 0) {
            accumulator *= val;
            countElements++;
            addLog(`A[${currentIdx}] = ${val} (Dương). Tích mới: ${accumulator}, Đếm: ${countElements}`);
        } else {
            addLog(`A[${currentIdx}] = ${val} (Không phải dương). Bỏ qua.`);
        }
    }
    
    updateStats();
    renderArr01();
    return true;
}

async function startAuto01() {
    if (isSimulating) { isSimulating = false; return; }
    isSimulating = true;
    document.getElementById('btn-play').innerText = "⏸ Tạm dừng";
    while (isSimulating && nextStep01()) {
        await new Promise(r => setTimeout(r, 800));
    }
    isSimulating = false;
    document.getElementById('btn-play').innerText = "▶ Chạy tự động";
}