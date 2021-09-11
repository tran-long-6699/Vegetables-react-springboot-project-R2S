let host = "http://localhost:8080/veg/shop/detail";
app.controller("pddt-ctrl", function($scope, $http) {
    $scope.form = {}
    $scope.list = {}
    $scope.sizes = {}
    $scope.sizeList = {}
    $scope.listByCatId = {}
    let id = $("#customer").text();
    $scope.plus = function() {
        var quantity = parseInt($('#quantity').val());
        if (quantity < $scope.form.remain) {
            $('#quantity').val(quantity + 1);

        }

    }

    $scope.cart.check = function() {
        $scope.change();
    }



    $scope.minus = function() {
        var quantity = parseInt($('#quantity').val());
        if (quantity > 1) {
            $('#quantity').val(quantity - 1);

        }
    }

    $scope.getId = function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    let productid = $scope.getId('productid');

    $scope.getById = function() {
        var url = `${host}/${productid}`;
        $http.get(url).then(resp => {
            $scope.list = resp.data;
            $scope.selectedItem = $scope.list[0];
            $scope.change();
            console.log("Success List", resp)
        }).catch(error => {
            console.log("Error", error)
        });
    }

    $scope.change = function() {
        let sizeid = $scope.selectedItem.sizeid;
        let url = `${host}/${productid}/${sizeid}`;
        let list = {}
        let json = localStorage.getItem(id);
        let data = JSON.parse(json);
        $http.get(url).then(resp => {
            list = resp.data;
            $scope.form.price = list.price;
            $scope.form.sold = list.sold;
            $scope.soldOut = list.remain == 0 ? true : false;
            if (data) {
                let search = data.find(item => item.productid == productid && item.sizename == $scope.selectedItem.size.sizename)
                if (search) {
                    $scope.tempSoldout = (list.remain - search.qty) <= 0 ? true : false;
                    $scope.form.remain = list.remain - search.qty;
                } else {
                    $scope.tempSoldout = list.remain - document.getElementById('quantity').value == 0 ? true : false;
                    $scope.form.remain = list.remain;
                }
            } else {
                $scope.tempSoldout = false;
                $scope.form.remain = list.remain;
            }

            if ($scope.tempSoldout) {
                document.getElementById('quantity').value = 0;
            } else {
                document.getElementById('quantity').value = 1;
            }
            console.log("Load Edit Success", resp)
        }).catch(error => {
            console.log("Error", error)
        })

    }

    $scope.findByCatId = function() {
        var url = `${host}/findByCatId/${productid}`;

        $http.get(url).then(resp => {
            $scope.listByCatId = resp.data;
            console.log("Success Detail ", resp)
        }).catch(error => {
            console.log("Error", error);
        });
    }


    $scope.getById();
    $scope.findByCatId();
});