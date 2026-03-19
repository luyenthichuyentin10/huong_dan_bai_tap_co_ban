## 📈📉 Bài 16: Đếm mảng con tăng giảm
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Xác định số mảng con tăng và số mảng con giảm trong mảng $A$ có $N$. 

**Yêu cầu**: In ra màn hình mảng con tăng dài nhất và mảng con giảm ít nhất (ngắn nhất).

***Lưu ý:***
- *Điều kiện để xác định một mảng con tăng hoặc giảm trong mảng $A$ là khi có sự đổi chiều của phần tử trong mảng (từ lớn sang nhỏ hoặc từ nhỏ sang lớn).*
- *Để được xác định là mảng con tăng giảm thì mảng phải có ít nhất 2 phần tử*
- *Trường hợp có nhiều mảng con tăng dài nhất giống nhau hoặc nhiều mảng con giảm ít nhất giống nhau thì lấy mảng đầu tiên*

### Input
Từ file **ARRAY16.INP** gồm các phần tử trong mảng $A$, mỗi phần tử cách nhau khoảng trắng.

### Ràng buộc
- ($0 < N \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
Ghi ra file **ARRAY16.OUT** gồm
- Dòng thứ nhất ghi số mảng con tăng tìm được trong mảng $A$.
- Dòng thứ hai ghi số mảng con giảm tìm được trong mảng $A$.
- Dòng thứ ba ghi mảng con tăng dài nhất.
- Cách một dòng trống.
- Dòng tiếp theo ghi mảng con giảm ít nhất.

### Sample Input 
```text
2 4 1 0 1 9 8 9 2 4
```

### Sample Output 
```text
4
3
0 1 9

9 8
```

### Giải thích

### Subtask
- 50% số test có $N \le 1000$
- 50% số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích thuật toán: Giới hạn và Độ phức tạp</div>

### 💡 Cách 1: Vét cạn (Sinh mọi mảng con)
- **Ý tưởng:** Dùng 2 vòng lặp `i` và `j` lồng nhau để tạo ra mọi mảng con có thể có từ vị trí `i` đến `j`. Sau đó dùng vòng lặp thứ 3 chạy từ `i` đến `j` để kiểm tra xem mảng con đó có hoàn toàn tăng hoặc hoàn toàn giảm hay không.
- **Độ phức tạp:** Thời gian chạy lên tới $O(N^3)$ hoặc tối ưu lắm cũng là $O(N^2)$.
- **Giới hạn:** Với $O(N^2)$, bài toán chỉ vượt qua được nếu mảng $A$ có tối đa $N \le 5000$ phần tử. Nếu $N = 10^5$, chương trình sẽ bị Time Limit Exceeded (Quá thời gian).

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">DemMangCon_VetCan</span>(<span class="var">A</span>[], <span class="var">N</span>):
    <span class="com">// Duyệt mọi điểm bắt đầu i</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">N</span> - 2:
        <span class="com">// Duyệt mọi điểm kết thúc j</span>
        <span class="kw">CHO</span> <span class="var">j</span> chạy từ <span class="var">i</span> + 1 đến <span class="var">N</span> - 1:
            
            <span class="var">LaTang</span> = <span class="kw">true</span>, <span class="var">LaGiam</span> = <span class="kw">true</span>
            
            <span class="com">// Kiểm tra tính Tăng/Giảm của đoạn A[i..j]</span>
            <span class="kw">CHO</span> <span class="var">k</span> chạy từ <span class="var">i</span> đến <span class="var">j</span> - 1:
                <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">k</span>] >= <span class="var">A</span>[<span class="var">k</span>+1] <span class="kw">THÌ</span> <span class="var">LaTang</span> = <span class="kw">false</span>
                <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">k</span>] <= <span class="var">A</span>[<span class="var">k</span>+1] <span class="kw">THÌ</span> <span class="var">LaGiam</span> = <span class="kw">false</span>
                
            <span class="com">// Kiểm tra tính cực đại (Có bị đổi chiều ở 2 đầu không)</span>
            <span class="kw">NẾU</span> <span class="var">LaTang</span> == <span class="kw">true</span> <span class="kw">THÌ</span>:
                <span class="var">ChanTrai</span> = (<span class="var">i</span> == 0 HOẶC <span class="var">A</span>[<span class="var">i</span>-1] >= <span class="var">A</span>[<span class="var">i</span>])
                <span class="var">ChanPhai</span> = (<span class="var">j</span> == <span class="var">N</span>-1 HOẶC <span class="var">A</span>[<span class="var">j</span>] >= <span class="var">A</span>[<span class="var">j</span>+1])
                <span class="kw">NẾU</span> <span class="var">ChanTrai</span> VÀ <span class="var">ChanPhai</span> <span class="kw">THÌ</span>:
                    Ghi nhận 1 mảng Tăng, Cập nhật Mảng tăng dài nhất
                    
            <span class="kw">NẾU</span> <span class="var">LaGiam</span> == <span class="kw">true</span> <span class="kw">THÌ</span>:
                <span class="var">ChanTrai</span> = (<span class="var">i</span> == 0 HOẶC <span class="var">A</span>[<span class="var">i</span>-1] <= <span class="var">A</span>[<span class="var">i</span>])
                <span class="var">ChanPhai</span> = (<span class="var">j</span> == <span class="var">N</span>-1 HOẶC <span class="var">A</span>[<span class="var">j</span>] <= <span class="var">A</span>[<span class="var">j</span>+1])
                <span class="kw">NẾU</span> <span class="var">ChanTrai</span> VÀ <span class="var">ChanPhai</span> <span class="kw">THÌ</span>:
                    Ghi nhận 1 mảng Giảm, Cập nhật Mảng giảm ngắn nhất
</pre>

### 🚀 Cách 2: Tách biệt đếm Tăng và Giảm (Duyệt 2 lần - $O(2N)$) - *Khuyên dùng*
- **Ý tưởng:** Thay vì làm mọi thứ cùng lúc, ta tách bài toán thành 2 lần quét độc lập: một lần quét tìm mảng Tăng, một lần quét tìm mảng Giảm.
- **Kỹ thuật Cửa sổ trượt:** Dùng 2 biến `bat_dau` và `ket_thuc`. Ta tiến `ket_thuc` lên cho đến khi "đứt đà" (ví dụ đang đếm mảng tăng mà phần tử sau lại nhỏ hơn hoặc bằng phần tử trước). Chốt mảng con, rồi nhảy vọt `bat_dau = ket_thuc + 1` để quét đoạn mới.
- **Độ phức tạp:** Mặc dù có 2 vòng lặp lồng nhau, nhưng bước nhảy `bat_dau = ket_thuc + 1` giúp mỗi phần tử chỉ bị duyệt 1 lần cho mỗi hàm. Tổng thời gian $O(2N)$, cực kỳ tối ưu và logic cực kỳ rõ ràng, dễ hiểu.

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">DemMangTang</span>(<span class="var">A</span>[], <span class="var">N</span>):
    <span class="com">// Mẹo: Thêm 1 lính canh ở cuối mảng để tự động ngắt vòng lặp</span>
    <span class="var">A</span>[<span class="var">N</span>] = -Vô_Cùng  
    
    <span class="var">BatDau</span> = 0
    <span class="kw">TRONG KHI</span> <span class="var">BatDau</span> < <span class="var">N</span>:
        <span class="var">KetThuc</span> = <span class="var">BatDau</span>
        
        <span class="com">// Kéo dài đoạn tăng cho đến khi bị đứt đà</span>
        <span class="kw">TRONG KHI</span> <span class="var">KetThuc</span> < <span class="var">N</span>:
            <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">KetThuc</span>] >= <span class="var">A</span>[<span class="var">KetThuc</span> + 1] <span class="kw">THÌ</span>:
                <span class="com">// Đứt đà -> Chốt mảng</span>
                <span class="var">DoDai</span> = <span class="var">KetThuc</span> - <span class="var">BatDau</span> + 1
                <span class="kw">NẾU</span> <span class="var">DoDai</span> > 1 <span class="kw">THÌ</span>:
                    <span class="var">DemTang</span>++
                    Cập_Nhật_Mang_Tang_Dai_Nhat()
                <span class="kw">THOÁT VÒNG LẶP KetThuc</span>
            <span class="var">KetThuc</span>++
            
        <span class="com">// Bước nhảy vọt: Bỏ qua đoạn đã xét</span>
        <span class="var">BatDau</span> = <span class="var">KetThuc</span> + 1

<span class="com">// Tương tự viết hàm DemMangGiam với A[N] = +Vô_Cùng</span>
<span class="com">// Điều kiện ngắt đà là: A[KetThuc] <= A[KetThuc + 1]</span>
</pre>

### 🚀 Cách 3: Tối ưu với kỹ thuật Duyệt một lần (O(N))
- **Ý tưởng:** Chúng ta chỉ cần đi dọc theo mảng đúng 1 lần. Tại mỗi bước, ta so sánh $A[i]$ và $A[i+1]$ để biết mình đang ở "Đà tăng" hay "Đà giảm".
- **Quy luật:** 
    - Nếu đang ở đà Tăng mà gặp phần tử bị tụt xuống $\rightarrow$ Đà tăng kết thúc! Ta tăng biến đếm số mảng tăng, cập nhật "Mảng tăng dài nhất", và bắt đầu một đà Giảm mới.
    - Ngược lại, nếu đang ở đà Giảm mà gặp phần tử nhô lên $\rightarrow$ Đà giảm kết thúc! Ta tăng đếm số mảng giảm, cập nhật "Mảng giảm ngắn nhất", và bắt đầu đà Tăng mới.
- **Độ phức tạp:** $O(N)$. Thuật toán này có sức mạnh xử lý cực khủng. Học sinh có thể dễ dàng giải quyết bài toán ngay cả khi $N = 10^7$ (10 triệu phần tử) trong chưa tới 0.1 giây!

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">MangConTangGiam</span>(<span class="var">A</span>[], <span class="var">N</span>):
    <span class="var">DemTang</span> = 0, <span class="var">DemGiam</span> = 0
    <span class="var">MaxTangLen</span> = 0, <span class="var">MinGiamLen</span> = Vô_Cùng
    <span class="var">TrangThai</span> = 0 <span class="com">// 1 là đang Tăng, -1 là đang Giảm, 0 là chưa rõ</span>
    <span class="var">BatDau</span> = 0    <span class="com">// Lưu vị trí bắt đầu của mảng con hiện tại</span>

    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">N</span> - 1:
        <span class="com">// Kiểm tra xem có phải là điểm đổi chiều hoặc hết mảng không</span>
        <span class="var">LaDoiChieu</span> = <span class="kw">false</span>
        <span class="kw">NẾU</span> <span class="var">i</span> == <span class="var">N</span> - 1 <span class="kw">THÌ</span> <span class="var">LaDoiChieu</span> = <span class="kw">true</span>
        <span class="kw">NGƯỢC LẠI</span>:
            <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span>] < <span class="var">A</span>[<span class="var">i</span>+1] <span class="kw">THÌ</span> <span class="var">TrangThaiMoi</span> = 1
            <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span>] > <span class="var">A</span>[<span class="var">i</span>+1] <span class="kw">THÌ</span> <span class="var">TrangThaiMoi</span> = -1
            
            <span class="kw">NẾU</span> <span class="var">TrangThai</span> khác 0 VÀ <span class="var">TrangThai</span> khác <span class="var">TrangThaiMoi</span>:
                <span class="var">LaDoiChieu</span> = <span class="kw">true</span>

        <span class="com">// Nếu đổi chiều hoặc hết mảng -> Chốt sổ mảng con hiện tại</span>
        <span class="kw">NẾU</span> <span class="var">LaDoiChieu</span> == <span class="kw">true</span> <span class="kw">THÌ</span>:
            <span class="var">Len</span> = <span class="var">i</span> - <span class="var">BatDau</span> + 1
            <span class="kw">NẾU</span> <span class="var">TrangThai</span> == 1 <span class="kw">THÌ</span>:
                <span class="var">DemTang</span> = <span class="var">DemTang</span> + 1
                <span class="kw">NẾU</span> <span class="var">Len</span> > <span class="var">MaxTangLen</span> <span class="kw">THÌ</span> Cập_nhật_Mảng_Tăng_Dài_Nhất
            <span class="kw">NẾU</span> <span class="var">TrangThai</span> == -1 <span class="kw">THÌ</span>:
                <span class="var">DemGiam</span> = <span class="var">DemGiam</span> + 1
                <span class="kw">NẾU</span> <span class="var">Len</span> < <span class="var">MinGiamLen</span> VÀ <span class="var">Len</span> >= 2 <span class="kw">THÌ</span> Cập_nhật_Mảng_Giảm_Ngắn_Nhất
            
            <span class="com">// Reset lại mốc bắt đầu cho đoạn mới</span>
            <span class="var">BatDau</span> = <span class="var">i</span>
            <span class="var">TrangThai</span> = <span class="var">TrangThaiMoi</span>
            
    <span class="kw">XUẤT</span> Kết_Quả
</pre>
</div>

<div class="step-card border-purple">
<div class="step-badge bg-purple">Bảng so sánh 2 thuật toán</div>

<table style="width:100%; border-collapse: collapse; margin-top: 10px; font-size: 14px;">
    <thead>
        <tr style="background-color: #f8fafc; border-bottom: 2px solid #e2e8f0;">
            <th style="padding: 12px; text-align: left; color: #475569;">Tiêu chí</th>
            <th style="padding: 12px; text-align: left; color: #9a3412;">Cách 1: Vét cạn (Brute Force)</th>
            <th style="padding: 12px; text-align: left; color: #26129a;">Cách 2: Tối ưu (Sliding Window)</th>
            <th style="padding: 12px; text-align: left; color: #15803d;">Cách 3: Tối ưu (State Machine)</th>
        </tr>
    </thead>
    <tbody>
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Cách thức hoạt động</td>
            <td style="padding: 12px;">Dùng vòng lặp lồng nhau sinh mọi mảng con, rồi kiểm tra từng mảng.</td>
            <td style="padding: 12px;">Duyệt mảng 2 lần, lần đầu kiểm tra mảng tăng, lần sau kiểm tra mảng giảm.</td>
            <td style="padding: 12px;">Chỉ duyệt mảng đúng 1 lần, theo dõi sự đổi chiều (Trạng thái).</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #fcfcfc;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Độ phức tạp thời gian</td>
            <td style="padding: 12px; color: #b91c1c; font-weight: bold;">$O(N^3)$ hoặc $O(N^2)$</td>
            <td style="padding: 12px; color: #1f1cb9; font-weight: bold;">$O(2N)$</td>
            <td style="padding: 12px; color: #15803d; font-weight: bold;">$O(N)$</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Độ phức tạp không gian</td>
            <td style="padding: 12px;">$O(1)$</td>
            <td style="padding: 12px;">$O(1)$</td>
            <td style="padding: 12px;">$O(1)$</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0; background-color: #fcfcfc;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Giới hạn dữ liệu ($N$)</td>
            <td style="padding: 12px; color: #b91c1c;">$N \le 500$ (với $O(N^3)$)</td>
            <td style="padding: 12px; color: #2c1cb9;">$N \le 10^6$ (1 triệu phần tử)</td>
            <td style="padding: 12px; color: #15803d; font-weight: bold;">$N \le 10^7$ (10 triệu phần tử)</td>
        </tr>
        <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 12px; font-weight: bold; color: #64748b;">Đánh giá</td>
            <td style="padding: 12px;">Dễ suy luận, dùng để lấy điểm test nhỏ.</td>
            <td style="padding: 12px;">Tốc độ đủ theo yêu cầu, tư duy chia để trị.</td>
            <td style="padding: 12px;">Tốc độ cực nhanh, là cách làm tối ưu nhưng đòi hỏi kỹ thuật lập trình tốt.</td>
        </tr>
    </tbody>
</table>
</div>