## 🔄 Bài 13: Gộp mảng (Nối tiếp và Xen kẽ)
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho hai mảng $A$ và $B$. 

**Yêu cầu:** thực hiện 2 thao tác gộp mảng:
1.  **Gộp nối tiếp:** Gộp mảng $B$ nằm trước, rồi mới đến mảng $A$.
2.  **Gộp xen kẽ:** Các phần tử của mảng $A$ và $B$ nằm xen kẽ nhau (bắt đầu từ $A_0, B_0, A_1, B_1...$). Nếu mảng nào dài hơn, phần dư sẽ được nối vào cuối.

### Input
Từ file **ARRAY13.INP** gồm
- Dòng 1: Số lượng phần tử mảng $A$
- Dòng 2: Các phần tử của mảng $A$
- Dòng 3: (Cách một dòng trống)
- Dòng 4: Số lượng phần tử mảng $B$
- Dòng 5: Các phần tử của mảng $A$


### Ràng buộc
- ($0 < N_a, N_b \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
Ghi ra file **ARRAY13.OUT** gồm
- Dòng 1: Các phần tử của hai mảng sau khi gộp nối tiếp
- Dòng 2: Bỏ trống.
- Dòng 3: Các phần tử của hai mảng sau khi gộp xen kẻ

### Sample Input
```
5
1 2 3 4 5

5
6 7 8 9 10
```

### Sample Output
```
6 7 8 9 10 1 2 3 4 5

1 6 2 7 3 8 4 9 5 10
```
### Giải thích

### Subtask
- 50% số test có $N_a, N_b \le 1000$
- 50% số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích thuật toán: Vét cạn vs Tối ưu</div>

Bài toán này có độ phức tạp thời gian luôn là $O(N_a + N_b)$ do ta phải xuất toàn bộ phần tử. Sự khác biệt nằm ở Bộ nhớ sử dụng (Space Complexity).

### 💡 Cách 1: Vét cạn (Sử dụng mảng phụ)
- **Ý tưởng:** Tạo một mảng khổng lồ $C$ có kích thước bằng tổng kích thước của $A$ và $B$.
- **Thực hiện:**
    - **Gộp nối tiếp:** Copy lần lượt $B$ rồi $A$ vào $C$. Sau đó in $C$.
    - **Gộp xen kẽ:** Dùng 2 biến (con trỏ) quét $A$ và $B$, luân phiên copy vào $C$. Cuối cùng in $C$.
- **Nhược điểm:** Tốn thêm vùng nhớ $O(N_A + N_B)$. Nếu $A$ và $B$ mỗi mảng có 1 triệu phần tử, ta tốn thêm rất nhiều RAM (Memory Limit Exceeded).

### 🚀 Cách 2: Tối ưu bộ nhớ (In trực tiếp / On-the-fly)
- **Ý tưởng:** Thay vì tốn công tạo mảng $C$, ta nhận ra đề bài chỉ yêu cầu "in ra" kết quả. Vậy tại sao không in trực tiếp các phần tử của $A$ và $B$ theo đúng thứ tự mà không cần lưu trữ trung gian?
- **Ưu điểm:** Bộ nhớ tiêu tốn $O(1)$ tuyệt đối!
- **Thực hiện Gộp xen kẽ:** Dùng 1 vòng lặp chạy đến $\max(N_A, N_B)$. Ở mỗi bước $i$, nếu $i < N_A$ thì in $A[i]$, nếu $i < N_B$ thì in $B[i]$.
</div>
<div class="step-card border-green">
<div class="step-badge bg-green">Mã giả thuật toán Tối ưu (In trực tiếp)</div>

<pre class="pseudocode">
<span class="com">// Yêu cầu 1: Nối tiếp B rồi đến A</span>
<span class="kw">HÀM</span> <span class="fn">GopNoiTiep_ToiUu</span>(<span class="var">A</span>[], <span class="var">nA</span>, <span class="var">B</span>[], <span class="var">nB</span>):
    <span class="com">// In mảng B trước</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">nB</span> - 1:
        Xuất <span class="var">B</span>[<span class="var">i</span>] + " "
        
    <span class="com">// In mảng A sau</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">nA</span> - 1:
        Xuất <span class="var">A</span>[<span class="var">i</span>] + " "

<span class="com">// Yêu cầu 2: Xen kẽ A và B</span>
<span class="kw">HÀM</span> <span class="fn">GopXenKe_ToiUu</span>(<span class="var">A</span>[], <span class="var">nA</span>, <span class="var">B</span>[], <span class="var">nB</span>):
    <span class="var">max_Len</span> = <span class="fn">MAX</span>(<span class="var">nA</span>, <span class="var">nB</span>)
    
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">max_Len</span> - 1:
        <span class="com">// Nếu mảng A chưa hết phần tử thì in</span>
        <span class="kw">NẾU</span> <span class="var">i_a</span> < <span class="var">nA</span> <span class="kw">THÌ</span>:
            Xuất <span class="var">A</span>[<span class="var">i</span>] + " "
            
        <span class="com">// Nếu mảng B chưa hết phần tử thì in</span>
        <span class="kw">NẾU</span> <span class="var">i_b</span> < <span class="var">nB</span> <span class="kw">THÌ</span>:
            Xuất <span class="var">B</span>[<span class="var">i</span>] + " "
</pre>
</div>