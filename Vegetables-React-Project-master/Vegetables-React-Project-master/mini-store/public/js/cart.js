const app = angular.module("app", []);
app.controller("cart-ctrl", function($scope, $http) {
    $scope.disagree = true;
    $scope.modeofpayment = 'COD'
    $scope.users = []
    $scope.form = {}
    let userid = $("#customer").text();
    let userlogin = $("#user").text();
    if (userlogin == '' || userlogin == undefined) {

    } else {
        $http.get(`/veg/getimage`).then(resp => {
            $scope.users = resp.data;
            if ($scope.users.image.startsWith('https://')) {
                $scope.image = $scope.users.image;
            } else {
                $scope.image = '/images/user/' + $scope.users.image;
            }

            console.log("Success", resp);
        }).catch(err => {
            console.log("Err", err);
        });
    }

    $scope.cart = {
            items: [],
            add(id) {
                if (userid == '' || userid == undefined) {
                    location.href = "/veg/login";
                } else {
                    let sizeid = document.getElementById('sizeid').value;
                    let productid = id;
                    let priceofpd = document.getElementById('priceofpd').value;
                    let sizename = document.getElementById('sizename').value;
                    let item = this.items.find(item => item.productid == id && item.sizename == sizename);
                    let x = document.getElementById('quantity').value;
                    let quantity = 0;
                    if (x == undefined) {
                        quantity = 1;
                    } else {
                        quantity = Number(x)
                    }

                    if (item) {
                        item.qty += quantity;
                        this.saveToLocalStorage();


                    } else {
                        $http.get('http://localhost:8080/veg/customer/addcart/' + `${productid}`)
                            .then(resp => {
                                resp.data.sizename = sizename;
                                resp.data.qty = quantity;
                                resp.data.priceaverage = priceofpd;
                                resp.data.sizeid = Number(sizeid);
                                this.items.push(resp.data);
                                this.saveToLocalStorage();
                                console.log("Add Success", resp);

                            }).catch(error => {
                                console.log("Erorr", error)
                            })
                    }
                    $scope.cart.check();
                }
            },
            remove(id) {
                var index = this.items.findIndex(item => item.productid == id);
                this.items.splice(index, 1);
                this.saveToLocalStorage();
            },
            clear() {
                this.items = []
                this.saveToLocalStorage();
            },
            check() {},
            checkqty(productid, sizeid) {
                let host = `http://localhost:8080/veg/customer/updatecart/${productid}/${sizeid}`
                let list = {};
                let quantity = document.getElementById('cartqty').value;
                $http.get(host).then(resp => {
                    list = resp.data;
                    $scope.maxqtycart = list.remain;
                    if (!quantity || isNaN(quantity)) {
                        document.getElementById('cartqty').value = 1;
                        $scope.cart.saveToLocalStorage();
                    } else if (quantity > $scope.maxqtycart) {
                        document.getElementById('cartqty').value = $scope.maxqtycart;
                        $scope.cart.saveToLocalStorage();
                    } else {
                        $scope.cart.saveToLocalStorage();
                    }

                    console.log("Get Data Success", list)
                }).catch(err => {
                    console.log("Error", err);
                })
            },
            get count() {
                return this.items
                    .map(item => item.qty)
                    .reduce((total, qty) => total += qty, 0);
            },
            get amount() {
                return this.items
                    .map(item => !item.qty ? 1 : item.qty * item.priceaverage)
                    .reduce((total, qty) => total += qty, 0)
            },
            saveToLocalStorage() {
                var json = JSON.stringify(angular.copy(this.items));
                localStorage.setItem(userid, json);
            },
            updateToLocalStorage(productid, sizeid) {
                $scope.cart.checkqty(productid, sizeid);
            },
            loadFromLocalStorage() {
                var json = localStorage.getItem(userid)
                this.items = json ? JSON.parse(json) : [];
            }

        },
        $scope.cart.loadFromLocalStorage();

    $scope.check = function() {
        if ($scope.accept == true) {
            $scope.disagree = false;
        } else {
            $scope.disagree = true;
        }
    }

});