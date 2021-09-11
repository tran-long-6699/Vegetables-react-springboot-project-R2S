CREATE DATABASE `MiniStore` CHARACTER SET utf8 COLLATE utf8_general_ci;
USE MiniStore;
/*Pass 12345
	CREATE TABLE Users(
		username NVARCHAR(50) NOT NULL,
		password NVARCHAR(250)  NULL,
		fullname NVARCHAR(50) NOT NULL,
		gender bit not null,
		activated BIT NOT NULL,
		verifycode NVARCHAR(64)  NULL,	
		image nvarchar(255) null,
		authprovider varchar(15) null,
		createdate date not null,
		PRIMARY KEY(username)
	);
	
	CREATE TABLE Roles(
	roleid NVARCHAR(10) NOT NULL PRIMARY KEY,
	rolename NVARCHAR(50) NOT NULL
	);
	
	CREATE TABLE Authorities(
	id INT AUTO_INCREMENT PRIMARY KEY,
	username NVARCHAR(50) NOT NULL,
	roleid NVARCHAR(10) NOT NULL,
	FOREIGN KEY(username) REFERENCES Users(username) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(roleid) REFERENCES Roles(roleid) ON UPDATE CASCADE ON DELETE CASCADE
	);
	
	
	CREATE Table Provider(
	providerid nvarchar(15) not null,
	providername nvarchar(150) not null,
	phone nvarchar(15) not null,
	address nvarchar(500) not null,
	PRIMARY KEY(providerid)
	);
	
	
	CREATE TABLE Category(
	catid int AUTO_INCREMENT not null,
	catname nvarchar(50) not null,
	image nvarchar(255) not null,
	description nvarchar(500) not null,
	PRIMARY KEY(catid)
	);
	
	CREATE TABLE Product(
	productid nvarchar(15) not null,
	productname nvarchar(50) not null,
	categoryid int not null,
	description nvarchar(500) null,
	image nvarchar(255) null,
	priceaverage int not null,
	sales int not null,
	providerid nvarchar(15) not null,
	PRIMARY KEY(productid),
	FOREIGN KEY(categoryid) REFERENCES Category(catid) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY(providerid) REFERENCES Provider(providerid) ON UPDATE CASCADE ON DELETE CASCADE
	);
	
	
	CREATE TABLE Orders(
	id int AUTO_INCREMENT,
	email nvarchar(50) not null,
	fullname nvarchar(50) not null,
	invoicedate date not null,
	subtotal int not null,
	total float not null,
	phone nvarchar(10) not null,
	address nvarchar(500) not null,
	modeofpayment nvarchar(20) not null,
	PRIMARY KEY(id),
	FOREIGN KEY(email) REFERENCES Users(username) ON UPDATE CASCADE ON DELETE CASCADE
	);
	
	CREATE TABLE Orderdetail(
	detailid int AUTO_INCREMENT,
	orderid int not null,
	pdid nvarchar(15) not null,
	quantity int not null,
	price float not null,
	PRIMARY KEY(detailid),
	FOREIGN KEY(orderid) REFERENCES Orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY(pdid) REFERENCES Product(productid) ON UPDATE CASCADE ON DELETE CASCADE
	);
	
	-- INSERT INTO INFORMATION

	INSERT INTO Users
	VALUES		(N'daiduong1871999@gmail.com',   N'$2a$10$jhrK.1Tbpcqjpy.QMthl9unJicHEsCGU8i1XrzjDzQvfk15XbprEu', N'Trần Long',1,1,'','daiduong.jpg','','2021-07-22'),
				(N'minhtainguyen@gmail.com',   N'$2a$10$jhrK.1Tbpcqjpy.QMthl9unJicHEsCGU8i1XrzjDzQvfk15XbprEu',N'Nguyễn Minh Tại',1,1,'','','','2021-07-22'),
				(N'ngocyennguyen@gmail.com',   N'$2a$10$jhrK.1Tbpcqjpy.QMthl9unJicHEsCGU8i1XrzjDzQvfk15XbprEu', N'Nguyễn Thị Yến Ngọc',0,1,'','','','2021-07-22'),
				(N'phuongquyennguyen@gmail.com',   N'$2a$10$jhrK.1Tbpcqjpy.QMthl9unJicHEsCGU8i1XrzjDzQvfk15XbprEu',N'Nguyễn Phương Quyên',0,1,'','','','2021-07-22'),
				(N'tuyetnhinguyen@gmail.com',   N'$2a$10$jhrK.1Tbpcqjpy.QMthl9unJicHEsCGU8i1XrzjDzQvfk15XbprEu',N'Nguyễn Thị Tuyết Nhi',0,1,'','','','2021-07-22'),
				(N'trongsangnguyen@gmail.com',   N'$2a$10$jhrK.1Tbpcqjpy.QMthl9unJicHEsCGU8i1XrzjDzQvfk15XbprEu',N'Nguyễn Trọng Sang',1,1,'','','','2021-07-22'),
				(N'longtpc01189@fpt.edu.vn',   N'$2a$10$jhrK.1Tbpcqjpy.QMthl9unJicHEsCGU8i1XrzjDzQvfk15XbprEu', N'Trần Long',1,1,'','daiduong.jpg','','2021-07-22');
	
	INSERT INTO Roles
	VALUES		(N'ROLE_USER',   N'NGƯỜI DÙNG'),
				(N'ROLE_PM',   N'PHẦN MỀM' ),
				(N'ROLE_ADMIN',   N'QUẢN TRỊ' );
	
	INSERT INTO Authorities
	VALUES		(null,N'daiduong1871999@gmail.com', N'ROLE_ADMIN'),  
				(null,N'daiduong1871999@gmail.com', N'ROLE_USER'),

				(null,N'minhtainguyen@gmail.com', N'ROLE_USER'),  
				(null,N'ngocyennguyen@gmail.com', N'ROLE_USER'),

				(null,N'phuongquyennguyen@gmail.com', N'ROLE_USER'),  
				(null,N'phuongquyennguyen@gmail.com', N'ROLE_USER'),

				(null,N'tuyetnhinguyen@gmail.com', N'ROLE_PM'),  

				(null,N'trongsangnguyen@gmail.com', N'ROLE_USER'),

				(null,N'longtpc01189@fpt.edu.vn', N'ROLE_ADMIN'),  
				(null,N'longtpc01189@fpt.edu.vn', N'ROLE_USER');
	

	INSERT INTO Category
	VALUES				(null,'Vegetables','category-1.jpg',N'Là nguồn thực phẩm chứa rất nhiều chất dinh dưỡng có lợi cho sức khỏe chúng ta.Từ rau, ta có thể chế biến thành rất nhiều món ăn khác nhau như: làm salad, nấu canh, món xào, làm nước sốt từ rau củ, nước ép sinh tố hoặc có thể dùng kèm với sandwiche…'),
						(null,'Fruits','category-2.jpg',N'Bổ sung trái cây vào chế độ ăn uống hàng ngày sẽ đem lại những lợi ích sức khỏe tuyệt vời. Trái cây là chất xơ phong phú và nó có lượng calo thấp nên nó cũng đặc biệt có lợi cho những người muốn giảm cân mà vẫn tràn đầy năng lượng.'),
						(null,'Juice','category-3.jpg',N'Không chỉ có hương vị thơm ngon, màu sắc hấp dẫn, nước ép trái cây còn có nhiều Vitamin thiết yếu tốt cho cơ thể. Xu hướng về nước ép là chủ đề luôn được nhiều người quan tâm, đều đặn uống nước ép hàng ngày, bạn sẽ có sức đề kháng tốt, làn da khỏe manh, vóc dáng thon gọn.'),
						(null,'Dried','category-4.jpg',N'Trái cây sấy khô có hàm lượng cao các chất dinh dưỡng. Một miếng trái cây khô chứa lượng chất dinh dưỡng tương đương với trái cây tươi, nhưng cô đặc trong một gói kích thước nhỏ. Tính theo trọng lượng, trái cây sấy khô chứa tới 3,5 lần chất xơ, vitamin và khoáng chất so với trái cây tươi. Do đó, một khẩu phần có thể cung cấp tỷ lệ lớn lượng tiêu thụ hàng ngày của nhiều loại vitamin và khoáng chất, chẳng hạn như folate.');
	
	INSERT INTO Provider
	VALUES				('Com1',N'Công Ty TNHH Một Thành Viên Rau Củ Quả Thanh Hà','0903339947',N'Kiốt Số 2, Chợ Hàng Bông Phú Hòa, P. Phú Hòa, Tp. Thủ Dầu Một, Bình Dương'),
						('Com2',N'Nông Sản Sao Khuê - Công Ty TNHH Thương Mại Xuất Nhập Khẩu Sao Khuê','0908261003',N'Số 135/17/63 Đường Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh, Tp. Hồ Chí Minh'),
						('Com3',N'Công ty TNHH MTV Nam Huy Đồng Tháp','0292312345',N'180, ấp Hòa Bình, xã Hoà Tân, H. Châu Thành, Đồng Tháp'),
						('Com4',N'CÔNG TY CỔ PHẦN THỰC PHẨM VÀ NƯỚC GIẢI KHÁT DONA NEWTOWER','0903974560',N'92 Nguyễn Hữu Cảnh, Khu Biệt Thự Saigon Peal, Nhà số 28, Đ. D7, P. 22, Q. Bình Thạnh, Tp. Hồ Chí Minh');
	
	
	INSERT INTO Product
	VALUES				('Veg01',N'Ớt Chuông',1,'','product-1.jpg',61000,0,'Com1'),
						('Veg02',N'Táo',2,'','product-10.jpg',75000,0,'Com2'),
						('Veg03',N'Nước Ép Táo',3,'','product-8.jpg',42000,0,'Com3'),
						('Veg04',N'Táo Sấy Khô',4,'','product-13.jpeg',90000,0,'Com4'),

						('Veg05',N'Đậu Xanh',1,'','product-3.jpg',20000,0,'Com1'),
						('Veg06',N'Dâu',2,'','product-2.jpg',80000,0,'Com2'),
						('Veg07',N'Nước Ép Dâu',3,'','product-8.jpg',160000,0,'Com3'),
						('Veg08',N'Dâu Sấy Khô',4,'','product-14.jpg',1200000,0,'Com4'),
						
						('Veg09',N'Brocolli',1,'','product-6.jpg',62000,0,'Com1'),
						('Veg10',N'Cà Rốt',2,'','product-7.jpg',17000,0,'Com2'),
						('Veg11',N'Nước Ép Cà Rốt',3,'','product-8.jpg',42000,0,'Com3'),
						('Veg12',N'Ổi Sấy Khô',4,'','product-15.jpg',260000,0,'Com4');
	

	INSERT INTO Orders 
VALUES					(null,'daiduong1871999@gmail.com',N'Trần Long' ,'2021-01-24', 610000, 610000, '0331239729', N'Cà Mau', 'COD'),
						(null,'daiduong1871999@gmail.com',N'Trần Long', '2021-02-08', 750000, 750000, '0331239729', N'Cà Mau', 'COD'),
						(null,'daiduong1871999@gmail.com',N'Trần Long', '2021-03-13', 420000, 420000, '0331239729', N'Cà Mau', 'COD'),
						(null,'daiduong1871999@gmail.com',N'Trần Long', '2021-04-12', 900000, 900000, '0331239729', N'Cà Mau', 'COD'),
						(null,'daiduong1871999@gmail.com',N'Trần Long', '2021-05-16', 200000, 200000, '0331239729', N'Cà Mau', 'COD'),
						(null,'daiduong1871999@gmail.com',N'Trần Long', '2021-06-25', 800000, 800000, '0331239729', N'Cà Mau', 'COD'),
						(null,'daiduong1871999@gmail.com',N'Trần Long', '2021-07-03', 1600000, 1600000, '0331239729', N'Cà Mau', 'COD'),

						(null,'minhtainguyen@gmail.com',N'Nguyễn Minh Tại', '2021-01-22', 12000000, 12000000, '0709879876', N'Cần Thơ', 'ATM'),
						(null,'minhtainguyen@gmail.com',N'Nguyễn Minh Tại', '2021-02-01', 620000, 620000, '0709879876', N'Cần Thơ', 'ATM'),
						(null,'minhtainguyen@gmail.com',N'Nguyễn Minh Tại', '2021-03-07', 170000, 170000, '0709879876', N'Cần Thơ', 'ATM'),
						(null,'minhtainguyen@gmail.com',N'Nguyễn Minh Tại', '2021-04-18', 420000, 420000, '0709879876', N'Cần Thơ', 'ATM'),
						(null,'minhtainguyen@gmail.com',N'Nguyễn Minh Tại', '2021-05-17', 2600000, 2600000, '0709879876', N'Cần Thơ', 'ATM'),
						(null,'minhtainguyen@gmail.com',N'Nguyễn Minh Tại', '2021-06-12', 420000, 420000, '0709879876', N'Cần Thơ', 'ATM'),
						(null,'minhtainguyen@gmail.com',N'Nguyễn Minh Tại', '2021-07-02', 170000, 170000, '0709879876', N'Cần Thơ', 'ATM'),

						(null,'phuongquyennguyen@gmail.com',N'Nguyễn Phương Quyên', '2021-01-17', 610000, 610000, '0356578965', N'Sóc Trăng', 'COD'),
						(null,'phuongquyennguyen@gmail.com',N'Nguyễn Phương Quyên', '2021-02-10', 420000, 420000, '0356578965', N'Sóc Trăng', 'COD'),
						(null,'phuongquyennguyen@gmail.com',N'Nguyễn Phương Quyên', '2021-03-11', 200000, 200000, '0356578965', N'Sóc Trăng', 'COD'),
						(null,'phuongquyennguyen@gmail.com',N'Nguyễn Phương Quyên', '2021-04-22', 1600000, 1600000, '0356578965', N'Sóc Trăng', 'COD'),
						(null,'phuongquyennguyen@gmail.com',N'Nguyễn Phương Quyên', '2021-05-09', 620000, 620000, '0356578965', N'Sóc Trăng', 'COD'),
						(null,'phuongquyennguyen@gmail.com',N'Nguyễn Phương Quyên', '2021-06-27', 420000, 420000, '0356578965', N'Sóc Trăng', 'COD'),
						(null,'phuongquyennguyen@gmail.com',N'Nguyễn Phương Quyên', '2021-07-11', 750000, 750000, '0356578965', N'Sóc Trăng', 'COD'),

						(null,'trongsangnguyen@gmail.com',N'Nguyễn Trọng Sang','2021-01-27', 750000, 750000, '0701232323', N'Trà Vinh', 'COD'),
						(null,'trongsangnguyen@gmail.com',N'Nguyễn Trọng Sang', '2021-02-04', 900000, 900000, '0701232323', N'Trà Vinh', 'COD'),
						(null,'trongsangnguyen@gmail.com',N'Nguyễn Trọng Sang', '2021-03-15', 800000, 800000, '0701232323', N'Trà Vinh', 'COD'),
						(null,'trongsangnguyen@gmail.com',N'Nguyễn Trọng Sang', '2021-04-28', 12000000, 12000000, '0701232323', N'Trà Vinh', 'COD'),
						(null,'trongsangnguyen@gmail.com',N'Nguyễn Trọng Sang', '2021-05-22', 170000, 170000, '0701232323', N'Trà Vinh', 'COD'),
						(null,'trongsangnguyen@gmail.com',N'Nguyễn Trọng Sang', '2021-06-19', 2600000, 2600000, '0701232323', N'Trà Vinh', 'COD'),
						(null,'trongsangnguyen@gmail.com',N'Nguyễn Trọng Sang', '2021-07-04', 610000, 610000, '0701232323', N'Trà Vinh', 'COD'),

						(null,'longtpc01189@fpt.edu.vn',N'Bạch Hoàng Long', '2021-01-08', 420000, 420000, '0321231231', N'An Giang', 'ATM'),
						(null,'longtpc01189@fpt.edu.vn',N'Bạch Hoàng Long', '2021-02-28', 800000, 800000, '0321231231', N'An Giang', 'ATM'),
						(null,'longtpc01189@fpt.edu.vn',N'Bạch Hoàng Long', '2021-03-24', 170000, 170000, '0321231231', N'An Giang', 'ATM'),
						(null,'longtpc01189@fpt.edu.vn',N'Bạch Hoàng Long', '2021-04-01', 420000, 420000, '0321231231', N'An Giang', 'ATM'),
						(null,'longtpc01189@fpt.edu.vn',N'Bạch Hoàng Long', '2021-05-15', 1600000, 1600000, '0321231231', N'An Giang', 'ATM'),
						(null,'longtpc01189@fpt.edu.vn',N'Bạch Hoàng Long', '2021-06-16', 900000, 900000, '0321231231', N'An Giang', 'ATM'),
						(null,'longtpc01189@fpt.edu.vn',N'Bạch Hoàng Long', '2021-07-01', 750000, 750000, '0321231231', N'An Giang', 'ATM');


	INSERT INTO Orderdetail
VALUES					(null,1, 'Veg01',10,	57000),
						(null,2, 'Veg02',10,	72000),
						(null,3, 'Veg03',10,	39000),
						(null,4, 'Veg04',10,90000), 
						(null,5, 'Veg05',10,	16000),
						(null,6, 'Veg06',10,	80000),
						(null,7, 'Veg07',10,	156000),

						(null,8, 'Veg08',10,	1100000),
						(null,9, 'Veg09',10, 59000),
						(null,10, 'Veg10',10,15000),
						(null,11, 'Veg11',10,38000),
						(null,12, 'Veg12',10,260000),
						(null,13, 'Veg11',10,38000),
						(null,14, 'Veg10',10,17000),

						(null,15, 'Veg01',10,57000),
						(null,16, 'Veg03',10,40000),
						(null,17, 'Veg05',10,16000),
						(null,18, 'Veg07',10, 160000),
						(null,19,'Veg09',10, 58000),
						(null,20, 'Veg11',10, 37000),
						(null,21, 'Veg02',10, 75000),

						(null,22, 'Veg02',10,71000),
						(null,23, 'Veg04',10,88000),
						(null,24, 'Veg06',10,76000),
						(null,25, 'Veg08',10, 1250000),
						(null,26, 'Veg10',10, 16000),
						(null,27, 'Veg12',10, 230000),
						(null,28, 'Veg01',10, 61000),

						(null,29, 'Veg03',10,40000),
						(null,30, 'Veg06',10,77000),
						(null,31, 'Veg10',10,16000),
						(null,32, 'Veg11',10, 37000),
						(null,33, 'Veg07',10, 156000),
						(null,34, 'Veg04',10, 90000),
						(null,35, 'Veg02',10, 71000);
