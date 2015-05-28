angular.module('frello').controller('ModalController', function($scope, $modalInstance, FrelloFactory, clickedTask) {
	$scope.frello = FrelloFactory;
	$scope.editedTask = clickedTask.name;
	$scope.TaskNameChanged = true;

	$scope.Confirm = function () {
		var TaskNameChanged = $scope.frello.editTask(clickedTask, $scope.editedTask);
		if (TaskNameChanged) {
			$scope.TaskNameChanged = true;
			$modalInstance.close('');
		}
		else {
			$scope.TaskNameChanged = false;
		}
	};

	$scope.Cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});