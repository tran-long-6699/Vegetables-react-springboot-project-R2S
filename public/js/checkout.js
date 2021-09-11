app.controller("checkout-ctrl", function($scope, $http) {
    $scope.cost = function() {
        if ($scope.modeofpayment == 'COD') {
            $scope.costDelivery = $scope.cart.amount * 0.1;

        } else {
            $scope.costDelivery = 0;
        }
        return $scope.total = $scope.cart.amount + $scope.costDelivery;
    }
    $scope.cost();
    $scope.order = {
        username: $("#user").text(),
        summoney: $scope.cart.amount,
        total: $scope.total,
        phone: "",
        address: "",
        modeofpayment: "",
        get orderDetails() {
            return $scope.cart.items.map(item => {
                return {
                    sizename: item.sizename,
                    pdid: item.productid,
                    price: item.priceaverage,
                    quantity: item.qty
                }
            })
        },
        purchase() {
            var order = angular.copy(this);
            order.address = $scope.address
            order.phone = $scope.phone
            order.modeofpayment = $scope.modeofpayment
            order.fullname = $scope.fullname;
            $http.post('/veg/customer/odr', order, {
                transformResponse: [
                    function(data) {
                        return data;
                    }
                ]
            }).then(resp => {
                alert('Đặt hàng thành công!');
                $scope.cart.clear();
                console.log("Check Out Success", resp)
                location.href = "/veg/customer/order";
            }).catch(error => {
                alert("Error");
                console.log(error);
            })
        }
    }
    if ($scope.cart.amount == 0 || $scope.cart.amount == undefined) {
        location.href = "/veg/home";
    }
});