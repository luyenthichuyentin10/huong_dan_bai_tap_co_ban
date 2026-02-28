{
let arrA = [];
let currentIdx = -1;
let isSimulating = false;
let bestValue = 0; // Lưu trữ Max hoặc Min tạm thời
let simType = 'MAX';

function initArray02Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;

    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Tìm MAX / MIN</div>
            
            <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px;">
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <label><b>Mảng A:</b></label>
                    <input type="text" id="input-array" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                    <button onclick="updateData02()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                    <button onclick="randomData02()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <label><b>Chế độ:</b></label>
                    <select id="sim-mode" onchange="reset02()" style="padding: 8px; border-radius: 4px;">
                        <option value="MAX">Tìm Giá trị Lớn nhất (MAX)</option>
                        <option value="MIN">Tìm Giá trị Nhỏ nhất (MIN)</option>
                    </select>
                </div>
            </div>

            <div id="array-display" style="display: flex; justify-content: flex-start; gap: 12px; background: #f8fafc; padding: 30px 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 100px; overflow-x: auto; margin-bottom: 20px;"></div>

            <div style="background: #eff6ff; padding: 15px; border-radius: 8px; border: 1px solid #3b82f6; margin-bottom: 20px; text-align: center;">
                <b style="font-size: 1.1rem;">Giá trị <span id="label-best">MAX</span> tạm thời: </b>
                <span id="stat-best" style="font-size: 1.5rem; color: #1e40af; font-weight: bold;">?</span>
            </div>

            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button onclick="startAuto02()" id="btn-play" class="toggle-btn" style="justify-content: center;">▶ Chạy tự động</button>
                    <button onclick="nextStep02()" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    <button onclick="reset02()" class="toggle-btn" style="background:#64748b; color:white; justify-content: center;">🔄 Reset</button>
                </div>
                <div id="step-log-container" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 120px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                    <div id="log-content"></div>
                </div>
            </div>
        </div>
    `;
    randomData02();
}

function updateData02() {
    const val = document.getElementById('input-array').value;
    arrA = val.split(/[\s,]+/).map(Number).filter(n => !isNaN(n)).slice(0, 15);
    reset02();
}

function randomData02() {
    arrA = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100) + 1);
    document.getElementById('input-array').value = arrA.join(' ');
    reset02();
}

function reset02() {
    isSimulating = false; currentIdx = -1;
    simType = document.getElementById('sim-mode').value;
    document.getElementById('label-best').innerText = simType;
    document.getElementById('stat-best').innerText = "?";
    document.getElementById('log-content').innerHTML = `<div style="color: #6a9955;">// Nhấn 'Từng bước' để bắt đầu giả định từ A[0]</div>`;
    renderArr02();
}

function renderArr02() {
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
        valBox.style.cssText = `
            width: 50px; height: 50px; display: flex; align-items: center; justify-content: center;
            background: ${val === bestValue && currentIdx >= 0 ? '#dcfce7' : 'white'};
            border: 2px solid ${i === currentIdx ? '#f59e0b' : (val === bestValue && currentIdx >= 0 ? '#22c55e' : '#0284c7')};
            border-radius: 6px; font-weight: bold; transition: 0.3s;
        `;
        if(i === currentIdx) valBox.style.transform = "scale(1.2)";
        
        wrapper.append(idxBox, valBox);
        container.appendChild(wrapper);
    });
}

function addLog(msg) {
    const logArea = document.getElementById('log-content');
    logArea.innerHTML += `<div><span style="color: #38bdf8;">></span> ${msg}</div>`;
    document.getElementById('step-log-container').scrollTop = 9999;
}

function nextStep02() {
    if (arrA.length === 0) return false;

    if (currentIdx === -1) {
        currentIdx = 0;
        bestValue = arrA[0];
        addLog(`Bắt đầu: Giả sử ${simType} là phần tử đầu tiên A[0] = <b>${bestValue}</b>`);
    } else if (currentIdx < arrA.length - 1) {
        currentIdx++;
        let val = arrA[currentIdx];
        let updated = false;

        if (simType === 'MAX') {
            if (val > bestValue) {
                addLog(`A[${currentIdx}] = ${val} <b style="color:#29c702;"> > </b> ${bestValue}. Cập nhật MAX mới!`);
                bestValue = val;
                updated = true;
            } else {
                addLog(`A[${currentIdx}] = ${val} <= ${bestValue}. Giữ nguyên MAX.`);
            }
        } else {
            if (val < bestValue) {
                addLog(`A[${currentIdx}] = ${val} <b style="color:#29c702;"> < </b> ${bestValue}. Cập nhật MIN mới!`);
                bestValue = val;
                updated = true;
            } else {
                addLog(`A[${currentIdx}] = ${val} >= ${bestValue}. Giữ nguyên MIN.`);
            }
        }
    } else {
        addLog(`<span style="color:#29c702; font-weight:bold;">KẾT THÚC: Giá trị ${simType} của mảng là ${bestValue}</span>`);
        return false;
    }

    document.getElementById('stat-best').innerText = bestValue;
    renderArr02();
    return true;
}

async function startAuto02() {
    if (isSimulating) { isSimulating = false; return; }
    isSimulating = true;
    document.getElementById('btn-play').innerText = "⏸ Tạm dừng";
    while (isSimulating && nextStep02()) {
        await new Promise(r => setTimeout(r, 800));
    }
    isSimulating = false;
    document.getElementById('btn-play').innerText = "▶ Chạy tự động";
}
}