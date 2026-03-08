{
    // Khai báo biến cục bộ trong khối để tránh lỗi 'already been declared'
    let arrayA = [];
    let n = 0;
    let vtX = 0;
    let valY = 0;
    let currentStep = 0; // 1: Dịch chuyển, 2: Chèn, 3: Hoàn tất
    let shiftIdx = -1;
    let isSimulating = false;

    // Hàm khởi tạo chính
    window.initArray07Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Chèn phần tử</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Mảng A:</b></label>
                        <input type="text" id="input-array-7" placeholder="Ví dụ: 1 2 3 4 5" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray07()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Vị trí chèn (X):</b></label>
                        <input type="number" id="input-vt-7" value="2" style="width: 60px; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <label><b>Giá trị chèn (Y):</b></label>
                        <input type="number" id="input-val-7" value="99" style="width: 70px; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.resetArray07()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Thiết lập</button>
                    </div>
                </div>

                <div style="font-weight: bold; color: #0284c7; margin-bottom: 10px;">Trạng thái mảng:</div>
                <div id="array-container-7" style="display: flex; justify-content: flex-start; align-items: flex-end; gap: 12px; background: #f8fafc; padding: 30px 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 100px; overflow-x: auto;">
                </div>

                <div id="status-msg-7" style="margin: 15px 0; font-weight: bold; color: #1e293b; min-height: 24px; padding: 10px; background: #f1f5f9; border-radius: 4px;">
                    Sẵn sàng mô phỏng.
                </div>

                <div style="display: flex; gap: 10px;">
                    <button onclick="window.autoRun07()" id="btn-auto-7" class="toggle-btn" style="background:#0284c7; color:white;">▶ Chạy tự động</button>
                    <button onclick="window.nextStep07()" id="btn-next-7" class="toggle-btn" style="background:#29c702; color:white;">⏭ Từng bước</button>
                    <button onclick="window.resetArray07()" class="toggle-btn" style="background:#64748b; color:white;">🔄 Reset</button>
                </div>
            </div>
        `;
        window.randomArray07();
    };

    window.randomArray07 = function() {
        let temp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 50) + 1);
        document.getElementById('input-array-7').value = temp.join(' ');
        window.resetArray07();
    };

    window.resetArray07 = function() {
        isSimulating = false;
        const inputStr = document.getElementById('input-array-7').value;
        arrayA = inputStr.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        
        n = arrayA.length;
        vtX = parseInt(document.getElementById('input-vt-7').value);
        valY = parseInt(document.getElementById('input-val-7').value);
        
        // Chuẩn hóa vị trí theo logic C++
        if (vtX > n) vtX = n;
        if (vtX < 0) vtX = 0;

        currentStep = 1; 
        shiftIdx = n;    
        document.getElementById('btn-next-7').disabled = false;
        document.getElementById('btn-auto-7').innerText = "▶ Chạy tự động";
        document.getElementById('status-msg-7').innerHTML = `Mục tiêu: Chèn <b style="color:green">${valY}</b> vào vị trí <b>${vtX}</b>.`;
        
        window.renderArray07();
    };

    window.renderArray07 = function(targetIdx = -1, sourceIdx = -1) {
        const container = document.getElementById('array-container-7');
        container.innerHTML = '';

        // Hiển thị mảng (n+1 ô để chuẩn bị chèn)
        for (let i = 0; i <= n; i++) {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 8px;";

            const idxLabel = document.createElement('div');
            idxLabel.innerText = i;
            idxLabel.style.cssText = `font-size: 16px; font-weight: 900; color: ${i === targetIdx ? '#f59e0b' : '#94a3b8'};`;

            const box = document.createElement('div');
            box.innerText = (i < arrayA.length) ? arrayA[i] : (i === n ? "" : "");
            
            // Định dạng ô
            let bgColor = "white";
            let borderColor = "#0284c7";
            let textColor = "#1e293b";

            if (i === sourceIdx) { bgColor = "#fbbf24"; textColor = "white"; borderColor = "#f59e0b"; }
            if (i === targetIdx) { bgColor = "#fee2e2"; borderColor = "#ef4444"; }
            if (currentStep === 3 && i === vtX) { bgColor = "#29c702"; textColor = "white"; borderColor = "#1a8a01"; }

            box.style.cssText = `
                width: 45px; height: 45px; border: 2px solid ${borderColor}; border-radius: 6px;
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bgColor}; color: ${textColor}; transition: all 0.3s;
                ${(i === sourceIdx || i === targetIdx) ? "transform: scale(1.1); z-index: 10;" : ""}
            `;

            wrapper.append(idxLabel, box);
            container.appendChild(wrapper);
        }
    };

    window.nextStep07 = function() {
        if (currentStep === 3) return false;

        const msg = document.getElementById('status-msg-7');

        if (currentStep === 1) { 
            // Bước 1: Dịch chuyển (Shift right)
            if (shiftIdx > vtX) {
                let from = shiftIdx - 1;
                let to = shiftIdx;
                msg.innerHTML = `Bước dịch chuyển: Copy <b>A[${from}]</b> (${arrayA[from]}) sang <b>A[${to}]</b>`;
                window.renderArray07(to, from);
                arrayA[to] = arrayA[from];
                shiftIdx--;
                return true;
            } else {
                currentStep = 2;
                msg.innerHTML = `<span style="color: #ef4444">Đã dồn xong! Vị trí ${vtX} đã sẵn sàng để chèn.</span>`;
                window.renderArray07();
                return true;
            }
        } else if (currentStep === 2) {
            // Bước 2: Chèn giá trị mới
            msg.innerHTML = `Thực hiện chèn: <b>A[${vtX}] = ${valY}</b>`;
            arrayA[vtX] = valY;
            n++; 
            currentStep = 3;
            window.renderArray07();
            document.getElementById('btn-next-7').disabled = true;
            return false;
        }
    };

    window.autoRun07 = function() {
        if (isSimulating) {
            isSimulating = false;
            document.getElementById('btn-auto-7').innerText = "▶ Tiếp tục";
            return;
        }

        isSimulating = true;
        document.getElementById('btn-auto-7').innerText = "⏸ Tạm dừng";
        
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep07();
                if (!hasMore) {
                    isSimulating = false;
                    document.getElementById('btn-auto-7').innerText = "▶ Chạy tự động";
                    break;
                }
                await new Promise(r => setTimeout(r, 800));
            }
        };
        run();
    };
}