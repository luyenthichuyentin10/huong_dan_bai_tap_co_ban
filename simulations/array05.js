{
    let searchArr = [];
    let targetX = 0;
    let currentIdx = -1;
    let foundIndices = [];
    let isSearching = false;
    let approachMode = 1; 
    let searchPhase = 1; // Phase 1: Đếm, Phase 2: Xuất vị trí
    let countTemp = 0;   // Biến đếm số lượng cho PA 1

    window.initArray05Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Tìm kiếm: Tốc độ vs Bộ nhớ</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 30px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Mảng A:</b></label>
                        <input type="text" id="input-array" placeholder="1 2 3 2 5" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.updateDataFromInput()" class="toggle-btn" style="background:#0284c7; color:white;">💾 Cập nhật</button>
                        <button onclick="window.generateRandomArray5()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Tìm X:</b></label>
                        <input type="number" id="target-x" value="2" style="width: 80px; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <label style="margin-left: 20px;"><b>Phương án:</b></label>
                        <select id="approach-select" onchange="window.resetSearch()" style="padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                            <option value="1">PA 1: Tối ưu bộ nhớ (Duyệt 2 lần)</option>
                            <option value="2">PA 2: Tối ưu tốc độ (Dùng mảng phụ)</option>
                        </select>
                    </div>
                </div>

                <div style="margin-bottom: 40px;">
                    <div style="font-weight: bold; color: #0284c7; margin-bottom: 10px;">Mảng dữ liệu A:</div>
                    <div id="search-chart" style="display: flex; justify-content: flex-start; align-items: flex-start; flex-wrap: wrap; gap: 12px; background: #f8fafc; padding: 30px 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 100px;">
                    </div>
                </div>

                <div id="result-area" style="margin-bottom: 20px;"></div>

                <div style="display: grid; grid-template-columns: 200px 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="window.startAutoSearch()" id="btn-play" class="toggle-btn" style="justify-content: center;">▶ Chạy tự động</button>
                        <button onclick="window.nextSearchStep()" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                        <button onclick="window.resetSearch()" class="toggle-btn" style="background:#64748b; color:white; justify-content: center;">🔄 Reset</button>
                    </div>
                    <div id="step-log-container" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 120px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                        <div id="log-content"></div>
                    </div>
                </div>
            </div>
        `;
        window.generateRandomArray5();
    };

    window.updateDataFromInput = function() {
        const inputStr = document.getElementById('input-array').value;
        searchArr = inputStr.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        window.resetSearch();
    };

    window.generateRandomArray5 = function() {
        searchArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 15) + 1);
        document.getElementById('input-array').value = searchArr.join(' ');
        window.resetSearch();
    };

    window.resetSearch = function() {
        isSearching = false;
        currentIdx = -1;
        foundIndices = [];
        searchPhase = 1;
        countTemp = 0;
        targetX = parseInt(document.getElementById('target-x').value) || 0;
        approachMode = parseInt(document.getElementById('approach-select').value);
        
        const resultArea = document.getElementById('result-area');
        if (approachMode === 1) {
            resultArea.innerHTML = `<div style="padding: 15px; background: #fff7ed; border: 1px solid #fdba74; border-radius: 8px; color: #9a3412;">
                <b>PA 1 (Tối ưu bộ nhớ):</b> Duyệt Lần 1 để đếm. Nếu tìm thấy X mới Duyệt Lần 2 để in vị trí.
            </div>`;
        } else {
            resultArea.innerHTML = `
                <div style="font-weight: bold; color: #29c702; margin-bottom: 10px;">Mảng vị trí (Lưu trữ đồng thời):</div>
                <div id="result-chart" style="display: flex; justify-content: flex-start; align-items: center; flex-wrap: wrap; gap: 10px; background: #f0fdf4; padding: 20px; border-radius: 8px; border: 2px dashed #29c702; min-height: 60px;"></div>
            `;
        }

        document.getElementById('log-content').innerHTML = `<div style="color: #6a9955;">// Chế độ: Phương án ${approachMode}</div>`;
        window.renderAll();
    };

    window.renderAll = function() {
        const aContainer = document.getElementById('search-chart');
        aContainer.innerHTML = '';
        searchArr.forEach((val, i) => {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 8px;";
            const idxBox = document.createElement('div');
            idxBox.innerText = i;
            idxBox.style.cssText = `font-size: 16px; font-weight: 900; color: ${i === currentIdx ? '#f59e0b' : '#94a3b8'};`;
            
            // Logic highlight cho PA 1 Lần 2 hoặc PA 2
            let isMatched = (approachMode === 2 && foundIndices.includes(i)) || 
                             (approachMode === 1 && searchPhase === 2 && searchArr[i] === targetX && i <= currentIdx);

            const valBox = document.createElement('div');
            valBox.innerText = val;
            valBox.style.cssText = `
                width: 45px; height: 45px; display: flex; align-items: center; justify-content: center;
                background: ${isMatched ? '#29c702' : 'white'};
                color: ${isMatched ? 'white' : '#334155'};
                border: 2px solid ${i === currentIdx ? '#f59e0b' : '#0284c7'};
                border-radius: 6px; font-weight: bold; font-size: 1.1rem;
                transition: all 0.2s;
            `;
            if(i === currentIdx) valBox.style.transform = "scale(1.1)";
            wrapper.append(idxBox, valBox);
            aContainer.appendChild(wrapper);
        });

        if (approachMode === 2) {
            const rContainer = document.getElementById('result-chart');
            if (rContainer) {
                rContainer.innerHTML = '';
                foundIndices.forEach(pos => {
                    const resBox = document.createElement('div');
                    resBox.innerText = pos;
                    resBox.style.cssText = `width: 35px; height: 35px; display: flex; align-items: center; justify-content: center; background: #29c702; color: white; border-radius: 50%; font-weight: bold; animation: popIn 0.3s ease-out;`;
                    rContainer.appendChild(resBox);
                });
            }
        }
    };

    window.addLog = function(msg) {
        const logArea = document.getElementById('log-content');
        logArea.innerHTML += `<div><span style="color: #38bdf8;">></span> ${msg}</div>`;
        document.getElementById('step-log-container').scrollTop = 9999;
    };

    window.nextSearchStep = function() {
        if (approachMode === 2) {
            // PHƯƠNG ÁN 2: DUYỆT 1 LẦN
            if (currentIdx >= searchArr.length - 1) {
                if (!isSearching) window.addLog(`<span style="color: #29c702;">[Xong] PA2 Duyệt 1 lần: Tìm thấy ${foundIndices.length} vị trí.</span>`);
                return false;
            }
            currentIdx++;
            if (searchArr[currentIdx] === targetX) {
                foundIndices.push(currentIdx);
                window.addLog(`A[${currentIdx}] == ${targetX}: <b style="color:#29c702">Lưu vị trí</b>`);
            } else {
                window.addLog(`A[${currentIdx}] != ${targetX}`);
            }
        } else {
            // PHƯƠNG ÁN 1: DUYỆT 2 LẦN
            if (searchPhase === 1) {
                if (currentIdx >= searchArr.length - 1) {
                    // KẾT THÚC LẦN 1
                    if (countTemp === 0) {
                        window.addLog(`<span style="color: #ff4d4d; font-weight: bold;">[KẾT THÚC] Không tìm thấy X. Xuất: No. (Dừng duyệt Lần 2)</span>`);
                        isSearching = false;
                        return false; 
                    } else {
                        searchPhase = 2;
                        currentIdx = -1;
                        window.addLog(`<span style="color: #f59e0b; font-weight: bold;">[Xong Lần 1] Tìm thấy ${countTemp}. Bắt đầu Lần 2 để báo vị trí...</span>`);
                        window.renderAll();
                        return true;
                    }
                }
                currentIdx++;
                if (searchArr[currentIdx] === targetX) {
                    countTemp++;
                    window.addLog(`Lần 1 - A[${currentIdx}]: <b style="color:#29c702">Tăng biến đếm</b>`);
                } else {
                    window.addLog(`Lần 1 - A[${currentIdx}]: Bỏ qua`);
                }
            } else {
                // GIAI ĐOẠN 2: BÁO VỊ TRÍ
                if (currentIdx >= searchArr.length - 1) {
                    window.addLog(`<span style="color: #29c702; font-weight: bold;">[Xong Lần 2] Đã báo đủ ${countTemp} vị trí.</span>`);
                    return false;
                }
                currentIdx++;
                if (searchArr[currentIdx] === targetX) {
                    window.addLog(`Lần 2 - A[${currentIdx}]: <b style="color:#29c702">Xuất vị trí ${currentIdx}</b>`);
                } else {
                    window.addLog(`Lần 2 - A[${currentIdx}]: Bỏ qua`);
                }
            }
        }
        window.renderAll();
        return true;
    };

    window.startAutoSearch = function() {
        if (isSearching) { isSearching = false; return; }
        isSearching = true;
        document.getElementById('btn-play').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSearching && window.nextSearchStep()) {
                await new Promise(r => setTimeout(r, 600));
            }
            isSearching = false;
            document.getElementById('btn-play').innerText = "▶ Chạy tự động";
        };
        run();
    };

    const style = document.createElement('style');
    style.innerHTML = `@keyframes popIn { 0% { transform: scale(0); } 100% { transform: scale(1); } }`;
    document.head.appendChild(style);
}