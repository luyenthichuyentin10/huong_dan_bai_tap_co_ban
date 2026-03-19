{
    let arrayA = [];
    let countArr = [];
    let maxA = 0;
    
    let i_idx = 0;
    let simPhase = 1; // 1: Đánh dấu, 2: Quét tìm Max
    
    let bestVal = -1;
    let bestCount = 0;
    
    let isSimulating = false;

    window.initArray17Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Mảng Đánh Dấu (Frequency Array)</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label style="width: 70px;"><b>Mảng A:</b></label>
                        <input type="text" id="input-a-17" value="2 4 2 8 4 2 9 4" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray17()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                        <button onclick="window.resetArray17()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Áp dụng</button>
                    </div>
                </div>

                <div style="font-weight: bold; color: #1e293b; margin-bottom: 10px;">Mảng dữ liệu A (Duyệt để đánh dấu):</div>
                <div id="cont-a-17" style="display: flex; flex-wrap: wrap; gap: 8px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 60px; margin-bottom: 20px;"></div>

                <div style="font-weight: bold; color: #b45309; margin-bottom: 10px;">Mảng phụ Count (Dùng Giá trị làm Chỉ số):</div>
                <div id="cont-count-17" style="display: flex; flex-wrap: wrap; gap: 6px; background: #fffbeb; padding: 15px; border-radius: 8px; border: 2px dashed #f59e0b; min-height: 70px; margin-bottom: 20px;"></div>

                <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="window.autoRun17()" id="btn-auto-17" class="toggle-btn" style="background:#0284c7; color:white; justify-content: center;">▶ Chạy tự động</button>
                        <button onclick="window.nextStep17()" id="btn-next-17" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    </div>
                    <div id="step-log-container-17" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 120px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                        <div id="log-content-17"></div>
                    </div>
                </div>
            </div>
        `;
        window.resetArray17();
    };

    window.randomArray17 = function() {
        // Sinh mảng có giá trị từ 0 -> 9 để hiển thị vừa vặn
        let arr = Array.from({length: 10}, () => Math.floor(Math.random() * 10));
        document.getElementById('input-a-17').value = arr.join(' ');
        window.resetArray17();
    };

    window.resetArray17 = function() {
        isSimulating = false;
        arrayA = document.getElementById('input-a-17').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        
        maxA = Math.max(...arrayA, 0);
        countArr = Array(maxA + 1).fill(0); // Khởi tạo mảng đếm toàn 0
        
        i_idx = 0;
        simPhase = 1;
        bestVal = -1;
        bestCount = 0;

        document.getElementById('log-content-17').innerHTML = `<div style="color: #6a9955;">// [BƯỚC 1] Khởi tạo mảng Count toàn số 0. Bắt đầu duyệt mảng A.</div>`;
        document.getElementById('btn-next-17').disabled = false;
        document.getElementById('btn-auto-17').innerText = "▶ Chạy tự động";
        
        window.renderArray17();
    };

    window.renderArray17 = function() {
        // Render A
        const contA = document.getElementById('cont-a-17');
        contA.innerHTML = '';
        arrayA.forEach((val, idx) => {
            const box = document.createElement('div');
            box.innerText = val;
            let bg = "white"; let border = "#cbd5e1"; let color = "#1e293b";
            
            if (simPhase === 1 && idx === i_idx) {
                bg = "#fef08a"; border = "#f59e0b"; box.style.transform = "scale(1.1)";
            } else if (simPhase === 1 && idx < i_idx) {
                bg = "#f1f5f9"; color = "#94a3b8";
            }

            box.style.cssText += `
                width: 35px; height: 35px; border-radius: 6px; border: 2px solid ${border};
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bg}; color: ${color}; transition: all 0.3s;
            `;
            contA.appendChild(box);
        });

        // Render Count Array
        const contCount = document.getElementById('cont-count-17');
        contCount.innerHTML = '';
        countArr.forEach((val, idx) => {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 3px;";

            const box = document.createElement('div');
            box.innerText = val;
            let bg = "white"; let border = "#fcd34d"; let color = "#b45309";
            
            if (simPhase === 1 && idx === arrayA[i_idx]) {
                bg = "#fde047"; border = "#d97706"; color = "#9a3412"; box.style.transform = "scale(1.2)";
            } else if (simPhase === 2 && idx === i_idx) {
                bg = "#bfdbfe"; border = "#3b82f6"; color = "#1d4ed8"; box.style.transform = "scale(1.1)";
            }
            if (simPhase === 3 && idx === bestVal) {
                bg = "#22c55e"; border = "#16a34a"; color = "white"; box.style.transform = "scale(1.1)";
            }

            box.style.cssText += `
                width: 35px; height: 35px; border-radius: 6px; border: 2px solid ${border};
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bg}; color: ${color}; transition: all 0.3s;
            `;

            const idxLabel = document.createElement('div');
            idxLabel.innerText = `idx:${idx}`;
            idxLabel.style.cssText = `font-size: 10px; font-weight: bold; color: ${idx === bestVal && simPhase === 3 ? '#16a34a' : '#94a3b8'};`;

            wrapper.append(box, idxLabel);
            contCount.appendChild(wrapper);
        });
    };

    window.addLog17 = function(msg) {
        const logArea = document.getElementById('log-content-17');
        logArea.innerHTML += `<div style="margin-bottom: 4px;">> ${msg}</div>`;
        document.getElementById('step-log-container-17').scrollTop = 9999;
    };

    window.nextStep17 = function() {
        if (simPhase === 3) return false;

        if (simPhase === 1) {
            let val = arrayA[i_idx];
            countArr[val]++;
            window.addLog17(`Gặp A[${i_idx}] = ${val}. -> Tăng <b style="color:#b45309">Count[${val}]</b> lên ${countArr[val]}.`);
            
            i_idx++;
            if (i_idx >= arrayA.length) {
                simPhase = 2;
                i_idx = 0;
                window.addLog17(`<span style="color:#0284c7; font-weight:bold;">[BƯỚC 2] Duyệt mảng Count để tìm Max.</span>`);
            }
        } 
        else if (simPhase === 2) {
            let c = countArr[i_idx];
            if (c > bestCount) {
                bestCount = c;
                bestVal = i_idx;
                window.addLog17(`Count[${i_idx}] = ${c} > Max hiện tại. Cập nhật Max!`);
            } else {
                window.addLog17(`Count[${i_idx}] = ${c}. Bỏ qua.`);
            }
            
            i_idx++;
            if (i_idx > maxA) {
                simPhase = 3;
                window.addLog17(`<span style="color:#29c702; font-weight:bold;">[HOÀN TẤT] Số xuất hiện nhiều nhất là ${bestVal} (${bestCount} lần).</span>`);
                document.getElementById('btn-next-17').disabled = true;
            }
        }

        window.renderArray17();
        return (simPhase !== 3);
    };

    window.autoRun17 = function() {
        if (isSimulating) { isSimulating = false; document.getElementById('btn-auto-17').innerText = "▶ Tiếp tục"; return; }
        isSimulating = true;
        document.getElementById('btn-auto-17').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep17();
                if (!hasMore) { isSimulating = false; document.getElementById('btn-auto-17').innerText = "▶ Chạy tự động"; break; }
                await new Promise(r => setTimeout(r, 600)); 
            }
        };
        run();
    };
}