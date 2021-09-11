app.controller("cat-ctrl", ['$http', '$scope', '$compile', function($http, $scope, $compile) {
    let host = "http://localhost:8080/veg/admin";
    var url = "http://localhost:8080/rest/files/category";
    $scope.form = {}
    $scope.categories = []

    $scope.reset = async() => {
        $scope.form = {}
        $scope.editForm = false;
        $scope.focus = true;
        $scope.form.image = 'default.png'
        $scope.load_all();
    }

    $scope.load_all = async() => {
        try {
            var url = `${host}/cat`;
            const resp = await $http.get(url);
            $scope.categories = resp.data
            console.log("Success", resp)
        } catch (err) {
            console.log("Error", err)
        }
    }

    $scope.loadTable = async() => {
        var url = 'http://localhost:8080/veg/admin/cat';
        $('#cat-table').DataTable({
            autoWidth: true,
            ajax: {
                url: url,
                type: 'GET',
                dataSrc: ""
            },
            columns: [{
                title: "Image",
                data: "image",
                render: function(data) {
                    var loadImage = `<img src="/images/category/${data}" class="img-thumbnail w-100" style="width:100px; height:70px;" />`
                    return loadImage;
                }
            }, {
                title: "Category",
                data: "catname"
            }, {
                title: "Description",
                data: "description"
            }, {
                data: "catid",
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
            let table = $('#cat-table').DataTable();
            table.destroy();
            $('#cat-table').empty();
            $scope.loadTable();
        } catch (err) {
            console.log("Error", err);
        }
    }

    $scope.edit = function(key) {
        var url = `${host}/cat/${key}`
        $http.get(url).then(resp => {
            $scope.editForm = true;
            $scope.form = resp.data;
            $scope.form.catname.autofocus;
            console.log("Success", resp)
        }).catch(err => {
            console.log("Error", err);
        });
    }

    $scope.create = async() => {
        try {
            var item = angular.copy($scope.form);
            var url = `${host}/cat`;
            const resp = await $http.post(url, item);
            $scope.categories.push(item);
            $scope.loadAgain();
            $scope.reset();
            console.log("Success", resp)
        } catch (err) {
            console.log("Error", err)
        }
    }


    $scope.update = async(key) => {
        try {
            var item = angular.copy($scope.form);
            var url = `${host}/cat/${item.catid}`;
            const resp = await $http.put(url, item);
            var index = $scope.categories.findIndex(i => i.catid == item.catid)
            if ($scope.form.image == $scope.categories[index].image) {
                alert('Không đổi hình')
                $scope.categories[index] = resp.data;
                console.log("Success", resp)
            } else {
                if ($scope.form.image == undefined) {
                    $scope.categories[index] = resp.data;
                    console.log("Success", resp)
                } else {
                    $scope.deleteImage($scope.categories[index].image);
                    $scope.categories[index] = await resp.data;
                }
            }
            $scope.reset();
            $scope.loadAgain();
        } catch (err) {
            console.log("Error", err)
        }

    }

    $scope.delete = async(key) => {
        try {
            var item = angular.copy($scope.form);
            var url = `${host}/cat/${$scope.form.catid}`;
            const resp = await $http.delete(url);

            var index = $scope.categories.findIndex(item => item.catid == $scope.form.catid)
            $scope.categories.splice(index, 1);
            $scope.reset();
            $scope.loadAgain();
            console.log("Success", resp);
        } catch (err) {
            console.log("Error", err)
        }

    }

    $scope.upload = function(files) {
        var form = new FormData();
        form.append("files", files[0]);
        var item = angular.copy($scope.form);
        $http.post(url, form, {
            transformRequest: angular.identity,
            headers: {
                'Content-Type': undefined
            }
        }).then(resp => {
            $scope.form.image = resp.data.name;
            console.log("Success", $scope.form.image);
        }).catch(err => {
            console.log("Error", err);
        });
    };

    $scope.deleteImage = async(filename) => {
        try {
            var urlDelete = `${url}/${filename}`;
            const resp = await $http.delete(urlDelete);
            console.log("Delete Image Success");
        } catch (err) {
            console.log("Error", err);
        }
    }

    $scope.loadTable();
    $scope.reset();
}]);