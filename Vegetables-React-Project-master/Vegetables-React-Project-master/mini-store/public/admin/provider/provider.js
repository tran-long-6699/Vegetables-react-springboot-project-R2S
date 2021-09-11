			app.controller("provider-ctrl", ['$http', '$scope', '$compile', function($http, $scope, $compile) {
			    var host = "http://localhost:8080/veg/admin";
			    $scope.form = {}
			    $scope.providers = []
			    $scope.reset = function() {
			        $scope.form = {};
			        $scope.editForm = false;
			        $scope.load_all();
			    }

			    $scope.load_all = function() {
			        var url = `${host}/pvder`;
			        $http.get(url).then(resp => {
			            $scope.providers = resp.data;
			            console.log("Load Success", resp)
			        }).catch(error => {
			            console.log("Error", error)
			        });
			    }

			    $scope.loadTable = async() => {
			        var url = 'http://localhost:8080/veg/admin/pvder';
			        $('#provider-table').DataTable({
			            ajax: {
			                url: url,
			                type: 'GET',
			                dataSrc: ""
			            },
			            columns: [{
			                title: "Id",
			                data: "providerid"
			            }, {
			                title: "Name",
			                data: "providername"
			            }, {
			                title: "Phone",
			                data: "phone"
			            }, {
			                title: "Address",
			                data: "address"
			            }, {
			                data: "providerid",
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
			            let table = $('#provider-table').DataTable();
			            table.destroy();
			            $('#provider-table').empty();
			            $scope.loadTable();
			        } catch (err) {
			            console.log("Error", err);
			        }
			    }

			    $scope.edit = function(key) {
			        var url = `${host}/pvder/${key}`;
			        $scope.editForm = true;
			        $http.get(url).then(resp => {
			            $scope.form = resp.data;
			            console.log("Success", resp)
			        }).catch(error => {
			            console.log("Error", error)
			        });
			    }

			    $scope.create = function() {
			        var item = angular.copy($scope.form);
			        var url = `${host}/pvder`;
			        $http.post(url, item).then(resp => {
			            $scope.providers.push(item);
			            $scope.reset();
			            console.log("Success", resp);
			            $scope.loadAgain();
			        }).catch(error => {
			            console.log("Error", error)
			        });
			    }
			    $scope.update = function() {
			        var item = angular.copy($scope.form);
			        var url = `${host}/pvder/${$scope.form.providerid}`
			        $http.put(url, item).then(resp => {
			            var index = $scope.providers.findIndex(item => item.providerid == $scope.form.providerid);
			            $scope.providers[index] = resp.data;
			            console.log("Success", resp);
			            $scope.loadAgain();
			        }).catch(error => {
			            console.log("Error", error)
			        });
			    }
			    $scope.delete = function(key) {
			        var item = angular.copy($scope.form);
			        var url = `${host}/pvder/${$scope.form.providerid}`
			        $http.delete(url).then(resp => {
			            var index = $scope.providers.findIndex(item => item.providerid == $scope.form.providerid);
			            $scope.providers.splice(index, 1);
			            $scope.reset();
			            console.log("Success", resp);
			            $scope.loadAgain();
			        }).catch(error => {
			            console.log("Error", error)
			        });
			    }

			    $scope.checkId = function() {
			        let id = document.getElementById('providerid').value;
			        let show = document.getElementById('id-invalid');
			        $scope.providers.some(function(item, index) {
			            if (item.providerid == id) {
			                alert('Trung: ' + index)
			                show.innerHTML = 'Provider id already exists';
			                $scope.invalid = true;
			                return true;
			            }
			            show.innerHTML = '';
			            $scope.invalid = false;
			            return false;
			        })
			    }

			    $scope.checkphone = function() {
			        let expression = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
			        let phone = document.getElementById('phone').value;
			        let show = document.getElementById('phone-invalid');
			        let result = expression.test(phone);
			        if (!result) {
			            show.innerHTML = 'Invalid phone number';
			            $scope.invalid = true;
			            return false;
			        } else {
			            show.innerHTML = '';
			            $scope.invalid = false;
			            return true;
			        }
			    }

			    $scope.loadTable();
			    $scope.reset();
			}]);