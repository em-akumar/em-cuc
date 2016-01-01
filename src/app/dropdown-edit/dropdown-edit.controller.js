import {safeApply} from 'ems';
class DropdownEditController {
  /* @ngInject */
  constructor(DropdownEditService) {
    this.label = 'Dropdown Edit Controller !!';
    this.dropdownEditService = DropdownEditService;
    this.initialize();
    this.renderDropdownEdit();
  }

  renderDropdownEdit() {
    this.drpState = {
      defaultText: 'Select',
      onChange: function (e) {
        console.log('Clicked');
      },
      valueField: 'alpha2Code',
      textField: 'name',
      defaultSize: 'flexible-width'
    };
  }
  initialize() {
    this.dropdownEditService.resolvePromise().then((response) => {
      this.drpState.itemList = response;
      safeApply();
    });
  }
}

export default DropdownEditController;
