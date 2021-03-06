import modalTemplate from './modalTemplate.html';

class ModalController {
  /* @ngInject */
  constructor(ModalService, $uibModal, $scope) {
    this.$uibModal = $uibModal;
    this.modalService = ModalService;
    this.$scope = $scope;
    // this.initialize();
  }

  // Open angular ui bootstrap model on the click
  open(size) {
    var modalInstance = this.$uibModal.open({
      template: modalTemplate,
      /* @ngInject */
      controllerAs: 'vm',
      /* @ngInject */
      controller: function ($scope, $uibModalInstance) {
        $scope.ok = function () {
          $uibModalInstance.dismiss('ok');
        };

        $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
        };
      },
      size: size
    });

    modalInstance.result.then(function (selectedItem) {
      this.$scope.selected = selectedItem;
    }, function () {
      console.log('Modal dismissed at: ' + new Date());
    });
  }

  initialize() {
    this.modalService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ModalController;
