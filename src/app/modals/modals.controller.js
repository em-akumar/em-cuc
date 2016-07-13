import modalTemplate from './modalTemplate.html';

class modalsController {
  /* @ngInject */
  constructor(modalsService, $uibModal, $scope) {
    this.$uibModal = $uibModal;
    this.$scope = $scope;
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
      controller: ($scope, $uibModalInstance) => {
        $scope.ok = () => {
          $uibModalInstance.dismiss('ok');
        };

        $scope.cancel = () => {
          $uibModalInstance.dismiss('cancel');
        };
      },
      size: size,
      windowClass: 'em-modal'
    });

    modalInstance.result.then((selectedItem) => {
      this.$scope.selected = selectedItem;
    }, function () {
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
