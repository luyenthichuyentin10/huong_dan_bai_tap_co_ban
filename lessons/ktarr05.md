## 🚛 Bài 5: Đăng kiểm
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Trên một danh sách có $N$ xe tải. Xe tải đầu tiên có số thứ tự là $0$. Xe tải thứ $i$ có cân nặng là $h_i$. Nhà nước quy định cân nặng tối đa của các xe tải trong khu phố là $H$.

**Yêu cầu:** Cho biết có bao nhiêu xe tải xây dựng **quá cân nặng** cho phép và vị trí của các xe tải đó.

### Input
Từ file **BAI1.INP** gồm:
- Dòng đầu chứa hai số nguyên dương $N$, $H$ ($0 \le N \le 10^6$, $1 \le H \le 10^9$).
- Dòng tiếp theo chứa $N$ số $h_i$ ($1 \le h_i \le 10^6$) là cân nặng xe tải thứ $i$.

### Output
Ghi ra file **BAI1.OUT**:
- Dòng đầu là số lượng xe tải xây dựng vượt ngưỡng khuyến cáo.
- Dòng tiếp theo ghi vị trí các xe tải đó, mỗi vị trí cách nhau khoảng trắng.

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
Có 4 xe tải có cân nặng lớn hơn $H = 5$: xe tải ở vị trí 1 (cao 7), vị trí 3 (cao 9), vị trí 4 (cao 8) và vị trí 6 (cao 6).

### Subtask
- **40%:** $N \le 10^2$, $h_i, H \le 10^5$
- **30%:** $N \le 10^4$
- **30%:** Không có ràng buộc thêm ($N \le 10^6$)
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Phân tích đề bài</div>

### 🔍 1. Các thông tin trọng tâm
* Bài toán đơn giản: **duyệt mảng**, kiểm tra điều kiện $h_i > H$.
* Lưu ý: vị trí xe tải **bắt đầu từ 0**.
* Cần xuất cả **số lượng** lẫn **danh sách vị trí**.

### 📋 2. Giải thích Ví dụ

| Vị trí | 0 | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|---|
| Cân nặng $h_i$ | 4 | **7** | 2 | **9** | **8** | 2 | **6** |
| So với $H=5$ | ≤ | **>** | ≤ | **>** | **>** | ≤ | **>** |

Các vị trí vượt ngưỡng: 1, 3, 4, 6 → Tổng cộng 4 xe tải.

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
