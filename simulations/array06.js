let originalArr = []; 
let currentArr = [];  
let isSimulating = false;
let targetX = 0;
let targetY = 0;
let simMode = 'VT'; 

// Biến quản lý trạng thái từng bước
let stepI = -1; // Chỉ số dồn hiện tại
let stepJ = -1; // Dùng cho xóa tất cả X
let isFinished = false;

function initArray06Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;

    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Xóa mảng (Điều khiển chuẩn)</div>
            
            <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <label><b>Mảng A:</b></label>
                    <input type="text" id="input-array" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                    <button onclick="randomData06()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <label><b>Thao tác:</b></label>
                    <select id="delete-mode" onchange="reset06()" style="padding: 8px; border-radius: 4px;">
                        <option value="VT">Xóa tại vị trí X</option>
                        <option value="X_ALL">Xóa tất cả giá trị X</option>
                        <option value="TO_HEAD">Xóa từ X về đầu mảng</option>
                        <option value="TO_TAIL">Xóa từ X đến cuối mảng</option>
                        <option value="RANGE">Xóa từ X đi Y phần tử</option>
                    </select>
                    <label><b>X:</b></label> <input type="number" id="input-x" value="2" style="width: 55px; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                    <label><b>Y:</b></label> <input type="number" id="input-y" value="2" style="width: 55px; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                    <button onclick="reset06()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Thiết lập</button>
                </div>
            </div>

            <div style="font-weight: bold; color: #64748b; margin-bottom: 5px;">Mảng A (Ban đầu):</div>
            <div id="original-display" style="display: flex; gap: 10px; background: #f1f5f9; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; min-height: 80px; overflow-x: auto; margin-bottom: 20px; opacity: 0.7;"></div>

            <div style="font-weight: bold; color: #ef4444; margin-bottom: 5px;">Mảng đang xử lý (Dồn hàng):</div>
            <div id="current-display" style="display: flex; gap: 10px; background: #fff5f5; padding: 20px; border-radius: 8px; border: 2px solid #f87171; min-height: 80px; overflow-x: auto; margin-bottom: 20px;"></div>

            <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button onclick="startAuto06()" id="btn-play" class="toggle-btn" style="justify-content: center; background: #ef4444; color:white;">▶ Chạy tự động</button>
                    <button onclick="nextStep06()" class="toggle-btn" style="justify-content: center; background: #29c702; color:white;">⏭ Từng bước</button>
                    <button onclick="reset06()" class="toggle-btn" style="background:#64748b; color:white; justify-content: center;">🔄 Làm lại</button>
                </div>
                <div id="step-log-container" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 110px; overflow-y: auto; border-left: 4px solid #ef4444;">
                    <div id="log-content"></div>
                </div>
            </div>
        </div>
    `;
    randomData06();
}

function randomData06() {
    let temp = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    document.getElementById('input-array').value = temp.join(' ');
    reset06();
}

function reset06() {
    isSimulating = false;
    isFinished = false;
    simMode = document.getElementById('delete-mode').value;
    targetX = parseInt(document.getElementById('input-x').value);
    targetY = parseInt(document.getElementById('input-y').value);
    
    originalArr = document.getElementById('input-array').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    currentArr = [...originalArr]; 

    // Reset con trỏ thuật toán
    stepI = -1; 
    stepJ = -1;

    document.getElementById('log-content').innerHTML = `<div style="color: #6a9955;">// Sẵn sàng. Nhấn 'Từng bước' để bắt đầu.</div>`;
    renderAll();
}

function renderAll(target = -1, source = -1) {
    renderArray('original-display', originalArr, [], "#64748b");
    renderArray('current-display', currentArr, [target, source], "#ef4444");
}

function renderArray(id, data, hi, color) {
    const container = document.getElementById(id);
    container.innerHTML = '';
    data.forEach((val, i) => {
        const box = document.createElement('div');
        box.innerText = val;
        let isT = i === hi[0]; let isS = i === hi[1];
        box.style.cssText = `
            min-width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
            background: ${isS ? '#fbbf24' : (isT ? color : 'white')}; 
            color: ${isS || isT ? 'white' : '#1e293b'};
            border: 2px solid ${color}; border-radius: 4px; font-weight: bold; position: relative;
        `;
        const idx = document.createElement('span');
        idx.innerText = i;
        idx.style.cssText = "position: absolute; top: -18px; font-size: 10px; color: #94a3b8;";
        box.appendChild(idx);
        container.appendChild(box);
    });
}

function addLog(msg) {
    const logArea = document.getElementById('log-content');
    logArea.innerHTML += `<div>> ${msg}</div>`;
    document.getElementById('step-log-container').scrollTop = 9999;
}

// HÀM QUAN TRỌNG: THỰC HIỆN ĐÚNG 1 BƯỚC NHỎ
function nextStep06() {
    if (isFinished) return false;

    // 1. CHẾ ĐỘ XÓA TẠI VỊ TRÍ X
    if (simMode === 'VT' || simMode === 'RANGE' || simMode === 'TO_HEAD' || simMode === 'X_ALL') {
        
        // Khởi tạo vị trí bắt đầu xóa nếu mới ấn
        if (stepI === -1) {
            if (simMode === 'VT') stepI = targetX;
            else if (simMode === 'RANGE') stepI = targetX;
            else if (simMode === 'TO_HEAD') stepI = 0;
            else if (simMode === 'X_ALL') {
                // Tìm X đầu tiên
                for(let k=0; k<currentArr.length; k++) {
                    if(currentArr[k] === targetX) { stepI = k; break; }
                }
                if (stepI === -1) { addLog("Không tìm thấy X."); isFinished = true; return false; }
            }
            
            // Kiểm tra tính hợp lệ
            if (stepI < 0 || stepI >= currentArr.length) {
                addLog("Vị trí không hợp lệ."); isFinished = true; return false;
            }
            
            stepJ = (simMode === 'RANGE') ? targetY : (simMode === 'TO_HEAD' ? targetX + 1 : 1);
            addLog(`Bắt đầu xóa từ vị trí ${stepI}...`);
        }

        // Thực hiện dồn 1 phần tử
        if (stepI < currentArr.length - stepJ) {
            let sourceIdx = stepI + stepJ;
            addLog(`Dồn A[${sourceIdx}] (${currentArr[sourceIdx]}) đè lên A[${stepI}]`);
            renderAll(stepI, sourceIdx);
            currentArr[stepI] = currentArr[sourceIdx];
            stepI++;
            return true;
        } else {
            // Kết thúc dồn hàng cho 1 lần xóa
            for(let k=0; k<stepJ; k++) currentArr.pop();
            renderAll();
            
            if (simMode === 'X_ALL') {
                // Sau khi xóa xong 1 con X, tìm con X tiếp theo
                stepI = -1; // Reset để tìm lại từ đầu hoặc từ vị trí hiện tại
                for(let k=0; k<currentArr.length; k++) {
                    if(currentArr[k] === targetX) { stepI = k; break; }
                }
                if (stepI !== -1) {
                    addLog(`Tiếp tục tìm thấy X tại ${stepI}, dồn tiếp...`);
                    return true;
                }
            }

            addLog(`<span style="color:#29c702">Hoàn tất thao tác xóa.</span>`);
            isFinished = true;
            renderAll();
            return false;
        }
    }

    // CHẾ ĐỘ XÓA ĐẾN CUỐI
    if (simMode === 'TO_TAIL') {
        addLog(`Cắt mảng từ vị trí ${targetX}`);
        currentArr = currentArr.slice(0, targetX);
        renderAll();
        isFinished = true;
        return false;
    }
}

async function startAuto06() {
    if (isSimulating) { isSimulating = false; return; }
    isSimulating = true;
    document.getElementById('btn-play').innerText = "⏸ Tạm dừng";
    while (isSimulating) {
        let hasMore = nextStep06();
        if (!hasMore) break;
        await new Promise(r => setTimeout(r, 600));
    }
    isSimulating = false;
    document.getElementById('btn-play').innerText = "▶ Chạy tự động";
}