import {safeApply} from 'ems';
class DropdownEditController {
  /* @ngInject */
  constructor(DropdownEditService) {
    this.dropdownEditService = DropdownEditService;
    this.renderDropdownEdit();
    this.initialize();
  }

  renderDropdownEdit() {
    this.drpState = {
      defaultText: 'Select',
      onChange: function (e) {
        console.log('Clicked');
      },
      defaultSize: 'flexible-width'
    };
  }
  initialize() {
    this.dropdownEditService.resolvePromise().then((response) => {
      this.drpStates.options.itemList = response;
      safeApply();
    });
  }
}

export default DropdownEditController;
