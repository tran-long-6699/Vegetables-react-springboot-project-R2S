app.controller("wishlist-ctrl", function($scope, $http) {
    $scope.wls = {}
    let userid = $("#customer").text();
    let roleAnother = $("#user").text();
    $scope.init = function() {
        if (userid == '' || userid == undefined) {

        } else {
            $http.get(`/veg/customer/wl`).then(resp => {
                $scope.wls = resp.data;
                console.log("Load Wl Success", resp);
            }).catch(err => {
                console.log("Error", err);
            });
        }
    }

    $scope.wishlistadd = async(productid) => {
        try {
            if ((userid == '' || userid == undefined) && (roleAnother == '' || roleAnother == undefined)) {
                location.href = "/veg/login";
            } else if ((userid == '' || userid == undefined) && (roleAnother != '' || roleAnother != undefined)) {

            } else {
                $scope.wls.some(function(item, index) {
                    if (item.productid == productid) {
                        $scope.exist = true;
                        return true;
                    }
                    return false;
                });
                if (!$scope.exist) {
                    const resp = await $http.post(`/veg/customer/wl/${productid}`, productid);
                    console.log("Success", resp);
                } else {
                    alert('You added this product')
                }
            }
        } catch (error) {
            console.log("Error", error);
        }
    }

    $scope.wldelete = async(productid) => {
        try {
            const resp = await $http.delete(`/veg/customer/wl/${productid}`);
            console.log("Del Success");
            $scope.clickDel = true;
            $scope.init();
        } catch (error) {
            console.log("Err", err);
        }
    }

    $scope.redirect = async(productid) => {
        let redirect = await $scope.clickDel;
        if (!redirect) {
            location.href = "/veg/shop/product-detail?productid=" + productid;
        }
    }

    $scope.init();
});