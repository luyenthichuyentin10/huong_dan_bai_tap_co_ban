## ➕ Bài 18: Tổng mảng con
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài: BTCB083</div>

Cho mảng $A$ gồm $N$ số nguyên. 

**Yêu cầu:**
- Thầy giáo đưa ra $Q$ câu hỏi (truy vấn), mỗi câu hỏi cho 2 vị trí $L$ và $R$. 
- Hãy tính tổng các phần tử từ vị trí $L$ đến vị trí $R$ trong mảng $A$.

*(Lưu ý: Để dễ làm việc với vị trí, bài này mảng $A$ sẽ đánh chỉ số từ 1 đến $N$)*.

### Input
Từ file **ARRAY18.INP**:
- Dòng 1: Gồm 2 số nguyên $N$ và $Q$.
- Dòng 2: $N$ số nguyên của mảng $A$.
- $Q$ dòng tiếp theo: Mỗi dòng chứa 2 số $L$ và $R$ ($1 \le L \le R \le N$).

### Ràng buộc
- ($0 < N, Q \le 10^5$)
- ($|A_i|\le 10^9$)

### Output
Ghi ra file **ARRAY18.OUT**:
- Gồm $Q$ dòng, mỗi dòng là đáp án cho 1 câu hỏi (tổng đoạn từ $L$ đến $R$).

### Sample Input 
```text
5 3
3 1 4 2 5
1 3
2 4
2 5
```

### Sample Output 
```text
8
7
12
```

### Giải thích
- Truy vấn 1: `3 + 1 + 4 = 8`
- Truy vấn 1: `1 + 4 + 2 = 7`
- Truy vấn 3: `1 + 4 + 2 + 5= 12`

### Subtask
- **Subtask 1 (50% điểm):** $N \le 10^3, Q \le 10^3$.
- **Subtask 2 (50% điểm):** $N \le 10^5, Q \le 10^5$.
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">💡 Cách 1: Vét cạn ($O(N \times Q)$) - Subtask 1</div>

- **Ý tưởng:** Với mỗi câu hỏi $(L, R)$, ta dùng 1 vòng lặp `for` chạy từ $L$ đến $R$ để cộng dồn các phần tử lại.
- **Nhược điểm:** Nếu $N = 10^5$ và hỏi $Q = 10^5$ câu, thầy giáo sẽ bắt máy tính lặp lại phép cộng $10^{10}$ lần $\rightarrow$ Máy tính sẽ chạy mất 10 giây (Quá thời gian!).

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TruyVanTongDoan_VetCan</span>(<span class="var">A</span>[], <span class="var">N</span>, <span class="var">Q</span>, <span class="var">TruyVan</span>[][2]):
    <span class="com">// Lặp qua từng câu hỏi</span>
    <span class="kw">CHO</span> <span class="var">q</span> chạy từ 0 đến <span class="var">Q</span> - 1:
        <span class="var">L</span> = <span class="var">TruyVan</span>[<span class="var">q</span>][0]
        <span class="var">R</span> = <span class="var">TruyVan</span>[<span class="var">q</span>][1]
        
        <span class="var">Tong</span> = 0
        <span class="com">// Dùng vòng lặp cộng từng phần tử từ L đến R</span>
        <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="var">L</span> đến <span class="var">R</span>:
            <span class="var">Tong</span> = <span class="var">Tong</span> + <span class="var">A</span>[<span class="var">i</span>]
            
        <span class="kw">XUẤT</span> <span class="var">Tong</span>
</pre>
</div>

<div class="step-card border-green">
<div class="step-badge bg-green">🚀 Cách 2: Lập Mảng Tổng Tích Lũy ($O(N + Q)$) - Subtask 2</div>

- **Ý tưởng "Heo đất":** Thay vì ai hỏi mới lôi ra đếm, ta chuẩn bị sẵn một mảng `S` (Sum). Trong đó `S[i]` lưu **tổng của tất cả các phần tử từ đầu mảng đến vị trí `i`**.
  - Xây dựng cực nhanh: `S[i] = S[i-1] + A[i]`.
- **Trả lời siêu tốc O(1):** Khi được hỏi tổng đoạn từ $L$ đến $R$. Ta thấy:
  - `S[R]` là tổng từ $1 \rightarrow R$.
  - Nhưng ta bị dư đoạn từ $1 \rightarrow L-1$.
  - Vậy Tổng đoạn $[L, R]$ = `S[R] - S[L-1]`.
*(Chỉ cần 1 phép tính trừ duy nhất, có hỏi 1 triệu câu cũng trả lời ngay lập tức!)* 

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TruyVanTongDoan</span>(<span class="var">A</span>[], <span class="var">N</span>, <span class="var">Q</span>, <span class="var">TruyVan</span>[][2]):
    <span class="var">S</span>[100005] = {0}
    
    <span class="com">// BƯỚC 1: Xây dựng mảng cộng dồn</span>
    <span class="com">// (Lưu ý A[] bắt đầu từ chỉ số 1)</span>
    <span class ="kw">CHO</span> <span class="var">i</span> chạy từ 1 đến <span class="var">N</span>:
        <span class="var">S</span>[<span class="var">i</span>] = <span class="var">S</span>[<span class="var">i</span>-1] + <span class="var">A</span>[<span class="var">i</span>]
        
    <span class="com">// BƯỚC 2: Trả lời từng câu hỏi O(1)</span>
    <span class="kw">CHO</span> <span class="var">q</span> chạy từ 0 đến <span class="var">Q</span> - 1:
        <span class="var">L</span> = <span class="var">TruyVan</span>[<span class="var">q</span>][0]
        <span class="var">R</span> = <span class="var">TruyVan</span>[<span class="var">q</span>][1]
        
        <span class="com">// Áp dụng công thức ma thuật</span>
        <span class="var">KetQua</span> = <span class="var">S</span>[<span class="var">R</span>] - <span class="var">S</span>[<span class="var">L</span>-1]
        <span class="kw">XUẤT</span> <span class="var">KetQua</span>
</pre>
</div>

<div class="step-card border-purple">
<div class="step-badge bg-purple">Bảng so sánh 2 thuật toán</div>

<table style="width:100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
    <thead>
        <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
            <th style="padding: 12px; text-align: left; color: #475569;">Tiêu chí</th>
            <th style="padding: 12px; text-align: left; color: #9a3412;">Cách 1: Vét cạn (Dùng vòng lặp cho mỗi câu hỏi)</th>
            <th style="padding: 12px; text-align: left; color: #15803d;">Cách 2: Mảng cộng dồn (Prefix Sum)</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Thời gian xây dựng</td>
            <td style="padding: 12px; color: #15803d;">$O(1)$ (Không cần chuẩn bị)</td>
            <td style="padding: 12px; color: #b91c1c;">$O(N)$ (Tốn 1 vòng lặp để tạo mảng S)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #fcfcfc;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Thời gian trả lời 1 câu hỏi</td>
            <td style="padding: 12px; color: #b91c1c;">$O(N)$ (Phải chạy vòng lặp từ L đến R)</td>
            <td style="padding: 12px; color: #15803d; font-weight: bold;">$O(1)$ (Chỉ 1 phép tính trừ duy nhất)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Tổng thời gian ($Q$ truy vấn)</td>
            <td style="padding: 12px; color: #b91c1c; font-weight: bold;">$O(N \times Q)$</td>
            <td style="padding: 12px; color: #15803d; font-weight: bold;">$O(N + Q)$</td>
        </tr>
    </tbody>
</table>
</div>