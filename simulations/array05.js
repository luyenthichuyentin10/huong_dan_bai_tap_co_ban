let searchArr = [];
let targetX = 0;
let currentIdx = -1;
let foundIndices = []; // Đây là mảng lưu vị trí tìm thấy
let isSearching = false;

function initArray05Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;

    container.innerHTML = `
        <div class="step-card border-yellow">
            <div class="step-badge bg-yellow">Mô phỏng Tìm kiếm & Lưu vị trí</div>
            
            <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px;">
                <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                    <label><b>Mảng A:</b></label>
                    <input type="text" id="input-array" placeholder="1 2 3 2 5" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                    <button onclick="updateDataFromInput()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                    <button onclick="generateRandomArray5()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                </div>
                <div style="display: flex; gap: 10px; align-items: center;">
                    <label><b>Tìm X:</b></label>
                    <input type="number" id="target-x" value="2" style="width: 80px; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                </div>
            </div>

            <div style="margin-bottom: 40px;">
                <div style="font-weight: bold; color: #0284c7; margin-bottom: 10px;">Mảng dữ liệu A:</div>
                <div id="search-chart" style="display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; gap: 12px; background: #f8fafc; padding: 30px 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 100px;">
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <div style="font-weight: bold; color: #29c702; margin-bottom: 10px;">Mảng vị trí tìm thấy (Kết quả):</div>
                <div id="result-chart" style="display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; gap: 10px; background: #f0fdf4; padding: 20px; border-radius: 8px; border: 2px dashed #29c702; min-height: 60px;">
                </div>
            </div>

            <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px;">
                <div style="display: flex; flex-direction: column; gap: 10px;">
                    <button onclick="startAutoSearch()" id="btn-play" class="toggle-btn" style="justify-content: center;">▶ Chạy tự động</button>
                    <button onclick="nextSearchStep()" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    <button onclick="resetSearch()" class="toggle-btn" style="background:#64748b; color:white; justify-content: center;">🔄 Reset</button>
                </div>
                <div id="step-log-container" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 120px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                    <div id="log-content"></div>
                </div>
            </div>
        </div>
    `;
    generateRandomArray5();
}

function updateDataFromInput() {
    const inputStr = document.getElementById('input-array').value;
    searchArr = inputStr.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
    resetSearch();
}

function generateRandomArray5() {
    searchArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 15) + 1);
    document.getElementById('input-array').value = searchArr.join(' ');
    resetSearch();
}

function resetSearch() {
    isSearching = false;
    currentIdx = -1; // Đặt lại về -1 để bắt đầu từ phần tử đầu tiên (index 0)
    foundIndices = [];
    targetX = parseInt(document.getElementById('target-x').value) || 0;
    document.getElementById('log-content').innerHTML = `<div style="color: #6a9955;">// Sẵn sàng tìm X = ${targetX}</div>`;
    renderAll();
}

function renderAll() {
    // 1. Render mảng A
    const aContainer = document.getElementById('search-chart');
    aContainer.innerHTML = '';
    searchArr.forEach((val, i) => {
        const wrapper = document.createElement('div');
        wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 8px;";
        
        // Index phía trên, size to
        const idxBox = document.createElement('div');
        idxBox.innerText = i;
        idxBox.style.cssText = `font-size: 16px; font-weight: 900; color: ${i === currentIdx ? '#f59e0b' : '#94a3b8'};`;
        
        // Ô giá trị
        const valBox = document.createElement('div');
        valBox.innerText = val;
        valBox.style.cssText = `
            width: 45px; height: 45px; display: flex; align-items: center; justify-content: center;
            background: ${foundIndices.includes(i) ? '#29c702' : 'white'};
            color: ${foundIndices.includes(i) ? 'white' : '#334155'};
            border: 2px solid ${i === currentIdx ? '#f59e0b' : '#0284c7'};
            border-radius: 6px; font-weight: bold; font-size: 1.1rem;
            box-shadow: ${i === currentIdx ? '0 0 15px rgba(245, 158, 11, 0.4)' : 'none'};
            transition: all 0.2s;
        `;
        if(i === currentIdx) valBox.style.transform = "scale(1.1)";

        wrapper.appendChild(idxBox);
        wrapper.appendChild(valBox);
        aContainer.appendChild(wrapper);
    });

    // 2. Render mảng vị trí (Kết quả)
    const rContainer = document.getElementById('result-chart');
    rContainer.innerHTML = '';
    foundIndices.forEach(pos => {
        const resBox = document.createElement('div');
        resBox.innerText = pos;
        resBox.style.cssText = `
            width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;
            background: #29c702; color: white; border-radius: 50%; font-weight: bold;
            animation: popIn 0.3s ease-out;
        `;
        rContainer.appendChild(resBox);
    });
}

function addLog(msg) {
    const logArea = document.getElementById('log-content');
    logArea.innerHTML += `<div><span style="color: #38bdf8;">></span> ${msg}</div>`;
    document.getElementById('step-log-container').scrollTop = 9999;
}

function nextSearchStep() {
    // 1. Kiểm tra nếu đã duyệt hết mảng
    if (currentIdx >= searchArr.length - 1) {
        // Chỉ in log tổng kết một lần duy nhất
        if (!isSearching && currentIdx === searchArr.length - 1) {
            const count = foundIndices.length;
            if (count > 0) {
                addLog(`<span style="color: #29c702; font-weight: bold;">[KẾT THÚC] Tìm thấy ${count} phần tử tại vị trí: ${foundIndices.join(', ')}</span>`);
            } else {
                addLog(`<span style="color: #ff4d4d; font-weight: bold;">[KẾT THÚC] Kết quả: No (Không tìm thấy X)</span>`);
            }
            // Đánh dấu để không in lại log này khi bấm tiếp
            currentIdx++; 
        }
        return false;
    }

    currentIdx++;
    let val = searchArr[currentIdx];
    
    // 2. Logic so sánh
    if (val === targetX) {
        foundIndices.push(currentIdx);
        addLog(`Bước ${currentIdx + 1}: A[${currentIdx}] = ${val} <span style="color:#29c702;">==</span> ${targetX}. <b style="color:#29c702">Khớp!</b>`);
    } else {
        addLog(`Bước ${currentIdx + 1}: A[${currentIdx}] = ${val} != ${targetX}. Bỏ qua.`);
    }

    renderAll();
    return true;
}

async function startAutoSearch() {
    if (isSearching) { isSearching = false; return; }
    isSearching = true;
    document.getElementById('btn-play').innerText = "⏸ Tạm dừng";
    while (isSearching && nextSearchStep()) {
        await new Promise(r => setTimeout(r, 800));
    }
    isSearching = false;
    document.getElementById('btn-play').innerText = "▶ Chạy tự động";
}

// Thêm animation nhỏ cho mảng kết quả
const style = document.createElement('style');
style.innerHTML = `@keyframes popIn { 0% { transform: scale(0); } 100% { transform: scale(1); } }`;
document.head.appendChild(style);