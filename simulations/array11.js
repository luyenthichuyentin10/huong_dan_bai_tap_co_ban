{
    let arrayA = [];
    let n = 0;
    let simMode = 'SYMMETRY'; // SYMMETRY, MONOTONIC, PERIODIC, SORT
    
    // State variables
    let isSimulating = false;
    let stepI = 0;
    let stepJ = 0;
    let flag1 = true; // isInc / isSymmetric / ok
    let flag2 = true; // isDec
    let currentP = 1; // Cho tuần hoàn

    window.initArray11Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Các tính chất Mảng</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Mảng A:</b></label>
                        <input type="text" id="input-array-11" placeholder="1 2 3 2 1" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray11()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Chọn mô phỏng:</b></label>
                        <select id="sim-mode-11" onchange="window.resetArray11()" style="padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1; font-weight: bold;">
                            <option value="SYMMETRY">1. Kiểm tra tính Đối xứng</option>
                            <option value="MONOTONIC">2. Kiểm tra tính Đơn điệu</option>
                            <option value="PERIODIC">3. Kiểm tra tính Tuần hoàn</option>
                            <option value="SORT">4. Xử lý Fallback (Sắp xếp Giảm dần)</option>
                        </select>
                        <button onclick="window.resetArray11()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Áp dụng</button>
                    </div>
                </div>

                <div id="status-msg-11" style="margin-bottom: 15px; font-weight: bold; color: #1e293b; padding: 10px; background: #f1f5f9; border-radius: 4px; min-height: 45px;">
                    Sẵn sàng kiểm tra.
                </div>

                <div id="array-container-11" style="display: flex; justify-content: flex-start; align-items: flex-end; gap: 12px; background: #f8fafc; padding: 30px 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 120px; overflow-x: auto; margin-bottom: 20px;">
                </div>

                <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="window.autoRun11()" id="btn-auto-11" class="toggle-btn" style="background:#0284c7; color:white; justify-content: center;">▶ Chạy tự động</button>
                        <button onclick="window.nextStep11()" id="btn-next-11" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    </div>
                    <div id="step-log-container-11" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 120px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                        <div id="log-content-11"></div>
                    </div>
                </div>
            </div>
        `;
        window.resetArray11();
    };

    window.randomArray11 = function() {
        const modes = [
            [1, 2, 3, 2, 1], // Doi xung
            [2, 4, 6, 8, 10], // Don dieu tang
            [10, 8, 8, 4, 2], // Don dieu giam
            [1, 2, 1, 2, 1, 2], // Tuan hoan
            [5, 1, 9, 2, 7] // Khong co gi
        ];
        let randArr = modes[Math.floor(Math.random() * modes.length)];
        document.getElementById('input-array-11').value = randArr.join(' ');
        window.resetArray11();
    };

    window.resetArray11 = function() {
        isSimulating = false;
        const inputStr = document.getElementById('input-array-11').value;
        arrayA = inputStr.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        n = arrayA.length;
        simMode = document.getElementById('sim-mode-11').value;
        
        stepI = 0;
        flag1 = true; 
        flag2 = true; 
        currentP = 1;
        stepJ = 0;

        document.getElementById('log-content-11').innerHTML = "";
        document.getElementById('btn-next-11').disabled = false;
        document.getElementById('btn-auto-11').innerText = "▶ Chạy tự động";
        
        if (simMode === 'SYMMETRY') {
            stepJ = n - 1;
            document.getElementById('status-msg-11').innerHTML = `Sử dụng 2 con trỏ từ ngoài vào trong để kiểm tra đối xứng.`;
        } else if (simMode === 'MONOTONIC') {
            document.getElementById('status-msg-11').innerHTML = `Sử dụng 2 cờ <b>isInc</b> (tăng) và <b>isDec</b> (giảm). So sánh kề nhau.`;
        } else if (simMode === 'PERIODIC') {
            document.getElementById('status-msg-11').innerHTML = `Thử các chu kỳ P từ 1 đến N/2. Bắt đầu với P = 1.`;
        } else if (simMode === 'SORT') {
            document.getElementById('status-msg-11').innerHTML = `Mảng không có tính chất. Sử dụng <b>sort(a, a+n, greater&lt;int&gt;())</b>.`;
            stepI = -1; // Flag for sort
        }

        window.renderArray11();
    };

    window.renderArray11 = function(hi1 = -1, hi2 = -1, color1 = '#f59e0b', color2 = '#0284c7') {
        const container = document.getElementById('array-container-11');
        container.innerHTML = '';

        arrayA.forEach((val, i) => {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 5px;";

            const box = document.createElement('div');
            box.innerText = val;
            
            let bgColor = "white";
            let borderColor = "#cbd5e1";
            let textColor = "#1e293b";

            if (i === hi1) { bgColor = color1; textColor = "white"; borderColor = color1; box.style.transform = "scale(1.1)"; }
            else if (i === hi2) { bgColor = color2; textColor = "white"; borderColor = color2; box.style.transform = "scale(1.1)"; }

            box.style.cssText += `
                width: 45px; height: 45px; border: 2px solid ${borderColor}; border-radius: 6px;
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bgColor}; color: ${textColor}; transition: all 0.3s;
            `;

            const idxLabel = document.createElement('div');
            idxLabel.innerText = i;
            idxLabel.style.cssText = "font-size: 10px; color: #94a3b8;";

            wrapper.append(box, idxLabel);
            container.appendChild(wrapper);
        });
    };

    window.addLog11 = function(msg) {
        const logArea = document.getElementById('log-content-11');
        logArea.innerHTML += `<div>> ${msg}</div>`;
        document.getElementById('step-log-container-11').scrollTop = 9999;
    };

    window.nextStep11 = function() {
        if (simMode === 'SYMMETRY') {
            if (stepI >= stepJ || !flag1) {
                let res = flag1 ? "<b style='color:#29c702'>Mang doi xung</b>" : "<b style='color:#ef4444'>No (Không đối xứng)</b>";
                document.getElementById('status-msg-11').innerHTML = `Kết luận: ${res}`;
                document.getElementById('btn-next-11').disabled = true;
                return false;
            }
            window.renderArray11(stepI, stepJ, '#3b82f6', '#f97316');
            if (arrayA[stepI] === arrayA[stepJ]) {
                window.addLog11(`A[${stepI}] (${arrayA[stepI]}) == A[${stepJ}] (${arrayA[stepJ]}) -> Khớp.`);
                stepI++; stepJ--;
            } else {
                window.addLog11(`A[${stepI}] (${arrayA[stepI]}) != A[${stepJ}] (${arrayA[stepJ]}) -> Lệch! Dừng vòng lặp.`);
                flag1 = false;
            }
            return true;
        } 
        
        else if (simMode === 'MONOTONIC') {
            if (stepI >= n - 1) {
                let res = (flag1 || flag2) ? "<b style='color:#29c702'>Mang don dieu</b>" : "<b style='color:#ef4444'>No (Không đơn điệu)</b>";
                document.getElementById('status-msg-11').innerHTML = `Kết luận: ${res}`;
                document.getElementById('btn-next-11').disabled = true;
                return false;
            }
            window.renderArray11(stepI, stepI + 1, '#f59e0b', '#f59e0b');
            
            let v1 = arrayA[stepI], v2 = arrayA[stepI+1];
            if (v1 > v2) { flag1 = false; window.addLog11(`A[${stepI}] > A[${stepI+1}] -> Mất tính Tăng dần.`); }
            else if (v1 < v2) { flag2 = false; window.addLog11(`A[${stepI}] < A[${stepI+1}] -> Mất tính Giảm dần.`); }
            else window.addLog11(`A[${stepI}] == A[${stepI+1}] -> Tính chất được bảo toàn.`);
            
            stepI++;
            return true;
        }

        else if (simMode === 'PERIODIC') {
            if (currentP > Math.floor(n / 2)) {
                document.getElementById('status-msg-11').innerHTML = `Kết luận: <b style='color:#ef4444'>No (Không tuần hoàn)</b>`;
                document.getElementById('btn-next-11').disabled = true;
                return false;
            }

            if (n % currentP !== 0) {
                window.addLog11(`Bỏ qua Chu kỳ P=${currentP} vì N=${n} không chia hết cho P.`);
                currentP++;
                return true;
            }

            // Đang duyệt kiểm tra 1 chu kỳ cụ thể
            if (stepI === 0 && flag1) {
                window.addLog11(`<span style="color:#0284c7">--- Đang thử Chu kỳ P = ${currentP} ---</span>`);
            }

            if (stepI < n - currentP) {
                window.renderArray11(stepI, stepI + currentP, '#a855f7', '#d946ef');
                if (arrayA[stepI] === arrayA[stepI + currentP]) {
                    window.addLog11(`A[${stepI}] == A[${stepI + currentP}] -> Khớp.`);
                    stepI++;
                } else {
                    window.addLog11(`A[${stepI}] != A[${stepI + currentP}] -> Sai! P=${currentP} không phải là chu kỳ.`);
                    currentP++;
                    stepI = 0; // Thử P tiếp theo
                }
                return true;
            } else {
                document.getElementById('status-msg-11').innerHTML = `Kết luận: <b style='color:#29c702'>Mang tuan hoan (Chu kỳ P = ${currentP})</b>`;
                document.getElementById('btn-next-11').disabled = true;
                return false;
            }
        }

        else if (simMode === 'SORT') {
            if (stepI === -1) {
                window.addLog11("Sắp xếp lại mảng giảm dần bằng thuật toán...");
                arrayA.sort((a, b) => b - a);
                window.renderArray11();
                document.getElementById('status-msg-11').innerHTML = `Đã sắp xếp mảng thành công!`;
                document.getElementById('btn-next-11').disabled = true;
                stepI = 0;
            }
            return false;
        }
    };

    window.autoRun11 = function() {
        if (isSimulating) { isSimulating = false; document.getElementById('btn-auto-11').innerText = "▶ Tiếp tục"; return; }
        isSimulating = true;
        document.getElementById('btn-auto-11').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep11();
                if (!hasMore) { isSimulating = false; document.getElementById('btn-auto-11').innerText = "▶ Chạy tự động"; break; }
                await new Promise(r => setTimeout(r, 600)); 
            }
        };
        run();
    };
}