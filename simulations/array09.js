{
    let arrayA = [];
    let targetX = 0;
    let currentIdx = -1;
    let bestIdx = 0;
    let minDist = Infinity;
    let isSimulating = false;

    window.initArray09Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Khoảng cách nhỏ nhất</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Mảng A:</b></label>
                        <input type="text" id="input-array-9" value="5 7 2 -9 8 6 -4 5 5 4" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray09()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <label><b>Giá trị X:</b></label>
                        <input type="number" id="input-x-9" value="3" style="width: 70px; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.resetArray09()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Thiết lập</button>
                    </div>
                </div>

                <div id="status-msg-9" style="margin-bottom: 15px; font-weight: bold; color: #1e293b; padding: 10px; background: #f1f5f9; border-radius: 4px; min-height: 45px;">
                    Sẵn sàng tìm vị trí gần X nhất.
                </div>

                <div id="array-container-9" style="display: flex; justify-content: flex-start; align-items: flex-end; gap: 12px; background: #f8fafc; padding: 30px 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 150px; overflow-x: auto; margin-bottom: 20px;">
                </div>

                <div style="display: flex; gap: 10px;">
                    <button onclick="window.autoRun09()" id="btn-auto-9" class="toggle-btn" style="background:#0284c7; color:white;">▶ Chạy tự động</button>
                    <button onclick="window.nextStep09()" id="btn-next-9" class="toggle-btn" style="background:#29c702; color:white;">⏭ Từng bước</button>
                    <button onclick="window.resetArray09()" class="toggle-btn" style="background:#64748b; color:white;">🔄 Reset</button>
                </div>
            </div>
        `;
        window.resetArray09();
    };

    window.randomArray09 = function() {
        let temp = Array.from({ length: 8 }, () => Math.floor(Math.random() * 21) - 10);
        document.getElementById('input-array-9').value = temp.join(' ');
        window.resetArray09();
    };

    window.resetArray09 = function() {
        isSimulating = false;
        const inputStr = document.getElementById('input-array-9').value;
        arrayA = inputStr.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        targetX = parseInt(document.getElementById('input-x-9').value);
        
        currentIdx = -1;
        bestIdx = 0;
        minDist = Infinity;
        
        document.getElementById('btn-next-9').disabled = false;
        document.getElementById('btn-auto-9').innerText = "▶ Chạy tự động";
        document.getElementById('status-msg-9').innerHTML = `Đang tìm số có khoảng cách đến <b>${targetX}</b> nhỏ nhất.`;
        window.renderArray09();
    };

    window.renderArray09 = function() {
        const container = document.getElementById('array-container-9');
        container.innerHTML = '';

        arrayA.forEach((val, i) => {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 5px; min-width: 55px;";

            const dist = Math.abs(val - targetX);
            
            // Ô chứa khoảng cách (phía trên)
            const distBox = document.createElement('div');
            distBox.innerText = `d=${dist}`;
            distBox.style.cssText = `font-size: 11px; font-weight: bold; color: ${i === currentIdx ? '#f59e0b' : '#64748b'}; visibility: ${i <= currentIdx ? 'visible' : 'hidden'}`;

            // Ô chứa giá trị mảng
            const box = document.createElement('div');
            box.innerText = val;
            
            let bgColor = "white";
            let borderColor = "#0284c7";
            if (i === currentIdx) { bgColor = "#fef08a"; borderColor = "#f59e0b"; }
            if (i === bestIdx && currentIdx >= 0) { bgColor = "#29c702"; borderColor = "#1a8a01"; box.style.color = "white"; }

            box.style.cssText = `
                width: 45px; height: 45px; border: 2px solid ${borderColor}; border-radius: 6px;
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bgColor}; transition: all 0.3s;
                ${i === currentIdx ? "transform: scale(1.1);" : ""}
            `;

            const idxLabel = document.createElement('div');
            idxLabel.innerText = i;
            idxLabel.style.cssText = "font-size: 10px; color: #94a3b8;";

            wrapper.append(distBox, box, idxLabel);
            container.appendChild(wrapper);
        });
    };

    window.nextStep09 = function() {
        if (currentIdx >= arrayA.length - 1) {
            document.getElementById('status-msg-9').innerHTML = `<span style="color:#15803d">Hoàn tất! Vị trí gần nhất là <b>${bestIdx}</b> với khoảng cách là <b>${minDist}</b>.</span>`;
            document.getElementById('btn-next-9').disabled = true;
            return false;
        }

        currentIdx++;
        let currentDist = Math.abs(arrayA[currentIdx] - targetX);
        
        if (currentDist < minDist) {
            minDist = currentDist;
            bestIdx = currentIdx;
            document.getElementById('status-msg-9').innerHTML = `Tìm thấy khoảng cách mới nhỏ hơn: <b>${minDist}</b> tại vị trí <b>${currentIdx}</b>.`;
        } else {
            document.getElementById('status-msg-9').innerHTML = `A[${currentIdx}] có khoảng cách ${currentDist} &ge; ${minDist}. Bỏ qua.`;
        }

        window.renderArray09();
        return true;
    };

    window.autoRun09 = function() {
        if (isSimulating) { isSimulating = false; document.getElementById('btn-auto-9').innerText = "▶ Tiếp tục"; return; }
        isSimulating = true;
        document.getElementById('btn-auto-9').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep09();
                if (!hasMore) { isSimulating = false; document.getElementById('btn-auto-9').innerText = "▶ Chạy tự động"; break; }
                await new Promise(r => setTimeout(r, 800));
            }
        };
        run();
    };
}