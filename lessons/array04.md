## Bài 4: Sắp xếp mảng (Selection Sort & Bubble Sort)

<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Không sử dụng hàm **sort** có sẵn của C++. Tiến hành tự xây dựng hàm sort theo 2 thuật toán sắp xếp sau:
- Thuật toán sắp xếp chọn (SelectionSort): https://www.hoc10.vn/doc-sach/tin-hoc-7/1/147/84/
- Thuật toán sắp xếp nổi bọt (BubbleSort): https://www.hoc10.vn/doc-sach/tin-hoc-7/1/147/88/

Định nghĩa hàm như sau:
```cpp
void Selection(int m[], int n, bool acc_dec)
void BubbleSort(int m[], int n, bool acc_dec)
```
**Yêu cầu:** Sau khi xây dựng hàm sắp xếp xong thì tiến hành sắp xếp mảng $A$ tăng dần sau đó sắp xếp mảng $A$ giảm dần
### Input
Từ file **ARRAY04.INP** gồm các phần tử trong mảng, mỗi phần tử cách nhau khoảng trắng.

### Ràng buộc
$(0 \le N \le 10^4)$

### Output
Ghi ra file **ARRAY04.OUT** các nội dung
- Dòng thứ nhất ghi mảng đã được sắp xếp tăng dần
- Cách một dòng trống
- Dòng thứ hai ghi mảng đã được sắp xếp giảm dần

### Sample Input 
```
1 4 5 3 2
```
### Sample Output 
```
1 2 3 4 5

5 4 3 2 1
```
### Subtask
- $50\%$ số test có $N \le 100$
- $50\%$ số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
    <div class="step-badge bg-yellow">Phân tích đề bài</div>

### 🔍 1. Các thông tin trọng tâm
* **Mục tiêu:** Cài đặt thủ công hai thuật toán sắp xếp cơ bản: **Selection Sort** (Sắp xếp chọn) và **Bubble Sort** (Sắp xếp nổi bọt).
* **Yêu cầu kỹ thuật:** Hàm phải có tham số `bool acc_dec` (hoặc `AD`) để linh hoạt điều khiển chiều sắp xếp:
    * `true`: Sắp xếp mảng theo thứ tự **tăng dần**.
    * `false`: Sắp xếp mảng theo thứ tự **giảm dần**.
* **Quy trình thực hiện:** Nhập mảng $\rightarrow$ Gọi hàm sắp xếp tăng dần $\rightarrow$ Xuất mảng $\rightarrow$ Cách một dòng trống $\rightarrow$ Gọi hàm sắp xếp giảm dần $\rightarrow$ Xuất mảng.

### 📋 2. Giải thích Ví dụ (Sample Input/Output)
Giả sử đầu vào là mảng $A = \{1, 4, 5, 3, 2\}$ với số phần tử $n = 5$.

* **Giai đoạn 1 (Tăng dần):**
    * Sau khi qua hàm `sort(A, n, true)`, các phần tử nhỏ sẽ được đẩy về phía trước.
    * Kết quả: $1 < 2 < 3 < 4 < 5$.
* **Giai đoạn 2 (Giảm dần):**
    * Sau khi qua hàm `sort(A, n, false)`, các phần tử lớn sẽ được đẩy về phía trước.
    * Kết quả: $5 > 4 > 3 > 2 > 1$.

### ⚠️ Lưu ý về Ràng buộc
Với $N \le 10^4$ (10,000 phần tử), các thuật toán có độ phức tạp $O(n^2)$ như Selection hay Bubble Sort sẽ thực hiện khoảng $10^8$ phép tính. Đây là giới hạn tối đa để chương trình chạy kịp trong vòng 1 giây trên các hệ thống chấm thi hiện nay.

</div>

<div class="step-card border-orange">
    <div class="step-badge bg-orange">Phân tích thuật toán</div>

### 💡 1. Thuật toán Sắp xếp chọn (Selection Sort)

Ý tưởng của thuật toán này là tìm phần tử nhỏ nhất (nếu tăng dần) trong đoạn chưa sắp xếp và đổi chỗ nó với phần tử ở đầu đoạn đó.

**Mã giả thuật toán**

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">SelectionSort</span>(<span class="var">m</span>[], <span class="var">n</span>, <span class="var">AD</span>):
    <span class="com">// Lặp qua từng vị trí i trong mảng</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">0</span> đến <span class="var">n</span> - <span class="val">2</span>:
        <span class="com">// So sánh phần tử i với các phần tử j đứng sau nó</span>
        <span class="kw">CHO</span> <span class="var">j</span> chạy từ <span class="var">i</span> + <span class="val">1</span> đến <span class="var">n</span> - <span class="val">1</span>:
            
            <span class="kw">NẾU</span> <span class="var">AD</span> == <span class="kw">true</span> <span class="kw">THÌ</span>: <span class="com">// Trường hợp sắp xếp TĂNG DẦN</span>
                <span class="kw">NẾU</span> <span class="var">m</span>[<span class="var">i</span>] > <span class="var">m</span>[<span class="var">j</span>] <span class="kw">THÌ</span>:
                    <span class="kw">TRÁO ĐỔI</span>(<span class="var">m</span>[<span class="var">i</span>], <span class="var">m</span>[<span class="var">j</span>])
            
            <span class="kw">NGƯỢC LẠI</span> (<span class="var">AD</span> == <span class="kw">false</span>): <span class="com">// Trường hợp sắp xếp GIẢM DẦN</span>
                <span class="kw">NẾU</span> <span class="var">m</span>[<span class="var">i</span>] < <span class="var">m</span>[<span class="var">j</span>] <span class="kw">THÌ</span>:
                    <span class="kw">TRÁO ĐỔI</span>(<span class="var">m</span>[<span class="var">i</span>], <span class="var">m</span>[<span class="var">j</span>])
</pre>

### 💡 2. Thuật toán Sắp xếp nổi bọt (Bubble Sort)

Thuật toán này liên tục so sánh hai phần tử liền kề và tráo đổi chúng nếu chúng đứng sai thứ tự. Các phần tử lớn nhất sẽ "nổi" dần lên cuối mảng.

**Mã giả thuật toán**

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">BubblSort</span>(<span class="var">m</span>[], <span class="var">n</span>, <span class="var">AD</span>):
    <span class="com">// Vòng lặp i kiểm soát số lần lặp (từng phần tử lớn sẽ nổi lên)</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ <span class="val">0</span> đến <span class="var">n</span> - <span class="val">1</span>:
        
        <span class="com">// Vòng lặp j duyệt qua các cặp phần tử liền kề</span>
        <span class="kw">CHO</span> <span class="var">j</span> chạy từ <span class="val">0</span> đến <span class="var">n</span> - <span class="var">i</span> - <span class="val">2</span>:
            
            <span class="kw">NẾU</span> <span class="var">AD</span> == <span class="kw">true</span> <span class="kw">THÌ</span>: <span class="com">// Sắp xếp TĂNG DẦN</span>
                <span class="kw">NẾU</span> <span class="var">m</span>[<span class="var">j</span>] > <span class="var">m</span>[<span class="var">j</span> + <span class="val">1</span>] <span class="kw">THÌ</span>:
                    <span class="kw">TRÁO ĐỔI</span>(<span class="var">m</span>[<span class="var">j</span>], <span class="var">m</span>[<span class="var">j</span> + <span class="val">1</span>])
            
            <span class="kw">NGƯỢC LẠI</span> (<span class="var">AD</span> == <span class="kw">false</span>): <span class="com">// Sắp xếp GIẢM DẦN</span>
                <span class="kw">NẾU</span> <span class="var">m</span>[<span class="var">j</span>] < <span class="var">m</span>[<span class="var">j</span> + <span class="val">1</span>] <span class="kw">THÌ</span>:
                    <span class="kw">TRÁO ĐỔI</span>(<span class="var">m</span>[<span class="var">j</span>], <span class="var">m</span>[<span class="var">j</span> + <span class="val">1</span>])
    </pre>

</div>