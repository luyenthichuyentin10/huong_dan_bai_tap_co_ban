{
    let arrayA = [0]; // 1-based index (0th element is dummy)
    let arrayS = [0];
    let queries = [];
    
    let simPhase = 1; // 1: Build S, 2: Answer Queries
    let i_build = 1;
    let q_idx = 0;
    
    let isSimulating = false;

    window.initArray18Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Mảng Cộng Dồn (Prefix Sum)</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label style="width: 70px;"><b>Mảng A:</b></label>
                        <input type="text" id="input-a-18" value="3 1 4 2 5" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray18()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                        <button onclick="window.resetArray18()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Áp dụng</button>
                    </div>
                </div>

                <div style="font-weight: bold; color: #1e293b; margin-bottom: 5px;">Mảng Gốc A (Chỉ số từ 1):</div>
                <div id="cont-a-18" style="display: flex; flex-wrap: wrap; gap: 8px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 60px; margin-bottom: 15px;"></div>

                <div style="font-weight: bold; color: #15803d; margin-bottom: 5px;">Mảng Cộng Dồn S (S[i] = S[i-1] + A[i]):</div>
                <div id="cont-s-18" style="display: flex; flex-wrap: wrap; gap: 8px; background: #f0fdf4; padding: 15px; border-radius: 8px; border: 2px dashed #22c55e; min-height: 60px; margin-bottom: 20px;"></div>

                <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="window.autoRun18()" id="btn-auto-18" class="toggle-btn" style="background:#0284c7; color:white; justify-content: center;">▶ Chạy tự động</button>
                        <button onclick="window.nextStep18()" id="btn-next-18" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    </div>
                    <div id="step-log-container-18" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 140px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                        <div id="log-content-18"></div>
                    </div>
                </div>
            </div>
        `;
        window.resetArray18();
    };

    window.randomArray18 = function() {
        let arr = Array.from({length: 6}, () => Math.floor(Math.random() * 10) + 1);
        document.getElementById('input-a-18').value = arr.join(' ');
        window.resetArray18();
    };

    window.resetArray18 = function() {
        isSimulating = false;
        let inputArr = document.getElementById('input-a-18').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        
        arrayA = [0, ...inputArr]; // 1-based index
        arrayS = [0]; 
        
        // Tạo 3 truy vấn ngẫu nhiên hợp lệ
        queries = [];
        for(let k=0; k<3; k++) {
            let l = Math.floor(Math.random() * (arrayA.length - 1)) + 1;
            let r = Math.floor(Math.random() * (arrayA.length - 1)) + 1;
            if (l > r) { let temp = l; l = r; r = temp; }
            queries.push({L: l, R: r});
        }
        
        simPhase = 1; i_build = 1; q_idx = 0;

        document.getElementById('log-content-18').innerHTML = `<div style="color: #6a9955;">// [BƯỚC 1] Xây dựng mảng Cộng dồn S. Khởi tạo S[0] = 0.</div>`;
        document.getElementById('btn-next-18').disabled = false;
        document.getElementById('btn-auto-18').innerText = "▶ Chạy tự động";
        
        window.renderArray18();
    };

    window.renderArray18 = function() {
        // Render A
        const contA = document.getElementById('cont-a-18');
        contA.innerHTML = '';
        arrayA.forEach((val, idx) => {
            if (idx === 0) return; // Skip dummy 0
            
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 3px;";

            const box = document.createElement('div');
            box.innerText = val;
            let bg = "white"; let border = "#cbd5e1"; let color = "#1e293b";
            
            if (simPhase === 1 && idx === i_build) {
                bg = "#fef08a"; border = "#f59e0b"; // Đang build
            }
            if (simPhase === 2 && q_idx < queries.length) {
                let q = queries[q_idx];
                if (idx >= q.L && idx <= q.R) {
                    bg = "#e0e7ff"; border = "#6366f1"; color = "#4338ca"; // Vùng truy vấn
                }
            }

            box.style.cssText += `
                width: 35px; height: 35px; border-radius: 6px; border: 2px solid ${border};
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bg}; color: ${color}; transition: all 0.3s;
            `;

            const idxLabel = document.createElement('div');
            idxLabel.innerText = idx;
            idxLabel.style.cssText = `font-size: 10px; color: #94a3b8;`;

            wrapper.append(box, idxLabel);
            contA.appendChild(wrapper);
        });

        // Render S
        const contS = document.getElementById('cont-s-18');
        contS.innerHTML = '';
        for (let idx = 0; idx < arrayS.length; idx++) {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 3px;";

            const box = document.createElement('div');
            box.innerText = arrayS[idx];
            let bg = "white"; let border = "#86efac"; let color = "#16a34a";
            
            if (simPhase === 1 && idx === i_build) {
                bg = "#dcfce7"; border = "#22c55e"; box.style.transform = "scale(1.1)";
            }
            if (simPhase === 2 && q_idx < queries.length) {
                let q = queries[q_idx];
                if (idx === q.R) {
                    bg = "#bfdbfe"; border = "#3b82f6"; color = "#1d4ed8"; box.style.transform = "scale(1.1)"; // S[R]
                } else if (idx === q.L - 1) {
                    bg = "#fecaca"; border = "#ef4444"; color = "#b91c1c"; box.style.transform = "scale(1.1)"; // S[L-1]
                }
            }

            box.style.cssText += `
                width: 35px; height: 35px; border-radius: 6px; border: 2px solid ${border};
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bg}; color: ${color}; transition: all 0.3s;
            `;

            const idxLabel = document.createElement('div');
            idxLabel.innerText = idx;
            idxLabel.style.cssText = `font-size: 10px; color: #94a3b8; font-weight: bold;`;

            wrapper.append(box, idxLabel);
            contS.appendChild(wrapper);
        }
    };

    window.addLog18 = function(msg) {
        const logArea = document.getElementById('log-content-18');
        logArea.innerHTML += `<div style="margin-bottom: 4px;">> ${msg}</div>`;
        document.getElementById('step-log-container-18').scrollTop = 9999;
    };

    window.nextStep18 = function() {
        if (simPhase === 3) return false;

        if (simPhase === 1) {
            let newVal = arrayS[i_build - 1] + arrayA[i_build];
            arrayS.push(newVal);
            window.addLog18(`S[${i_build}] = S[${i_build-1}] (${arrayS[i_build-1]}) + A[${i_build}] (${arrayA[i_build]}) = <b style="color:#16a34a">${newVal}</b>`);
            
            i_build++;
            if (i_build >= arrayA.length) {
                simPhase = 2;
                window.addLog18(`<span style="color:#0284c7; font-weight:bold;">[BƯỚC 2] Đã xây xong! Bắt đầu trả lời ${queries.length} truy vấn O(1).</span>`);
            }
        } 
        else if (simPhase === 2) {
            let q = queries[q_idx];
            let ans = arrayS[q.R] - arrayS[q.L - 1];
            
            window.addLog18(`Truy vấn: Tổng từ L=${q.L} đến R=${q.R}`);
            window.addLog18(`  => Tính: <b style="color:#3b82f6">S[${q.R}]</b> - <b style="color:#ef4444">S[${q.L}-1]</b> = ${arrayS[q.R]} - ${arrayS[q.L - 1]} = <b style="color:#f59e0b">${ans}</b>`);
            
            q_idx++;
            if (q_idx >= queries.length) {
                simPhase = 3;
                window.addLog18(`<span style="color:#29c702; font-weight:bold;">[HOÀN TẤT] Không dùng vòng lặp, tốc độ siêu nhanh!</span>`);
                document.getElementById('btn-next-18').disabled = true;
            }
        }

        window.renderArray18();
        return (simPhase !== 3);
    };

    window.autoRun18 = function() {
        if (isSimulating) { isSimulating = false; document.getElementById('btn-auto-18').innerText = "▶ Tiếp tục"; return; }
        isSimulating = true;
        document.getElementById('btn-auto-18').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep18();
                if (!hasMore) { isSimulating = false; document.getElementById('btn-auto-18').innerText = "▶ Chạy tự động"; break; }
                await new Promise(r => setTimeout(r, 1500)); 
            }
        };
        run();
    };
}