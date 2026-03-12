## 🔀 Bài 12: Tách mảng theo điều kiện

<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng $A$ có $N$ phần tử. 

**Yêu cầu:** Hãy tách mảng $A$ thành 2 mảng con $B$ và $C$ sao cho:
- Mảng $B$ chứa các phần tử là **số hoàn hảo** (Perfect Number).
- Mảng $C$ chứa các phần tử **không phải là số hoàn hảo**.

*(Số hoàn hảo là số nguyên dương có tổng các ước số thực sự của nó bằng chính nó. Ví dụ: $6 = 1 + 2 + 3$, $28 = 1 + 2 + 4 + 7 + 14$)*.

### Input
Từ file **ARRAY12.INP** gồm
- Dòng thứ nhất: Số phần tử $N$ của mảng.
- Dòng thứ hai: $N$ số nguyên của mảng $A$.

### Ràng buộc
- ($0 < N \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
Ghi ra file **ARRAY12.OUT** gồm
- Dòng 1: In ra các phần tử của mảng $B$.
- Dòng 2: (Cách một dòng trống theo chuẩn đề)
- Dòng 3: In ra các phần tử của mảng $C$.

### Sample Input 
```
6
6 12 28 15 496 7
```

### Sample Output 
```
6 28 496

12 15 7
```

### Giải thích

### Subtask
- 50% số test có $N \le 1000$
- 50% số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích thuật toán</div>

Bài toán tách mảng thực chất là sự kết hợp của 2 kỹ thuật nền tảng:
1.  **Hàm kiểm tra (Check Function):** Viết một hàm con `LaSoHoanHao(x)` để cô lập logic toán học. Hàm này sẽ duyệt tìm các ước của $x$ và tính tổng.
2.  **Kỹ thuật phân loại (Filtering/Splitting):** Duyệt qua từng phần tử của mảng $A$. Tùy thuộc vào kết quả trả về của hàm kiểm tra (True/False) mà ta sẽ `push` (đẩy) phần tử đó vào mảng $B$ hoặc mảng $C$.

<pre class="pseudocode">
<span class="com">// Hàm kiểm tra Số hoàn hảo</span>
<span class="kw">HÀM</span> <span class="fn">LaSoHoanHao</span>(<span class="var">x</span>):
    <span class="kw">NẾU</span> <span class="var">x</span> <= 1 <span class="kw">THÌ TRẢ VỀ</span> <span class="kw">false</span>
    <span class="var">tongUoc</span> = 0
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 1 đến <span class="var">x</span> / 2:
        <span class="kw">NẾU</span> <span class="var">x</span> chia hết cho <span class="var">i</span> <span class="kw">THÌ</span>:
            <span class="var">tongUoc</span> = <span class="var">tongUoc</span> + <span class="var">i</span>
            
    <span class="kw">TRẢ VỀ</span> (<span class="var">tongUoc</span> == <span class="var">x</span>)

<span class="com">// Chương trình chính</span>
<span class="kw">HÀM</span> <span class="fn">TachMang</span>(<span class="var">A</span>[], <span class="var">n</span>):
    <span class="var">B</span> = [] <span class="com">// Mảng chứa số hoàn hảo</span>
    <span class="var">C</span> = [] <span class="com">// Mảng chứa số thường</span>
    
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">n</span> - 1:
        <span class="kw">NẾU</span> <span class="fn">LaSoHoanHao</span>(<span class="var">A</span>[<span class="var">i</span>]) == <span class="kw">true</span> <span class="kw">THÌ</span>:
            Thêm <span class="var">A</span>[<span class="var">i</span>] vào <span class="var">B</span>
        <span class="kw">NGƯỢC LẠI</span>:
            Thêm <span class="var">A</span>[<span class="var">i</span>] vào <span class="var">C</span>
            
    <span class="kw">XUẤT</span> <span class="var">B</span>
    <span class="kw">XUẤT</span> Dòng trống
    <span class="kw">XUẤT</span> <span class="var">C</span>
</pre>
</div>

<div class="step-card border-orange">
<div class="step-badge bg-orange">Tối ưu hàm kiểm tra Số hoàn hảo</div>

### 💡 Tại sao phải tối ưu?
Nếu sử dụng cách duyệt từ $1$ đến $X / 2$, với một số lớn như $X = 1.000.000.000$, vòng lặp phải chạy $500.000.000$ lần. Quá chậm!

### 🚀 Thuật toán duyệt đến $\sqrt{X}$
Nhận xét toán học: Các ước số luôn tồn tại theo từng cặp. 
Nếu $X$ chia hết cho $i$ thì $X$ cũng chắc chắn chia hết cho phần bù của nó là $(X / i)$.
- Ví dụ $X = 28$. Ta biết $\sqrt{28} \approx 5.29$.
- Khi $i = 2 \rightarrow$ ta tìm được ngay cặp $(2, 14)$.
- Khi $i = 4 \rightarrow$ ta tìm được ngay cặp $(4, 7)$.
$\Rightarrow$ Ta chỉ cần duyệt vòng lặp đến **căn bậc 2 của $X$**, tiết kiệm hàng triệu phép tính. 

***Lưu ý:** *Số $1$ luôn là ước, nhưng ta không lấy cặp của nó (vì cặp của $1$ là $X$, mà số hoàn hảo không tính chính nó).*

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">LaSoHoanHao_ToiUu</span>(<span class="var">x</span>):
    <span class="kw">NẾU</span> <span class="var">x</span> <= 1 <span class="kw">THÌ TRẢ VỀ</span> <span class="kw">false</span>
    
    <span class="var">tongUoc</span> = 1 <span class="com">// Luôn tính số 1 trước</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 2 đến <span class="fn">CănBậcHai</span>(<span class="var">x</span>):
        <span class="kw">NẾU</span> <span class="var">x</span> chia hết cho <span class="var">i</span> <span class="kw">THÌ</span>:
            <span class="var">tongUoc</span> = <span class="var">tongUoc</span> + <span class="var">i</span>
            <span class="com">// Cộng thêm phần bù nếu nó khác i</span>
            <span class="kw">NẾU</span> <span class="var">i</span> khác (<span class="var">x</span> / <span class="var">i</span>) <span class="kw">THÌ</span>:
                <span class="var">tongUoc</span> = <span class="var">tongUoc</span> + (<span class="var">x</span> / <span class="var">i</span>)
                
    <span class="kw">TRẢ VỀ</span> (<span class="var">tongUoc</span> == <span class="var">x</span>)
</pre>
</div>

<div class="step-card border-purple">
<div class="step-badge bg-purple">Tối ưu Tuyệt đối: Sử dụng Mảng Hằng (Hardcoding)</div>

### 💡 Khai thác tính chất Toán học
Số hoàn hảo trong tự nhiên cực kỳ hiếm. Nếu đề bài giới hạn giá trị các phần tử $A_i \le 10^9$, chúng ta có thể liệt kê toàn bộ các số hoàn hảo trong phạm vi này. Thực tế, chỉ có đúng **5 số**:
- Số thứ 1: 6
- Số thứ 2: 28
- Số thứ 3: 496
- Số thứ 4: 8128
- Số thứ 5: 33550336

Thay vì bắt máy tính chạy vòng lặp tính toán lại từ đầu cho mỗi phần tử, ta chỉ cần lưu 5 số này vào một mảng cố định. Thuật toán từ việc đếm ước sẽ biến thành bài toán **so sánh bằng**, độ phức tạp giảm xuống mức tuyệt đối $O(1)$.

<pre class="pseudocode">
<span class="com">// Khởi tạo sẵn mảng hằng số (Global Array)</span>
<span class="var">PERFECT_NUMS</span> = [6, 28, 496, 8128, 33550336]

<span class="kw">HÀM</span> <span class="fn">LaSoHoanHao_SieuToc</span>(<span class="var">x</span>):
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến 4:
        <span class="kw">NẾU</span> <span class="var">x</span> == <span class="var">PERFECT_NUMS</span>[<span class="var">i</span>] <span class="kw">THÌ</span>:
            <span class="kw">TRẢ VỀ</span> <span class="kw">true</span>
    <span class="kw">TRẢ VỀ</span> <span class="kw">false</span>
</pre>
</div>

<div class="step-card border-green">
<div class="step-badge bg-green">Bảng tổng kết 3 chiến thuật</div>

<table style="width:100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
    <thead>
        <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
            <th style="padding: 12px; text-align: left; color: #475569;">Tiêu chí</th>
            <th style="padding: 12px; text-align: left; color: #9a3412;">C1: Duyệt N/2</th>
            <th style="padding: 12px; text-align: left; color: #15803d;">C2: Duyệt $\sqrt{N}$</th>
            <th style="padding: 12px; text-align: left; color: #6b21a8;">C3: Mảng Hằng (Hardcode)</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Cách làm</td>
            <td style="padding: 12px;">Đếm từng ước.</td>
            <td style="padding: 12px;">Gom cặp ước.</td>
            <td style="padding: 12px; font-weight: bold; color: #6b21a8;">Chỉ so sánh với 5 số.</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #fcfcfc;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Độ phức tạp</td>
            <td style="padding: 12px; color: #b91c1c;">$O(N)$</td>
            <td style="padding: 12px; color: #15803d;">$O(\sqrt{N})$</td>
            <td style="padding: 12px; color: #6b21a8;">$O(1)$</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Khi $X = 33.550.336$</td>
            <td style="padding: 12px; color: #b91c1c;">$\approx 16.700.000$ bước</td>
            <td style="padding: 12px; color: #15803d;">$\approx 5.792$ bước</td>
            <td style="padding: 12px; font-weight: bold; color: #6b21a8;">Tối đa 5 bước!</td>
        </tr>
    </tbody>
</table>
</div>