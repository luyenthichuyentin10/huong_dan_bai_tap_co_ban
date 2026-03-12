{
    let arrayA = [];
    let arrayB = [];
    let arrayC = [];
    let currentIdx = -1;
    let isSimulating = false;
    let calcMode = 2; // 1: N/2, 2: sqrt(N)

    // Hàm lấy danh sách ước và số lần lặp dựa trên Mode
    function getDivisorsSumString(num, mode) {
        if (num <= 1) return { sum: 0, str: "0", iters: 0 };
        
        let sum = 0;
        let divs = [];
        let iters = 0;

        if (mode === 1) {
            // Cách 1: Duyệt N/2
            let limit = Math.floor(num / 2);
            for (let i = 1; i <= limit; i++) {
                iters++;
                if (num % i === 0) {
                    sum += i;
                    divs.push(i);
                }
            }
            return { sum: sum, str: divs.join(' + '), iters: iters };
        } else {
            // Cách 2: Duyệt Căn bậc 2
            sum = 1; 
            divs = ["1"];
            let limit = Math.floor(Math.sqrt(num));
            for (let i = 2; i <= limit; i++) {
                iters++;
                if (num % i === 0) {
                    let pair = num / i;
                    sum += i;
                    if (i !== pair) {
                        sum += pair;
                        divs.push(`(${i}+${pair})`);
                    } else {
                        divs.push(i);
                    }
                }
            }
            return { sum: sum, str: divs.join(' + '), iters: iters };
        }
    }

    window.initArray12Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Tách mảng (Kiểm tra Ước số)</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Mảng A (Ban đầu):</b></label>
                        <input type="text" id="input-array-12" value="6 12 28 15 496 7" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray12()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Thuật toán đếm Ước:</b></label>
                        <select id="calc-mode-12" onchange="window.resetArray12()" style="padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1; font-weight: bold; color: #1e40af;">
                            <option value="2">Cách 2 (Tối ưu): Duyệt đến Căn bậc 2</option>
                            <option value="1">Cách 1 (Cơ bản): Duyệt đến N/2</option>
                        </select>
                        <button onclick="window.resetArray12()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Áp dụng</button>
                    </div>
                </div>

                <div style="font-weight: bold; color: #1e293b; margin-bottom: 5px;">Mảng Nguồn (A):</div>
                <div id="array-a-container" style="display: flex; justify-content: flex-start; align-items: flex-end; gap: 12px; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 80px; overflow-x: auto; margin-bottom: 20px;">
                </div>

                <div style="display: flex; gap: 20px; margin-bottom: 20px; flex-wrap: wrap;">
                    <div style="flex: 1; min-width: 250px;">
                        <div style="font-weight: bold; color: #15803d; margin-bottom: 5px;">Mảng B (Số Hoàn Hảo):</div>
                        <div id="array-b-container" style="display: flex; flex-wrap: wrap; gap: 10px; background: #f0fdf4; padding: 15px; border-radius: 8px; border: 2px dashed #22c55e; min-height: 70px;">
                        </div>
                    </div>
                    <div style="flex: 1; min-width: 250px;">
                        <div style="font-weight: bold; color: #b91c1c; margin-bottom: 5px;">Mảng C (Không Hoàn Hảo):</div>
                        <div id="array-c-container" style="display: flex; flex-wrap: wrap; gap: 10px; background: #fef2f2; padding: 15px; border-radius: 8px; border: 2px dashed #ef4444; min-height: 70px;">
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="window.autoRun12()" id="btn-auto-12" class="toggle-btn" style="background:#0284c7; color:white; justify-content: center;">▶ Chạy tự động</button>
                        <button onclick="window.nextStep12()" id="btn-next-12" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    </div>
                    <div id="step-log-container-12" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 140px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                        <div id="log-content-12"></div>
                    </div>
                </div>
            </div>
        `;
        window.resetArray12();
    };

    window.randomArray12 = function() {
        const pool = [6, 28, Math.floor(Math.random()*20), Math.floor(Math.random()*50), Math.floor(Math.random()*10), 496, 8128, 15];
        for (let i = pool.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [pool[i], pool[j]] = [pool[j], pool[i]];
        }
        document.getElementById('input-array-12').value = pool.slice(0, 6).join(' ');
        window.resetArray12();
    };

    window.resetArray12 = function() {
        isSimulating = false;
        const inputStr = document.getElementById('input-array-12').value;
        arrayA = inputStr.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        calcMode = parseInt(document.getElementById('calc-mode-12').value);
        
        arrayB = [];
        arrayC = [];
        currentIdx = -1;

        let modeText = calcMode === 1 ? "Duyệt N/2" : "Duyệt Căn Bậc 2 (Gom cặp)";
        document.getElementById('log-content-12').innerHTML = `<div style="color: #6a9955;">// Bắt đầu duyệt mảng. Áp dụng thuật toán: ${modeText}</div>`;
        document.getElementById('btn-next-12').disabled = false;
        document.getElementById('btn-auto-12').innerText = "▶ Chạy tự động";
        
        window.renderArray12();
    };

    window.renderArray12 = function() {
        const contA = document.getElementById('array-a-container');
        contA.innerHTML = '';
        arrayA.forEach((val, i) => {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 5px;";

            const box = document.createElement('div');
            box.innerText = val;
            let bgColor = "white", borderColor = "#cbd5e1", opacity = "1";

            if (i === currentIdx) { bgColor = "#fef08a"; borderColor = "#f59e0b"; box.style.transform = "scale(1.1)"; } 
            else if (i < currentIdx) { opacity = "0.4"; }

            box.style.cssText += `width: 45px; height: 45px; border: 2px solid ${borderColor}; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; background: ${bgColor}; color: #1e293b; transition: all 0.3s; opacity: ${opacity};`;

            const idxLabel = document.createElement('div');
            idxLabel.innerText = i;
            idxLabel.style.cssText = `font-size: 10px; color: #94a3b8; opacity: ${opacity};`;

            wrapper.append(box, idxLabel);
            contA.appendChild(wrapper);
        });

        const renderTarget = (id, arr, colorClass) => {
            const cont = document.getElementById(id);
            cont.innerHTML = '';
            arr.forEach(val => {
                const box = document.createElement('div');
                box.innerText = val;
                box.style.cssText = `width: 40px; height: 40px; border-radius: 6px; display: flex; align-items: center; justify-content: center; font-weight: bold; animation: popIn 0.3s ease-out; color: white;`;
                box.style.background = colorClass === 'B' ? '#22c55e' : '#ef4444';
                box.style.boxShadow = colorClass === 'B' ? '0 2px 4px rgba(34, 197, 94, 0.3)' : '0 2px 4px rgba(239, 68, 68, 0.3)';
                cont.appendChild(box);
            });
        };

        renderTarget('array-b-container', arrayB, 'B');
        renderTarget('array-c-container', arrayC, 'C');
    };

    window.addLog12 = function(msg) {
        const logArea = document.getElementById('log-content-12');
        logArea.innerHTML += `<div style="margin-bottom: 4px;">> ${msg}</div>`;
        document.getElementById('step-log-container-12').scrollTop = 9999;
    };

    window.nextStep12 = function() {
        if (currentIdx >= arrayA.length - 1) {
            window.addLog12(`<span style="color:#29c702; font-weight:bold;">[Hoàn tất] Phân loại thành công!</span>`);
            document.getElementById('btn-next-12').disabled = true;
            return false;
        }

        currentIdx++;
        let val = arrayA[currentIdx];
        let details = getDivisorsSumString(val, calcMode);

        // Hiển thị chi tiết số lần lặp và logic gom cặp
        let logMsg = `A[${currentIdx}] = <b style="color:#38bdf8">${val}</b>.<br>&nbsp;&nbsp;`;
        logMsg += `<span style="color:#94a3b8">Chạy ${details.iters} vòng lặp.</span> Tổng ước: ${details.str} = ${details.sum}. `;

        if (details.sum === val && val > 1) {
            arrayB.push(val);
            logMsg += `<b style="color:#22c55e">-> Hoàn hảo (Đẩy vào B)</b>`;
        } else {
            arrayC.push(val);
            logMsg += `<b style="color:#ef4444">-> Không (Đẩy vào C)</b>`;
        }

        window.addLog12(logMsg);
        window.renderArray12();
        return true;
    };

    window.autoRun12 = function() {
        if (isSimulating) { isSimulating = false; document.getElementById('btn-auto-12').innerText = "▶ Tiếp tục"; return; }
        isSimulating = true;
        document.getElementById('btn-auto-12').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep12();
                if (!hasMore) { isSimulating = false; document.getElementById('btn-auto-12').innerText = "▶ Chạy tự động"; break; }
                await new Promise(r => setTimeout(r, 1200)); 
            }
        };
        run();
    };

    if (!document.getElementById('anim-popin')) {
        const style = document.createElement('style');
        style.id = 'anim-popin';
        style.innerHTML = `@keyframes popIn { 0% { transform: scale(0); } 100% { transform: scale(1); } }`;
        document.head.appendChild(style);
    }
}