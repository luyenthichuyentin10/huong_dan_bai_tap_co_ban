{
    let arrayA = [];
    let arrayB = [];
    let windowStart = 0; // Vị trí bắt đầu của khung trượt (i)
    let matchIdx = 0;    // Vị trí phần tử đang xét trong B (j)
    let simPhase = 1;    // 1: Compare, 2: Move Window, 3: Found, 4: Not Found
    let isSimulating = false;

    window.initArray15Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Kiểm tra Mảng con (Cửa sổ trượt)</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label style="width: 70px;"><b>Mảng A:</b></label>
                        <input type="text" id="input-a-15" value="2 4 1 0 1 9 8 0" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label style="width: 70px;"><b>Mảng B:</b></label>
                        <input type="text" id="input-b-15" value="1 0 1" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray15()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                        <button onclick="window.resetArray15()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Áp dụng</button>
                    </div>
                </div>

                <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; overflow-x: auto; margin-bottom: 20px; position: relative; min-height: 180px;">
                    <div style="font-weight: bold; color: #1e293b; margin-bottom: 10px;">Mảng Cha (A):</div>
                    <div id="cont-a-15" style="display: flex; gap: 8px; margin-bottom: 30px;"></div>
                    
                    <div style="font-weight: bold; color: #b91c1c; margin-bottom: 10px;">Cửa sổ trượt (Mảng B):</div>
                    <div id="cont-b-slider" style="display: flex; gap: 8px; position: absolute; transition: left 0.4s ease-in-out;"></div>
                </div>

                <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="window.autoRun15()" id="btn-auto-15" class="toggle-btn" style="background:#0284c7; color:white; justify-content: center;">▶ Chạy tự động</button>
                        <button onclick="window.nextStep15()" id="btn-next-15" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    </div>
                    <div id="step-log-container-15" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 140px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                        <div id="log-content-15"></div>
                    </div>
                </div>
            </div>
        `;
        window.resetArray15();
    };

    window.randomArray15 = function() {
        let arrA = Array.from({length: 10}, () => Math.floor(Math.random() * 5));
        
        // Random ra một mảng con thực sự có trong A hoặc không
        let isExist = Math.random() > 0.4;
        let arrB = [];
        if (isExist) {
            let start = Math.floor(Math.random() * 7);
            arrB = arrA.slice(start, start + 3);
        } else {
            arrB = Array.from({length: 3}, () => Math.floor(Math.random() * 5));
        }

        document.getElementById('input-a-15').value = arrA.join(' ');
        document.getElementById('input-b-15').value = arrB.join(' ');
        window.resetArray15();
    };

    window.resetArray15 = function() {
        isSimulating = false;
        arrayA = document.getElementById('input-a-15').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        arrayB = document.getElementById('input-b-15').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        
        windowStart = 0;
        matchIdx = 0;
        simPhase = 1;

        document.getElementById('log-content-15').innerHTML = `<div style="color: #6a9955;">// Thuật toán: Trượt cửa sổ (Sliding Window - Vét cạn)</div>`;
        
        if (arrayB.length > arrayA.length) {
            window.addLog15(`<span style="color:#ef4444; font-weight:bold;">Mảng B dài hơn mảng A. Kết quả: No.</span>`);
            document.getElementById('btn-next-15').disabled = true;
        } else {
            document.getElementById('btn-next-15').disabled = false;
        }
        document.getElementById('btn-auto-15').innerText = "▶ Chạy tự động";
        
        window.renderArray15();
    };

    window.renderArray15 = function() {
        // Render A
        const contA = document.getElementById('cont-a-15');
        contA.innerHTML = '';
        arrayA.forEach((val, i) => {
            const box = document.createElement('div');
            box.innerText = val;
            let bg = "white"; let border = "#cbd5e1"; let color = "#1e293b";
            
            // Highlight những ô của A đang được xét
            if (simPhase === 1 && i >= windowStart && i < windowStart + arrayB.length) {
                if (i === windowStart + matchIdx) {
                    bg = "#fef08a"; border = "#f59e0b"; // Đang so sánh
                } else if (i < windowStart + matchIdx) {
                    bg = "#dcfce7"; border = "#22c55e"; // Đã khớp
                }
            } else if (simPhase === 3 && i >= windowStart && i < windowStart + arrayB.length) {
                bg = "#22c55e"; border = "#15803d"; color = "white"; // TÌM THẤY!
            }

            box.style.cssText = `
                min-width: 40px; height: 40px; border-radius: 6px; border: 2px solid ${border};
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bg}; color: ${color}; transition: all 0.3s;
            `;
            contA.appendChild(box);
        });

        // Render B Slider
        const slider = document.getElementById('cont-b-slider');
        slider.innerHTML = '';
        
        // Tính toán vị trí trượt: Khoảng cách mỗi ô là 40px + 8px gap = 48px
        let offsetLeft = windowStart * 48 + 20; // 20 là padding của container cha
        slider.style.left = offsetLeft + 'px';

        arrayB.forEach((val, j) => {
            const box = document.createElement('div');
            box.innerText = val;
            let bg = "#fef2f2"; let border = "#fca5a5"; let color = "#b91c1c";
            
            if (simPhase === 1) {
                if (j === matchIdx) {
                    bg = "#fef08a"; border = "#f59e0b"; color = "#9a3412"; // Đang xét
                } else if (j < matchIdx) {
                    bg = "#22c55e"; border = "#15803d"; color = "white"; // Khớp
                }
            } else if (simPhase === 3) {
                bg = "#22c55e"; border = "#15803d"; color = "white"; // TÌM THẤY!
            }

            box.style.cssText = `
                min-width: 40px; height: 40px; border-radius: 6px; border: 2px dashed ${border};
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bg}; color: ${color}; transition: all 0.3s;
            `;
            slider.appendChild(box);
        });
    };

    window.addLog15 = function(msg) {
        const logArea = document.getElementById('log-content-15');
        logArea.innerHTML += `<div style="margin-bottom: 4px;">> ${msg}</div>`;
        document.getElementById('step-log-container-15').scrollTop = 9999;
    };

    window.nextStep15 = function() {
        if (simPhase === 3 || simPhase === 4) return false;

        if (simPhase === 1) { // Đang so sánh
            let aVal = arrayA[windowStart + matchIdx];
            let bVal = arrayB[matchIdx];

            if (aVal === bVal) {
                window.addLog15(`[Trượt i=${windowStart}] Khớp A[${windowStart + matchIdx}] == B[${matchIdx}] (${bVal}).`);
                matchIdx++;
                
                if (matchIdx === arrayB.length) {
                    simPhase = 3;
                    window.addLog15(`<span style="color:#29c702; font-weight:bold;">=> Đã khớp TOÀN BỘ mảng B! Kết quả: Yes.</span>`);
                    document.getElementById('btn-next-15').disabled = true;
                }
            } else {
                window.addLog15(`[Trượt i=${windowStart}] Lệch A[${windowStart + matchIdx}] (${aVal}) != B[${matchIdx}] (${bVal}). <span style="color:#ef4444">Dừng đối chiếu ở vị trí này.</span>`);
                simPhase = 2; // Chuẩn bị trượt
            }
        } 
        else if (simPhase === 2) { // Trượt cửa sổ sang vị trí mới
            windowStart++;
            matchIdx = 0;
            
            if (windowStart > arrayA.length - arrayB.length) {
                simPhase = 4;
                window.addLog15(`<span style="color:#ef4444; font-weight:bold;">=> Đã trượt hết mảng A nhưng không tìm thấy mảng B. Kết quả: No.</span>`);
                document.getElementById('btn-next-15').disabled = true;
            } else {
                window.addLog15(`<span style="color:#64748b">--- Trượt cửa sổ sang phải (i = ${windowStart}) ---</span>`);
                simPhase = 1;
            }
        }

        window.renderArray15();
        return (simPhase === 1 || simPhase === 2);
    };

    window.autoRun15 = function() {
        if (isSimulating) { isSimulating = false; document.getElementById('btn-auto-15').innerText = "▶ Tiếp tục"; return; }
        isSimulating = true;
        document.getElementById('btn-auto-15').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep15();
                if (!hasMore) { isSimulating = false; document.getElementById('btn-auto-15').innerText = "▶ Chạy tự động"; break; }
                await new Promise(r => setTimeout(r, 700)); 
            }
        };
        run();
    };
}