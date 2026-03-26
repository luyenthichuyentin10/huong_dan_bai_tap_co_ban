## 🔍 Bài 3: Số đơn độc
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Số đơn độc được định nghĩa là số chỉ xuất hiện **duy nhất 1 lần** trong dãy số. Cho dãy $A$ có $N$ số nguyên dương, số thứ $i$ trong dãy $A$ có giá trị là $a_i$ ($0 \le a_i \le 10^5$).

**Yêu cầu:** Đếm số lượng số đơn độc trong dãy $A$. Tìm số đơn độc **lớn nhất** và **nhỏ nhất**.

### Input
Từ file **BAI3.INP**:
- Dòng đầu tiên chứa số nguyên $N$ ($1 \le N \le 10^5$).
- Dòng tiếp theo chứa $N$ số nguyên dương cách nhau khoảng trắng.

### Output
Ghi ra file **BAI3.OUT** gồm 3 số cách nhau khoảng trắng: số lượng đơn độc, số đơn độc nhỏ nhất, số đơn độc lớn nhất. Nếu không có số đơn độc thì xuất `-1`.

### Sample Input
```
10
4 5 7 1 4 7 2 3 0 7
```

### Sample Output
```
5 0 5
```

### Giải thích

| Giá trị | 0 | 1 | 2 | 3 | 4 | 5 | 7 |
|---|---|---|---|---|---|---|---|
| Số lần | 1 | 1 | 1 | 1 | 2 | 1 | 3 |
| Đơn độc? | ✓ | ✓ | ✓ | ✓ | ✗ | ✓ | ✗ |

Số đơn độc: 0, 1, 2, 3, 5 → Tổng 5 số. Nhỏ nhất = 0, lớn nhất = 5.

### Subtask
- **40%:** $N, a_i \le 10^2$
- **30%:** $N, a_i \le 10^3$
- **30%:** Không ràng buộc thêm ($N, a_i \le 10^5$)
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích đề bài</div>

### 🔍 1. Các thông tin trọng tâm
* Đếm **tần suất** xuất hiện mỗi giá trị.
* Số đơn độc = giá trị có tần suất đúng bằng 1.
* Cần tìm min và max trong các số đơn độc.
* $a_i \le 10^5$ → dùng **mảng đếm** (counting array) kích thước $10^5 + 1$.

</div>

<div class="step-card border-orange">
<div class="step-badge bg-orange">Thuật toán</div>

### 💡 Ý tưởng: Mảng đếm tần suất

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">SoDonDoc</span>(<span class="var">a</span>[], <span class="var">n</span>):
    <span class="com">// Bước 1: Đếm tần suất</span>
    <span class="var">dem</span>[<span class="val">0</span>..<span class="val">100000</span>] = <span class="val">0</span>
    <span class="kw">CHO</span> <span class="var">i</span> = <span class="val">0</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="var">dem</span>[<span class="var">a</span>[<span class="var">i</span>]]++

    <span class="com">// Bước 2: Tìm số đơn độc</span>
    <span class="var">count</span> = <span class="val">0</span>, <span class="var">minVal</span> = <span class="val">∞</span>, <span class="var">maxVal</span> = <span class="val">-∞</span>
    <span class="kw">CHO</span> <span class="var">v</span> = <span class="val">0</span> đến <span class="val">100000</span>:
        <span class="kw">NẾU</span> <span class="var">dem</span>[<span class="var">v</span>] == <span class="val">1</span> <span class="kw">THÌ</span>:
            <span class="var">count</span>++
            <span class="var">minVal</span> = <span class="fn">Min</span>(<span class="var">minVal</span>, <span class="var">v</span>)
            <span class="var">maxVal</span> = <span class="fn">Max</span>(<span class="var">maxVal</span>, <span class="var">v</span>)

    <span class="kw">NẾU</span> <span class="var">count</span> == <span class="val">0</span>: Xuất <span class="val">-1</span>
    <span class="kw">NGƯỢC LẠI</span>: Xuất <span class="var">count</span>, <span class="var">minVal</span>, <span class="var">maxVal</span>
</pre>

**Độ phức tạp:** $O(n + V)$ với $V = 10^5$. Bộ nhớ $O(V)$.

</div>
