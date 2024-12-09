# Extension inject Css to website

## I. [Introduction](#introduction)
- Extension theo dõi thay đổi các file css và inject vào trang web thông qua Extension của Chrome. Sử dụng NodeJs để tạo server và Websocket để giao tiếp giữa Extension và Server mỗi khi có thay đổi file css.
## II. [Installation](#installation)
- Cài đặt NodeJS.
- Cài đặt Less hoặc Sass tùy theo nhu cầu sử dụng.
- Bật chế độ Dev mode trên [Chrome Extensions](chrome://extensions/) và chọn `Load unpacked` sau đó chọn thư mục `extension` trong project.

## III. [Usage](#usage)
- Mở server bằng cách chạy lệnh `npm run start` trong thư mục project. Có thể thay đổi cổng nếu cần thiết.
- Cài đặt tự động build Less hoặc Sass:
#### LESS
```command
less-watch-compiler
```
#### SASS
```command
sass --watch assets/style:assets/build
```
- Nhấp vào icon của Extension trên Chrome và nhập PORT của Websocket nếu thay đổi và địa chỉ trang web cần inject css.
- Load lại trang web để xem kết quả.