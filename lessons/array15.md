## 🧩 Bài 15: Kiểm tra Mảng con (Subarray Search)
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng $A$ có $N$ phần tử. Bạn phải trả lời $Q$ truy vấn. Mỗi truy vấn cung cấp một mảng $B$ gồm $M$ phần tử. 

**Yêu cầu:** Hãy kiểm tra xem mảng $B$ có phải là **mảng con liên tiếp** của mảng $A$ hay không?

*(Lưu ý: Để là mảng con, các phần tử của $B$ phải xuất hiện trong $A$ theo đúng thứ tự và phải nằm liền kề nhau).*

### Input
Từ file **ARRAY15.INP** gồm:
- Dòng thứ nhất: Số phần tử $N$ của mảng $A$.
- Dòng thứ hai: $N$ phần tử của mảng $A$, cách nhau khoảng trắng.
- Dòng thứ ba: Số nguyên $Q$ - Số lượng truy vấn.
- $2 \times Q$ dòng tiếp theo: Mỗi truy vấn gồm 1 dòng ghi số $M$ (kích thước mảng $B$) và 1 dòng ghi $M$ phần tử của mảng $B$.

### Ràng buộc
- ($0 < M \le N \le 10^4$)
- ($0 < Q \le 10^4$)
- ($|A_i|, |B_i|\le 10^9$)

### Output
Ghi ra file **ARRAY15.OUT** gồm:
- Gồm $Q$ dòng, mỗi dòng ghi `Yes` nếu $B$ là mảng con của $A$, ngược lại ghi `No`.

### Sample Input 
```text
8
2 4 1 0 1 9 8 0
3
3
1 0 1
2
9 0
1
4
```

### Sample Output 
```text
Yes
No
Yes
```

### Giải thích

### Subtask
- 50% số test có $N, M, Q \le 100$
- 50% số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích thuật toán: Giới hạn và Độ phức tạp</div>

- **Ý tưởng:** Đặt mảng $B$ (như một cái khung cửa sổ) trượt dọc theo mảng $A$. Tại mỗi vị trí $i$ (từ $0$ đến $N-M$), ta đối chiếu từng cặp phần tử $A[i+j]$ và $B[j]$. Nếu khớp hết $M$ phần tử thì trả về `Yes`.
- **Độ phức tạp:** Ở trường hợp xấu nhất (Ví dụ $A = [1,1,1,1,1,1,2]$, $B = [1,1,1,2]$), ta phải so sánh tới lui rất nhiều lần. Thời gian tốn: $O(N \times M)$ cho mỗi truy vấn. Tổng thời gian: $O(Q \times N \times M)$.
- **Giới hạn chấp nhận:** Thuật toán này chỉ chạy được trong $1$ giây nếu $Q \times N \times M \le 10^7$. Nghĩa là mảng cha $N \le 1000$ và mảng con $M \le 1000$. Nếu số lượng lên đến $10^5$, thuật toán sẽ bị TLE (Quá thời gian).

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">KiemTraMangCon</span>(<span class="var">A</span>[], <span class="var">N</span>, <span class="var">B</span>[], <span class="var">M</span>):
    <span class="com">// Nếu mảng con lớn hơn mảng cha thì chắc chắn sai</span>
    <span class="kw">NẾU</span> <span class="var">M</span> > <span class="var">N</span> <span class="kw">THÌ TRẢ VỀ</span> <span class="val">"No"</span>

    <span class="com">// Trượt khung B trên A (điểm bắt đầu từ 0 đến N - M)</span>
    <span class="kw">CHO</span> <span class="var">i</span> chạy từ 0 đến <span class="var">N</span> - <span class="var">M</span>:
        <span class="var">khopHoanToan</span> = <span class="kw">true</span>
        
        <span class="com">// Đối chiếu M phần tử</span>
        <span class="kw">CHO</span> <span class="var">j</span> chạy từ 0 đến <span class="var">M</span> - 1:
            <span class="kw">NẾU</span> <span class="var">A</span>[<span class="var">i</span> + <span class="var">j</span>] khác <span class="var">B</span>[<span class="var">j</span>] <span class="kw">THÌ</span>:
                <span class="var">khopHoanToan</span> = <span class="kw">false</span>
                <span class="kw">THOÁT VÒNG LẶP j</span> <span class="com">// Lệch 1 phát là bỏ qua vị trí i này luôn</span>
                
        <span class="com">// Nếu quét hết vòng j mà không bị break -> Đã tìm thấy!</span>
        <span class="kw">NẾU</span> <span class="var">khopHoanToan</span> == <span class="kw">true</span> <span class="kw">THÌ</span>:
            <span class="kw">TRẢ VỀ</span> <span class="val">"Yes"</span>
            
    <span class="com">// Trượt hết mảng cha mà không thấy</span>
    <span class="kw">TRẢ VỀ</span> <span class="val">"No"</span>
</pre>
</div>