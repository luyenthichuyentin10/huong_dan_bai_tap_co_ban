## 🧮 Bài 10: Đẳng thức mảng
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng $A$ có $N$ phần tử và một số nguyên $p$. 

**Yêu cầu**: Hãy tìm vị trí $k$ thỏa mãn đẳng thức sau:

$A[1] + A[2] + ... + A[k] = p \times (A[k+1] + A[k+2] + ... + A[n])$

*Lưu ý:* $k$ là số lượng phần tử của nửa bên trái (theo vị trí từ $1$ đến $N$).

### Input
Từ file **ARRAY10.INP** gồm
- Dòng thứ nhất: Số phần tử của mảng $N$.
- Dòng thứ hai: $N$ phần tử trong mảng, cách nhau khoảng trắng.
- Dòng thứ ba: Số nguyên $p$.

### Ràng buộc
- ($0 < N \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
- Ghi ra file **ARRAY10.OUT** số $k$ tìm được. Nếu không tìm thấy, ghi `No`.

### Sample Input 
```
15
1 2 -3 6 -10 5 10 4 7 -8 9 2 -12 6 -1
2
```

### Sample Output 
```
No
```

### Giải thích

### Subtask
- 50% số test có $N \le 1000$
- 50% số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích thuật toán</div>

Bản chất của bài toán là tìm một "vách ngăn" chia mảng thành 2 phần (Trái và Phải) sao cho: **Tổng Trái = $p \times$ Tổng Phải**.

### 💡 Cách 1: Vét cạn (Brute Force)
- **Ý tưởng:** Với mỗi vị trí vách ngăn $k$ chạy từ $1$ đến $N-1$, ta dùng một vòng lặp `for` để tính lại từ đầu Tổng nửa Trái ($SumL$) và dùng một vòng lặp `for` khác để tính lại từ đầu Tổng nửa Phải ($SumR$).
- **Độ phức tạp:** Do lồng 2 vòng lặp, số phép tính sẽ lên tới $O(N^2)$. Nếu $N = 10^5$, chương trình sẽ bị quá thời gian (TLE).

### 🚀 Cách 2: Tối ưu với Kỹ thuật Cộng dồn / Hai phần (Optimal) 
- **Ý tưởng:** Khi dời vách ngăn $k$ sang phải 1 bước, phần tử $A[k]$ sẽ **rời khỏi nhóm Phải** và **gia nhập nhóm Trái**. Ta không cần tính lại từ đầu!
- **Các bước thực hiện:**
  1. Tính tổng toàn bộ mảng trước (`TotalSum`).
  2. Khởi tạo `SumL = 0` và `SumR = TotalSum`.
  3. Duyệt $k$ từ $0$ đến $N-2$:
     - Nạp $A[k]$ vào Trái: `SumL = SumL + A[k]`
     - Rút $A[k]$ khỏi Phải: `SumR = SumR - A[k]`
     - Kiểm tra điều kiện: Nếu `SumL == p * SumR` thì in ra vị trí và dừng.
- **Độ phức tạp:** Chỉ cần duyệt mảng 2 lần (1 lần tính tổng, 1 lần di chuyển vách ngăn). Tốc độ cực nhanh $O(N)$.
</div>

<div class="step-card border-green">
<div class="step-badge bg-green">Mã giả thuật toán Tối ưu</div>

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">TimDangThuc</span>(<span class="var">A</span>[], <span class="var">n</span>, <span class="var">p</span>):
    <span class="com">// 1. Tính tổng toàn mảng</span>
    <span class="var">TotalSum</span> = <span class="val">0</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">0</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="var">TotalSum</span> = <span class="var">TotalSum</span> + <span class="var">A</span>[<span class="var">i</span>]

    <span class="com">// 2. Dời vách ngăn</span>
    <span class="var">SumL</span> = <span class="val">0</span>
    <span class="var">SumR</span> = <span class="var">TotalSum</span>
    
    <span class="kw">CHO</span> <span class="var">k</span> chạy từ <span class="val">0</span> đến <span class="var">n</span> - <span class="val">2</span>:
        <span class="var">SumL</span> = <span class="var">SumL</span> + <span class="var">A</span>[<span class="var">k</span>]
        <span class="var">SumR</span> = <span class="var">SumR</span> - <span class="var">A</span>[<span class="var">k</span>]
        
        <span class="kw">NẾU</span> <span class="var">SumL</span> == <span class="var">p</span> * <span class="var">SumR</span> <span class="kw">THÌ</span>:
            <span class="kw">XUẤT</span> (<span class="var">k</span> + <span class="val">1</span>) <span class="com">// +1 vì k đang là chỉ số 0-based</span>
            <span class="kw">THOÁT HÀM</span>
            
    <span class="kw">XUẤT</span> <span class="val">"No"</span>
</pre>
</div>