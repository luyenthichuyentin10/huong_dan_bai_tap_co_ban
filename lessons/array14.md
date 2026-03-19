## 🔀 Bài 14: Sắp xếp Lẻ tăng, Chẵn giảm
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng $A$ có $N$ phần tử. 

**Yêu cầu:** Hãy sắp xếp mảng $A$ theo định dạng: **Số lẻ tăng dần rồi đến số chẵn giảm dần.**

### Input
Từ file **ARRAY14.INP** gồm các phần tử trong mảng $A$, mỗi phần tử cách nhau khoảng trắng.

### Ràng buộc
- ($0 < N_a, N_b \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
Ghi ra file **ARRAY14.OUT** mảng $A$ sau khi đã sắp xếp theo yêu cầu đề bài.

### Sample Input 
```text
8
2 4 0 4 1 9 8 3
```

### Sample Output 
```text
1 3 9 8 4 4 2 0
```

### Giải thích

### Subtask
- 50% số test có $N_a, N_b \le 1000$
- 50% số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích thuật toán: Vét cạn vs Tối ưu</div>

### 💡 Cách 1: Vét cạn (Tách mảng rồi Gộp - Dễ hiểu nhất)
- **Ý tưởng:** 1. Quét mảng $A$, tách các số lẻ sang một mảng `Le[]` và các số chẵn sang mảng `Chan[]`.
  2. Sắp xếp mảng `Le[]` tăng dần.
  3. Sắp xếp mảng `Chan[]` giảm dần.
  4. In mảng `Le[]` trước rồi in mảng `Chan[]` sau.
- **Ưu điểm:** Suy nghĩ tự nhiên, dễ code.
- **Nhược điểm:** Cần dùng thêm 2 mảng phụ gây tốn bộ nhớ $O(N)$ và phải viết nhiều vòng lặp.

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">SapXep_VetCan</span>(<span class="var">A</span>[], <span class="var">n</span>):
    <span class="var">Le</span> = []
    <span class="var">Chan</span> = []
    
    <span class="com">// Bước 1: Phân loại mảng</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">n</span> - 1:
        <span class="kw">NẾU</span> <span class="fn">TriTuyetDoi</span>(<span class="var">A</span>[<span class="var">i</span>]) % 2 == 1 <span class="kw">THÌ</span>:
            Thêm <span class="var">A</span>[<span class="var">i</span>] vào <span class="var">Le</span>
        <span class="kw">NGƯỢC LẠI</span>:
            Thêm <span class="var">A</span>[<span class="var">i</span>] vào <span class="var">Chan</span>
            
    <span class="com">// Bước 2: Sắp xếp 2 mảng phụ</span>
    <span class="fn">SapXepTangDan</span>(<span class="var">Le</span>)
    <span class="fn">SapXepGiamDan</span>(<span class="var">Chan</span>)
    
    <span class="com">// Bước 3: In kết quả</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến KíchThước(<span class="var">Le</span>) - 1:
        Xuất <span class="var">Le</span>[<span class="var">i</span>] + " "
        
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến KíchThước(<span class="var">Chan</span>) - 1:
        Xuất <span class="var">Chan</span>[<span class="var">i</span>] + " "
</pre>

### 🚀 Cách 2: Tối ưu (Sử dụng Custom Comparator) 
- **Ý tưởng:** Ta dùng hàm `sort()` có sẵn của C++, nhưng thay vì để nó tự sắp xếp mặc định, ta truyền vào một "Bộ quy tắc so sánh" (Custom Comparator) do chính ta định nghĩa.
- **Quy tắc so sánh 2 số `a` và `b` bất kỳ:**
  1. Nếu `a` và `b` khác tính chẵn lẻ: Số Lẻ luôn đứng trước số Chẵn.
  2. Nếu `a` và `b` đều là Lẻ: Sắp xếp tăng dần (`a < b`).
  3. Nếu `a` và `b` đều là Chẵn: Sắp xếp giảm dần (`a > b`).
- **Ưu điểm:** Thuật toán cực kỳ ngắn gọn, thanh lịch. Bộ nhớ tối ưu $O(1)$ (sắp xếp trực tiếp trên mảng $A$), tốc độ $O(N \log N)$.

<pre class="pseudocode">
<span class="com">// Hàm quy tắc so sánh tùy chỉnh</span>
<span class="kw">HÀM</span> <span class="fn">QuyTacSapXep</span>(<span class="var">a</span>, <span class="var">b</span>):
    <span class="var">a_LaSoLe</span> = (<span class="var">a</span> % 2 khác 0)
    <span class="var">b_LaSoLe</span> = (<span class="var">b</span> % 2 khác 0)
    
    <span class="com">// Trường hợp 1: Khác tính chẵn lẻ (Lẻ đứng trước)</span>
    <span class="kw">NẾU</span> <span class="var">a_LaSoLe</span> KHÁC <span class="var">b_LaSoLe</span> <span class="kw">THÌ</span>:
        <span class="kw">TRẢ VỀ</span> <span class="var">a_LaSoLe</span> <span class="com">// Nếu a là lẻ -> a đứng trước (true)</span>
        
    <span class="com">// Trường hợp 2: Cùng là số lẻ -> Tăng dần</span>
    <span class="kw">NẾU</span> <span class="var">a_LaSoLe</span> == <span class="kw">true</span> <span class="kw">THÌ</span>:
        <span class="kw">TRẢ VỀ</span> <span class="var">a</span> < <span class="var">b</span>
        
    <span class="com">// Trường hợp 3: Cùng là số chẵn -> Giảm dần</span>
    <span class="kw">NGƯỢC LẠI</span>:
        <span class="kw">TRẢ VỀ</span> <span class="var">a</span> > <span class="var">b</span>

<span class="com">// Chương trình chính</span>
<span class="kw">HÀM</span> <span class="fn">SapXepLeTangChanGiam</span>(<span class="var">A</span>[], <span class="var">n</span>):
    <span class="com">// Gọi hàm sort mặc định kèm quy tắc</span>
    <span class="fn">Sort</span>(<span class="var">A</span>, <span class="var">A</span> + <span class="var">n</span>, <span class="fn">QuyTacSapXep</span>)
    
    <span class="kw">XUẤT</span> <span class="var">A</span>
</pre>
</div>