## 🏷️ Bài 17: Số xuất hiện nhiều nhất
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài: BTCB082</div>

Cho mảng $A$ gồm $N$ số nguyên dương. 

**Yêu cầu:**
- Hãy tìm số xuất hiện nhiều lần nhất trong mảng và in ra số lần xuất hiện của nó. 
- Nếu có nhiều số có cùng số lần xuất hiện nhiều nhất, hãy in ra số có giá trị nhỏ nhất.

### Input
Từ file **ARRAY17.INP**:
- Dòng 1: Số nguyên dương $N$.
- Dòng 2: $N$ số nguyên dương $A_i$ cách nhau một khoảng trắng.

### Ràng buộc
- ($0 < N \le 10^6$)
- ($0 < A_i\le 10^6$)

### Output
Ghi ra file **ARRAY17.OUT**:
- Một dòng duy nhất chứa 2 số: Giá trị xuất hiện nhiều nhất và Số lần xuất hiện, cách nhau khoảng trắng.

### Sample Input 
```text
8
2 4 2 8 4 2 9 4
```

### Sample Output 
```text
2 3
```
### Giải thích
*Số 2 và số 4 đều xuất hiện 3 lần, nhưng 2 nhỏ hơn 4 nên in ra 2.*

### Subtask
- **Subtask 1 (50% điểm):** $N \le 10^3, A_i \le 10^6$.
- **Subtask 2 (50% điểm):** $N \le 10^6, A_i \le 10^6$.
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">💡 Cách 1: Vét cạn ($O(N^2)$) - Vượt qua Subtask 1</div>

- **Ý tưởng:** Với mỗi phần tử $A[i]$, ta dùng thêm một vòng lặp chạy từ đầu đến cuối mảng để đếm xem có bao nhiêu số giống nó. 
- **Nhược điểm:** Nếu $N = 10^6$, ta phải thực hiện $10^{12}$ phép toán $\rightarrow$ Time Limit Exceeded!

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TimSoPhoBien_VetCan</span>(<span class="var">A</span>[], <span class="var">N</span>):
    <span class="var">SoXuatHienNhieuNhat</span> = -1
    <span class="var">SoLanXuatHienMax</span> = 0
    
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">N</span> - 1:
        <span class="var">Dem</span> = 0
        <span class="com">// Đếm xem A[i] xuất hiện bao nhiêu lần trong mảng</span>
        <span class="kw">CHO</span> <span class="var">j</span> chạy từ 0 đến <span class="var">N</span> - 1:
            <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span>] == <span class="var">A</span>[<span class="var">j</span>] <span class="kw">THÌ</span>:
                <span class="var">Dem</span> = <span class="var">Dem</span> + 1
                
        <span class="com">// Cập nhật nếu tìm thấy kỷ lục mới</span>
        <span class="kw">NẾU</span> <span class="var">Dem</span> > <span class="var">SoLanXuatHienMax</span> HOẶC (<span class="var">Dem</span> == <span class="var">SoLanXuatHienMax</span> VÀ <span class="var">A</span>[<span class="var">i</span>] < <span class="var">SoXuatHienNhieuNhat</span>) <span class="kw">THÌ</span>:
            <span class="var">SoLanXuatHienMax</span> = <span class="var">Dem</span>
            <span class="var">SoXuatHienNhieuNhat</span> = <span class="var">A</span>[<span class="var">i</span>]
            
    <span class="kw">XUẤT</span> <span class="var">SoXuatHienNhieuNhat</span> + " " + <span class="var">SoLanXuatHienMax</span>
</pre>
</div>

<div class="step-card border-green">
<div class="step-badge bg-green">🚀 Cách 2: Mảng đánh dấu ($O(N + \max(A))$) - Vượt qua Subtask 2</div>

- **Ý tưởng:** Thay vì đếm đi đếm lại, ta tạo ra một "cuốn sổ tay" là một mảng phụ `Count[]` (khởi tạo toàn số 0). 
- **Luật ghi sổ:** Khi duyệt qua một số $X$ trong mảng $A$, ta coi $X$ như là **chỉ số (index)** của mảng `Count`, và tăng `Count[X]` lên 1 đơn vị. 
  *(Ví dụ: Gặp số 4 $\rightarrow$ `Count[4]++`)*.
- **Kết quả:** Sau khi duyệt mảng $A$ đúng 1 lần, `Count[X]` chính là số lần xuất hiện của $X$. Ta chỉ cần duyệt mảng `Count` để tìm giá trị lớn nhất. 

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TimSoPhoBien</span>(<span class="var">A</span>[], <span class="var">N</span>):
    <span class="com">// Khai báo mảng đếm, kích thước bằng giá trị lớn nhất có thể của A[i]</span>
    <span class="var">Count</span>[1000005] = {0}
    <span class="var">MaxVal</span> = 0
    
    <span class="com">// BƯỚC 1: Đánh dấu (Đếm tần số)</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">N</span> - 1:
        <span class="var">X</span> = <span class="var">A</span>[<span class="var">i</span>]
        <span class="var">Count</span>[<span class="var">X</span>] = <span class="var">Count</span>[<span class="var">X</span>] + 1
        
        <span class="kw">NẾU</span> <span class="var">X</span> > <span class="var">MaxVal</span> <span class="kw">THÌ</span> <span class="var">MaxVal</span> = <span class="var">X</span> <span class="com">// Tìm giới hạn để quét cho nhanh</span>
        
    <span class="com">// BƯỚC 2: Tìm số xuất hiện nhiều nhất</span>
    <span class="var">SoXuatHienNhieuNhat</span> = -1
    <span class="var">SoLanXuatHien</span> = 0
    
    <span class="kw">CHO</span> <span class="var">v</span> chạy từ 0 đến <span class="var">MaxVal</span>:
        <span class="kw">NẾU</span> <span class="var">Count</span>[<span class="var">v</span>] > <span class="var">SoLanXuatHien</span> <span class="kw">THÌ</span>:
            <span class="var">SoLanXuatHien</span> = <span class="var">Count</span>[<span class="var">v</span>]
            <span class="var">SoXuatHienNhieuNhat</span> = <span class="var">v</span>
            
    <span class="kw">XUẤT</span> <span class="var">SoXuatHienNhieuNhat</span> + " " + <span class="var">SoLanXuatHien</span>
</pre>
</div>

<div class="step-card border-purple">
<div class="step-badge bg-purple">Bảng so sánh 2 thuật toán</div>

<table style="width:100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
    <thead>
        <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
            <th style="padding: 12px; text-align: left; color: #475569;">Tiêu chí</th>
            <th style="padding: 12px; text-align: left; color: #9a3412;">Cách 1: Vét cạn (Đếm từng số)</th>
            <th style="padding: 12px; text-align: left; color: #15803d;">Cách 2: Mảng đánh dấu (Frequency Array)</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Thời gian chạy</td>
            <td style="padding: 12px; color: #b91c1c; font-weight: bold;">$O(N^2)$</td>
            <td style="padding: 12px; color: #15803d; font-weight: bold;">$O(N + \max(A_i))$</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #fcfcfc;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Bộ nhớ sử dụng</td>
            <td style="padding: 12px; color: #15803d;">$O(1)$ (Không tốn thêm bộ nhớ)</td>
            <td style="padding: 12px; color: #b91c1c;">$O(\max(A_i))$ (Cần mảng phụ khá lớn)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Với $N = 10^6$</td>
            <td style="padding: 12px;">Thực hiện $\approx 10^{12}$ phép toán (Quá t/g)</td>
            <td style="padding: 12px;">Chỉ cần lặp $\approx 10^6$ lần (Chạy chưa tới 0.01 giây)</td>
        </tr>
    </tbody>
</table>
</div>