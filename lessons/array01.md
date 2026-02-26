## Bài 1: Tính Trung bình cộng và Trung bình nhân mảng

<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng số nguyên $A$ có $N$ phần tử. Tính trung bình cộng của các phần tử âm trong mảng và trung bình nhân của các phần tử dương trong mảng.

### Input
Từ file **ARRAY01.INP** gồm
- Dòng thứ nhất cho số $N$.
- Dòng thứ hai là các phần tử trong mảng, mỗi phần tử cách nhau khoảng trắng.

### Ràng buộc
- ($0 < N \le 1000$)

### Output
Ghi ra file **ARRAY01.OUT** gồm
- Dòng thứ nhất ghi trung bình cộng các phần tử âm.
- Dòng thứ hai ghi trung bình nhân các phần tử dương.

### Sample Input 
```
10
32664 -6606 8361 5965 -15874 -15232 4473 16021 16707 -2561
```
### Sample Output 
```cpp
-10068.2
11177.7
```

### Subtask
- $50\%$ số test có $N \le 100$
- $50\%$ số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
    <div class="step-badge bg-yellow">Phân tích đề bài</div>

### 🔍 1. Các thông tin trọng tâm
* **Yêu cầu 1:** Tính Trung bình cộng (TBC) các số **âm** ($A_i < 0$). 
    * Công thức: $TBC = \frac{\sum A_{âm}}{count_{âm}}$.
* **Yêu cầu 2:** Tính Trung bình nhân (TBN) các số **dương** ($A_i > 0$).
    * Công thức: $TBN = \sqrt[k]{P}$ (với $k$ là số lượng số dương, $P$ là tích các số dương).
    * Trong lập trình, ta dùng hàm `pow(P, 1.0/k)` để tính căn bậc $k$.
* **Điều kiện đặc biệt:** Nếu không có số âm hoặc số dương tương ứng, cần xử lý để tránh lỗi chia cho 0.

### 📋 2. Giải thích Ví dụ
Với mảng mẫu, các số âm là: `-6606, -15874, -15232, -2561`.
* Tổng âm: $-50273$. Số lượng: $4$. $\rightarrow TBC = -50273 / 4 = -10068.25$.
* Tương tự cho các số dương để tính TBN.

</div>

<div class="step-card border-orange">
    <div class="step-badge bg-orange">Phân tích thuật toán</div>

### 💡 1. Thuật toán tính Trung bình cộng (TBC) số âm
Duyệt qua mảng, nếu gặp số âm thì cộng dồn vào tổng và tăng biến đếm.

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TinhTBC</span>(<span class="var">m</span>[], <span class="var">n</span>):
    <span class="var">tong</span> = <span class="val">0</span>, <span class="var">dem</span> = <span class="val">0</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">0</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="kw">NẾU</span> <span class="var">m</span>[<span class="var">i</span>] < <span class="val">0</span> <span class="kw">THÌ</span>:
            <span class="var">tong</span> = <span class="var">tong</span> + <span class="var">m</span>[<span class="var">i</span>]
            <span class="var">dem</span> = <span class="var">dem</span> + <span class="val">1</span>
    <span class="kw">NẾU</span> <span class="var">dem</span> == <span class="val">0</span> <span class="kw">THÌ</span> <span class="kw">TRẢ VỀ</span> <span class="val">0</span>
    <span class="kw">TRẢ VỀ</span> <span class="var">tong</span> / <span class="var">dem</span>
</pre>

### 💡 2. Thuật toán tính Trung bình nhân (TBN) số dương
Duyệt qua mảng, nếu gặp số dương thì nhân dồn vào tích và tăng biến đếm.

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TinhTBN</span>(<span class="var">m</span>[], <span class="var">n</span>):
    <span class="var">tich</span> = <span class="val">1</span>, <span class="var">dem</span> = <span class="val">0</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">0</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="kw">NẾU</span> <span class="var">m</span>[<span class="var">i</span>] > <span class="val">0</span> <span class="kw">THÌ</span>:
            <span class="var">tich</span> = <span class="var">tich</span> * <span class="var">m</span>[<span class="var">i</span>]
            <span class="var">dem</span> = <span class="var">dem</span> + <span class="val">1</span>
    <span class="kw">NẾU</span> <span class="var">dem</span> == <span class="val">0</span> <span class="kw">THÌ</span> <span class="kw">TRẢ VỀ</span> <span class="val">0</span>
    <span class="kw">TRẢ VỀ</span> <span class="fn">LuyThua</span>(<span class="var">tich</span>, <span class="val">1.0</span> / <span class="var">dem</span>)
</pre>

---

### 🧮 3. Giải thích toán học về Trung bình nhân (TBN)

**Tại sao TBN là căn bậc $k$ của tích?**
Trung bình nhân của một dãy số $a_1, a_2, ..., a_k$ là một số $x$ sao cho khi ta thay thế tất cả các số trong dãy bằng $x$, tích của dãy không đổi:
$$x \times x \times ... \times x = a_1 \times a_2 \times ... \times a_k$$
$$x^k = P \implies x = \sqrt[k]{P}$$
Trong đó $P$ là tích của các số dương.

**Chứng minh công thức lập trình:**
Trong toán học, căn bậc $n$ của một số có thể viết dưới dạng lũy thừa với số mũ phân số:
$$\sqrt[n]{x} = x^{1/n}$$
Do đó, để tính $\sqrt[k]{P}$ trong lập trình (C++, Javascript...), ta sử dụng hàm lũy thừa `pow(P, 1.0/k)`.
*Lưu ý:* Phải dùng `1.0` (số thực) thay vì `1` (số nguyên) để tránh phép chia nguyên ra kết quả bằng 0.

</div>