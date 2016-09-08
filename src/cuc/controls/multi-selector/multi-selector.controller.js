import optionsModalTemplate from './templates/multi-selector-modal.mobile.html';

class MultiSelectorController {
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
    this.required = this.required || false;

    // check modal biding
    this.selected = this.selectedArray = this.selected || '';
    this.selectedCount = this.selectedArray.length || 0;
    this._checkStatus();
    this._initializePreSelect();
  }

  toggleOptionModal() {
    if (this.optionsModalState) { // true opened
      this.optionsModal.hide();
    } else { // false closed
      this.optionsModal.show();
    }
    this.optionsModalState = !this.optionsModalState;
  }

  validatedCheck(itemCheck) {
    itemCheck ? this.selectedCount++ : this.selectedCount--;
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
      commaSeperated.push(item);
    }
    //commaSeperated = commaSeperated.join(',');
    this.selected = commaSeperated;

    this.onDone !== undefined ? this.onDone({updated: commaSeperated}) : '';

    this._checkStatus();

    this.toggleOptionModal();
  }

  _checkStatus() {
    if (this.selectedArray.length > 0) {
      this.defaultTitle = `${this.selectedArray.length} selected`;
      this.check_status = true;
    } else {
      this.defaultTitle = 'Select';
      this.check_status = false;
    }
  }

  _initializePreSelect() {
    this.checkboxModel = [];
    for (let item of this.options) {
      let isPreSelected = this.selected.indexOf(item) > -1 ? true : false;
      this.checkboxModel.push(isPreSelected);
    }
  }
}

export default MultiSelectorController;
