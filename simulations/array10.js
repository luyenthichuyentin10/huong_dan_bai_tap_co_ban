{
    let arrayA = [];
    let n = 0;
    let targetP = 1;
    let kIdx = -1; 
    let sumL = 0;
    let sumR = 0;
    let totalSum = 0;
    let approachMode = 2; // 1: Vét cạn, 2: Tối ưu
    let isSimulating = false;

    window.initArray10Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Đẳng thức mảng (Vách ngăn)</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Mảng A:</b></label>
                        <input type="text" id="input-array-10" placeholder="Ví dụ: 4 6 2 3" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray10()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Hệ số p:</b></label>
                        <input type="number" id="input-p-10" value="2" style="width: 70px; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <label style="margin-left: 20px;"><b>Cách giải:</b></label>
                        <select id="approach-select-10" onchange="window.resetArray10()" style="padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                            <option value="2">Cách 2: Tối ưu (Kế thừa Tổng - O(N))</option>
                            <option value="1">Cách 1: Vét cạn (Tính lại từ đầu - O(N²))</option>
                        </select>
                        <button onclick="window.resetArray10()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Thiết lập</button>
                    </div>
                </div>

                <div id="array-container-10" style="display: flex; justify-content: flex-start; align-items: center; gap: 6px; background: #f8fafc; padding: 30px 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 80px; overflow-x: auto; margin-bottom: 20px;">
                </div>

                <div style="display: flex; gap: 20px; margin-bottom: 20px;">
                    <div style="flex: 1; background: #eff6ff; padding: 15px; border-radius: 8px; border: 2px solid #3b82f6; text-align: center;">
                        <div style="font-size: 0.9rem; color: #1e40af; font-weight: bold; margin-bottom: 5px;">TỔNG NỬA TRÁI (SumL)</div>
                        <div id="val-sumL" style="font-size: 1.5rem; font-weight: bold; color: #2563eb;">0</div>
                    </div>
                    <div style="display: flex; align-items: center; font-size: 1.5rem; font-weight: bold; color: #64748b;">
                        = <span id="val-p" style="color: #ef4444; margin: 0 5px;">?</span> ×
                    </div>
                    <div style="flex: 1; background: #fff7ed; padding: 15px; border-radius: 8px; border: 2px solid #f97316; text-align: center;">
                        <div style="font-size: 0.9rem; color: #9a3412; font-weight: bold; margin-bottom: 5px;">TỔNG NỬA PHẢI (SumR)</div>
                        <div id="val-sumR" style="font-size: 1.5rem; font-weight: bold; color: #ea580c;">0</div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="window.autoRun10()" id="btn-auto-10" class="toggle-btn" style="background:#0284c7; color:white; justify-content: center;">▶ Chạy tự động</button>
                        <button onclick="window.nextStep10()" id="btn-next-10" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    </div>
                    <div id="step-log-container-10" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 110px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                        <div id="log-content-10"></div>
                    </div>
                </div>
            </div>
        `;
        window.randomArray10();
    };

    window.randomArray10 = function() {
        // Tạo một mảng có khả năng ra kết quả đúng để học sinh dễ thấy
        // Ví dụ: SumL = 10, SumR = 5, p = 2
        arrayA = [5, -10, 4, 6, -3, 2, -7, 12, 4, 8, 1, 2, -3, 7, 0];
        document.getElementById('input-array-10').value = arrayA.join(' ');
        document.getElementById('input-p-10').value = 3;
        window.resetArray10();
    };

    window.resetArray10 = function() {
        isSimulating = false;
        const inputStr = document.getElementById('input-array-10').value;
        arrayA = inputStr.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        n = arrayA.length;
        targetP = parseInt(document.getElementById('input-p-10').value) || 1;
        approachMode = parseInt(document.getElementById('approach-select-10').value);
        
        kIdx = -1;
        sumL = 0;
        sumR = 0;
        totalSum = arrayA.reduce((a, b) => a + b, 0);

        if (approachMode === 2) {
            sumR = totalSum; // Khởi tạo tối ưu
            window.addLog10(`Khởi tạo tối ưu: Tính trước Tổng mảng = ${totalSum}. Gán SumR = ${totalSum}, SumL = 0.`);
        } else {
            window.addLog10(`Khởi tạo Vét cạn: Mỗi bước k sẽ phải lặp for() để tính lại SumL và SumR từ số 0.`);
        }

        document.getElementById('val-p').innerText = targetP;
        document.getElementById('btn-next-10').disabled = false;
        document.getElementById('btn-auto-10').innerText = "▶ Chạy tự động";
        window.renderArray10();
    };

    window.renderArray10 = function() {
        const container = document.getElementById('array-container-10');
        container.innerHTML = '';

        for (let i = 0; i < n; i++) {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 5px; position: relative;";

            const box = document.createElement('div');
            box.innerText = arrayA[i];
            
            // Màu sắc theo nhóm (Nhóm Trái: Xanh dương, Nhóm Phải: Cam)
            let isLeft = i <= kIdx;
            box.style.cssText = `
                width: 45px; height: 45px; border-radius: 6px;
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                border: 2px solid ${isLeft ? '#3b82f6' : '#f97316'};
                background: ${isLeft ? '#eff6ff' : '#fff7ed'};
                color: ${isLeft ? '#1d4ed8' : '#c2410c'};
                transition: all 0.3s;
            `;

            const idxLabel = document.createElement('div');
            idxLabel.innerText = i;
            idxLabel.style.cssText = "font-size: 10px; color: #94a3b8;";

            wrapper.append(box, idxLabel);
            container.appendChild(wrapper);

            // Vẽ VÁCH NGĂN (Partition line)
            if (i === kIdx && i < n - 1) {
                const divider = document.createElement('div');
                divider.style.cssText = `
                    width: 4px; height: 60px; background: #ef4444; border-radius: 2px;
                    margin: 0 5px; box-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
                `;
                container.appendChild(divider);
            }
        }

        document.getElementById('val-sumL').innerText = sumL;
        document.getElementById('val-sumR').innerText = sumR;
    };

    window.addLog10 = function(msg) {
        const logArea = document.getElementById('log-content-10');
        logArea.innerHTML += `<div>> ${msg}</div>`;
        document.getElementById('step-log-container-10').scrollTop = 9999;
    };

    window.nextStep10 = function() {
        if (kIdx >= n - 2) {
            window.addLog10(`<span style="color:#ef4444; font-weight:bold;">Đã duyệt hết các vách ngăn hợp lệ. Kết quả: No</span>`);
            document.getElementById('btn-next-10').disabled = true;
            return false;
        }

        kIdx++;
        let currentVal = arrayA[kIdx];

        if (approachMode === 2) {
            // Tối ưu: Chỉ cộng/trừ
            sumL += currentVal;
            sumR -= currentVal;
            window.addLog10(`Dời vách ngăn qua vị trí ${kIdx}: <span style="color:#3b82f6">SumL += ${currentVal}</span>, <span style="color:#ea580c">SumR -= ${currentVal}</span> (Tốn O(1))`);
        } else {
            // Vét cạn: Tính lại từ đầu
            sumL = 0; sumR = 0;
            for(let i=0; i<=kIdx; i++) sumL += arrayA[i];
            for(let i=kIdx+1; i<n; i++) sumR += arrayA[i];
            window.addLog10(`Vách ngăn ${kIdx}: <span style="color:#64748b">Dùng vòng lặp quét lại từ đầu mảng để tính SumL, SumR (Tốn O(N))</span>`);
        }

        window.renderArray10();

        // Kiểm tra điều kiện
        if (sumL === targetP * sumR) {
            window.addLog10(`<span style="color:#29c702; font-weight:bold;">ĐÚNG ĐIỀU KIỆN! ${sumL} = ${targetP} * ${sumR}. <br>Vị trí k = ${kIdx + 1} (1-based index).</span>`);
            document.getElementById('btn-next-10').disabled = true;
            return false; // Dừng mô phỏng
        } else {
            window.addLog10(`So sánh: ${sumL} != ${targetP * sumR} -> Tiếp tục.`);
            return true;
        }
    };

    window.autoRun10 = function() {
        if (isSimulating) { isSimulating = false; document.getElementById('btn-auto-10').innerText = "▶ Tiếp tục"; return; }
        isSimulating = true;
        document.getElementById('btn-auto-10').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep10();
                if (!hasMore) { isSimulating = false; document.getElementById('btn-auto-10').innerText = "▶ Chạy tự động"; break; }
                await new Promise(r => setTimeout(r, 1500)); // Để trễ một chút để dễ đọc Log
            }
        };
        run();
    };
}