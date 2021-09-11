let host = "http://localhost:8080/veg/admin";
setUpDataTable();
async function setUpDataTable() {

    const res = await fetch('http://localhost:8080/veg/admin/sup');
    const data = await res.json();

    var users = data.map(el => Object.values(el));

    $(document).ready( () => {

        $('#sup-table').DataTable( {
          data: users,
          columns : [
              { title: "Id" },
              { title: "Provider Id" },
              { title: "Times" },
              {
                mRender: function (data, type, row) {
                    return '<a href="#" class="table-edit" data-id="Id" ng-click="edit(' + row[0] + ')">EDIT</a> / <a href="#" class="editor_remove" onclick="Delete(' + row.Id + ')">Delete</a>'
                }
            }
          ]
      });
    });
}
		const app = angular.module("app",[]);
		app.controller("ctrl", function($scope, $http){
			$scope.form = {}
			$scope.items ={}
			$scope.reset = function(){
				$scope.form={}
				$scope.editForm = false;
			}
			
			
			
			$scope.load_all = function(){
				var url = `${host}/sup`;
				$http.get(url).then(resp =>{
					$scope.items = resp.data;
					console.log("Success", resp)
				}).catch(error=>{
					console.log("Error", error)
				});
			}
			
			$scope.edit = function(key){
				var url = `${host}/sup/${key}`	
				$scope.editForm = true;
				$http.get(url).then(resp=>{
					$scope.form = resp.data;
					console.log("Success", resp)
				}).catch(error=>{
					console.log("Error", error)
				});
			}
			
			$scope.create = function(){
				var item = angular.copy($scope.form);
				var url = `${host}/sup`;
				$http.post(url, item).then(resp=>{
					$scope.items.push(item);
					$scope.reset();
					console.log("Success", resp)
				}).catch(error =>{
					console.log("Error", error)
				});
			}
			
			$scope.update =function(){
				var item = angular.copy($scope.form);
				var url = `${host}/sup/${$scope.form.pdsupid}`;
				$http.put(url, item).then(resp=>{
					var index = $scope.items.findIndex(item => item.pdsupid == $scope.form.pdsupid);
					$scope.items[index] = resp.data;
					$scope.items[index].times = $scope.items[index]
					console.log("Success", resp)
				}).catch(error =>{
					console.log("Error", error)
				});
			}
			
			$scope.delete = function(key){
				var item =angular.copy($scope.form);
				var url = `${host}/sup/${$scope.form.pdsupid}`;
				$http.delete(url).then(resp=>{
					var index = $scope.items.findIndex(item => item.pdsupid == $scope.form.pdsupid)
					$scope.items.splice(index,1);
					$scope.reset();
					console.log("Success", resp)
				}).catch(error =>{
					sonsole.log("Error", error)
				});
			}
			
			$scope.reset();
		});