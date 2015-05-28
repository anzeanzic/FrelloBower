angular.module('frello').controller('FrelloController', function($scope, $modal, FrelloFactory) {
	$scope.frello = FrelloFactory;

	// modal
	$scope.open = function(task) { 
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'modal.html',
			controller: 'ModalController',
			resolve: {
				clickedTask: function() {
					return task;
				}
			}
    	});
	}

	// listener
	$scope.$on('frello.notification', function(event, data){
        $scope.status = data;
    });
});