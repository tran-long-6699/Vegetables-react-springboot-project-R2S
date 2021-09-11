		app.controller("pd-ctrl", ['$http', '$scope', '$compile', function($http, $scope, $compile) {
		    var host = "http://localhost:8080/veg/admin";
		    var url = "http://localhost:8080/rest/files/product";


		    $scope.loadTable = async() => {
		        try {
		            var url = 'http://localhost:8080/veg/admin/pd';
		            $('#pd-table').DataTable({
		                ajax: {
		                    url: url,
		                    type: 'GET',
		                    dataSrc: ""
		                },
		                columns: [{
		                        title: "Image",
		                        data: "image",
		                        render: function(data) {
		                            var loadImage = `<img src="/images/product/${data}" class="img-thumbnail" style="width: 100px; height: 100px;" />`
		                            return loadImage;
		                        }
		                    }, {
		                        title: "Id",
		                        data: "productid"
		                    }, {
		                        title: "Name",
		                        data: "productname"
		                    }, {
		                        title: "Category",
		                        data: "categoryid"
		                    },
		                    {
		                        title: "Price",
		                        data: "priceaverage"
		                    }, {
		                        title: "Description",
		                        data: "description"
		                    }, {
		                        data: "productid",
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
		        } catch (error) {
		            console.log("Error", error);
		        }
		    }

		    $scope.upload = async(files) => {
		        try {
		            var form = new FormData();
		            form.append("files", files[0]);
		            var item = angular.copy($scope.form);
		            const resp = await $http.post(url, form, {
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

		    };

		    $scope.loadAgain = async() => {
		        try {
		            let table = $('#pd-table').DataTable();
		            table.destroy();
		            $('#pd-table').empty();
		            $scope.loadTable();
		        } catch (err) {
		            console.log("Error", err);
		        }
		    }

		    $scope.deleteImage = async(filename) => {
		        try {
		            var urlDelete = `${url}/${filename}`;
		            const resp = await $http.delete(urlDelete);
		            console.log("Delete Image Success");
		        } catch (err) {
		            console.log("Error", err);
		        }
		    }


		    $scope.form = {}
		    $scope.items = {}
		    $scope.cats = {}
		    $scope.metes = {}
		    $scope.pdids = []
		    $scope.filenames = {}
		    $scope.reset = function() {
		        $scope.form = {};
		        $scope.form.image = 'default.png';
		        $scope.items = {}
		        $scope.cats = {}
		        $scope.metes = {}
		        $scope.pdids = []
		        $scope.editForm = false;
		        $scope.cascadeById = false;

		        $scope.load_all();
		        $scope.loadCat();
		        $scope.loadMete();
		        $scope.loadPdid();
		    }

		    $scope.changes = function() {
		        var url = `${host}/qtypd/filter`;
		        var item = angular.copy($scope.form);
		        $scope.list = $scope.pdids;
		        for (var i = 0; i < $scope.list.length; i++) {
		            if (item.productid == $scope.list[i].pdqtyid) {
		                $scope.form.measure = $scope.list[i].measure;
		                $scope.cascadeById = true;
		                break;
		            }
		        }
		    }

		    $scope.loadPdid = async() => {
		        try {
		            var url = `${host}/qtypd/filter`;
		            var item = angular.copy($scope.form);
		            const resp = await $http.get(url);
		            $scope.pdids = resp.data;
		            if ($scope.pdids.length > 0) {
		                $scope.form.productid = $scope.pdids[0].pdqtyid;
		            }
		            console.log("Success Pdid", resp)
		        } catch (err) {
		            console.log("Error", err)
		        }
		    }

		    $scope.loadMete = async() => {
		        try {
		            var url = `${host}/mete`;
		            const resp = await $http.get(url);
		            $scope.metes = resp.data;
		            $scope.form.measure = $scope.metes[0].measureid;
		            console.log("Success Measure", resp)
		        } catch (err) {
		            console.log("Error", err)
		        }

		    }

		    $scope.loadCat = async() => {
		        try {
		            var url = `${host}/cat`;
		            const resp = await $http.get(url);
		            $scope.cats = resp.data;
		            $scope.form.categoryid = $scope.cats[0].catid.toString();
		            console.log("Success Cat", resp)
		        } catch (err) {
		            console.log("Error", err)
		        }
		    }

		    $scope.load_all = async() => {
		        try {
		            var url = `${host}/pd`;
		            const resp = await $http.get(url);
		            $scope.items = resp.data;
		            console.log("Success All", resp)
		        } catch (err) {
		            console.log("Error", err)
		        }
		    }
		    $scope.edit = function(key) {
		        var url = `${host}/pd/${key}`;
		        $scope.editForm = true;
		        $scope.cascadeById = true;
		        $http.get(url).then(resp => {
		            $scope.form = resp.data;
		            $scope.form.categoryid = resp.data.categoryid.toString();
		            console.log("Success", resp)
		        }).catch(error => {
		            console.log("Error", error)
		        });
		    }
		    $scope.create = function() {
		        var item = angular.copy($scope.form);
		        var url = `${host}/pd`;
		        $http.post(url, item).then(resp => {
		            $scope.items.push(item);
		            $scope.reset();
		            console.log("Success", resp);
		            $scope.loadAgain();
		        }).catch(error => {
		            console.log("Error", error)
		        });
		    }

		    $scope.update = async(key) => {
		        try {
		            var item = angular.copy($scope.form);
		            var url = `${host}/pd/${item.productid}`
		            const resp = await $http.put(url, item);
		            var index = $scope.items.findIndex(i => i.productid == item.productid);
		            if ($scope.form.image == $scope.items[index].image) {
		                $scope.items[index] = resp.data;
		                console.log("Success", resp)
		            } else {
		                if ($scope.form.image == undefined) {
		                    $scope.items[index] = resp.data;
		                    console.log("Success", resp)
		                } else {
		                    $scope.deleteImage($scope.items[index].image);
		                    $scope.items[index] = await resp.data;
		                }
		            }
		            $scope.loadAgain();
		            $scope.reset();
		        } catch (err) {
		            console.log("Error", err)
		        }

		    }

		    $scope.delete = async(key) => {
		        try {
		            var item = angular.copy($scope.form);
		            var url = `${host}/pd/${$scope.form.productid}`
		            const resp = await $http.delete(url);
		            var index = $scope.items.findIndex(item => item.productid == $scope.form.productid)
		            $scope.items.splice(index, 1);
		            $scope.loadAgain();
		            $scope.reset();
		            console.log("Success", resp);
		        } catch (err) {
		            console.log("Error", err)
		        }

		    }

		    $scope.reset();
		    $scope.loadTable();
		}]);