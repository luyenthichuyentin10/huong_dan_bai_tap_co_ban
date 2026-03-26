## 🏗️ Bài 1: Quy hoạch
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Trên một dãy phố có $N$ tòa nhà. Tòa nhà đầu tiên có số thứ tự là $0$. Tòa nhà thứ $i$ có độ cao là $h_i$. Nhà nước quy định độ cao tối đa của các tòa nhà trong khu phố là $H$.

**Yêu cầu:** Cho biết có bao nhiêu tòa nhà xây dựng **quá độ cao** cho phép và vị trí của các tòa nhà đó.

### Input
Từ file **BAI1.INP** gồm:
- Dòng đầu chứa hai số nguyên dương $N$, $H$ ($0 \le N \le 10^6$, $1 \le H \le 10^9$).
- Dòng tiếp theo chứa $N$ số $h_i$ ($1 \le h_i \le 10^6$) là độ cao tòa nhà thứ $i$.

### Output
Ghi ra file **BAI1.OUT**:
- Dòng đầu là số lượng tòa nhà xây dựng cao hơn quy hoạch.
- Dòng tiếp theo ghi vị trí các tòa nhà đó, mỗi vị trí cách nhau khoảng trắng.

### Sample Input
```
7 5
4 7 2 9 8 2 6
```

### Sample Output
```
4
1 3 4 6
```

### Giải thích
Có 4 tòa nhà có độ cao lớn hơn $H = 5$: tòa nhà ở vị trí 1 (cao 7), vị trí 3 (cao 9), vị trí 4 (cao 8) và vị trí 6 (cao 6).

### Subtask
- **40%:** $N \le 10^2$, $h_i, H \le 10^5$
- **30%:** $N \le 10^4$
- **30%:** Không có ràng buộc thêm ($N \le 10^6$)
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích đề bài</div>

### 🔍 1. Các thông tin trọng tâm
* Bài toán đơn giản: **duyệt mảng**, kiểm tra điều kiện $h_i > H$.
* Lưu ý: vị trí tòa nhà **bắt đầu từ 0**.
* Cần xuất cả **số lượng** lẫn **danh sách vị trí**.

### 📋 2. Giải thích Ví dụ

| Vị trí | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| Độ cao $h_i$ | 4 | **7** | 2 | **9** | **8** | 2 | **6** |
| So với $H=5$ | ≤ | **>** | ≤ | **>** | **>** | ≤ | **>** |

Các vị trí vi phạm: 1, 3, 4, 6 → Tổng cộng 4 tòa nhà.

</div>

<div class="step-card border-orange">
<div class="step-badge bg-orange">Thuật toán</div>

### 💡 Ý tưởng
Duyệt mảng một lần, kiểm tra $h_i > H$, đếm và lưu vị trí.

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">QuyHoach</span>(<span class="var">h</span>[], <span class="var">n</span>, <span class="var">H</span>):
    <span class="var">dem</span> = <span class="val">0</span>, <span class="var">dsViTri</span> = []
    <span class="kw">CHO</span> <span class="var">i</span> = <span class="val">0</span> đến <span class="var">n</span> - <span class="val">1</span>:
        <span class="kw">NẾU</span> <span class="var">h</span>[<span class="var">i</span>] > <span class="var">H</span> <span class="kw">THÌ</span>:
            <span class="var">dem</span> = <span class="var">dem</span> + <span class="val">1</span>
            thêm <span class="var">i</span> vào <span class="var">dsViTri</span>
    Xuất <span class="var">dem</span>
    Xuất <span class="var">dsViTri</span>
</pre>

**Độ phức tạp:** $O(n)$ thời gian, $O(n)$ bộ nhớ.

</div>
