class ReodropdowntController {
  /* @ngInject */
  constructor(ReodropdowntService) {
    this.label = 'Reodropdownt Controller !!';
    this.reoDropdownTService = ReodropdowntService;
    this.initialize();
  }
  initialize() {
    this.drpCountry = {
      defaultText: 'Select',
      onChange: (e) => {},
      valueField: 'text',
      textField: 'text',
      defaultSize: 'large',
      itemList: [{ 'value': 1, 'text': 'State1', 'class': 'disabled' }, { 'value': 2, 'text': 'State2' }]
    };
    this.drpCountry2 = {
      defaultText: 'Select',
      onChange: (selected) => {
        console.log('this is from controller log');
        console.log(selected);
      },
      valueField: 'value',
      textField: 'text',
      defaultSize: 'medium',
      itemList: [{ 'value': 1, 'text': 'State1', 'class': 'disabled' }, { 'value': 2, 'text': 'State2' }]
    };
  }
}

export default ReodropdowntController;
