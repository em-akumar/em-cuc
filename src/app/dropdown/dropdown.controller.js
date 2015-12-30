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
        this.drpState.itemList = [{'value':1, 'text':'State1' + '-' + e.target.getAttribute('value')}, {'value':2, 'text':'State2' + '-' + e.target.getAttribute('value')}];
        safeApply();
      }.bind(this),
      valueField: 'alpha2Code',
      textField: 'name',
      defaultSize: 'large'
    };
    this.drpState = {
      defaultText: 'Select',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'medium'
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
