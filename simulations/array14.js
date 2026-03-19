{
    let arrayA = [];
    let oddArr = [];
    let evenArr = [];
    let simPhase = 0; 
    let currentIdx = -1;
    let mode = 1; // 1: Tách mảng (Vét cạn), 2: Custom Sort (Tối ưu)
    let isSimulating = false;

    window.initArray14Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Sắp xếp Lẻ tăng, Chẵn giảm</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Mảng A:</b></label>
                        <input type="text" id="input-a-14" value="2 4 0 4 1 9 8 3" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray14()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Phương pháp giải:</b></label>
                        <select id="sim-mode-14" onchange="window.resetArray14()" style="padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1; font-weight: bold; color: #1e40af;">
                            <option value="1">Cách 1: Vét cạn (Tách làm 2 mảng phụ)</option>
                            <option value="2">Cách 2: Tối ưu (Dùng Custom Comparator)</option>
                        </select>
                        <button onclick="window.resetArray14()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Áp dụng</button>
                    </div>
                </div>

                <div style="font-weight: bold; color: #1e293b; margin-bottom: 5px;">Trạng thái Mảng A:</div>
                <div id="cont-a-14" style="display: flex; flex-wrap: wrap; gap: 8px; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1; min-height: 85px; margin-bottom: 20px;"></div>

                <div id="aux-arrays-area" style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px; transition: all 0.3s;">
                    <div style="flex: 1; min-width: 200px;">
                        <div style="font-weight: bold; color: #16a34a; margin-bottom: 5px;">Mảng Lẻ (Sẽ xếp Tăng dần)</div>
                        <div id="cont-odd-14" style="display: flex; flex-wrap: wrap; gap: 8px; background: #f0fdf4; padding: 15px; border-radius: 8px; border: 2px dashed #4ade80; min-height: 70px;"></div>
                    </div>
                    <div style="flex: 1; min-width: 200px;">
                        <div style="font-weight: bold; color: #3b82f6; margin-bottom: 5px;">Mảng Chẵn (Sẽ xếp Giảm dần)</div>
                        <div id="cont-even-14" style="display: flex; flex-wrap: wrap; gap: 8px; background: #eff6ff; padding: 15px; border-radius: 8px; border: 2px dashed #60a5fa; min-height: 70px;"></div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="window.autoRun14()" id="btn-auto-14" class="toggle-btn" style="background:#0284c7; color:white; justify-content: center;">▶ Chạy tự động</button>
                        <button onclick="window.nextStep14()" id="btn-next-14" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    </div>
                    <div id="step-log-container-14" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 140px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                        <div id="log-content-14"></div>
                    </div>
                </div>
            </div>
        `;
        window.resetArray14();
    };

    window.randomArray14 = function() {
        let arr = Array.from({length: 8}, () => Math.floor(Math.random() * 20));
        document.getElementById('input-a-14').value = arr.join(' ');
        window.resetArray14();
    };

    window.resetArray14 = function() {
        isSimulating = false;
        arrayA = document.getElementById('input-a-14').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        mode = parseInt(document.getElementById('sim-mode-14').value);
        
        oddArr = [];
        evenArr = [];
        simPhase = 1;
        currentIdx = -1;

        const auxArea = document.getElementById('aux-arrays-area');
        if (mode === 1) {
            auxArea.style.display = 'flex';
            document.getElementById('log-content-14').innerHTML = `<div style="color: #6a9955;">// [CÁCH 1] Giai đoạn 1: Quét mảng để tách số Lẻ và số Chẵn.</div>`;
        } else {
            auxArea.style.display = 'none';
            document.getElementById('log-content-14').innerHTML = `<div style="color: #6a9955;">// [CÁCH 2] Gọi hàm sort() với bộ quy tắc Custom Comparator.</div>`;
        }
        
        document.getElementById('btn-next-14').disabled = false;
        document.getElementById('btn-auto-14').innerText = "▶ Chạy tự động";
        window.renderArray14();
    };

    window.renderArray14 = function() {
        const createBox = (val, colorClass, highlight = false, isFaded = false) => {
            const box = document.createElement('div');
            box.innerText = val;
            let bg = "white"; let color = "#1e293b"; let border = "#cbd5e1";
            
            if (colorClass === 'ODD') { bg = '#f0fdf4'; border = '#22c55e'; color = '#15803d'; }
            if (colorClass === 'EVEN') { bg = '#eff6ff'; border = '#3b82f6'; color = '#1d4ed8'; }
            
            if (highlight) { bg = '#fef08a'; border = '#f59e0b'; }

            box.style.cssText = `
                width: 40px; height: 40px; border-radius: 6px; border: 2px solid ${border};
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bg}; color: ${color}; 
                opacity: ${isFaded ? '0.3' : '1'};
                transform: ${highlight ? 'scale(1.1)' : 'scale(1)'};
                transition: all 0.3s;
            `;
            return box;
        };

        // Render Mảng A
        const contA = document.getElementById('cont-a-14');
        contA.innerHTML = '';
        arrayA.forEach((val, i) => {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 5px;";
            
            let colorClass = 'NONE';
            let isFaded = false;

            if (mode === 1) {
                if (simPhase === 1 && i <= currentIdx) isFaded = true; // Đã rút ra mảng phụ
                if (simPhase === 4) { // Đã gộp
                    colorClass = (Math.abs(val) % 2 === 1) ? 'ODD' : 'EVEN';
                }
            } else {
                if (simPhase === 2) { // Đã sort
                    colorClass = (Math.abs(val) % 2 === 1) ? 'ODD' : 'EVEN';
                }
            }

            let box = createBox(val, colorClass, (mode === 1 && simPhase === 1 && i === currentIdx), isFaded);
            
            const idxLabel = document.createElement('div');
            idxLabel.innerText = i;
            idxLabel.style.cssText = `font-size: 10px; color: #94a3b8;`;

            wrapper.append(box, idxLabel);
            contA.appendChild(wrapper);
        });

        // Render Mảng Phụ (Nếu Cách 1)
        if (mode === 1) {
            const contOdd = document.getElementById('cont-odd-14');
            contOdd.innerHTML = '';
            oddArr.forEach(val => contOdd.appendChild(createBox(val, 'ODD')));

            const contEven = document.getElementById('cont-even-14');
            contEven.innerHTML = '';
            evenArr.forEach(val => contEven.appendChild(createBox(val, 'EVEN')));
        }
    };

    window.addLog14 = function(msg) {
        const logArea = document.getElementById('log-content-14');
        logArea.innerHTML += `<div style="margin-bottom: 4px;">> ${msg}</div>`;
        document.getElementById('step-log-container-14').scrollTop = 9999;
    };

    // Hàm Custom Comparator JS (tương đương C++)
    const customCmp = (a, b) => {
        let isOddA = (Math.abs(a) % 2 === 1);
        let isOddB = (Math.abs(b) % 2 === 1);
        if (isOddA !== isOddB) return isOddA ? -1 : 1; // Lẻ lên trước
        if (isOddA) return a - b; // Lẻ thì tăng dần
        return b - a; // Chẵn thì giảm dần
    };

    window.nextStep14 = function() {
        if (mode === 1) {
            // VÉT CẠN
            if (simPhase === 1) { // Tách mảng
                currentIdx++;
                if (currentIdx < arrayA.length) {
                    let val = arrayA[currentIdx];
                    if (Math.abs(val) % 2 === 1) {
                        oddArr.push(val);
                        window.addLog14(`A[${currentIdx}]=${val} là Lẻ -> Đẩy vào mảng <span style="color:#22c55e">Lẻ</span>.`);
                    } else {
                        evenArr.push(val);
                        window.addLog14(`A[${currentIdx}]=${val} là Chẵn -> Đẩy vào mảng <span style="color:#3b82f6">Chẵn</span>.`);
                    }
                } else {
                    simPhase = 2;
                    window.addLog14(`<span style="color:#f59e0b; font-weight:bold;">[Giai đoạn 2] Đã tách xong. Tiến hành sắp xếp 2 mảng phụ.</span>`);
                }
            } 
            else if (simPhase === 2) {
                oddArr.sort((a, b) => a - b);
                evenArr.sort((a, b) => b - a);
                window.addLog14(`- Mảng Lẻ đã được <b style="color:#22c55e">sắp xếp Tăng dần</b>.`);
                window.addLog14(`- Mảng Chẵn đã được <b style="color:#3b82f6">sắp xếp Giảm dần</b>.`);
                simPhase = 3;
            }
            else if (simPhase === 3) {
                arrayA = [...oddArr, ...evenArr];
                oddArr = []; evenArr = []; // Clear
                window.addLog14(`<span style="color:#29c702; font-weight:bold;">[Giai đoạn 3] Gộp 2 mảng phụ vào mảng A gốc. Hoàn tất!</span>`);
                simPhase = 4;
                document.getElementById('btn-next-14').disabled = true;
            }
        } 
        else {
            // TỐI ƯU
            if (simPhase === 1) {
                window.addLog14(`Đang áp dụng bộ quy tắc Custom Comparator:`);
                window.addLog14(`1. Ưu tiên số Lẻ lên trước số Chẵn.`);
                window.addLog14(`2. Cùng là Lẻ -> Xếp tăng dần.`);
                window.addLog14(`3. Cùng là Chẵn -> Xếp giảm dần.`);
                arrayA.sort(customCmp);
                window.addLog14(`<span style="color:#29c702; font-weight:bold;">Hoàn tất trong 1 bước (O(1) Memory). Mảng đã được sắp xếp!</span>`);
                simPhase = 2;
                document.getElementById('btn-next-14').disabled = true;
            }
        }

        window.renderArray14();
        return (simPhase !== 4 && simPhase !== 2); // Return false to stop auto run
    };

    window.autoRun14 = function() {
        if (isSimulating) { isSimulating = false; document.getElementById('btn-auto-14').innerText = "▶ Tiếp tục"; return; }
        isSimulating = true;
        document.getElementById('btn-auto-14').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep14();
                if (!hasMore) { isSimulating = false; document.getElementById('btn-auto-14').innerText = "▶ Chạy tự động"; break; }
                await new Promise(r => setTimeout(r, mode === 1 ? 600 : 2000)); 
            }
        };
        run();
    };
}