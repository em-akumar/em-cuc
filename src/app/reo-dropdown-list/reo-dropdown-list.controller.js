class ReodropdownListController {
  /* @ngInject */
  constructor() {
    this.label = 'ReodropdownList Controller !!';
    this.initialize();
  }

  initialize() {
    this.reoDropDownList = [
      {text: 'Item1', value: 'Item1'},
      {text: 'Item2', value: 'Item2'},
      {text: 'Item3', value: 'Item3'}
    ];
    this.onChange = (update)=> {
      console.log('this is from controller log');
      console.log(update);
    };
  }
}

export default ReodropdownListController;
