## Bài 6: Các thao tác Xóa phần tử trên mảng

<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng số nguyên $A$ có $N$ phần tử. Thực hiện các yêu cầu xóa mảng như sau:
1. Nhập vào số nguyên $X$, xóa phần tử có giá trị bằng $X$ đầu tiên tìm thấy trong mảng.
2. Nhập vào số nguyên $X$, xóa tất cả phần tử có giá trị bằng $X$ được tìm thấy trong mảng.
3. Nhập vào số nguyên $X$, xóa từ vị trí $X$ cho đến cuối mảng.
4. Nhập vào số nguyên $X$, xóa từ vị trí $X$ cho đến đầu mảng.
5. Nhập vị trí $X$ và số phần tử cần xóa $Y$, xóa đi $Y$ phần tử từ vị trí $X$ về cuối mảng.
In mảng sau khi xóa.

### Input
Từ file **ARRAY06.INP** gồm
- Dòng thứ nhất nhập các giá trị từ $1$ đến $5$ là lựa chọn các kiểu xóa
- Dòng thứ hai chứa số $N$.
- Dòng thứ ba chứa mảng $A$, mỗi phần tử cách nhau khoảng trắng.
- Dòng cuối chứa giá trị $X$ và vị trí $Y$. Các yêu cầu 1, 2, 3, 4 chỉ sử dụng $X$, yêu cầu 5 sử dụng cả $X$ và $Y$.

### Ràng buộc
- ($0 < N \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
Ghi ra file **ARRAY06.OUT** mảng sau khi xóa

### Sample input
```
5
10
1 2 3 4 5 6 7 8 9 10
3 5
```

### Sample output
```
1 2 3 9 10
```

### Subtask
- $50\%$ số test có $N \le 1000$
- $50\%$ số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
    <div class="step-badge bg-yellow">Phân tích thuật toán</div>

### 🔑 1. Kỹ thuật cốt lõi: Xóa một phần tử tại vị trí
**Tại sao phải dồn hàng?** 
- Trong mảng tĩnh, chúng ta không thể **"vứt bỏ"** một ô nhớ. Để xóa phần tử tại **vị trí**, ta phải **dồn** tất cả các phần tử đứng sau **vị trí** sang trái một bước.
- Mảng là một dãy các ô nhớ nằm liên tiếp nhau. Nếu bạn xóa ô số 2 mà không dồn ô số 3 về, dãy sẽ bị **"thủng"** một lỗ. Việc dồn hàng đảm bảo mảng luôn liên tục, giúp việc truy xuất $A[i]$ luôn chính xác.

### 💻 2. Mã giả hàm cốt lõi: Xóa một phần tử tại vị trí
<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">XoaTaiViTri</span>(<span class="var">m</span>[], <span class="var">n</span>, <span class="var">vt</span>):
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="var">vt</span> đến <span class="var">n</span> - <span class="val">2</span>:
        <span class="var">m</span>[<span class="var">i</span>] = <span class="var">m</span>[<span class="var">i</span> + <span class="val">1</span>] <span class="com">// Phần tử sau đè lên phần tử trước</span>
    <span class="var">n</span> = <span class="var">n</span> - <span class="val">1</span> <span class="com">// Giảm số lượng phần tử của mảng</span>
</pre>

### 💡 3. Tận dụng hàm cốt lõi cho các yêu cầu khác

* **Xóa giá trị $X$ đầu tiên:** Duyệt từ đầu mảng, nếu gặp $A[i] == X$ thì gọi hàm `XoaTaiViTri(A, n, i)` và dừng vòng lặp ngay (`break`).
* **Xóa tất cả giá trị $X$:** 
    * *Cách 1:* Duyệt mảng, nếu $A[i] == X$ thì gọi `XoaTaiViTri`. **Lưu ý:** Khi xóa xong, không tăng chỉ số $i$ vì phần tử mới dồn về tại $i$ cũng có thể là $X$.
    * *Cách 2 (Tối ưu):* Tạo mảng mới chỉ chứa các phần tử khác $X$.
* **Xóa tất cả giá trị $X$ đến cuối:** Ta chỉ cần thay đổi biến quản lý số phần tử của mảng `na = x`
* **Xóa tất cả giá trị $X$ đến đầu:** Duyệt từ vị trí `i = x` về đầu, mỗi bước duyệt gọi hàm `XoaTaiViTri(A, n, i)` để xóa và dồn mảng.
* **Xóa tổng quát từ vị trí $X$ xóa đi $Y$ phần tử về cuối:** Duyệt từ vị trí `i = x` đến `i < x + y`, mỗi bước duyệt gọi hàm `XoaTaiViTri(A, n, i)` để xóa và dồn mảng.

### ⚠️ 4. Các lưu ý trong quá trình xóa
- Xét miền giá trị các vị trí $X$ và $Y$ để tránh bị lỗi truy xuất **ngoài vùng nhớ** của mảng
- Luôn giảm **biến quản lý số phần tử của mảng** sau khi thực hiện thao tác xóa.
- **Độ phức tạp:** mỗi lần xóa tại vị trí đầu mảng, bạn phải di chuyển $N-1$ phần tử. Do đó, thao tác xóa có độ phức tạp là $O(N)$. Nếu xóa tất cả $X$ bằng cách gọi hàm xóa nhiều lần, độ phức tạp có thể lên tới $O(N^2)$.
</div>
