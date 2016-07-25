import optionsModalTemplate from './templates/reo-dropdown-modal.mobile.html';

class ReodropdownListController {
  /* @ngInject */
  constructor($ionicModal, $scope) {
    this.ionicModal = $ionicModal;
    this.optionsModalTemplate = optionsModalTemplate;

    this.optionsModal = this.ionicModal.fromTemplate(this.optionsModalTemplate, {
      scope: $scope,
      animation: 'slide-in-up'
    });
    this.optionsModalState = false;// true -> OPEN false -> CLOSE
    this.title = this.title || 'Select Option';
    this.defaultTitle = 'Select';
    this.check_status = false;

    // check modal biding
    this.selected = this.selected || '';
  }

  toggleOptionModal() {
    if (this.optionsModalState) { // true opened
      this.optionsModal.hide();
    } else { // false closed
      this.optionsModal.show();
    }
    this.optionsModalState = !this.optionsModalState;
  }

  saveChange() { // done button click
    let tmp = [];

    for (let selected in this.checkboxModel) {
      this.checkboxModel[selected] ? tmp.push(this.options[selected]) : '';
    }

    this.selectedArray = tmp;
    let commaSeperated = [];
    // create comma seperated values
    for (let item of this.selectedArray) {
      commaSeperated.push(item.text);
    }
    commaSeperated = commaSeperated.join(',');
    this.selected = commaSeperated;

    this.onchange !== undefined ? this.onchange({ updated: commaSeperated }) : '';

    if (this.selectedArray.length > 0) {
      this.defaultTitle = `${this.selectedArray.length} selected`;
      this.check_status = true;
    } else {
      this.defaultTitle = 'Select';
      this.check_status = false;
    }

    this.toggleOptionModal();
  }
}

export default ReodropdownListController;
