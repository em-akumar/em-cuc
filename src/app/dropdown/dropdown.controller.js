import {safeApply} from 'ems';
class DropdownController {
  /* @ngInject */
  constructor(DropdownService) {
    this.label = 'Dropdown Controller !!';
    this.dropdownService = DropdownService;
    this.initialize();
    this.renderDropdown();

  }
  renderDropdown() {
    this.drpCountry = {
      defaultText: 'Select',
      onChange: function (e) {
        console.log('clicked');
      },
      valueField: 'alpha2Code',
      textField: 'name',
      defaultSize: 'large'
    };
  }
  initialize() {
    this.dropdownService.resolvePromise().then((response) => {
      this.drpCountry.itemList = response;
      safeApply();
    });
  }
}

export default DropdownController;
