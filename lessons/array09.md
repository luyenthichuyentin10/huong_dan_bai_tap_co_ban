## 📏 Bài 9: Tìm vị trí có khoảng cách nhỏ nhất
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng số nguyên $A$ có $N$ phần tử và một số nguyên $X$. 

**Yêu cầu**: Hãy tìm vị trí $i$ đầu tiên trong mảng sao cho **khoảng cách** từ $X$ đến $A[i]$ là nhỏ nhất.

**Khoảng cách là gì?**
Trong toán học, khoảng cách giữa hai số $a$ và $b$ được tính bằng giá trị tuyệt đối của hiệu hai số đó: $d = |a - b|$

Ví dụ: Khoảng cách từ $3$ đến $5$ là $|3 - 5| = 2$. Khoảng cách từ $3$ đến $-1$ là $|3 - (-1)| = 4$.

### Input
Từ file **ARRAY09.INP** gồm
- Dòng thứ nhất: Số nguyên $N$
- Dòng thứ hai: $N$ số nguyên của mảng $A$.
- Dòng thứ ba: Số nguyên $X$.

### Ràng buộc
- ($0 < N \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
- Ghi ra file **ARRAY09.OUT** vị trí $i$ đầu tiên thỏa mãn điều kiện.

### Sample Input 
```
10
5 7 2 -9 8 6 -4 5 5 4
3
```

### Sample Output 
```
2
```

### Giải thích

### Subtask
- 50% số test có $N \le 1000$
- 50% số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích thuật toán</div>

### 🔍 1. Ý tưởng cốt lõi
Bài toán này thực chất là bài toán **Tìm giá trị nhỏ nhất (MIN)** nhưng đối tượng so sánh không phải là $A[i]$ mà là $|A[i] - X|$.

### 📋 2. Các bước thực hiện
1. **Khởi tạo:** 
    - Gọi `minDist` là khoảng cách nhỏ nhất hiện tại, gán bằng $|A[0] - X|$.
    - Gọi `viTri` là chỉ số tìm được, gán bằng $0$.
2. **Duyệt mảng:** Chạy từ $i = 1$ đến $N-1$:
   - Tính khoảng cách hiện tại: `currDist = |A[i] - X|`.
   - Nếu `currDist < minDist`:
     - Cập nhật `minDist = currDist`.
     - Cập nhật `viTri = i`.
3. **Kết quả:** Sau khi duyệt hết mảng, `viTri` chính là đáp án cần tìm.

*Lưu ý: Vì đề bài yêu cầu tìm vị trí **đầu tiên**, nên ta chỉ cập nhật khi khoảng cách mới **nhỏ hơn hẳn** (`<`) khoảng cách cũ.*

</div>

<div class="step-card border-green">
<div class="step-badge bg-green">Mã giả thuật toán</div>

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TimKhoangCachNhoNhat</span>(<span class="var">A</span>[], <span class="var">n</span>, <span class="var">X</span>):
    <span class="var">minDist</span> = <span class="fn">TriTuyetDoi</span>(<span class="var">A</span>[<span class="val">0</span>] - <span class="var">X</span>)
    <span class="var">viTri</span> = <span class="val">0</span>
    
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">1</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="var">currDist</span> = <span class="fn">TriTuyetDoi</span>(<span class="var">A</span>[<span class="var">i</span>] - <span class="var">X</span>)
        <span class="kw">NẾU</span> <span class="var">currDist</span> < <span class="var">minDist</span> <span class="kw">THÌ</span>:
            <span class="var">minDist</span> = <span class="var">currDist</span>
            <span class="var">viTri</span> = <span class="var">i</span>
            
    <span class="kw">XUẤT</span> <span class="var">viTri</span>
</pre>
</div>