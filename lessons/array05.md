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

**Mã giả thuật toán**
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