// Biến toàn cục để quản lý trạng thái mô phỏng
let currentArr = [];
let steps = [];
let currentStepIdx = -1;
let isPlaying = false;

/**
 * Hàm khởi tạo giao diện mô phỏng (được gọi từ index.html)
 */
function initArray04Simulation() {
    const container = document.getElementById('simulation-area');
    if (!container) return;

    container.innerHTML = `
        <div class="step-card border-green">
            <div class="step-badge bg-green">Mô phỏng trực quan</div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px;">
                <input type="number" id="num-elements" value="8" min="2" max="20" style="width: 60px; padding: 5px;">
                <button onclick="generateRandomArray()" class="toggle-btn" style="background:#0284c7; color:white;">🎲 Ngẫu nhiên</button>
                <select id="algo-type" style="padding: 5px; border-radius: 6px;">
                    <option value="bubble">Bubble Sort (Nổi bọt)</option>
                    <option value="selection">Selection Sort (Chọn)</option>
                </select>
            </div>

            <div id="chart-container" style="display: flex; align-items: flex-end; justify-content: center; height: 200px; gap: 5px; background: #f1f5f9; padding: 20px; border-radius: 8px; border: 1px solid #cbd5e1;">
            </div>

            <div id="step-explanation" style="margin-top: 15px; font-style: italic; color: #0c4a6e; min-height: 24px; text-align: center;">
                Nhấn "Bắt đầu" hoặc "Từng bước" để xem thuật toán chạy.
            </div>

            <div style="text-align: center; margin-top: 20px; display: flex; justify-content: center; gap: 10px;">
                <button onclick="startAutoPlay()" id="btn-play" class="toggle-btn">▶ Chạy tự động</button>
                <button onclick="nextStep()" class="toggle-btn" style="background:#29c702; color:white;">⏭ Từng bước</button>
                <button onclick="resetSim()" class="toggle-btn" style="background:#64748b; color:white;">🔄 Reset</button>
            </div>
        </div>
    `;
    generateRandomArray();
}

// 1. Tạo mảng ngẫu nhiên
function generateRandomArray() {
    const n = document.getElementById('num-elements').value;
    currentArr = Array.from({ length: n }, () => Math.floor(Math.random() * 90) + 10);
    resetSim();
}

// 2. Reset trạng thái
function resetSim() {
    stopAutoPlay();
    currentStepIdx = -1;
    steps = [];
    document.getElementById('step-explanation').innerText = "Đã sẵn sàng. Chọn thuật toán và bắt đầu.";
    
    // Sinh các bước thuật toán dựa trên lựa chọn
    const algo = document.getElementById('algo-type').value;
    if (algo === 'bubble') generateBubbleSteps([...currentArr]);
    else generateSelectionSteps([...currentArr]);
    
    renderChart(currentArr);
}

// 3. Vẽ biểu đồ cột
function renderChart(data, highlightIndices = [], sortedIndices = []) {
    const container = document.getElementById('chart-container');
    container.innerHTML = '';
    const maxVal = Math.max(...currentArr, 1);

    data.forEach((val, i) => {
        const col = document.createElement('div');
        col.style.width = '30px';
        col.style.height = `${(val / maxVal) * 100}%`;
        col.style.backgroundColor = '#0284c7'; // Mặc định xanh dương
        col.style.display = 'flex';
        col.style.alignItems = 'flex-end';
        col.style.justifyContent = 'center';
        col.style.color = 'white';
        col.style.fontSize = '12px';
        col.style.fontWeight = 'bold';
        col.style.borderRadius = '4px 4px 0 0';
        col.innerText = val;

        if (highlightIndices.includes(i)) col.style.backgroundColor = '#f59e0b'; // Đang xét (Vàng)
        if (sortedIndices.includes(i)) col.style.backgroundColor = '#29c702'; // Đã xong (Xanh lá)

        container.appendChild(col);
    });
}

// 4. Thuật toán: Tạo danh sách các bước (Snapshots)
function generateBubbleSteps(arr) {
    let n = arr.length;
    let sorted = [];
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            steps.push({ array: [...arr], highlight: [j, j + 1], sorted: [...sorted], msg: `So sánh ${arr[j]} và ${arr[j+1]}` });
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                steps.push({ array: [...arr], highlight: [j, j + 1], sorted: [...sorted], msg: `Hoán đổi ${arr[j+1]} và ${arr[j]}` });
            }
        }
        sorted.push(n - 1 - i);
    }
    sorted.push(0);
    steps.push({ array: [...arr], highlight: [], sorted: [...sorted], msg: "Sắp xếp hoàn tất!" });
}

function generateSelectionSteps(arr) {
    let n = arr.length;
    let sorted = [];
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            steps.push({ array: [...arr], highlight: [i, j], sorted: [...sorted], msg: `Tìm phần tử nhỏ nhất: So sánh ${arr[minIdx]} và ${arr[j]}` });
            if (arr[j] < arr[minIdx]) minIdx = j;
        }
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        sorted.push(i);
        steps.push({ array: [...arr], highlight: [i], sorted: [...sorted], msg: `Đưa ${arr[i]} về vị trí đúng` });
    }
    sorted.push(n-1);
    steps.push({ array: [...arr], highlight: [], sorted: [...sorted], msg: "Sắp xếp hoàn tất!" });
}

// 5. Điều khiển bước
function nextStep() {
    if (currentStepIdx < steps.length - 1) {
        currentStepIdx++;
        const step = steps[currentStepIdx];
        renderChart(step.array, step.highlight, step.sorted);
        document.getElementById('step-explanation').innerText = step.msg;
    } else {
        stopAutoPlay();
    }
}

async function startAutoPlay() {
    if (isPlaying) return;
    isPlaying = true;
    document.getElementById('btn-play').innerText = "⏸ Tạm dừng";
    while (isPlaying && currentStepIdx < steps.length - 1) {
        nextStep();
        await new Promise(r => setTimeout(r, 600));
    }
    stopAutoPlay();
}

function stopAutoPlay() {
    isPlaying = false;
    const btn = document.getElementById('btn-play');
    if (btn) btn.innerText = "▶ Chạy tự động";
}