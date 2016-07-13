import {safeApply} from 'ems/core';
class DropdownEditController {
  /* @ngInject */
  constructor(DropdownEditService) {
    this.dropdownEditService = DropdownEditService;
    this.initialize();
    this.renderDropdownEdit();
  }

  renderDropdownEdit() {
    this.drpState = {
      defaultText: ' ',
      onChange: function (e) {
        console.log('Clicked');
      },
      valueField: 'alpha2Code',
      textField: 'name',
      sortField: 'alpha2Code',
      sortOrder: 'desc'
    };

    // for Disabled items
    this.drpStateDisabledItem = {

      defaultText: '',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'large',
      itemList: [{ 'value': 1, 'text': 'State1', 'class': 'disabled' }, { 'value': 2, 'text': 'State2' }]
    };

    // for Divider items
    this.drpStateDividerItem = {

      defaultText: '',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'large',
      itemList: [{'value': 1, 'text': 'State1'}, {'value': 2, 'text': 'State2'}, {'value': 3, 'text': 'State3', 'divider': 'true'}]
    };
    // for Large dropdown
    this.drpStateLarge = {

      defaultText: '',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'large',
      itemList: [{'value': 1, 'text': 'State1'}, {'value': 2, 'text': 'State2'}]
    };
    // for Error dropdown
    this.drpStateError = {

      defaultText: '',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'large',
      itemList: [{'value': 1, 'text': 'State1'}, {'value': 2, 'text': 'State2'}]
    };
    // for Medium items
    this.drpStateMedium = {

      defaultText: '',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'medium',
      itemList: [{'value': 1, 'text': 'State1'}, {'value': 2, 'text': 'State2'}]
    };
     // for images items
    this.drpStateImages = {
      defaultText: '',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'medium',
      itemList: [{'value': 1, 'text': 'State1'}, {'value': 2, 'text': 'State2'}]
     // itemList: [{ 'value': 1, 'text': 'State1' }, {'value': 2, 'text': 'State2', leftImage: 'icon-lock-locked-locked.svg', rightImage: 'icon-lock-locked-locked.svg'}, { value: 'val2', text: 'Item List-2', rightImage: 'icon-lock-locked-locked.svg' }]
    };

     // for Small items
    this.drpStateSmall = {

      defaultText: '',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'small',
      itemList: [{'value': 1, 'text': 'State1'}, {'value': 2, 'text': 'State2'}]
    };
     // for Extra Small dropdown
    this.drpStateExtraSmall = {

      defaultText: '',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'xs',
      itemList: [{'value': 1, 'text': 'State1'}, {'value': 2, 'text': 'State2'}]
    };
     // for Flexible dropdown
    this.drpStateFlexible = {

      defaultText: '',
      onChange: function (e) {
        console.log('clicked');
      },
      defaultSize: 'flexible-width',
      itemList: [{'value': 1, 'text': 'State1'}, {'value': 2, 'text': 'State2'}]
    };
  }
  initialize() {
    this.dropdownEditService.resolvePromise().then((response) => {
      this.drpState.itemList = response.data;
      safeApply();
    });
  }
}

export default DropdownEditController;
