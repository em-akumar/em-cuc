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
      defaultText: '',
      onChange: function (e) {
        this.drpState.itemList = [
          {
            'value':1,
            'text':'State1'
          },
          {
            'value':2,
            'text':'State2'
          }
        ];
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
      valueField: 'alpha2Code',
      textField: 'name',
      defaultSize: 'medium'
    };
  }
  initialize() {
    this.dropdownService.resolvePromise().then((response) => {
      this.drpCountry.itemList = response;
      this.drpState.itemList = response;
      safeApply();
    });
  }
}

export default DropdownController;
