📚 Tài liệu miễn phí - Nền Tảng Chia Sẻ Tài Liệu Học Tập Xuyên Suốt
Tài liệu miễn phí là một ứng dụng web hiện đại nhằm số hóa và hệ thống hóa kho tàng tài liệu học tập. Dự án tập trung hỗ trợ học sinh THPT ôn thi cuối cấp/đại học, đồng thời mở rộng lộ trình sang các kiến thức chuyên sâu dành cho sinh viên (Đại cương, CNTT, Kinh tế...).

🚀 Tính Năng Chính
1. Dành cho Học sinh THPT
Kho đề thi thử: Tổng hợp đề thi THPT Quốc gia, đề kiểm tra học kỳ từ các trường chuyên trên cả nước.

Lộ trình ôn thi: Phân loại tài liệu theo từng chương (Toán, Lý, Hóa, Anh...) sát với chương trình của Bộ Giáo dục.

Góc giải đáp: Hệ thống bình luận và thảo luận dưới mỗi tài liệu.

2. Dành cho Sinh viên (Mở rộng)
Giáo trình Đại cương: Các môn "ám ảnh" như Triết học, Giải tích, Đại số tuyến tính.

Chuyên ngành CNTT: Tài liệu về cấu trúc dữ liệu, giải thuật, hướng dẫn cài đặt môi trường (Linux/Windows).

Kinh nghiệm thực tập: Chia sẻ CV mẫu và tài liệu kỹ năng mềm.

3. Tính năng Hệ thống
Quản lý phân quyền (RBAC): Admin duyệt tài liệu, Moderator quản lý nội dung, User tải/đóng góp tài liệu.

Tìm kiếm thông minh: Lọc theo khối lớp, môn học, hoặc từ khóa.

Giao diện tùy biến: Hỗ trợ Dark/Light mode, tối ưu hóa cho cả desktop và thiết bị di động.

🛠 Công Nghệ Sử Dụng
Frontend: HTML5, CSS3, JavaScript (hoặc React/Next.js).

Backend: Node.js, Express.

Database: MySQL hoặc PostgreSQL (Sử dụng Prisma ORM).

Templating Engine: EJS (cho các trang render phía máy chủ).

Storage: Cloudinary hoặc Firebase Storage để lưu trữ file PDF/Hình ảnh.

📂 Cấu Trúc Thư Mục Dự Kiến
Plaintext
├── src/
│   ├── controllers/    # Xử lý logic nghiệp vụ
│   ├── models/         # Định nghĩa schema cơ sở dữ liệu (Prisma)
│   ├── routes/         # Định nghĩa các đường dẫn API/Trang
│   ├── views/          # Giao diện (EJS files)
│   └── public/         # CSS, JS client-side, images
├── prisma/             # Cấu hình database và migrations
├── .env                # Biến môi trường (DB_URL, PORT...)
└── server.js           # Điểm khởi chạy ứng dụng
📝 Cài Đặt và Khởi Chạy
Clone dự án:

Bash
git clone https://github.com/username/eduhub.git
cd eduhub
Cài đặt dependencies:

Bash
npm install
Cấu hình môi trường:
Tạo file .env và thêm thông tin kết nối database của bạn.

Chạy Migration (nếu dùng Prisma):

Bash
npx prisma migrate dev
Khởi động server:

Bash
npm run dev
🤝 Đóng Góp
Mọi đóng góp (Pull Request) đều được trân trọng. Nếu bạn phát hiện lỗi hoặc muốn đề xuất tính năng mới, vui lòng mở Issue.
