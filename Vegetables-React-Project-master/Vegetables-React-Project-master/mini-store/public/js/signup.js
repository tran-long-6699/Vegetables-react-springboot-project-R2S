const app = angular.module("signup-app", []);
app.controller("signup-ctrl", function($scope, $http) {
    let url = "http://localhost:8080/veg/register";
    let urlImg = "http://localhost:8080/rest/files/user";
    $scope.form = {};
    $scope.items = []
    $scope.users = [];
    $scope.init = async() => {
        try {
            $scope.form.image = 'default.png';
            $scope.form.gender = 'true'
            const resp = await $http.get(`/veg/register/user`);
            $scope.users = resp.data;
            console.log("Load Users Success", resp);
        } catch (err) {
            console.log("Failed", err)
        }
    }

    $scope.signup = async() => {
        try {
            if ($scope.validatePassword() && $scope.checkaddress() && $scope.checkdate() && $scope.checkemail() && $scope.checkfullname() &&
                $scope.checkpassword() && $scope.checkphone() && $scope.checkstick()) {
                $scope.form.email = document.getElementById('email').value;
                $scope.form.address = document.getElementById('address').value;
                $scope.form.fullname = document.getElementById('fullname').value;
                $scope.form.password = document.getElementById('password').value;
                $scope.form.phone = document.getElementById('phone').value;
                let item = angular.copy($scope.form);
                alert($scope.form.email + ' ' + $scope.form.fullname + ' ' + $scope.form.address + ' ' + $scope.form.gender + $scope.form.phone + ' ')
                const resp = await $http.post(url, item);
                $scope.items.push(item);
                console.log("Success", resp.data);
                location.href = "/veg/signup/success";
            }
        } catch (err) {
            console.log("Err", err);
        }
    };

    $scope.upload = async(files) => {
        try {
            var form = new FormData();
            form.append("files", files[0]);
            var item = angular.copy($scope.form);
            const resp = await $http.post(urlImg, form, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            });
            $scope.form.image = resp.data.name;
            console.log("Success", resp.data);
        } catch (err) {
            console.log("Error", err);
        }

    };

    $scope.deleteImage = async(filename) => {
        try {
            var urlDelete = `${url}/${filename}`;
            const resp = await $http.delete(urlDelete);
            console.log("Delete Image Success");
        } catch (err) {
            console.log("Error", err);
        }
    }

    $scope.validatePassword = function() {
        let password = document.getElementById('password');
        let repass = document.getElementById('repassword');

        if (repassword.value == '') {
            document.getElementById('invalid-repassword').innerHTML = "Please input your confirm password";
            document.getElementById('repassword').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else if (password.value != repass.value) {
            document.getElementById('invalid-repassword').innerHTML = "Password don't match";
            document.getElementById('repassword').style.border = "thin solid red"
            $scope.invalid = true;
            return false;
        } else {
            document.getElementById('invalid-repassword').innerHTML = '';
            document.getElementById('repassword').style.border = "thin solid gray";
            $scope.invalid = false;
            return true;
        }
    }

    $scope.checkphone = function() {
        let expression = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        let phone = document.getElementById('phone');
        let result = expression.test(phone.value);
        if (!result) {
            phone.setCustomValidity("Invalid phone number");
            document.getElementById('invalid-phone').innerHTML = 'Invalid phone number';
            document.getElementById('phone').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else if (phone.value == '') {
            document.getElementById('invalid-phone').innerHTML = 'Please input your phone';
            document.getElementById('phone').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else {
            phone.setCustomValidity('');
            document.getElementById('invalid-phone').innerHTML = '';
            document.getElementById('phone').style.border = "thin solid gray"
            $scope.invalid = false;
            return true;
        }
    }



    $scope.checkemail = function() {
        let email = document.getElementById('email');
        let expression = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let result = expression.test(email.value);
        $scope.users.some(function(item, index) {
            if (item.username == email.value) {
                document.getElementById('invalid-email').innerHTML = 'Email already exists';
                document.getElementById('email').style.border = "thin solid red";
                $scope.invalid = true;
                return false;
            }
            document.getElementById('invalid-email').innerHTML = '';
            document.getElementById('email').style.border = "thin solid gray"
            $scope.invalid = false;
            return true;
        })

        if (email.value == '') {
            document.getElementById('invalid-email').innerHTML = 'Please input your email';
            document.getElementById('email').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else if (!result) {
            document.getElementById('invalid-email').innerHTML = 'Invalid email format';
            document.getElementById('email').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else {
            $scope.invalid = false;
            return true;
        }
    }

    $scope.checkfullname = function() {
        let fullname = document.getElementById('fullname').value;
        if (fullname == '') {
            document.getElementById('invalid-fullname').innerHTML = 'Please input your name';
            document.getElementById('fullname').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else {
            document.getElementById('invalid-fullname').innerHTML = '';
            document.getElementById('fullname').style.border = "thin solid gray";
            $scope.invalid = false;
            return true;
        }
    }

    $scope.checkpassword = function() {
        let password = document.getElementById('password').value;
        let expression = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        let result = expression.test(password);

        if (password == '') {
            document.getElementById('invalid-password').innerHTML = 'Please input your password';
            document.getElementById('password').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else if (!result) {
            document.getElementById('invalid-password').innerHTML = 'Please enter at least 6 characters including an uppercase letter, a number or a special character';
            document.getElementById('password').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else {
            document.getElementById('invalid-password').innerHTML = '';
            document.getElementById('password').style.border = "thin solid gray";
            $scope.invalid = false;
            return true;
        }
    }

    $scope.checkaddress = function() {
        let address = document.getElementById('address').value;
        if (address == '') {
            document.getElementById('invalid-address').innerHTML = 'Please input your address';
            document.getElementById('address').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else {
            document.getElementById('invalid-address').innerHTML = '';
            document.getElementById('address').style.border = "thin solid gray";
            $scope.invalid = false;
            return true;
        }
    }

    $scope.checkdate = function() {
        let date = document.getElementById('date').value;
        if (date == '') {
            document.getElementById('invalid-date').innerHTML = 'Please select your birthdate';
            document.getElementById('date').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else if (((new Date().getFullYear() - date.substring(0, 4)) < 16)) {
            document.getElementById('invalid-date').innerHTML = 'Your age is not suitable. Please select age 16 or older.';
            document.getElementById('date').style.border = "thin solid red";
            $scope.invalid = true;
            return false;
        } else {
            document.getElementById('invalid-date').innerHTML = '';
            document.getElementById('date').style.border = "thin solid gray";
            $scope.invalid = false;
            return true;
        }
    }

    $scope.checkstick = function() {
        if (document.forms[0].elements["agree"].checked == true) {
            document.getElementById('text').style.color = "black";
            $scope.invalid = false;
            return true;
        } else {
            document.getElementById('text').style.color = "red";
            $scope.invalid = true;
            return false;
        }
    }


    $scope.init();
});