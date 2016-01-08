import {safeApply} from 'ems';
class DropdownController {
  /* @ngInject */
  constructor(DropdownService) {
    this.label = 'Dropdown Controller !!';
    this.dropdownService = DropdownService;
    this.initialize();
    this.renderDropdown();
  }

  /* The below example of country and state, on the selection of country (on change method), it shows up states */
  renderDropdown() {
    this.drpCountry = {
      defaultText: 'Select',
      onChange:(e) => {
        this.drpState.itemList = [{'value':1, 'text':'State1' + '-' + e.target.getAttribute('value')}, {'value':2, 'text':'State2' + '-' + e.target.getAttribute('value')}];
        safeApply();
      },
      valueField: 'alpha2Code',
      textField: 'name',
      defaultSize: 'large'
    };
    this.drpState = {
      defaultText: 'Select',
      onChange: function (e) {
        console.log('clicked');
      },
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
