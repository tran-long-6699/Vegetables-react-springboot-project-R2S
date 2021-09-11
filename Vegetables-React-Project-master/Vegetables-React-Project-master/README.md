

# Vegetables Project
## STACK 
[![MIT License](https://img.shields.io/badge/Java-8-blue)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![MIT License](https://img.shields.io/badge/React-%20-pink)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![MIT License](https://img.shields.io/badge/MySQL-8.0-yellow)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![MIT License](https://img.shields.io/badge/Swagger-2.9.2-yellowgreen)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

## File structure
```bash
longtpc01189_Mini_Project/
 │
 ├── src/main/java/
 │   └── long_mini
 │       │   └── Longtpc01189MiniProjectApplication.java
 │       │
 │       ├── Config
 |       |   └──SecurityConfig.java
 │       │
 │       ├── DAO
 │       │   ├── AuthoritiesDAO.java
 │       │   └── CategoryDAO.java
 │       │   └── OrderdetailDAO.java
 │       │   └── OrdersDAO.java
 │       │   └── ProviderDAO.java
 │       │   └── RolesDAO.java
 │       │   └── UsersDAO.java
 │       │
 │       ├── DTO
 │       │   ├── DetailDTO.java
 │       │   └── JWTResponse.java
 │       │   └── LoginRequest.java
 │       │   └── OrderRequest.java
 │       │
 │       ├── Entity
 │       │   ├── Authorities.java
 │       │   └── Category.java
 │       │   └── Orderdetail.java
 │       │   └── Orders.java
 │       │   ├── Product.java
 │       │   └── Provider.java
 │       │   └── Roles.java
 │       │   └── Users.java
 |       |
 │       ├── RestController
 │       │   ├── AuthAPIController.java
 │       │   └── AuthoritiesAPIController.java
 │       │   ├── CheckoutAPIController.java
 │       │   └── ProviderAPIController.java
 │       │   ├── ShopAPIController.java
 │       │   └── UsersAPIController.java
 │       │
 │       ├── Security
 │       │   └── UserDetail.java
 │       │   └── UserDetailService.java
 │       │
 │       ├── Service
 │       │   ├── AuthoritiesService.java
 │       │   └── CategoryService.java
 │       │   └── OrderdetailService.java
 │       │   └── OrdersService.java
 │       │   ├── ProductService.java
 │       │   └── ProviderService.java
 │       │   └── RolesService.java
 │       │   └── UsersService.java
 │       │
 │       ├── ServiceImp
 │       │   ├── AuthoritiesServiceImp.java
 │       │   └── CategoryServiceImp.java
 │       │   └── OrderdetailServiceImp.java
 │       │   └── OrdersServiceImp.java
 │       │   ├── ProductServiceImp.java
 │       │   └── ProviderServiceImp.java
 │       │   └── RolesServiceImp.java
 │       │   └── UsersServiceImp.java
 │       │
 │       └── Utils
 │       │   ├── JwtAuthenticationFilter.java
 │       │   └── JwtAuthenticationTokenFilter.java
 │
 ├── src/main/resources/
 │   └── application.properties
 │
 ├── src/main/webapp/
 │   └── mini-store
 │       │   ├── node_modules
 │       │   └── public
 │       │      ├── build
 │       │      └── css
 │       │      └── fonts
 │       │      └── images
 │       │      ├── js
 │       │      └── scss
 │       │      └── index.html
 │       │   ├── src
 │       │      ├── action
 │       │      └── component
 │       │      └── const
 │       │      └── images
 │       │      ├── libs
 │       │      └── redux
 │       │      └── service
 │       │      └── App.js
 │       │      └── index.js
 │       │   └── package.json
 │       │   ├── package-lock.json
 │       │   └── README.md
 ├── Mini_Store.sql
 └── pom.xml
```
## GIỚI THIỆU
Vegetables là một dự án rau củ, được viết bằng Spring Boot và React, với mong muốn có thể phát triển thành dự án lớn hơn trong tương lai.

Lý do chọn Spring Boot và React là vì Spring Boot có đầy đủ tính năng của Spring Framework, cấu hình đơn giản. Còn React đơn giản hóa code Javascript, có thể thêm HTML vào hàm render mà không cần phải nối chuỗi.

 Một số tính năng sẽ phát triển trong tương lai: 
* Phát triển dự án thành website bán nhu yếu phẩm. 
* Tích hợp API vận chuyển giao hàng nhanh vào dự án.
* Tối ưu hóa code hơn để phù hợp cho việc đi làm sau này.


## HƯỚNG DẪN SỬ DỤNG
### RUN
Clone the project
```bash
  git clone https://github.com/tran-long-6699/Vegetables__Project_R2S.git
```

Go to the project directory
```bash
  cd longtpc01189_Mini_Project
```

Install dependencies
```bash
  mvn install
```

Run the project
```bash
  mvn spring-boot:run
```

Start the server
```bash
  npm start
```
### Document API
```bash
http://localhost:8080/swagger-ui.html
Bạn có thể thay đổi cổng 8080 trong file application.properties
```

## Kết
Bài viết trên tổng hợp lại những thông tin liên quan đến dự án. Chắc chắn bài viết trên còn nhiều thiếu sót, mong các bạn góp ý để tôi có thể hoàn thiện thêm.

Thông tin liên lạc của tôi:
* Email: longtpc01189@fpt.edu.vn hoặc daiduong1871999@gmail.com
* Số điện thoại: 0702362681
Xin chân thành cám ơn!.