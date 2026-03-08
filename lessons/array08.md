## 🔒 Bài 8: Chèn cố định (Chèn và Sắp xếp)
<br>
<div class="step-card border-blue">
<div class="step-badge bg-blue">Đề bài</div>

Cho mảng $A$ có $N$ phần tử. 

**Yêu cầu:** 
- Sắp xếp mảng $A$ giảm dần
- Sau đó chèn một giá trị $X$ vào mảng sao cho sau khi chèn, mảng vẫn đảm bảo tính chất **giảm dần**.

### Input
Từ file **ARRAY08.INP** gồm
- Dòng đầu chứa số $N$ ($N \le 10^5$).
- Dòng thứ hai chứa $N$ phần tử của mảng.
- Dòng thứ ba chứa giá trị $X$ cần chèn.

### Ràng buộc
- ($0 < N \le 10^6$)
- ($|A_i|\le 10^9$)

### Output
Ghi ra file **ARRAY08.OUT** mảng sau khi chèn và được sắp xếp giảm dần.

### Sample Input 
```
5
1 2 3 4 5
3
```

### Sample Output 
```
5 4 3 3 2 1
```

### Giải thích

### Subtask
- 50% số test có $N \le 1000$
- 50% số test còn lại không có điều kiện gì thêm
</div>

<div class="step-card border-yellow">
<div class="step-badge bg-yellow">Tư duy đột phá: Chèn trước - Sắp xếp sau</div>

Thông thường, học sinh sẽ tư duy theo cách: ***Tìm vị trí thích hợp $\rightarrow$ Dồn hàng $\rightarrow$ Chèn***. Tuy nhiên, chúng ta có một cách tiếp cận tối ưu hơn về mặt lập trình:

1.  **Chèn vào cuối:** Ta coi vị trí chèn là $N$ (vị trí cuối cùng). Đây là thao tác tốn $O(1)$.
2.  **Sắp xếp lại:** Sử dụng hàm `sort` có sẵn của thư viện để đưa mảng về trạng thái giảm dần.

**Tại sao nên làm cách này?**
- **Tốc độ:** Hàm `sort` của C++ (Introsort) cực kỳ mạnh mẽ với độ phức tạp $O(N \log N)$.
- **Độ chính xác:** Tránh được các lỗi sai sót khi tính toán chỉ số (index) trong quá trình dồn hàng thủ công.
- **Áp dụng:** Rất tốt khi đề bài yêu cầu mảng sau cùng phải có thứ tự nhất định.

</div>

<div class="step-card border-green">
<div class="step-badge bg-green">Mã giả thuật toán</div>

<pre class="pseudocode">
<span class="kw">HÀM</span> <span class="fn">ChenCoDinh</span>(<span class="var">A</span>[], <span class="var">n</span>, <span class="var">X</span>):
    // Bước 1: Chèn X vào ngay cuối mảng
    <span class="var">A</span>[<span class="var">n</span>] = <span class="var">X</span>
    
    // Bước 2: Tăng số lượng phần tử
    <span class="var">n</span> = <span class="var">n</span> + 1
    
    // Bước 3: Sắp xếp lại toàn bộ mảng giảm dần
    <span class="fn">Sắp_Xếp_Giảm_Dần</span>(<span class="var">A</span>, <span class="var">n</span>)
    
    // Bước 4: Xuất mảng kết quả
    <span class="fn">XuatMang</span>(<span class="var">A</span>, <span class="var">n</span>)
</pre>
</div>