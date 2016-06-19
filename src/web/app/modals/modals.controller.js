import modalTemplate from './modalTemplate.html';

class modalsController {
  /* @ngInject */
  constructor(modalsService, $uibModal) {
    this.$uibModal = $uibModal;
    //this.$scope = $scope;
    this.modalsService = modalsService;
    // this.initialize();
  }

  // Open angular ui bootstrap model on the click
  open(size) {
    var modalInstance = this.$uibModal.open({
      template: modalTemplate,
      /* @ngInject */
      controllerAs: 'vm',
      /* @ngInject */
      controller: function($scope, $uibModalInstance) {
        $scope.ok = function() {
          $uibModalInstance.dismiss('ok');
        };

        $scope.cancel = function() {
          $uibModalInstance.dismiss('cancel');
        };
      },
      size: size,
      windowClass: 'em-modal'
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  initialize() {
    this.modalsService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default modalsController;
