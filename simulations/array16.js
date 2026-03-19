{
    let arrayA = [];
    
    // Variables for O(2N) Mode (Separate Passes)
    let mStart = 0;
    let mEnd = 0;
    let passPhase = 1; // 1: Dem Tang, 2: Dem Giam
    
    // Variables for O(N) Optimal mode (State Machine)
    let i_opt = 0;
    let state = 0; 
    let startIdx = 0;
    
    // Variables for Brute Force mode
    let i_bf = 0;
    let j_bf = 1;
    
    // Results & State
    let countInc = 0;
    let countDec = 0;
    let maxIncLen = 0;
    let minDecLen = Infinity;
    let bestIncArr = [];
    let bestDecArr = [];
    
    let simMode = 2; // 1: Vet Can, 2: O(2N) Tach ham, 3: O(N) Gop
    let isSimulating = false;
    let isFinished = false;

    window.initArray16Simulation = function() {
        const container = document.getElementById('simulation-area');
        if (!container) return;

        container.innerHTML = `
            <div class="step-card border-yellow">
                <div class="step-badge bg-yellow">Mô phỏng Tìm Mảng con Tăng/Giảm (Đã cập nhật Lính canh)</div>
                
                <div style="display: flex; flex-direction: column; gap: 15px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label style="width: 70px;"><b>Mảng A:</b></label>
                        <input type="text" id="input-a-16" value="2 4 1 0 1 9 8 9 2 4" style="flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1;">
                        <button onclick="window.randomArray16()" class="toggle-btn" style="background:#f59e0b; color:white;">🎲 Ngẫu nhiên</button>
                    </div>
                    <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
                        <label style="width: 70px;"><b>Chế độ:</b></label>
                        <select id="sim-mode-16" onchange="window.resetArray16()" style="padding: 8px; border-radius: 4px; border: 1px solid #cbd5e1; font-weight: bold; color: #1e40af;">
                            <option value="2">Cách 2: Quét 2 lần tách biệt (Thêm Lính canh - Khuyên dùng O(2N))</option>
                            <option value="3">Cách 3: Máy trạng thái (Gộp vòng lặp - O(N))</option>
                            <option value="1">Cách 1: Vét cạn (Sinh mọi mảng con O(N³))</option>
                        </select>
                        <button onclick="window.resetArray16()" class="toggle-btn" style="background:#0284c7; color:white;">🔄 Áp dụng</button>
                    </div>
                </div>

                <div style="display: flex; gap: 20px; flex-wrap: wrap; margin-bottom: 20px;">
                    <div style="flex: 2; min-width: 300px;">
                        <div style="font-weight: bold; color: #1e293b; margin-bottom: 10px;">Quá trình Duyệt:</div>
                        <div id="cont-a-16" style="display: flex; flex-wrap: wrap; gap: 12px; background: #f8fafc; padding: 20px; border-radius: 8px; border: 1px solid #e2e8f0; min-height: 80px;"></div>
                        <div id="status-16" style="margin-top: 15px; padding: 10px; background: #e0f2fe; color: #0369a1; font-weight: bold; border-radius: 6px;">Trạng thái: Đang chờ...</div>
                    </div>
                    
                    <div style="flex: 1; min-width: 250px; background: #fffbeb; padding: 15px; border-radius: 8px; border: 2px solid #fde68a;">
                        <div style="font-weight: bold; color: #b45309; margin-bottom: 15px; text-align: center; border-bottom: 1px solid #fcd34d; padding-bottom: 5px;">BẢNG THỐNG KÊ (REPORT)</div>
                        
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="color: #15803d; font-weight: bold;">Số mảng TĂNG:</span>
                            <span id="lb-cnt-inc" style="font-weight: bold; font-size: 1.1em;">0</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                            <span style="color: #15803d;">Dài nhất:</span>
                            <span id="lb-max-inc" style="color: #64748b;">[]</span>
                        </div>
                        
                        <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                            <span style="color: #b91c1c; font-weight: bold;">Số mảng GIẢM:</span>
                            <span id="lb-cnt-dec" style="font-weight: bold; font-size: 1.1em;">0</span>
                        </div>
                        <div style="display: flex; justify-content: space-between;">
                            <span style="color: #b91c1c;">Ngắn nhất:</span>
                            <span id="lb-min-dec" style="color: #64748b;">[]</span>
                        </div>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">
                    <div style="display: flex; flex-direction: column; gap: 10px;">
                        <button onclick="window.autoRun16()" id="btn-auto-16" class="toggle-btn" style="background:#0284c7; color:white; justify-content: center;">▶ Chạy tự động</button>
                        <button onclick="window.nextStep16()" id="btn-next-16" class="toggle-btn" style="background:#29c702; color:white; justify-content: center;">⏭ Từng bước</button>
                    </div>
                    <div id="step-log-container-16" style="background: #1e1e1e; color: #d4d4d4; padding: 12px; border-radius: 6px; font-family: 'Consolas', monospace; font-size: 0.85rem; height: 140px; overflow-y: auto; border-left: 4px solid #f59e0b;">
                        <div id="log-content-16"></div>
                    </div>
                </div>
            </div>
        `;
        window.resetArray16();
    };

    window.randomArray16 = function() {
        let arr = Array.from({length: 9}, () => Math.floor(Math.random() * 20));
        document.getElementById('input-a-16').value = arr.join(' ');
        window.resetArray16();
    };

    window.resetArray16 = function() {
        isSimulating = false;
        isFinished = false;
        arrayA = document.getElementById('input-a-16').value.split(/[\s,]+/).map(Number).filter(n => !isNaN(n));
        simMode = parseInt(document.getElementById('sim-mode-16').value);
        
        let initLog = "";

        // Reset Mode 2 (O(2N))
        if (simMode === 2) {
            arrayA.push(-Infinity); // Thêm lính canh cực tiểu
            mStart = 0; mEnd = 0; passPhase = 1;
            initLog = `// [CÁCH 2: TÁCH HÀM] Đã cắm Lính canh (-∞). Bắt đầu Hàm 1: Đếm mảng TĂNG.`;
        } 
        // Reset Mode 3 (O(N) Opt)
        else if (simMode === 3) {
            arrayA.push(arrayA[arrayA.length - 1]); // Thêm lính canh copy phần tử cuối
            i_opt = 0; state = 0; startIdx = 0;
            initLog = `// [CÁCH 3: TRẠNG THÁI] Đã cắm Lính canh (Tạo đoạn bằng nhau). Đang chờ đà...`;
        } 
        // Reset Mode 1 (Vet Can)
        else {
            i_bf = 0; j_bf = 1;
            initLog = `// [CÁCH 1: VÉT CẠN] Dùng 2 con trỏ sinh mọi mảng con.`;
        }
        
        countInc = 0; countDec = 0;
        maxIncLen = 0; minDecLen = Infinity;
        bestIncArr = []; bestDecArr = [];

        document.getElementById('log-content-16').innerHTML = `<div style="color: #6a9955;">${initLog}</div>`;
        document.getElementById('btn-next-16').disabled = false;
        document.getElementById('btn-auto-16').innerText = "▶ Chạy tự động";
        
        window.updateReport16();
        window.renderArray16();
    };

    window.updateReport16 = function() {
        document.getElementById('lb-cnt-inc').innerText = countInc;
        document.getElementById('lb-cnt-dec').innerText = countDec;
        document.getElementById('lb-max-inc').innerText = bestIncArr.length > 0 ? `[${bestIncArr.join(', ')}]` : "[]";
        document.getElementById('lb-min-dec').innerText = bestDecArr.length > 0 ? `[${bestDecArr.join(', ')}]` : "[]";
    };

    window.renderArray16 = function() {
        const contA = document.getElementById('cont-a-16');
        contA.innerHTML = '';
        
        arrayA.forEach((val, idx) => {
            const wrapper = document.createElement('div');
            wrapper.style.cssText = "display: flex; flex-direction: column; align-items: center; gap: 5px; position: relative;";

            const box = document.createElement('div');
            
            // Xử lý hiển thị Lính canh
            let displayVal = val;
            let isSentinel = false;
            if (val === -Infinity) { displayVal = "-∞"; isSentinel = true; }
            else if (val === Infinity) { displayVal = "+∞"; isSentinel = true; }
            else if (simMode === 3 && idx === arrayA.length - 1) { isSentinel = true; }
            
            box.innerText = displayVal;
            let bg = "white"; let border = "#cbd5e1"; let color = "#1e293b";
            
            if (isSentinel) {
                bg = "#fef2f2"; border = "#ef4444"; color = "#b91c1c";
            }

            if (simMode === 1 && !isFinished && !isSentinel) {
                if (idx >= i_bf && idx <= j_bf) {
                    bg = "#fef08a"; border = "#f59e0b";
                    if (idx === i_bf) border = "#3b82f6"; 
                    if (idx === j_bf) border = "#a855f7"; 
                }
            } else if (simMode === 2 && !isFinished) {
                if (idx >= mStart && idx <= mEnd) {
                    if (passPhase === 1) { bg = "#dcfce7"; border = "#22c55e"; color = "#15803d"; } 
                    else { bg = "#fee2e2"; border = "#ef4444"; color = "#b91c1c"; } 
                    
                    if (idx === mEnd) { box.style.transform = "scale(1.15)"; border = "#0284c7"; }
                } else if (idx < mStart && !isSentinel) {
                    bg = "#f1f5f9"; color = "#94a3b8"; 
                }
            } else if (simMode === 3 && !isFinished) {
                if (idx >= startIdx && idx <= i_opt) {
                    if (state === 1) { bg = "#dcfce7"; border = "#22c55e"; color = "#15803d"; } 
                    else if (state === -1) { bg = "#fee2e2"; border = "#ef4444"; color = "#b91c1c"; } 
                    else { bg = "#fef08a"; border = "#f59e0b"; } 
                    
                    if (idx === i_opt && i_opt < arrayA.length - 1) {
                        box.style.transform = "scale(1.15)"; border = "#0284c7"; 
                    }
                } else if (idx < startIdx && !isSentinel) {
                    bg = "#f1f5f9"; color = "#94a3b8"; 
                }
            }

            box.style.cssText += `
                width: 40px; height: 40px; border-radius: 6px; border: 2px solid ${border};
                display: flex; align-items: center; justify-content: center; font-weight: bold;
                background: ${bg}; color: ${color}; transition: all 0.2s;
            `;

            const idxLabel = document.createElement('div');
            let labelText = idx;
            let labelColor = "#94a3b8";

            if (isSentinel) {
                labelText = "Lính canh";
                labelColor = "#ef4444";
            } else if (simMode === 1 && !isFinished) {
                if (idx === i_bf && idx === j_bf) { labelText = "i,j"; labelColor = "#3b82f6"; }
                else if (idx === i_bf) { labelText = "i"; labelColor = "#3b82f6"; }
                else if (idx === j_bf) { labelText = "j"; labelColor = "#a855f7"; }
            } else if (simMode === 2 && !isFinished) {
                if (idx === mStart && idx === mEnd) { labelText = "b,k"; labelColor = "#0284c7"; }
                else if (idx === mStart) { labelText = "b.đầu"; labelColor = "#0284c7"; }
                else if (idx === mEnd) { labelText = "k.thúc"; labelColor = "#0284c7"; }
            }
            
            idxLabel.innerText = labelText;
            idxLabel.style.cssText = `font-size: 11px; font-weight: bold; color: ${labelColor};`;

            wrapper.append(box, idxLabel);
            contA.appendChild(wrapper);
        });
    };

    window.addLog16 = function(msg) {
        const logArea = document.getElementById('log-content-16');
        logArea.innerHTML += `<div style="margin-bottom: 4px;">> ${msg}</div>`;
        document.getElementById('step-log-container-16').scrollTop = 9999;
    };

    function checkSubarray(arr, start, end) {
        let isInc = true, isDec = true;
        for (let k = start; k < end; k++) {
            if (arr[k] >= arr[k+1]) isInc = false;
            if (arr[k] <= arr[k+1]) isDec = false;
        }
        if (isInc) {
            let maxLeft = (start === 0 || arr[start-1] >= arr[start]);
            let maxRight = (end === arr.length - 1 || arr[end] >= arr[end+1]);
            if (maxLeft && maxRight) return 1;
        }
        if (isDec) {
            let maxLeft = (start === 0 || arr[start-1] <= arr[start]);
            let maxRight = (end === arr.length - 1 || arr[end] <= arr[end+1]);
            if (maxLeft && maxRight) return -1;
        }
        return 0;
    }

    window.nextStep16 = function() {
        if (isFinished) return false;

        if (simMode === 1) {
            // --- VÉT CẠN ---
            let status = checkSubarray(arrayA, i_bf, j_bf);
            let segment = arrayA.slice(i_bf, j_bf + 1);
            let len = segment.length;
            let strSegment = `[${segment.join(', ')}]`;
            
            if (status === 1) {
                countInc++;
                window.addLog16(`i=${i_bf}, j=${j_bf}: ${strSegment} -> <b style="color:#22c55e">TĂNG cực đại.</b> TÍNH!`);
                if (len > maxIncLen) { maxIncLen = len; bestIncArr = segment; }
            } else if (status === -1) {
                countDec++;
                window.addLog16(`i=${i_bf}, j=${j_bf}: ${strSegment} -> <b style="color:#ef4444">GIẢM cực đại.</b> TÍNH!`);
                if (len < minDecLen) { minDecLen = len; bestDecArr = segment; }
            } else {
                window.addLog16(`i=${i_bf}, j=${j_bf}: ${strSegment} -> Không hợp lệ/chưa cực đại.`);
            }
            
            window.updateReport16();
            j_bf++;
            if (j_bf >= arrayA.length) { i_bf++; j_bf = i_bf + 1; }
            
            if (i_bf >= arrayA.length - 1) {
                isFinished = true;
                window.addLog16(`<span style="color:#29c702; font-weight:bold;">[Hoàn tất] Đã duyệt hết mọi cặp i, j.</span>`);
                document.getElementById('status-16').innerHTML = `<span style="color:#15803d">Hoàn tất!</span>`;
                document.getElementById('btn-next-16').disabled = true;
            } else {
                document.getElementById('status-16').innerHTML = `Đang xét A[${i_bf}..${j_bf}]`;
            }

        } else if (simMode === 2) {
            // --- CÁCH 2: TÁCH HÀM (Thêm Sentinel) ---
            if (mStart >= arrayA.length - 1) { // Đã chạm Lính canh
                if (passPhase === 1) {
                    passPhase = 2; // Chuyển sang quét giảm
                    mStart = 0; mEnd = 0;
                    arrayA.pop(); // Xóa lính canh âm
                    arrayA.push(Infinity); // Thêm lính canh dương
                    
                    window.addLog16(`<div style="color: #6a9955; margin-top:8px;">// KẾT THÚC HÀM 1. Bắt đầu Hàm 2: Đếm mảng GIẢM (Thay Lính canh +∞)</div>`);
                    document.getElementById('status-16').innerHTML = `Đang quét lần 2: Tìm mảng GIẢM 📉`;
                    window.renderArray16();
                    return true;
                } else {
                    arrayA.pop(); // Xóa lính canh dương
                    isFinished = true;
                    window.addLog16(`<span style="color:#29c702; font-weight:bold;">[Hoàn tất] Đã hoàn thành 2 lần quét (O(2N))!</span>`);
                    document.getElementById('status-16').innerHTML = `<span style="color:#15803d">Hoàn tất O(2N)!</span>`;
                    document.getElementById('btn-next-16').disabled = true;
                    window.renderArray16();
                    return false;
                }
            }

            let curr = arrayA[mEnd];
            let next = arrayA[mEnd+1];
            let isStop = false;

            // Nhờ lính canh, ta chỉ cần so sánh <= hoặc >= là đủ!
            if (passPhase === 1 && curr >= next) isStop = true;
            if (passPhase === 2 && curr <= next) isStop = true;

            let currStr = curr === -Infinity ? "-∞" : (curr === Infinity ? "+∞" : curr);
            let nextStr = next === -Infinity ? "-∞" : (next === Infinity ? "+∞" : next);

            if (!isStop) {
                mEnd++;
                window.addLog16(`Kéo dãn ket_thuc đến ${mEnd} do ${currStr} ${passPhase===1?'<':'>'} ${nextStr}`);
            } else {
                // Đứt đà -> Chốt sổ đoạn
                let segment = arrayA.slice(mStart, mEnd + 1);
                let len = segment.length;
                let color = passPhase === 1 ? '#22c55e' : '#ef4444';
                let type = passPhase === 1 ? 'TĂNG' : 'GIẢM';
                
                if (len > 1) {
                    window.addLog16(`<span style="color:${color}; font-weight:bold;">Đứt đà tại ${nextStr}! Chốt mảng ${type} [${segment.join(', ')}] (Dài ${len})</span>`);
                    if (passPhase === 1) {
                        countInc++;
                        if (len > maxIncLen) { maxIncLen = len; bestIncArr = segment; }
                    } else {
                        countDec++;
                        if (len < minDecLen) { minDecLen = len; bestDecArr = segment; }
                    }
                    window.updateReport16();
                } else {
                    window.addLog16(`Đứt đà tại ${nextStr}. Bỏ qua do độ dài mảng = 1.`);
                }
                
                // Bước nhảy vọt
                mStart = mEnd + 1;
                mEnd = mStart;
            }

        } else {
            // --- CÁCH 3: TỐI ƯU GỘP ---
            if (i_opt >= arrayA.length - 1) {
                arrayA.pop(); // Xóa lính canh
                isFinished = true;
                window.addLog16(`<span style="color:#29c702; font-weight:bold;">[Hoàn tất] Mảng con cuối cùng đã bị ngắt bởi Lính canh!</span>`);
                document.getElementById('status-16').innerHTML = `<span style="color:#15803d">Hoàn tất!</span>`;
                document.getElementById('btn-next-16').disabled = true;
                window.renderArray16();
                return false;
            }

            let curr = arrayA[i_opt];
            let next = arrayA[i_opt+1];
            let newState = 0;

            if (curr < next) newState = 1;
            else if (curr > next) newState = -1;
            
            let statusStr = "";

            if (state === 0) {
                state = newState;
                if (newState !== 0) {
                    statusStr = newState === 1 ? "Bắt đầu đà TĂNG 📈" : "Bắt đầu đà GIẢM 📉";
                } else {
                    statusStr = "Phần tử bằng nhau, đà đi ngang.";
                    startIdx = i_opt + 1; // skip flat
                }
                window.addLog16(`i=${i_opt}: ${curr} -> ${next}. ${statusStr}`);
            } 
            else if (state !== 0 && state !== newState) {
                let reason = newState === 0 ? "GẶP LÍNH CANH (Đi ngang)" : "ĐẢO CHIỀU";
                window.addLog16(`i=${i_opt}: ${curr} -> ${next}. <span style="color:#ef4444; font-weight:bold;">${reason}!</span> Chốt mảng.`);
                
                // Chốt sổ
                let segment = arrayA.slice(startIdx, i_opt + 1);
                let len = segment.length;
                if (len >= 2) {
                    if (state === 1) {
                        countInc++;
                        if (len > maxIncLen) { maxIncLen = len; bestIncArr = segment; }
                    } else if (state === -1) {
                        countDec++;
                        if (len < minDecLen) { minDecLen = len; bestDecArr = segment; }
                    }
                    window.updateReport16();
                }

                startIdx = i_opt;
                if (newState === 0) startIdx = i_opt + 1; // Skip the flat state
                state = newState;
                
                if (newState === 1) statusStr = "Chuyển sang đà TĂNG 📈";
                else if (newState === -1) statusStr = "Chuyển sang đà GIẢM 📉";
                else statusStr = "Bị ngắt đà.";
            } else {
                statusStr = state === 1 ? "Đang tiếp tục TĂNG 📈" : "Đang tiếp tục GIẢM 📉";
                window.addLog16(`i=${i_opt}: ${curr} -> ${next}. ${statusStr}`);
            }

            document.getElementById('status-16').innerHTML = statusStr;
            i_opt++;
        }

        window.renderArray16();
        return !isFinished;
    };

    window.autoRun16 = function() {
        if (isSimulating) { isSimulating = false; document.getElementById('btn-auto-16').innerText = "▶ Tiếp tục"; return; }
        isSimulating = true;
        document.getElementById('btn-auto-16').innerText = "⏸ Tạm dừng";
        const run = async () => {
            while (isSimulating) {
                let hasMore = window.nextStep16();
                if (!hasMore) { isSimulating = false; document.getElementById('btn-auto-16').innerText = "▶ Chạy tự động"; break; }
                await new Promise(r => setTimeout(r, simMode === 1 ? 0 : 0)); 
            }
        };
        run();
    };
}