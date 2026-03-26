## 🔢 Bài 2: Số lớn nhất
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Kiểu dữ liệu `long long` trong C++ có thể lưu trữ một số nguyên tối đa có 18 chữ số. Cho nhập vào một số nguyên dương $N$.

**Yêu cầu:** Từ các chữ số trong số nguyên dương $N$ đã cho, hãy tạo ra số nguyên dương $M$ có giá trị **lớn nhất**.

### Input
Từ file **BAI2.INP** cho số nguyên dương $N$ ($0 < N \le 10^{18}$).

### Output
Ghi ra file **BAI2.OUT** số nguyên dương $M$ thỏa yêu cầu đề bài.

### Sample Input
```
24101980
```

### Sample Output
```
98421100
```

### Giải thích
Các chữ số của 24101980 là: 2, 4, 1, 0, 1, 9, 8, 0. Sắp xếp giảm dần: 9, 8, 4, 2, 1, 1, 0, 0 → $M = 98421100$.

### Subtask
- **30%:** $N \le 10^3$
- **40%:** $N \le 10^9$
- **30%:** $N \le 10^{18}$
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích đề bài</div>

### 🔍 1. Các thông tin trọng tâm
* Tách các chữ số của $N$, **sắp xếp giảm dần**, ghép lại thành số mới.
* Vì chữ số lớn nhất đứng trước → giá trị lớn nhất.
* Có thể xử lý $N$ như **chuỗi** hoặc như **số** (tách từng chữ số).

### 📋 2. Giải thích Ví dụ

$N = 24101980$:

| Bước | Nội dung |
|---|---|
| Tách chữ số | `[2, 4, 1, 0, 1, 9, 8, 0]` |
| Sắp xếp giảm dần | `[9, 8, 4, 2, 1, 1, 0, 0]` |
| Ghép lại | $M = 98421100$ |

<div class="important-note">
<b>💡 Mẹo:</b> Vì chỉ có 10 chữ số (0–9), ta có thể dùng <b>Counting Sort</b> (đếm phân phối) để sắp xếp trong $O(d)$ với $d$ là số chữ số — nhanh hơn sort thông thường.
</div>

</div>

<div class="step-card border-orange">
<div class="step-badge bg-orange">Thuật toán</div>

### 💡 Cách 1: Sắp xếp giảm dần

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">SoLonNhat</span>(<span class="var">N</span>):
    <span class="var">digits</span> = tách các chữ số của <span class="var">N</span>
    <span class="fn">SapXepGiamDan</span>(<span class="var">digits</span>)
    <span class="var">M</span> = ghép <span class="var">digits</span> thành số
    <span class="kw">TRẢ VỀ</span> <span class="var">M</span>
</pre>

### 💡 Cách 2: Counting Sort (tối ưu)

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">SoLonNhat_CS</span>(<span class="var">N</span>):
    <span class="var">dem</span>[<span class="val">0</span>..<span class="val">9</span>] = <span class="val">0</span>    <span class="com">// Đếm tần suất mỗi chữ số</span>
    <span class="kw">LẶP KHI</span> <span class="var">N</span> > <span class="val">0</span>:
        <span class="var">d</span> = <span class="var">N</span> mod <span class="val">10</span>
        <span class="var">dem</span>[<span class="var">d</span>]++
        <span class="var">N</span> = <span class="var">N</span> / <span class="val">10</span>
    <span class="var">M</span> = <span class="val">""</span>
    <span class="kw">CHO</span> <span class="var">d</span> = <span class="val">9</span> xuống <span class="val">0</span>:
        lặp <span class="var">dem</span>[<span class="var">d</span>] lần: <span class="var">M</span> += <span class="var">d</span>
    <span class="kw">TRẢ VỀ</span> <span class="var">M</span>
</pre>

**Độ phức tạp:** $O(d)$ với $d$ = số chữ số (tối đa 18).

</div>
