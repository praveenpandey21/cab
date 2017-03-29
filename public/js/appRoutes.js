angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

    // home page
        .when('/', {
        templateUrl: 'views/home.html',
        controller: 'MainController'
    })

    .when('/register', {
        templateUrl: 'views/register.html'//,
       //controller: 'BookingController'
    })

    .when('/admin', {
        templateUrl: 'views/admin.html',
        controller: 'AdminController'
    })

    .when('/login', {
        templateUrl: 'views/login.html'//,
        //controller: 'MoviesController'
    });

    $locationProvider.html5Mode(true);

}]);
