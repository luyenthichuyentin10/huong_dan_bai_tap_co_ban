## 💎 Bài 4: Đá quý
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Công ty khai thác đá quý thu được $N$ viên đá quý. Mỗi viên có chỉ số độ tinh khiết $A_i$. Một viên đá được gọi là **"đá quý"** khi thỏa mãn **đồng thời hai điều kiện**:
* Chỉ số độ tinh khiết là một **số nguyên tố**.
* Chỉ số đó là **duy nhất** trong toàn bộ lô hàng (không trùng với viên nào khác).

**Yêu cầu:**
1. Sắp xếp các viên đá quý (đủ điều kiện) theo chỉ số **giảm dần**.
2. Trả lời $Q$ truy vấn: với mỗi cặp $(L, R)$, tính **tổng chỉ số** từ vị trí $L$ đến $R$ trong danh sách đã sắp xếp.

### Input
Từ file **BAI4.INP**:
- Dòng đầu: $N$, $Q$ ($1 \le N \le 10^6$, $1 \le Q \le 10^6$).
- Dòng 2: $N$ số $A_i$ ($0 < A_i < 10^6$).
- $Q$ dòng tiếp: mỗi dòng 2 số $L$, $R$ ($1 \le L \le R \le 10^4$).

### Output
Ghi ra file **BAI4.OUT**:
- Dòng đầu: danh sách đá quý đã sắp xếp giảm dần.
- $Q$ dòng tiếp: mỗi dòng ghi tổng chỉ số từ $L$ đến $R$ (nếu $R$ vượt số lượng đá quý thì tính đến viên cuối).

### Sample Input
```
10 3
3 10 7 3 5 8 11 6 17 19
1 4
3 8
1 8
```

### Sample Output
```
19 17 11 7 5
54
23
59
```

### Giải thích

| Giá trị | 3 | 5 | 6 | 7 | 8 | 10 | 11 | 17 | 19 |
|---|---|---|---|---|---|---|---|---|---|
| Nguyên tố? | ✓ | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |
| Duy nhất? | ✗(×2) | ✓ | — | ✓ | — | — | ✓ | ✓ | ✓ |
| Đá quý? | ✗ | ✓ | ✗ | ✓ | ✗ | ✗ | ✓ | ✓ | ✓ |

Đá quý (giảm dần): `19 17 11 7 5`.
- Truy vấn $(1,4)$: $19+17+11+7 = 54$
- Truy vấn $(3,8)$: $11+7+5 = 23$ (chỉ có 5 viên, $R=8>5$ → tính đến hết)
- Truy vấn $(1,8)$: $19+17+11+7+5 = 59$

### Subtask
- **30%:** $N \le 10^3$, $Q = 1$
- **40%:** $N, Q \le 10^3$
- **30%:** Không ràng buộc thêm
</div>

<!-- ============================================================ -->
<!-- PHẦN PHÂN TÍCH ĐỀ BÀI -->
<!-- ============================================================ -->
<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích đề bài</div>

### 🔍 1. Các thông tin trọng tâm
Bài này kết hợp nhiều kỹ năng cơ bản:
* **Kiểm tra số nguyên tố** bằng vòng lặp.
* **Đếm tần suất** để xác định giá trị duy nhất.
* **Sắp xếp giảm dần**.
* **Tổng tiền tố** (Prefix Sum) để trả lời truy vấn nhanh.

### 📋 2. Các bước giải tổng quan

| Bước | Công việc | Kiến thức |
|---|---|---|
| 1 | Kiểm tra nguyên tố cho từng giá trị | Hàm `LaNguyenTo(n)` |
| 2 | Đếm tần suất mỗi giá trị | Mảng đếm |
| 3 | Lọc: nguyên tố **VÀ** duy nhất | Kết hợp bước 1 + 2 |
| 4 | Sắp xếp giảm dần | `sort` giảm dần |
| 5 | Tính tổng tiền tố + trả lời truy vấn | Prefix Sum |

### 📋 3. Giải thích Ví dụ mẫu chi tiết

Mảng: `3 10 7 3 5 8 11 6 17 19`

**Bước 1 — Kiểm tra nguyên tố:**

Số nguyên tố là số **lớn hơn 1** và **chỉ chia hết cho 1 và chính nó**. Ta kiểm tra bằng cách thử chia cho các số từ 2 đến $\sqrt{n}$:

| Giá trị | 3 | 5 | 6 | 7 | 8 | 10 | 11 | 17 | 19 |
|---|---|---|---|---|---|---|---|---|---|
| Kiểm tra | $\sqrt{3} \approx 1.7$ → không chia hết | $\sqrt{5} \approx 2.2$ → không chia hết | $6 / 2 = 3$ → chia hết | Không chia hết | $8 / 2 = 4$ → chia hết | $10 / 2 = 5$ → chia hết | Không chia hết | Không chia hết | Không chia hết |
| Nguyên tố? | **✓** | **✓** | ✗ | **✓** | ✗ | ✗ | **✓** | **✓** | **✓** |

**Bước 2 — Đếm tần suất:** Giá trị 3 xuất hiện **2 lần** → không duy nhất → loại.

**Bước 3 — Lọc đá quý:** `5, 7, 11, 17, 19` (nguyên tố + duy nhất).

**Bước 4 — Sắp xếp giảm dần:** `19, 17, 11, 7, 5`.

**Bước 5 — Tổng tiền tố:**

| Vị trí $i$ | 0 | 1 | 2 | 3 | 4 | 5 |
|---|---|---|---|---|---|---|
| Đá quý | — | 19 | 17 | 11 | 7 | 5 |
| $S[i]$ | 0 | 19 | 36 | 47 | 54 | 59 |

Truy vấn $(1, 4)$: $S[4] - S[0] = 54 - 0 = 54$ ✓

</div>

<!-- ============================================================ -->
<!-- KIẾN THỨC: KIỂM TRA NGUYÊN TỐ -->
<!-- ============================================================ -->
<div class="step-card border-purple">
<div class="step-badge bg-purple">Kiến thức: Kiểm tra số nguyên tố</div>

### 🔍 Số nguyên tố là gì?
Số nguyên tố là số nguyên **lớn hơn 1**, **chỉ chia hết cho 1 và chính nó**.
- Ví dụ: 2, 3, 5, 7, 11, 13, 17, 19, 23, ...
- Số 1 **không phải** nguyên tố. Số 2 là nguyên tố **chẵn duy nhất**.

### 💡 Cách kiểm tra bằng vòng lặp

Để kiểm tra $n$ có phải nguyên tố hay không, ta **thử chia** $n$ cho các số từ $2$ đến $\sqrt{n}$:
- Nếu $n$ chia hết cho bất kỳ số nào → **không phải** nguyên tố.
- Nếu không chia hết cho số nào → **là** nguyên tố.

<div class="important-note">
<b>💡 Tại sao chỉ cần kiểm tra đến $\sqrt{n}$?</b> Nếu $n = a \times b$ thì ít nhất một trong hai số $a, b$ phải $\le \sqrt{n}$. Nên nếu không tìm thấy ước nào từ 2 đến $\sqrt{n}$, ta chắc chắn $n$ là nguyên tố. Điều này giúp giảm số lần kiểm tra từ $n$ lần xuống còn $\sqrt{n}$ lần.
</div>

### 💡 Mã giả

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">LaNguyenTo</span>(<span class="var">n</span>):
    <span class="kw">NẾU</span> <span class="var">n</span> < <span class="val">2</span> <span class="kw">THÌ</span> <span class="kw">TRẢ VỀ</span> <span class="val">false</span>
    <span class="kw">CHO</span> <span class="var">i</span> = <span class="val">2</span> đến <span class="fn">sqrt</span>(<span class="var">n</span>):
        <span class="kw">NẾU</span> <span class="var">n</span> chia hết cho <span class="var">i</span> <span class="kw">THÌ</span>:
            <span class="kw">TRẢ VỀ</span> <span class="val">false</span>    <span class="com">// Có ước → không nguyên tố</span>
    <span class="kw">TRẢ VỀ</span> <span class="val">true</span>         <span class="com">// Không có ước → nguyên tố</span>
</pre>

### 📋 Ví dụ chạy tay

Kiểm tra $n = 17$: $\sqrt{17} \approx 4.1$ → thử chia cho 2, 3, 4:
- $17 / 2 = 8$ dư $1$ → không chia hết.
- $17 / 3 = 5$ dư $2$ → không chia hết.
- $17 / 4 = 4$ dư $1$ → không chia hết.
- Kết luận: **17 là nguyên tố** ✓.

Kiểm tra $n = 10$: $\sqrt{10} \approx 3.1$ → thử chia cho 2:
- $10 / 2 = 5$ dư $0$ → **chia hết** → **10 không phải nguyên tố** ✓.

</div>

<!-- ============================================================ -->
<!-- THUẬT TOÁN TỔNG HỢP -->
<!-- ============================================================ -->
<div class="step-card border-orange">
<div class="step-badge bg-orange">Thuật toán tổng hợp</div>

### 💡 Các bước giải

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">LaNguyenTo</span>(<span class="var">n</span>):
    <span class="kw">NẾU</span> <span class="var">n</span> < <span class="val">2</span> <span class="kw">THÌ</span> <span class="kw">TRẢ VỀ</span> <span class="val">false</span>
    <span class="kw">CHO</span> <span class="var">i</span> = <span class="val">2</span> mà <span class="var">i</span> * <span class="var">i</span> <= <span class="var">n</span>:
        <span class="kw">NẾU</span> <span class="var">n</span> % <span class="var">i</span> == <span class="val">0</span> <span class="kw">THÌ</span> <span class="kw">TRẢ VỀ</span> <span class="val">false</span>
    <span class="kw">TRẢ VỀ</span> <span class="val">true</span>

<span class="kw">HÀM</span> <span class="fn">DaQuy</span>(<span class="var">a</span>[], <span class="var">n</span>, <span class="var">queries</span>[]):
    <span class="com">// Bước 1: Đếm tần suất mỗi giá trị</span>
    <span class="var">freq</span> = mảng đếm
    <span class="kw">CHO</span> <span class="var">i</span> = <span class="val">0</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="var">freq</span>[<span class="var">a</span>[<span class="var">i</span>]]++

    <span class="com">// Bước 2: Lọc đá quý (nguyên tố + xuất hiện đúng 1 lần)</span>
    <span class="var">gems</span> = []
    <span class="kw">CHO</span> <span class="var">i</span> = <span class="val">0</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="kw">NẾU</span> <span class="fn">LaNguyenTo</span>(<span class="var">a</span>[<span class="var">i</span>]) <span class="kw">VÀ</span> <span class="var">freq</span>[<span class="var">a</span>[<span class="var">i</span>]] == <span class="val">1</span>:
            thêm <span class="var">a</span>[<span class="var">i</span>] vào <span class="var">gems</span>

    <span class="com">// Bước 3: Sắp xếp giảm dần</span>
    <span class="fn">SapXepGiamDan</span>(<span class="var">gems</span>)

    <span class="com">// Bước 4: Tổng tiền tố để trả lời truy vấn nhanh</span>
    <span class="var">S</span>[<span class="val">0</span>] = <span class="val">0</span>
    <span class="kw">CHO</span> <span class="var">i</span> = <span class="val">1</span> đến <span class="fn">Len</span>(<span class="var">gems</span>):
        <span class="var">S</span>[<span class="var">i</span>] = <span class="var">S</span>[<span class="var">i</span>-<span class="val">1</span>] + <span class="var">gems</span>[<span class="var">i</span>]

    <span class="com">// Bước 5: Trả lời truy vấn</span>
    <span class="kw">CHO</span> mỗi truy vấn (<span class="var">L</span>, <span class="var">R</span>):
        <span class="var">R</span> = <span class="fn">Min</span>(<span class="var">R</span>, <span class="fn">Len</span>(<span class="var">gems</span>))
        <span class="kw">NẾU</span> <span class="var">L</span> > <span class="fn">Len</span>(<span class="var">gems</span>) <span class="kw">THÌ</span> Xuất <span class="val">0</span>
        <span class="kw">NGƯỢC LẠI</span> Xuất <span class="var">S</span>[<span class="var">R</span>] - <span class="var">S</span>[<span class="var">L</span>-<span class="val">1</span>]
</pre>

**Độ phức tạp:**
- Kiểm tra nguyên tố mỗi số: $O(\sqrt{A_i})$
- Tổng: $O(N \times \sqrt{A_{max}} + M \log M + Q)$

</div>
