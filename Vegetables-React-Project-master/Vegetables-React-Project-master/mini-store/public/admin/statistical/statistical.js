app.controller("statistical-ctrl", ['$http', '$scope', '$compile', function($http, $scope, $compile) {
    $scope.months = {}
    $scope.cats = {}
    $scope.loadTableRevenue = function(month, catid) {
        try {
            let url = ''
            if (month == 'all' && catid == undefined) {
                url = 'http://localhost:8080/veg/admin/sttc/get-all';
            } else if (month != 'all' && catid == undefined) {
                url = 'http://localhost:8080/veg/admin/sttc/' + month;
            } else if (catid != undefined && month == undefined) {
                url = 'http://localhost:8080/veg/admin/sttc/get-cat/' + catid;
            }

            $('#data-table-report').DataTable({
                autoWidth: true,
                processing: true,
                serverSide: true,
                ajax: {
                    url: url,
                    type: 'POST',
                    dataSrc: ""
                },
                destroy: true,
                columns: [{
                    title: "Product Id",
                    data: "productid"
                }, {
                    title: "Product Name",
                    data: "productname"
                }, {
                    title: "Category",
                    data: "catname"
                }, {
                    title: "Image",
                    data: "image"
                }, {
                    title: "Provider",
                    data: "providername"
                }, {
                    title: "Quantity",
                    data: "amount"
                }, {
                    title: "Revenue",
                    data: "revenue"
                }],
                drawCallback: function() {
                    var api = this.api();
                    $(api.column(6).footer()).html(
                        'Total: ' + api.column(6, {
                            page: 'current'
                        }).data().sum()
                    )
                },
                createdRow: function(row, data, dataIndex) {
                    $compile(angular.element(row).contents())($scope);
                }
            });
        } catch (err) {
            console.log("Error", err)
        }
    }

    $scope.loadMonth = function() {
        var url = "http://localhost:8080/veg/admin/sttc/get-month";
        $http.get(url).then(resp => {
            $scope.months = resp.data;
            $scope.month = $scope.months[0].toString();
            $scope.loadTableRevenue('all', undefined);


            console.log("Load Month Success", resp);
        }).catch(err => {
            console.log("Error", err)
        })
    }

    $scope.filter = function(month) {
        try {
            let table = $('#data-table-report').DataTable();
            table.destroy();
            $('#data-table-report').empty();
            $scope.loadTableRevenue(month, undefined);
        } catch (err) {
            console.log("Error", err);
        }

    }

    $scope.filterByCat = function(catid) {
        try {
            let table = $('#data-table-report').DataTable();
            table.destroy();
            $('#data-table-report').empty();
            $scope.loadTableRevenue(undefined, catid);
        } catch (err) {
            console.log("Error", err);
        }
    }

    $scope.loadCat = function() {
        var url = "http://localhost:8080/veg/admin/cat";
        $http.get(url).then(resp => {
            $scope.cats = resp.data;
            $scope.catid = $scope.cats[0].catid.toString();
            console.log("Load Cat Success", resp);
        }).catch(err => {
            console.log("Error", err)
        })
    }

    $scope.loadMonth();
    $scope.loadCat();
}]);