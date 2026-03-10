## 📘 Bài 11: Kiểm tra Tính chất của Mảng
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng số nguyên $A$ có $N$ phần tử. Mảng có thể mang các tính chất sau:
1.  **Tính đối xứng:** Đọc từ trái sang phải hay từ phải sang trái đều giống nhau.
2.  **Tính đơn điệu:** Các phần tử liên tiếp luôn tăng dần (hoặc bằng nhau), hoặc luôn giảm dần (hoặc bằng nhau).
3.  **Tính tuần hoàn:** Mảng được lặp lại bởi một chuỗi con có độ dài $P$ ($P \le N/2$ và $N$ chia hết cho $P$).

**Yêu cầu:** 
- Nếu mảng có tính chất nào thì in ra thông báo tương ứng (có thể in nhiều dòng nếu có nhiều tính chất, ngược lại in "No").
- Nếu mảng **không có** bất kỳ tính chất nào trong 3 tính chất trên, hãy **sắp xếp mảng giảm dần** và in ra.

### Input
Từ file **ARRAY11.INP** gồm các phần tử của mảng, mỗi phần tử cách nhau 1 khoảng trắng.

### Ràng buộc
- ($0 < N \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
- Ghi ra file **ARRAY11.OUT** gồm
- Dòng thứ nhất, nếu mảng có tính đối xứng ghi **"Mang doi xung"**, nếu không có ghi **"No"**
- Dòng thứ hai, nếu mảng có tính đơn điệu ghi **"Mang don dieu"**, nếu không có ghi **"No"**
- Dòng thứ ba, nếu mảng có tính tuần hoàn ghi **"Mang tuan hoan"**, nếu không có ghi **"No"**
- Nếu mảng không có cả 3 tính chất thì ghi mảng sau khi đã được sắp xếp **giảm dần**.

### Sample Input 
```
1 2 3 2 1
```

### Sample Output 
```
Mang doi xung
No
No
```

### Giải thích

### Subtask
- 50% số test có $N \le 1000$
- 50% số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">1. Tính Đối xứng (Symmetry)</div>

### 💡 Vét cạn (Brute Force)
- Tạo một mảng phụ $B$, copy ngược mảng $A$ vào $B$. Sau đó dùng vòng lặp so sánh từng phần tử $A[i]$ và $B[i]$. 
- **Nhược điểm:** Tốn thêm $O(N)$ bộ nhớ cho mảng phụ và duyệt $N$ lần.

### 🚀 Tối ưu (Hai con trỏ - Two Pointers)
- Sử dụng 2 con trỏ: `left` ở đầu mảng, `right` ở cuối mảng. Mỗi bước tiến sát vào giữa, nếu $A[left] \ne A[right]$ thì kết luận ngay là KHÔNG đối xứng.
- **Ưu điểm:** Độ phức tạp thời gian $O(N/2)$, bộ nhớ $O(1)$.

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">KiemTraDoiXung</span>(<span class="var">A</span>[], <span class="var">n</span>):
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">n</span> / 2 - 1:
        <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span>] khác <span class="var">A</span>[<span class="var">n</span> - 1 - <span class="var">i</span>] <span class="kw">THÌ</span>:
            <span class="kw">TRẢ VỀ</span> <span class="kw">false</span> <span class="com">// Lệch nhau -> Không đối xứng</span>
    <span class="kw">TRẢ VỀ</span> <span class="kw">true</span>
</pre>

</div>

<div class="step-card border-orange">
<div class="step-badge bg-orange">2. Tính Đơn điệu (Monotonicity)</div>

### 💡 Vét cạn (Brute Force)
- Để kiểm tra mảng tăng, xét mọi cặp $(i, j)$ với $i < j$. Nếu có $A[i] > A[j]$ thì sai.
- Độ phức tạp: $O(N^2)$ - Quá chậm!

### 🚀 Tối ưu (Duyệt 1 lần với Cờ hiệu)

- Mảng chỉ phá vỡ tính đơn điệu khi có sự "đảo chiều" giữa 2 phần tử kề nhau.
- Ta chỉ cần duyệt 1 vòng for, so sánh $A[i]$ và $A[i+1]$. Dùng 2 cờ isInc (tăng) và isDec (giảm).

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">KiemTraDonDieu</span>(<span class="var">A</span>[], <span class="var">n</span>):
    <span class="var">isInc</span> = <span class="kw">true</span> <span class="com">// Cờ đánh dấu tính Tăng dần</span>
    <span class="var">isDec</span> = <span class="kw">true</span> <span class="com">// Cờ đánh dấu tính Giảm dần</span>
    
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">n</span> - 2:
        <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span>] > <span class="var">A</span>[<span class="var">i</span> + 1] <span class="kw">THÌ</span>:
            <span class="var">isInc</span> = <span class="kw">false</span> <span class="com">// Phá vỡ tính tăng</span>
        <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span>] < <span class="var">A</span>[<span class="var">i</span> + 1] <span class="kw">THÌ</span>:
            <span class="var">isDec</span> = <span class="kw">false</span> <span class="com">// Phá vỡ tính giảm</span>
            
    <span class="com">// Nếu còn giữ được 1 trong 2 tính chất thì là mảng đơn điệu</span>
    <span class="kw">TRẢ VỀ</span> (<span class="var">isInc</span> HOẶC <span class="var">isDec</span>)
</pre>

</div>

<div class="step-card border-green">
<div class="step-badge bg-green">3. Tính Tuần hoàn (Periodicity)</div>

### 💡 Vét cạn (Thử mọi chu kỳ)
- Thử mọi độ dài chu kỳ $P$ từ $1$ đến $N/2$. Chu kỳ hợp lệ bắt buộc $N$ phải chia hết cho $P$.
- Với mỗi $P$, kiểm tra xem $A[i]$ có bằng $A[i+P]$ không.Độ phức tạp: $O(N^2)$ trong trường hợp xấu nhất. 
- Tuy nhiên, giới hạn THCS dùng cách này là hoàn toàn hợp lý.

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">KiemTraTuanHoan</span>(<span class="var">A</span>[], <span class="var">n</span>):
    <span class="kw">CHO</span> <span class="var">P</span> chạy từ 1 đến <span class="var">n</span> / 2:
        <span class="kw">NẾU</span> <span class="var">n</span> chia hết cho <span class="var">P</span> <span class="kw">THÌ</span>:
            <span class="var">ok</span> = <span class="kw">true</span>
            <span class="com">// Kiểm tra các phần tử cách nhau khoảng P</span>
            <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">n</span> - <span class="var">P</span> - 1:
                <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span>] khác <span class="var">A</span>[<span class="var">i</span> + <span class="var">P</span>] <span class="kw">THÌ</span>:
                    <span class="var">ok</span> = <span class="kw">false</span>
                    <span class="kw">THOÁT VÒNG LẶP</span>
                    
            <span class="com">// Nếu duyệt hết mà vẫn ok thì P chính là chu kỳ</span>
            <span class="kw">NẾU</span> <span class="var">ok</span> == <span class="kw">true</span> <span class="kw">THÌ</span> <span class="kw">TRẢ VỀ</span> <span class="kw">true</span>
            
    <span class="kw">TRẢ VỀ</span> <span class="kw">false</span>
</pre>

</div>