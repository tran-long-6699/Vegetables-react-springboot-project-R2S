		app.controller("szpd-ctrl", ['$http', '$scope', '$compile', function($http, $scope, $compile) {
		    var host = "http://localhost:8080/veg/admin";
		    $scope.form = {}
		    $scope.items = {}
		    $scope.sizes = {}
		    $scope.pds = {}
		    $scope.quantities = {}

		    $scope.loadTable = async() => {
		        var url = 'http://localhost:8080/veg/admin/szpd';
		        $('#szpd-table').DataTable({
		            ajax: {
		                url: url,
		                type: 'GET',
		                dataSrc: ""
		            },
		            columns: [{
		                    title: "Size Id",
		                    data: "sizeid"
		                }, {
		                    title: "Product Id",
		                    data: "pdid"
		                }, {
		                    title: "Quantity",
		                    data: "quantity"
		                },
		                {
		                    title: "Price",
		                    data: "price"
		                }, {
		                    data: "szpdid",
		                    render: function(data) {
		                        var edit = `<button data-id="${data}" class="btn btn-outline-secondary" id="edit" ng-click="edit('${data}')">Edit</button>`
		                        return edit;
		                    }
		                }
		            ],
		            createdRow: function(row, data, dataIndex) {
		                $compile(angular.element(row).contents())($scope);
		            }
		        });

		    }

		    $scope.loadAgain = async() => {
		        try {
		            let table = $('#szpd-table').DataTable();
		            table.destroy();
		            $('#szpd-table').empty();
		            $scope.loadTable();
		        } catch (err) {
		            console.log("Error", err);
		        }
		    }

		    $scope.changes = async() => {

		        var item = await angular.copy($scope.form);
		        for (var i = 0; i < $scope.items.length; i++) {
		            if ((item.pdid == $scope.items[i].pdid) && (item.sizeid == $scope.items[i].sizeid)) {
		                $scope.cascadeById = true;
		                break;
		            }
		            $scope.cascadeById = false;
		        }
		    }

		    $scope.reset = async() => {
		        $scope.form = {}
		        $scope.editForm = false;
		        $scope.change = false;
		        $scope.form.sales = 0;
		        $scope.form.price = 1000;
		        $scope.form.quantity = 1;
		    }

		    $scope.quantity = function() {
		        var item = angular.copy($scope.form)
		        var totalQty = 0;
		        var currentQty = 0;
		        var list = $scope.quantities;
		        for (var i = 0; i < list.length; i++) {
		            if (item.pdid == list[i].pdqtyid) {
		                totalQty += list[i].quantity;
		            }
		        }

		        for (var index = 0; index < $scope.items.length; index++) {
		            if (item.pdid == $scope.items[index].pdid) {
		                currentQty += $scope.items[i].quantity;
		            }
		        }

		        if (totalQty >= currentQty) {
		            $scope.max = totalQty - currentQty;
		            $scope.bigger = false;
		        } else {
		            $scope.bigger = true;
		        }

		    }

		    $scope.loadsize = async() => {
		        try {
		            var url = `${host}/sz`
		            const resp = await $http.get(url);
		            $scope.sizes = resp.data;
		            $scope.form.sizeid = $scope.sizes[0].id.toString();
		            $scope.changes();
		            console.log("Success", resp)
		        } catch (err) {
		            console.log("Error", err)
		        }
		    }

		    $scope.loadpds = async() => {
		        try {
		            var url = `${host}/pd`
		            const resp = await $http.get(url);
		            $scope.pds = resp.data;
		            $scope.form.pdid = $scope.pds[0].productid;
		            $scope.changes();
		            console.log("Success", resp)
		        } catch (err) {
		            console.log("Error", err)
		        }
		    }

		    $scope.loadQuantity = async() => {
		        try {
		            var url = `${host}/qtypd`
		            const resp = await $http.get(url);
		            $scope.quantities = resp.data;
		            console.log("Success", resp)
		        } catch (err) {
		            console.log("Error", err)
		        }
		    }

		    $scope.load_all = async() => {
		        try {
		            var url = `${host}/szpd`
		            const resp = await $http.get(url);
		            $scope.items = resp.data;
		            console.log("Success load All", resp);
		            $scope.changes();
		        } catch (err) {
		            console.log("Err", err)
		        }

		    }

		    $scope.edit = function(key) {
		        var url = `${host}/szpd/${key}`
		        $scope.editForm = true;
		        $http.get(url).then(resp => {
		            $scope.form = resp.data;
		            $scope.form.sizeid = resp.data.sizeid.toString();
		            console.log("Success", resp)
		        }).catch(error => {
		            console.log("Error", error)
		        });
		    }

		    $scope.create = function() {
		        if (!$scope.cascadeById) {
		            var url = `${host}/szpd`
		            var item = angular.copy($scope.form);
		            $http.post(url, item).then(resp => {
		                $scope.items.push(item);
		                $scope.loadAgain();
		                console.log("Success", resp)
		            }).catch(error => {
		                console.log("Error", error)
		            });
		        }
		    }

		    $scope.update = async() => {
		        try {
		            var item = angular.copy($scope.form);
		            var url = `${host}/szpd/${$scope.form.szpdid}`;
		            const resp = await $http.put(url, item);
		            var index = $scope.items.findIndex(item => item.szpdid == $scope.form.szpdid);
		            $scope.items[index] = resp.data;
		            $scope.loadAgain();
		            console.log("Success", resp)
		        } catch (err) {
		            console.log("Error", err);
		        }
		    }

		    $scope.delete = function(key) {
		        var item = angular.copy($scope.form);
		        var url = `${host}/szpd/${$scope.form.szpdid}`;
		        $http.delete(url).then(resp => {
		            var index = $scope.items.findIndex(item => item.szpdid == $scope.form.szpdid)
		            $scope.items.splice(index, 1);
		            $scope.loadAgain();
		            console.log("Success", resp)
		        }).catch(error => {
		            console.log("Error", error)
		        });
		    }

		    $scope.reset();
		    $scope.load_all();
		    $scope.loadQuantity();
		    $scope.loadTable();
		    $scope.loadpds();
		    $scope.loadsize();
		}]);