const app = angular.module("newpass-app", []);
app.controller("newpass-ctrl", function($scope, $http) {
    $scope.invalid = true;
	let url = "http://localhost:8080/veg/forgot/npwd";
    $scope.checkpwd = function() {
        let expression = /(?=^.{6,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        let password = document.getElementById('password1');
        let result = expression.test(password.value);
        if (password.value == '') {
            document.getElementById('pwd-invalid').innerHTML = "Please input your password";
            $scope.invalid = true;
        } else if (!result) {
            document.getElementById('pwd-invalid').innerHTML = "Please enter at least 6 characters including an uppercase letter, a number or a special character";
            $scope.invalid = true;
        } else {
            document.getElementById('pwd-invalid').innerHTML = "";
            $scope.invalid = false;
        }
    }

    $scope.checkrepwd = function() {
        let password = document.getElementById('password1');
        let repass = document.getElementById('password2');
        if (repass.value == '') {
            document.getElementById('repwd-invalid').innerHTML = 'Please input your confirm password';
            $scope.invalid = true;
        } else if (password.value != repass.value) {
            document.getElementById('repwd-invalid').innerHTML = "Password don't match";
            $scope.invalid = true;
        } else {
            document.getElementById('repwd-invalid').innerHTML = '';
            $scope.invalid = false;
        }
    }

    $scope.hideshow = function() {
        var password = document.getElementById("password1");
        var eye = document.getElementById("eye");

        if (password.type === 'password') {
            password.type = "text";
            slash.style.display = "block";
            eye.style.display = "none";
        } else {
            password.type = "password";
            slash.style.display = "none";
            eye.style.display = "block";
        }

    }

    $scope.newpass = async() => {
        try {
            $scope.checkpwd();
            $scope.checkrepwd();
            if (!$scope.invalid) {
            	const resp = await $http.put(url, $scope.pwd);
                console.log("Success", resp);
                location.href="/veg/home";
            }
        } catch (err) {
            console.log("Err", err);
        }
    }
});