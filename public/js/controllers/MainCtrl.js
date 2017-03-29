sampleApp.controller('MainController', function($scope, AdminCRUDService) {

	$scope.tagline = AdminCRUDService.myFunc(255);	

});