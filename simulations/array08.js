{
    let arrayA = [];
    let n = 0;
    let targetX = 0;
    let currentStep = 0; // 0: Chờ, 1: Chèn cuối, 2: Sắp xếp, 3: Xong
    let isSimulating = false;

    window.initArray08Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Chèn cố định (Tư duy Sort)</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label><b>Mảng A:</b></label>
                        <input type="text" id="input-array-8" placeholder="1 2 3 4 5" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray08()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center;">
                        <label><b>Giá trị X cần chèn:</b></label>
                        <input type="number" id="input-x-8" value="3" style="width: 70px; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.resetArray08()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Thiết lập</button>
                    </div>
                </div>

                <div id="status-msg-8" style="margin-bottom: 15px; font-weight: bold; color: #1e293b; padding: 10px; background: #f1f5f9; border-radius: 4px;">
                    Nhấn 'Từng bước' để thấy quá trình chèn nhanh.
                </div>

                <div id="array-container-8" style="display: flex; justify-content: flex-start; align-items: center; gap: 12px; background: #f8fafc; padding: 30px 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 100px; overflow-x: auto; margin-bottom: 20px;">
                </div>

                <div style="display: flex; gap: 10px;">
                    <button onclick="window.nextStep08()" id="btn-next-8" class="toggle-btn" style="background:#29c702; color:white;">⏭ Từng bước</button>
                    <button onclick="window.resetArray08()" class="toggle-btn" style="background:#64748b; color:white;">🔄 Reset</button>
                </div>
            </div>
        `;
        window.randomArray08();
    };

    window.randomArray08 = function() {
        let temp = Array.from({ length: 5 }, () => Math.floor(Math.random() * 20) + 1);
        document.getElementById('input-array-8').value = temp.join(' ');
        window.resetArray08();
    };

    window.resetArray08 = function() {
        const inputStr = document.getElementById('input-array-8').value;
        arrayA = inputStr.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        n = arrayA.length;
        targetX = parseInt(document.getElementById('input-x-8').value);
        
        currentStep = 1; 
        document.getElementById('btn-next-8').disabled = false;
        document.getElementById('status-msg-8').innerHTML = `Sẵn sàng chèn <b>${targetX}</b> vào cuối mảng.`;
        window.renderArray08();
    };

    window.renderArray08 = function(highlightIdx = -1) {
        const container = document.getElementById('array-container-8');
        container.innerHTML = '';

        // Hiển thị n ô hiện tại + 1 ô trống nếu đang ở bước 1
        let displayLen = (currentStep === 1) ? n + 1 : arrayA.length;

        for (let i = 0; i < displayLen; i++) {
            const box = document.createElement('div');
            box.style.cssText = `
                min-width: 45px; height: 45px; border: 2px solid #0284c7; border-radius: 6px;
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: white; position: relative; transition: all 0.5s;
            `;

            if (i < arrayA.length) {
                box.innerText = arrayA[i];
            } else {
                box.style.border = "2px dashed #cbd5e1";
                box.innerText = "?";
            }

            if (i === highlightIdx) {
                box.style.background = "#29c702";
                box.style.color = "white";
                box.style.transform = "scale(1.2)";
            }

            const idx = document.createElement('span');
            idx.innerText = i;
            idx.style.cssText = "position: absolute; top: -20px; font-size: 10px; color: #94a3b8;";
            box.appendChild(idx);
            container.appendChild(box);
        }
    };

    window.nextStep08 = function() {
        const msg = document.getElementById('status-msg-8');

        if (currentStep === 1) {
            // Bước 1: Chèn vào cuối
            arrayA.push(targetX);
            msg.innerHTML = `Bước 1: Chèn <b>${targetX}</b> vào vị trí cuối cùng (Index ${arrayA.length - 1}).`;
            window.renderArray08(arrayA.length - 1);
            currentStep = 2;
        } else if (currentStep === 2) {
            // Bước 2: Sắp xếp
            msg.innerHTML = `Bước 2: Sử dụng hàm <b>sort(greater)</b> để sắp xếp mảng giảm dần.`;
            arrayA.sort((a, b) => b - a);
            window.renderArray08();
            currentStep = 3;
            document.getElementById('btn-next-8').disabled = true;
            msg.innerHTML += `<br><span style="color: #15803d">Hoàn tất! Mảng đã đảm bảo tính chất giảm dần.</span>`;
        }
    };
}