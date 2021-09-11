const app = angular.module('admin-app', ['ngRoute']);
// app.config(function($routeProvider, $locationProvider) {
//     $locationProvider.html5Mode(true);
//     $locationProvider.hashPrefix('');
//     $routeProvider
//         .when("/", {
//             templateUrl: "/admin/admin.html"
//         })
//         .when("/provider", {
//             templateUrl: "/admin/provider/provider.html",
//             controller: "provider-ctrl"
//         })
//         .when("/product", {
//             templateUrl: "/admin/product/product.html",
//             controller: "pd-ctrl"
//         })
//         .when("/category", {
//             templateUrl: "/admin/category/category.html",
//             controller: "cat-ctrl"
//         })
//         .when("/sizeproduct", {
//             templateUrl: "/admin/sizeproduct/sizeproduct.html",
//             controller: "szpd-ctrl"
//         })
//         .when("/supplier", {
//             templateUrl: "/admin/supplier/supplier.html",
//             controller: "sup-ctrl"
//         })
//         .when("/statistical", {
//             templateUrl: "/admin/statistical/statistical.html",
//             controller: "statistical-ctrl"
//         })
//         .when("/authority", {
//             templateUrl: "/admin/authority/authority.html",
//             controller: "authority-ctrl"
//         })
//         .when("/veg/home", {
//             redirectTo: function() {
//                 window.location = "/veg/home";
//             }
//         })
//         .when("/veg/editprofile", {
//             redirectTo: function() {
//                 window.location = "/veg/editprofile/user";
//             }
//         })
//         .when("/veg/logoff", {
//             redirectTo: function() {
//                 window.location = "/veg/logoff";
//             }
//         })
//         .otherwise({
//             redirectTo: '/admin/home'
//         });

// });

const app = angular.module('admin-app', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/admin/admin.html'
        }).state('home.provider', {
            url: '/provider',
            templateUrl: '/admin/provider/provider.html',
            controller: 'provider-ctrl'
        }).state("home.product", {
            url: '/product',
            templateUrl: "/admin/product/product.html",
            controller: "pd-ctrl"
        }).state("home.category", {
            url: '/category',
            templateUrl: "/admin/category/category.html",
            controller: "cat-ctrl"
        }).state("home.sizeproduct", {
            url: '/sizeproduct',
            templateUrl: "/admin/sizeproduct/sizeproduct.html",
            controller: "szpd-ctrl"
        })
        .state("home.supplier", {
            url: '/supplier',
            templateUrl: "/admin/supplier/supplier.html",
            controller: "sup-ctrl"
        })
        .state("home.statistical", {
            url: '/statistical',
            templateUrl: "/admin/statistical/statistical.html",
            controller: "statistical-ctrl"
        })
        .state("home.authority", {
            url: 'authority',
            templateUrl: "/admin/authority/authority.html",
            controller: "authority-ctrl"
        })
        .state("home.veghome", {
            redirectTo: function() {
                window.location = "/veg/home";
            }
        })
        .state("home.editprofile", {
            redirectTo: function() {
                window.location = "/veg/editprofile/user";
            }
        })
        .state("home.logoff", {
            redirectTo: function() {
                window.location = "/veg/logoff";
            }
        })

})

app.controller("admin-ctrl", function($scope, $http) {
    $scope.user = []
    $scope.chart = []
    $scope.infor = []
    $scope.init = async() => {
        try {
            $scope.getImage();
            $scope.getinfo();
            const respchart = await $http.get(`/rest/getchart`);
            $scope.chart = respchart.data;

            console.log("Success Chart", respchart);
        } catch (error) {
            console.log("Error", error);
        }
    }



    $scope.getImage = function() {
        $http.get(`/veg/getimage`).then(resp => {
            $scope.user = resp.data;
            if ($scope.user) {
                if ($scope.user.image.startsWith('https://')) {
                    $scope.image = $scope.user.image;
                } else {
                    $scope.image = '/images/user/' + $scope.user.image;
                }
            } else {
                location.href = "/veg/logoff"
            }
            console.log("Success", resp);
        }).catch(err => {
            console.log("Error", err);
        })
    }

    $scope.getinfo = function() {
        $http.get(`/rest/info`).then(resp => {
            $scope.infor = resp.data;
            console.log("Success", resp);
        }).catch(err => {
            console.log("Error", err);
        })
    }

    $scope.init();
})