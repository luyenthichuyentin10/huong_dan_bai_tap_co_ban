## Bài tập: Tìm số nguyên tố trong mảng

<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng số nguyên $A$ có $N$ phần tử. Hãy tìm và in ra các số nguyên tố có trong mảng, đồng thời cho biết số lượng các số nguyên tố tìm thấy.

### Input
Từ file **ARRAY03.INP** gồm
- Dòng thứ nhất cho số $N$.
- Dòng thứ hai là $N$ phần tử trong mảng $A$.

### Ràng buộc
- ($0 < N \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
Ghi ra file **ARRAY01.OUT** gồm
- Dòng thứ nhất ghi số lượng số nguyên tố tìm thấy.
- Dòng thứ hai ghi các số nguyên tố đó, mỗi số cách nhau một khoảng trắng.

### Sample Input 
```
5
1 7 4 11 13
```
### Sample Output 
```
3
7 11 13
```

### Subtask
- $50\%$ số test có $N \le 1000$
- $50\%$ số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
    <div class="step-badge bg-yellow">Phân tích đề bài</div>

### 🔍 1. Các thông tin trọng tâm
* **Định nghĩa:** Số nguyên tố là số nguyên dương lớn hơn 1, chỉ có đúng 2 ước là 1 và chính nó.
* **Số đặc biệt:** * Số `0` và `1`: **Không** phải là số nguyên tố.
    * Số `2`: Là số nguyên tố **chẵn duy nhất**.
* **Yêu cầu:** Kết hợp việc duyệt mảng và kiểm tra điều kiện cho từng phần tử.

### 📋 2. Giải thích Ví dụ
Mảng $A = \{1, 7, 4, 11, 13\}$
- $1$: Không phải SNT.
- $7$: Là SNT (Ước là 1, 7).
- $4$: Không phải SNT (Ước là 1, 2, 4).
- $11, 13$: Là SNT.
**Kết quả:** Có 3 số nguyên tố là 7, 11, 13.

</div>

<div class="step-card border-orange">
    <div class="step-badge bg-orange">Phân tích thuật toán</div>

### 🧮 Giải thích toán học: Tại sao chỉ cần kiểm tra đến $\sqrt{N}$?

Giả sử số nguyên dương $N$ là một hợp số (không phải số nguyên tố), khi đó $N$ có thể được phân tích thành tích của hai thừa số $a$ và $b$:
$$N = a \times b$$

Ta xét các trường hợp có thể xảy ra của $a$ và $b$:
1. Nếu cả $a$ và $b$ đều lớn hơn $\sqrt{N}$, thì tích $a \times b$ sẽ lớn hơn $N$ ($a \times b > \sqrt{N} \times \sqrt{N} = N$). Điều này vô lý vì $a \times b = N$.
2. Do đó, trong mọi cặp thừa số $(a, b)$ của $N$, luôn luôn phải có **ít nhất một thừa số** nhỏ hơn hoặc bằng $\sqrt{N}$.

**Kết luận:** - Nếu chúng ta đã kiểm tra tất cả các số từ $2$ đến $\sqrt{N}$ mà không tìm thấy ước nào của $N$, thì chắc chắn $N$ cũng sẽ không có ước nào lớn hơn $\sqrt{N}$.
- Việc dừng lại ở $\sqrt{N}$ giúp thuật toán chạy nhanh hơn gấp nhiều lần. 
- *Ví dụ:* Với $N = 10^9$, thay vì chạy $1,000,000,000$ vòng lặp, ta chỉ cần khoảng $31,622$ vòng lặp.

***Để giải bài này, ta chia làm 2 phần: Hàm kiểm tra 1 số có phải SNT không và Vòng lặp duyệt mảng.***

### 💡 1. Hàm kiểm tra Số nguyên tố (KTSNT)

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">KiemTraSNT</span>(<span class="var">n</span>):
    <span class="kw">NẾU</span> <span class="var">n</span> < <span class="val">2</span> <span class="kw">THÌ</span> <span class="kw">TRẢ VỀ</span> <span class="kw">false</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">2</span> đến <span class="fn">CănBậcHai</span>(<span class="var">n</span>):
        <span class="kw">NẾU</span> <span class="var">n</span> chia hết cho <span class="var">i</span> <span class="kw">THÌ</span>
            <span class="kw">TRẢ VỀ</span> <span class="kw">false</span>
    <span class="kw">TRẢ VỀ</span> <span class="kw">true</span>
</pre>

### 💡 2. Hàm duyệt và in mảng
<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">GiaiBaiToan</span>(<span class="var">m</span>[], <span class="var">n</span>):
    <span class="var">dem</span> = <span class="val">0</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">0</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="kw">NẾU</span> <span class="fn">KiemTraSNT</span>(<span class="var">m</span>[<span class="var">i</span>]) == <span class="kw">true</span> <span class="kw">THÌ</span>:
            <span class="var">dem</span> = <span class="var">dem</span> + <span class="val">1</span>
            <span class="kw">XUẤT</span> <span class="var">m</span>[<span class="var">i</span>]
    <span class="kw">XUẤT</span> <span class="var">dem</span>
</pre>
</div>