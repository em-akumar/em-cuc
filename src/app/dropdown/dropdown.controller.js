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
      onChange: (e) => {
        this.drpState.itemList = [{'value': 1, 'text': 'State1' + '-' + e.target.getAttribute('value')}, {'value': 2, 'text': 'State2' + '-' + e.target.getAttribute('value')}];
        safeApply();
      },
      valueField: 'alpha2Code',
      textField: 'name',
      defaultSize: 'large',
      sortField: 'alpha2Code',
      sortOrder: 'desc'
      };

    this.drpState = {
      defaultText: 'Select State',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'large'
    };

    // for Disabled items
    this.drpStateDisabledItem = {

      defaultText: 'Select One',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'large',
      itemList: [{ 'value': 1, 'text': 'State1', 'class': 'disabled' }, { 'value': 2, 'text': 'State2' }]
    };

    // for Divider items
    this.drpStateDividerItem = {

      defaultText: 'Select One',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'large',
      itemList: [{ 'value': 1, 'text': 'State1'}, { 'value': 2, 'text': 'State2', 'divider': 'true'}]
    };
    // for Large dropdown
    this.drpStateLarge = {

      defaultText: 'Select One',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'large',
      itemList: [{ 'value': 1, 'text': 'State1'}, { 'value': 2, 'text': 'State2'}]
    };
    // for Medium items
    this.drpStateMedium = {

      defaultText: 'Select One',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'medium',
      itemList: [{ 'value': 1, 'text': 'State1'}, { 'value': 2, 'text': 'State2'}]
    };
     // for Small items
    this.drpStateSmall = {

      defaultText: 'Select One',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'small',
      itemList: [{ 'value': 1, 'text': 'State1'}, { 'value': 2, 'text': 'State2'}]
    };
     // for Extra Small dropdown
    this.drpStateExtraSmall = {

      defaultText: 'Select One',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'xs',
      itemList: [{ 'value': 1, 'text': 'State1'}, { 'value': 2, 'text': 'State2'}]
    };
     // for Flexible dropdown
    this.drpStateFlexible = {

      defaultText: 'Select One',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'flexible-width',
      itemList: [{ 'value': 1, 'text': 'State1'}, { 'value': 2, 'text': 'State2'}]
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
