## Bài 2: Tìm giá trị Lớn nhất và Nhỏ nhất

<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng số nguyên $A$ có $N$ phần tử. Hãy tìm giá trị lớn nhất (Max) và giá trị nhỏ nhất (Min) của mảng.

### Input
Từ file **ARRAY02.INP** gồm
- Dòng thứ nhất cho số $N$ $(1 \le N \le 10^6)$.
- Dòng thứ hai là $N$ phần tử trong mảng.

### Ràng buộc
- ($0 < N \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
Ghi ra file **ARRAY02.OUT** gồm
- Dòng thứ nhất ghi giá trị Max.
- Dòng thứ hai ghi giá trị Min.

### Sample Input 
```
5
10 2 15 7 1
```

### Sample Output 
```
15
1
```

### Subtask
- $50\%$ số test có $N \le 1000$
- $50\%$ số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
    <div class="step-badge bg-yellow">Phân tích đề bài</div>

### 🔍 1. Các thông tin trọng tâm
* **Mục tiêu:** Xác định phần tử có giá trị cao nhất và thấp nhất trong tập hợp dữ liệu.

### 📋 2. Giải thích Ví dụ
Với mảng $A = \{10, 2, 15, 7, 1\}$:
1. Giả sử $Max = 10$.
2. So sánh với $2$: $10 > 2 \rightarrow$ giữ nguyên $Max = 10$.
3. So sánh với $15$: $15 > 10 \rightarrow$ cập nhật $Max = 15$.
4. So sánh với $7, 1$: Đều nhỏ hơn $15 \rightarrow$ giữ nguyên $Max = 15$.
**Kết quả:** $Max = 15$. Tương tự cho $Min = 1$.

</div>

<div class="step-card border-orange">
    <div class="step-badge bg-orange">Phân tích thuật toán</div>

**💡 Nguyên tắc so sánh tìm Max, Min trong một dãy số:** 
* Để tìm **Max**: Ta giả định phần tử đầu tiên trong mảng là lớn nhất `Max_tam_thoi = A[0]`, sau đó duyệt từ phần tử thứ hai của mảng đến cuối để so sánh. Nếu thấy số nào lớn hơn `Max_tam_thoi`, ta cập nhật lại `Max_tam_thoi`.
* Để tìm **Min**: Tương tự, ta cập nhật lại `Min_tam_thoi` nếu thấy số nào nhỏ hơn `Min_tam_thoi`.

</div>

<div class="step-card border-green">
    <div class="step-badge bg-green">Mã giả</div>

### 💡 1. Mã giả tìm Giá trị lớn nhất (MAX)
<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TimMax</span>(<span class="var">m</span>[], <span class="var">n</span>):
    <span class="var">Max_tam_thoi</span> = <span class="var">m</span>[<span class="val">0</span>] <span class="com">// Giả sử phần tử đầu là Max</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">1</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="kw">NẾU</span> <span class="var">m</span>[<span class="var">i</span>] > <span class="var">Max_tam_thoi</span> <span class="kw">THÌ</span>:
            <span class="var">Max_tam_thoi</span> = <span class="var">m</span>[<span class="var">i</span>] <span class="com">// Cập nhật Max mới</span>
    <span class="kw">TRẢ VỀ</span> <span class="var">Max_tam_thoi</span>
</pre>

### 💡 2. Mã giả tìm Giá trị nhỏ nhất (MIN)
<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TimMin</span>(<span class="var">m</span>[], <span class="var">n</span>):
    <span class="var">Min_tam_thoi</span> = <span class="var">m</span>[<span class="val">0</span>] <span class="com">// Giả sử phần tử đầu là Min</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">1</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="kw">NẾU</span> <span class="var">m</span>[<span class="var">i</span>] < <span class="var">Min_tam_thoi</span> <span class="kw">THÌ</span>:
            <span class="var">Min_tam_thoi</span> = <span class="var">m</span>[<span class="var">i</span>] <span class="com">// Cập nhật Min mới</span>
    <span class="kw">TRẢ VỀ</span> <span class="var">Min_tam_thoi</span>
</pre>
</div>