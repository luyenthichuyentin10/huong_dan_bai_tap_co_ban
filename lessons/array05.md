## Bài 5: Tìm phần tử

<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng $A$ có $N$ phần tử $A_i$ và một số nguyên $X$, 

**Yêu cầu:** Tìm xem $X$ có trong mảng hay không, nếu có thì đếm số lượng và báo tất cả các vị trí của $X$ trong mảng. Nếu không có thì ghi **No**

### Input
Từ file **ARRAY05.INP** gồm 
- Dòng đầu chứa số $N$ là số lượng các phần tử trong mảng.các phần tử trong mảng, 
- Dòng thứ hai chứa các phần tử $A_i$ mỗi phần tử cách nhau khoảng trắng.
- Dòng thứ ba chứa số $X$ là giá trị phần tử muốn tìm.

### Ràng buộc
- $(0 \le N \le 10^7)$
- $(-1000 \le A_i \le 1000)$
- $(-1000 \le X \le 1000)$

### Output
Ghi ra file **ARRAY05.OUT** các nội dung
- Dòng thứ nhất ghi số lượng phần tử $X$ tìm thấy
- Dòng thứ hai ghi vị trí các phần tử $X$ trong mảng

### Sample Input 
```
5
1 2 3 2 5
2
```
### Sample Output 
```
2
1 3
```
### Subtask
- $50\%$ số test có $N \le 1000$
- $50\%$ số test còn lại không có điều kiện gì thêm

</div>

<div class="step-card border-yellow">
    <div class="step-badge bg-yellow">Phân tích đề bài</div>

### 🔍 1. Các thông tin trọng tâm
* **Mục tiêu:** Kiểm tra sự tồn tại của giá trị `X` trong mảng `A`.
* **Dữ liệu cần xử lý:**
    * **Đếm:** Tính tổng số lần `X` xuất hiện.
    * **Lưu trữ:** Ghi lại tất cả các chỉ số (vị trí) mà tại đó `A[i] == X`.
* **Trường hợp đặc biệt:** Nếu không tìm thấy bất kỳ phần tử nào, phải xuất thông báo `No` thay vì số 0.
* **Lưu ý về vị trí:** Trong lập trình, mảng thường bắt đầu từ chỉ số `0`. Hãy đảm bảo kết quả xuất ra khớp với quy ước chỉ số mà đề bài yêu cầu (thường là chỉ số 0 hoặc 1).

### 📋 2. Giải thích Ví dụ (Sample Input/Output)
Dựa trên dữ liệu mẫu:
* **Mảng A:** `1, 2, 3, 2, 5` (có $N = 5$ phần tử).
* **Giá trị cần tìm X:** `2`.

**Quá trình quét mảng:**
1.  Tại chỉ số `0`: $A[0] = 1$ (Không khớp).
2.  Tại chỉ số `1`: $A[1] = 2$ (Khớp! Lưu vị trí `1`, tăng đếm lên 1).
3.  Tại chỉ số `2`: $A[2] = 3$ (Không khớp).
4.  Tại chỉ số `3`: $A[3] = 2$ (Khớp! Lưu vị trí `3`, tăng đếm lên 2).
5.  Tại chỉ số `4`: $A[4] = 5$ (Không khớp).

**Kết quả cuối cùng:**
* Số lượng tìm thấy: `2`.
* Các vị trí: `1 3`.

### ⚠️ Lưu ý về Ràng buộc
Với $N \le 10^7$ (10 triệu phần tử), đây là một kích thước dữ liệu rất lớn. 
* Ta cần sử dụng thuật toán **Tìm kiếm tuần tự** với độ phức tạp $O(N)$.
* Lưu ý tốc độ nhập/xuất dữ liệu: Trong C++, nên sử dụng `ios_base::sync_with_stdio(false); cin.tie(0); cout.tie(0)` để đảm bảo không bị quá thời gian (Time Limit Exceeded).

</div>

<div class="step-card border-orange">
    <div class="step-badge bg-orange">Phân tích thuật toán</div>

### 💡 1. Ý tưởng thuật toán: Tìm kiếm tuần tự (Linear Search)

Vì mảng chưa được sắp xếp, cách đơn giản nhất là chúng ta duyệt từ đầu mảng đến cuối mảng. Với mỗi phần tử $A_i$, ta so sánh nó với giá trị $X$:
- Nếu $A_i = X$: Lưu lại vị trí $i$ và tăng biến đếm.
- Nếu sau khi duyệt hết mảng mà biến đếm vẫn bằng $0$, ta kết luận không tìm thấy.

**Độ phức tạp:** $O(N)$ vì trong trường hợp xấu nhất ta phải kiểm tra toàn bộ $N$ phần tử.

***Trong lập trình thi đấu, ta thường đứng trước 2 sự lựa chọn tùy vào giới hạn của đề bài:***

### 💾 Phương án 1: Tối ưu bộ nhớ (Duyệt 2 lần)
* **Cách làm:** 
    * Lần 1: Duyệt mảng để đếm xem có bao nhiêu số $X$.
    * Lần 2: Duyệt lại mảng từ đầu, hễ gặp $X$ thì xuất vị trí ngay lập tức.
* **Ưu điểm:** Tiết kiệm bộ nhớ vì chỉ dùng duy nhất 1 mảng $A$.
* **Nhược điểm:** Tốn thời gian hơn vì phải đi qua mảng 2 lần ($2 \times N$ phép tính).

**Mã giả thuật toán tối ưu bộ nhớ**
<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TimPhanTu_ToiUuBoNho</span>(<span class="var">A</span>[], <span class="var">n</span>, <span class="var">X</span>):
    <span class="var">count</span> = 0
    <span class="com">// LẦN 1: Duyệt mảng để đếm số lượng X</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">n</span> - 1:
        <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span>] == <span class="var">X</span> <span class="kw">THÌ</span>:
            <span class="var">count</span> = <span class="var">count</span> + 1
    <span class="com">// Kiểm tra nếu không tìm thấy</span>
    <span class="kw">NẾU</span> <span class="var">count</span> == 0 <span class="kw">THÌ</span>:
        Xuất "No"
    <span class="kw">NGƯỢC LẠI</span>:
        <span class="com">// LẦN 2: Duyệt lại từ đầu để xuất các vị trí i</span>
        Xuất <span class="var">count</span>
        <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">n</span> - 1:
            <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span>] == <span class="var">X</span> <span class="kw">THÌ</span>:
                Xuất <span class="var">i</span>
</pre>

### 🚀 Phương án 2: Tối ưu tốc độ (Dùng mảng phụ)
* **Cách làm:** Duyệt mảng đúng 1 lần duy nhất. Nếu gặp $X$ thì vừa tăng biến đếm, vừa lưu vị trí vào một mảng phụ (mảng `viTri`).
* **Ưu điểm:** Chạy cực nhanh vì chỉ duyệt mảng đúng 1 lần ($1 \times N$ phép tính).
* **Nhược điểm:** Tốn thêm bộ nhớ để lưu trữ mảng `viTri`

**Mã giả thuật toán tối ưu tốc độ**
<pre class="pseudocode">
<span class="var">viTri</span> = [] <span class="com">// Mảng lưu các vị trí tìm thấy</span>
<span class="kw">HÀM</span> <span class="fn">TimPhanTu</span>(<span class="var">A</span>[], <span class="var">n</span>, <span class="var">X</span>):
    <span class="var">count</span> = <span class="val">0</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">0</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span>] == <span class="var">X</span> <span class="kw">THÌ</span>:
            <span class="var">count</span> = <span class="var">count</span> + <span class="val">1</span>
            Thêm <span class="var">i</span> vào <span class="var">viTri</span>
    <span class="kw">NẾU</span> <span class="var">count</span> > <span class="val">0</span> <span class="kw">THÌ</span>:
        Xuất <span class="var">count</span>
        Xuất <span class="var">viTri</span>
    <span class="kw">NGƯỢC LẠI</span>:
        Xuất <span class="val">"No"</span>
</pre> 
</div>

<div class="step-card border-green">
    <div class="step-badge bg-green">So sánh chiến thuật lập trình</div>

<table style="width:100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
        <thead>
            <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
                <th style="padding: 12px; text-align: left; color: #475569;">Tiêu chí</th>
                <th style="padding: 12px; text-align: left; color: #9a3412;">PA 1: Tối ưu bộ nhớ</th>
                <th style="padding: 12px; text-align: left; color: #15803d;">PA 2: Tối ưu tốc độ</th>
            </tr>
        </thead>
        <tbody>
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Cách tiếp cận</td>
                <td style="padding: 12px;">Duyệt mảng <b>2 lần</b> (Lần 1 đếm, lần 2 in).</td>
                <td style="padding: 12px;">Duyệt mảng <b>1 lần duy nhất</b>.</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0; background-color: #fcfcfc;">
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Sử dụng bộ nhớ</td>
                <td style="padding: 12px; color: #15803d;"><b>Cực thấp:</b> Chỉ dùng mảng A gốc.</td>
                <td style="padding: 12px; color: #b91c1c;"><b>Cao hơn:</b> Cần mảng phụ lưu vị trí.</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Tốc độ (Time)</td>
                <td style="padding: 12px; color: #b91c1c;">Chậm (tốn $2 \times N$ phép tính).</td>
                <td style="padding: 12px; color: #15803d;"><b>Rất nhanh</b> (tốn $1 \times N$ phép tính).</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0; background-color: #fcfcfc;">
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Độ phức tạp</td>
                <td style="padding: 12px;">$O(2N)$</td>
                <td style="padding: 12px;">$O(N)$</td>
            </tr>
            <tr>
                <td style="padding: 12px; font-weight: bold; color: #64748b;">Khuyên dùng</td>
                <td style="padding: 12px;">Khi RAM bị giới hạn ngặt nghèo.</td>
                <td style="padding: 12px; font-weight: bold; color: #15803d;">Ưu tiên số 1 cho thi HSG.</td>
            </tr>
        </tbody>
    </table>

**Lời khuyên cho cấp THCS:** Trong các kỳ thi học sinh giỏi cấp THCS, bộ nhớ (RAM) thường cho khá thoải mái ($128MB$ - $256MB$), trong khi thời gian thường rất ngặt nghèo ($1.0s$). Do đó **phương án 2 (Tối ưu tốc độ)** luôn được ưu tiên hàng đầu.
</div>