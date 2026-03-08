## 📥 Bài 7: Chèn phần tử vào mảng
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng $A$ có $N$ phần tử. 

**Yêu cầu:** Hãy chèn một giá trị $Y$ vào vị trí $X$ trong mảng.
- Nếu vị trí $X$ lớn hơn số phần tử hiện tại, chèn vào cuối mảng.
- Nếu vị trí $X$ nhỏ hơn 0, chèn vào đầu mảng (vị trí 0).

### Input
Từ file **ARRAY07.INP** gồm
- Dòng đầu chứa số $N$ (số lượng phần tử ban đầu).
- Dòng thứ hai chứa $N$ phần tử $A_i$ của mảng.
- Dòng thứ ba chứa hai số nguyên $X$ (vị trí) và $Y$ (giá trị cần chèn).

### Ràng buộc
- ($0 < N \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
Ghi ra file **ARRAY07.OUT** mảng sau khi đã chèn phần tử mới.

### Sample Input 
```
5
1 2 3 4 5
2 99
```

### Sample Output 
```
1 2 99 3 4 5
```

### Giải thích

### Subtask
- 50% số test có $N \le 1000$
- 50% số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích thuật toán</div>

Để chèn một phần tử vào vị trí `vt`, ta không thể đặt trực tiếp vào vì sẽ làm mất dữ liệu cũ. Quy trình gồm 3 bước:

1.  **Dịch chuyển (Shift):** Duyệt ngược từ cuối mảng về vị trí `vt`, copy phần tử `A[i-1]` sang `A[i]` để tạo khoảng trống.
2.  **Gán (Assign):** Đặt giá trị mới vào ô trống đã tạo tại `A[vt]`.
3.  **Tăng quy mô:** Tăng số lượng phần tử $N$ thêm 1.

**Độ phức tạp:** $O(N)$ do trường hợp xấu nhất phải dịch chuyển toàn bộ mảng.
</div>

<div class="step-card border-green">
<div class="step-badge bg-green">Mã giả thuật toán</div>

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">ChenPhanTu</span>(<span class="var">A</span>[], <span class="var">n</span>, <span class="var">vt</span>, <span class="var">pt</span>):
    // Xử lý giới hạn vị trí
    <span class="kw">NẾU</span> <span class="var">vt</span> > <span class="var">n</span> <span class="kw">THÌ</span> <span class="var">vt</span> = <span class="var">n</span>
    <span class="kw">NẾU</span> <span class="var">vt</span> < 0 <span class="kw">THÌ</span> <span class="var">vt</span> = 0

    // BƯỚC 1: Dịch chuyển các phần tử sang phải
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="var">n</span> giảm về <span class="var">vt</span> + 1:
        <span class="var">A</span>[<span class="var">i</span>] = <span class="var">A</span>[<span class="var">i</span> - 1]

    // BƯỚC 2: Chèn phần tử mới
    <span class="var">A</span>[<span class="var">vt</span>] = <span class="var">pt</span>

    // BƯỚC 3: Tăng số lượng phần tử
    <span class="var">n</span> = <span class="var">n</span> + 1
</pre>
</div>