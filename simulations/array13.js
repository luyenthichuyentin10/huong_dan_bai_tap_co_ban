{
    let arrayA = [];
    let arrayB = [];
    let arrayC = []; // Dùng để mô phỏng Output
    let ptrA = 0;
    let ptrB = 0;
    let turn = 'B'; // 'A' hoặc 'B', dùng cho xen kẽ
    let mode = 'APPEND'; // APPEND (B -> A) hoặc INTERLEAVE (Xen kẽ)
    let isSimulating = false;

    window.initArray13Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Gộp Mảng (Hai con trỏ)</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Mảng A:</b></label>
                        <input type="text" id="input-a-13" value="1 2 3 4" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Mảng B:</b></label>
                        <input type="text" id="input-b-13" value="6 7 8 9 10" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap; margin-top: 10px;">
                        <label><b>Yêu cầu gộp:</b></label>
                        <select id="merge-mode-13" onchange="window.resetArray13()" style="padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1; font-weight: bold; color: #1e40af;">
                            <option value="APPEND">1. Gộp nối tiếp (Mảng B nằm trước Mảng A)</option>
                            <option value="INTERLEAVE">2. Gộp xen kẽ (A, B luân phiên)</option>
                        </select>
                        <button onclick="window.randomArray13()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                        <button onclick="window.resetArray13()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Áp dụng</button>
                    </div>
                </div>

                <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;">
                    <div style="flex: 1; min-width: 200px;">
                        <div style="font-weight: bold; color: #3b82f6; margin-bottom: 5px;">Mảng A (Con trỏ i)</div>
                        <div id="cont-a-13" style="display: flex; flex-wrap: wrap; gap: 8px; background: #eff6ff; padding: 15px; border-radius: 8px; border: 2px solid #93c5fd; min-height: 50px;"></div>
                    </div>
                    <div style="flex: 1; min-width: 200px;">
                        <div style="font-weight: bold; color: #f97316; margin-bottom: 5px;">Mảng B (Con trỏ j)</div>
                        <div id="cont-b-13" style="display: flex; flex-wrap: wrap; gap: 8px; background: #fff7ed; padding: 15px; border-radius: 8px; border: 2px solid #fdba74; min-height: 50px;"></div>
                    </div>
                </div>

                <div style="font-weight: bold; color: #16a34a; margin-bottom: 5px;">Luồng xuất dữ liệu (Output On-the-fly)</div>
                <div id="cont-out-13" style="display: flex; flex-wrap: wrap; gap: 8px; background: #f0fdf4; padding: 20px; border-radius: 8px; border: 2px dashed #4ade80; min-height: 60px; margin-bottom: 20px;"></div>

                <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="window.autoRun13()" id="btn-auto-13" class="toggle-btn" style="background:#0284c7; color:white; justify-content: center;">▶ Chạy tự động</button>
                        <button onclick="window.nextStep13()" id="btn-next-13" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    </div>
                    <div id="step-log-container-13" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 120px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                        <div id="log-content-13"></div>
                    </div>
                </div>
            </div>
        `;
        window.resetArray13();
    };

    window.randomArray13 = function() {
        // Sinh ngẫu nhiên độ dài chênh lệch nhau để thấy rõ bản chất Xen kẽ
        let lenA = Math.floor(Math.random() * 4) + 3; // 3 đến 6
        let lenB = Math.floor(Math.random() * 4) + 3; 
        
        let a = Array.from({length: lenA}, () => Math.floor(Math.random() * 20));
        let b = Array.from({length: lenB}, () => Math.floor(Math.random() * 20) + 50); // B lớn hơn để dễ phân biệt
        
        document.getElementById('input-a-13').value = a.join(' ');
        document.getElementById('input-b-13').value = b.join(' ');
        window.resetArray13();
    };

    window.resetArray13 = function() {
        isSimulating = false;
        arrayA = document.getElementById('input-a-13').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        arrayB = document.getElementById('input-b-13').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        mode = document.getElementById('merge-mode-13').value;
        
        arrayC = [];
        ptrA = 0;
        ptrB = 0;
        turn = (mode === 'APPEND') ? 'B' : 'A'; // Nối tiếp thì lấy B trước. Xen kẽ thì A trước.

        document.getElementById('log-content-13').innerHTML = `<div style="color: #6a9955;">// Bắt đầu gộp. Không dùng mảng phụ, in trực tiếp.</div>`;
        document.getElementById('btn-next-13').disabled = false;
        document.getElementById('btn-auto-13').innerText = "▶ Chạy tự động";
        
        window.renderArray13();
    };

    window.renderArray13 = function() {
        const renderSource = (id, arr, ptr, colorClass) => {
            const cont = document.getElementById(id);
            cont.innerHTML = '';
            arr.forEach((val, i) => {
                const box = document.createElement('div');
                box.innerText = val;
                let bg = "white"; let color = "#1e293b"; let scale = "1"; let opacity = "1";
                
                if (i === ptr) {
                    bg = colorClass === 'A' ? '#3b82f6' : '#f97316';
                    color = "white"; scale = "1.1";
                } else if (i < ptr) {
                    opacity = "0.3"; // Đã được lấy đi
                }

                box.style.cssText = `
                    width: 35px; height: 35px; border-radius: 6px; border: 2px solid ${colorClass === 'A' ? '#93c5fd' : '#fdba74'};
                    display: flex; align-items: center; justify-content: center; font-weight: bold;
                    background: ${bg}; color: ${color}; transform: scale(${scale}); opacity: ${opacity}; transition: all 0.3s;
                `;
                cont.appendChild(box);
            });
        };

        renderSource('cont-a-13', arrayA, ptrA, 'A');
        renderSource('cont-b-13', arrayB, ptrB, 'B');

        const contOut = document.getElementById('cont-out-13');
        contOut.innerHTML = '';
        arrayC.forEach(item => {
            const box = document.createElement('div');
            box.innerText = item.val;
            box.style.cssText = `
                min-width: 35px; padding: 0 5px; height: 35px; border-radius: 6px;
                display: flex; align-items: center; justify-content: center; font-weight: bold; color: white;
                background: ${item.src === 'A' ? '#3b82f6' : '#f97316'};
                animation: popIn 0.3s ease-out; box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            `;
            contOut.appendChild(box);
        });
    };

    window.addLog13 = function(msg) {
        const logArea = document.getElementById('log-content-13');
        logArea.innerHTML += `<div style="margin-bottom: 4px;">> ${msg}</div>`;
        document.getElementById('step-log-container-13').scrollTop = 9999;
    };

    window.nextStep13 = function() {
        if (ptrA >= arrayA.length && ptrB >= arrayB.length) {
            window.addLog13(`<span style="color:#29c702; font-weight:bold;">[Hoàn tất] Đã xuất xong toàn bộ dữ liệu!</span>`);
            document.getElementById('btn-next-13').disabled = true;
            return false;
        }

        if (mode === 'APPEND') {
            if (ptrB < arrayB.length) {
                arrayC.push({ val: arrayB[ptrB], src: 'B' });
                window.addLog13(`In phần tử <b style="color:#f97316">B[${ptrB}] = ${arrayB[ptrB]}</b>`);
                ptrB++;
            } else if (ptrA < arrayA.length) {
                if (ptrA === 0) window.addLog13(`<span style="color:#64748b">--- Mảng B đã hết. Bắt đầu in mảng A ---</span>`);
                arrayC.push({ val: arrayA[ptrA], src: 'A' });
                window.addLog13(`In phần tử <b style="color:#3b82f6">A[${ptrA}] = ${arrayA[ptrA]}</b>`);
                ptrA++;
            }
        } 
        else if (mode === 'INTERLEAVE') {
            // Logic Xen kẽ
            if (turn === 'A') {
                if (ptrA < arrayA.length) {
                    arrayC.push({ val: arrayA[ptrA], src: 'A' });
                    window.addLog13(`Lượt A: In <b style="color:#3b82f6">A[${ptrA}] = ${arrayA[ptrA]}</b>`);
                    ptrA++;
                }
                turn = 'B'; // Đổi lượt
            } 
            else {
                if (ptrB < arrayB.length) {
                    arrayC.push({ val: arrayB[ptrB], src: 'B' });
                    window.addLog13(`Lượt B: In <b style="color:#f97316">B[${ptrB}] = ${arrayB[ptrB]}</b>`);
                    ptrB++;
                }
                turn = 'A'; // Đổi lượt
            }

            // Nếu một bên đã cạn, ép lượt cho bên còn lại ở bước tiếp theo
            if (ptrA >= arrayA.length) turn = 'B';
            if (ptrB >= arrayB.length) turn = 'A';
        }

        window.renderArray13();
        return true;
    };

    window.autoRun13 = function() {
        if (isSimulating) { isSimulating = false; document.getElementById('btn-auto-13').innerText = "▶ Tiếp tục"; return; }
        isSimulating = true;
        document.getElementById('btn-auto-13').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep13();
                if (!hasMore) { isSimulating = false; document.getElementById('btn-auto-13').innerText = "▶ Chạy tự động"; break; }
                await new Promise(r => setTimeout(r, 600)); 
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