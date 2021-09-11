app.controller("order-ctrl", function($scope, $http){
		$scope.main = true;
		$scope.listOrder ={}
		$scope.oneOrder= false;
		$scope.check = function(id){
				var url = `http://localhost:8080/veg/shop/ordt/${id}`;
				$http.get(url).then(resp=>{
				$scope.main = false;
				$scope.listOrder = resp.data;
				$scope.oneOrder = $scope.listOrder.length > 1 ? false : true;
				console.log("Load Success", resp)
				}).catch(err=>{
					console.log("Error", err)
				})
	
		}
		
		$scope.change = function(){
			$scope.main = true;
		}
	})