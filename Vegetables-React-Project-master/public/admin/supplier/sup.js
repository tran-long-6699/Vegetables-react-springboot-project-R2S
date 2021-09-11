			app.controller("sup-ctrl", ['$http', '$scope', '$compile', function($http, $scope, $compile) {
			    var host = "http://localhost:8080/veg/admin";
			    $scope.form = {}
			    $scope.suppliers = []
			    $scope.pvders = {}
			    $scope.sizes = {}
			    $scope.qtities = {}
			    $scope.reset = function() {
			        $scope.form = {}
			        $scope.editForm = false;
			        $scope.cascadeById = false;
			        $scope.loadPvders();
			        $scope.loadsize();
			        $scope.loadQty();
			        $scope.load_all();
			    }

			    $scope.loadTable = async() => {
			        var url = 'http://localhost:8080/veg/admin/sup';
			        $('#sup-table').DataTable({
			            ajax: {
			                url: url,
			                type: 'GET',
			                dataSrc: ""
			            },
			            columns: [{
			                title: "Id",
			                data: "pdsupid"
			            }, {
			                title: "Provider Id",
			                data: "pvid"
			            }, {
			                data: "pdsupid",
			                render: function(data) {
			                    var edit = `<button data-id="${data}" class="btn btn-outline-secondary" id="edit" ng-click="edit('${data}')">Edit</button>`
			                    return edit;
			                }
			            }],
			            createdRow: function(row, data, dataIndex) {
			                $compile(angular.element(row).contents())($scope);
			            }
			        });

			    }

			    $scope.loadAgain = async() => {
			        try {
			            let table = $('#sup-table').DataTable();
			            table.destroy();
			            $('#sup-table').empty();
			            $scope.loadTable();
			        } catch (err) {
			            console.log("Error", err);
			        }
			    }

			    $scope.load_all = function() {
			        var url = `${host}/sup`;
			        $http.get(url).then(resp => {
			            $scope.suppliers = resp.data;
			            console.log("Success", resp)
			        }).catch(error => {
			            console.log("Error", error)
			        });
			    }

			    $scope.loadsize = async() => {
			        try {
			            var url = `${host}/mete`
			            const resp = await $http.get(url);
			            $scope.sizes = resp.data;
			            $scope.form.measure = $scope.sizes[0].measureid
			            console.log("Success", resp)

			        } catch (err) {
			            console.log("Error", err)
			        }
			    }

			    $scope.loadPvders = async() => {
			        try {
			            var url = `${host}/pvder`;
			            const resp = await $http.get(url);
			            $scope.pvders = resp.data;
			            $scope.form.pvid = $scope.pvders[0].providerid
			            console.log("Success", resp)
			        } catch (err) {
			            console.log("Error", err)
			        }
			    }

			    $scope.loadQty = function() {
			        var url = `${host}/qtypd`;
			        $http.get(url).then(resp => {
			            $scope.qtities = resp.data;
			            console.log("Success", resp)
			        }).catch(error => {
			            console.log("Error", error)
			        });
			    }

			    $scope.changes = function() {
			        var item = angular.copy($scope.form);
			        $scope.list = $scope.suppliers;
			        for (var i = 0; i < $scope.list.length; i++) {
			            if (item.pdsupid == $scope.list[i].pdsupid) {
			                $scope.form.pvid = $scope.list[i].pvid;
			                $scope.form.measure = $scope.list[i].measure;
			                $scope.cascadeById = true;
			                break;
			            }
			            $scope.cascadeById = false;

			        }
			        for (var index = 0; index < $scope.qtities.length; index++) {
			            if (item.pdsupid == $scope.qtities[index].pdqtyid) {
			                $scope.form.measure = $scope.qtities[index].measure;
			                $scope.cascadeById = true;
			                break;
			            }
			            $scope.cascadeById = false;
			        }
			    }

			    $scope.edit = function(key) {
			        var url = `${host}/sup/${key}`
			        $scope.editForm = true;
			        $http.get(url).then(resp => {
			            $scope.form = resp.data;

			            for (var i = 0; i < $scope.qtities.length; i++) {
			                if ($scope.form.pdsupid == $scope.qtities[i].pdqtyid) {
			                    $scope.form.measure = $scope.qtities[i].measure;
			                    break;
			                }
			            }

			            console.log("Success", resp)
			        }).catch(error => {
			            console.log("Error", error)
			        });
			    }

			    $scope.create = function() {
			        var item = angular.copy($scope.form);
			        var url = `${host}/sup/${$scope.form.quantity}/${$scope.form.price}/${$scope.form.measure}`;
			        $http.post(url, item).then(resp => {
			            $scope.suppliers.push(item);
			            console.log("Success", resp)
			            $scope.loadAgain();
			            $scope.reset();
			        }).catch(error => {
			            console.log("Error", error)
			        });
			    }

			    $scope.update = function() {
			        var item = angular.copy($scope.form);
			        var url = `${host}/sup/${$scope.form.pdsupid}/${$scope.form.measure}`;
			        $http.put(url, item).then(resp => {
			            var index = $scope.suppliers.findIndex(item => item.pdsupid == $scope.form.pdsupid);
			            $scope.suppliers[index] = resp.data;
			            $scope.suppliers[index].times = $scope.suppliers[index]
			            console.log("Success", resp)
			            $scope.loadAgain();
			        }).catch(error => {
			            console.log("Error", error)
			        });
			    }

			    $scope.delete = function() {
			        var item = angular.copy($scope.form);
			        var url = `${host}/sup/${$scope.form.pdsupid}`;
			        $http.delete(url).then(resp => {
			            var index = $scope.suppliers.findIndex(item => item.pdsupid == $scope.form.pdsupid)
			            $scope.suppliers.splice(index, 1);
			            $scope.reset();
			            console.log("Success", resp)
			            $scope.loadAgain();
			        }).catch(error => {
			            sonsole.log("Error", error)
			        });
			    }

			    $scope.loadTable();
			    $scope.reset();

			}]);