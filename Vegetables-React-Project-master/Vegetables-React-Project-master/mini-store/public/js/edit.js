app.controller("edit-ctrl", function($scope, $http) {
    let url = "http://localhost:8080/veg/editprofile/user/update";
    $scope.items = []
    $scope.form = {}
    let urlImage = "http://localhost:8080/rest/files/user";
    $scope.init = function() {
        /* $http.get(`/veg/editprofile/getinfo`).then(resp=>{
        	$scope.form = resp.data[0];
        	$scope.visible = false;
        	$scope.form.image = resp.data.image;
        	console.log("Success", resp);
        }).catch(err=>{
        	console.log("Err",err)
        }); */
    }

    $scope.test = function() {
        alert($scope.image);
    }

    $scope.checkfullname = function() {
        let fullname = document.getElementById('fullname').value;
        let show = document.getElementById('fullname-invalid');
        if (fullname == '') {
            $scope.invalid = true;
            show.innerHTML = "Please input your name";
            return false;
        } else {
            $scope.invalid = false;
            show.innerHTML = '';
            return true;
        }
    }

    $scope.checkphone = function() {
        let phone = document.getElementById('phone').value;
        let show = document.getElementById('phone-invalid');
        let expression = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
        let result = expression.test(phone);
        if (phone == '') {
            $scope.invalid = true;
            show.innerHTML = "Please input your phone";
            return false;
        } else if (!result) {
            $scope.invalid = true;
            show.innerHTML = "Your phone invalid";
            return false;
        } else {
            $scope.invalid = false;
            show.innerHTML = '';
            return true;
        }
    }

    $scope.checkaddress = function() {
        let phone = document.getElementById('address').value;
        let show = document.getElementById('address-invalid');
        if (phone == '') {
            $scope.invalid = true;
            show.innerHTML = "Please input your address";
            return false;
        } else {
            $scope.invalid = false;
            show.innerHTML = '';
            return true;
        }
    }

    $scope.checkdate = function() {
        let date = document.getElementById('date').value;
        let show = document.getElementById('date-invalid');
        if (date == '') {
            show.innerHTML = 'Please select your birthdate';
            $scope.invalid = true;
            return false;
        } else if (((new Date().getFullYear() - date.substring(0, 4)) < 16)) {
            show.innerHTML = 'Your age is not suitable for registration. Please select age 16 or older.';
            $scope.invalid = true;
            return false;
        } else {
            show.innerHTML = '';
            $scope.invalid = false;
            return true;
        }
    }

    $scope.checkpwd = function() {
        if (!$scope.visbile) {
            let pwd = document.getElementById('pwd').value;
            let show = document.getElementById('pwd-invalid');
            if (pwd == '') {
                show.innerHTML = 'Please input your password';
                $scope.invalid = true;
                return false;
            } else {
                show.innerHTML = '';
                $scope.invalid = false;
                return true;
            }
        }
    }

    $scope.checkvalpwd = function() {
        if (!$scope.visbile) {
            alert('loalsa')
            let repwd = document.getElementById('repwd').value;
            let pwd = document.getElementById('pwd').value;
            let show = document.getElementById('repwd-invalid');
            if (repwd == '') {
                show.innerHTML = 'Please input your re-password';
                $scope.invalid = true;
                return false;
            } else if (repwd != pwd) {
                show.innerHTML = "Your password don't match";
                $scope.invalid = true;
                return false;
            } else {
                show.innerHTML = '';
                $scope.invalid = false;
                return true;
            }
        }
    }

    $scope.dontchange = function() {
        $scope.visible = true;
    }

    $scope.change = function() {
        $scope.visible = false;
    }

    /* $scope.upload = async(files) => {
            try {
                var form = new FormData();
                form.append("files", files[0]);
                var item = angular.copy($scope.form);
                const resp = await $http.post(urlImage, form, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                });             
                    $scope.form.image = resp.data.name;
                    console.log("Success", $scope.form.image);
            } catch (err) {
                console.log("Error", err);
            }

        }; */

    $scope.init();
});