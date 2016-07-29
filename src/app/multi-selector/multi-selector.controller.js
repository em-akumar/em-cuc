class MultiSelectorController {
  /* @ngInject */
  constructor() {
    this.label = 'MultiSelector Controller !!';
    this.initialize();
  }

  initialize() {
    this.options = [
      {text: 'Item1', value: 'Item1'},
      {text: 'Item2', value: 'Item2'},
      {text: 'Item3', value: 'Item3'}
    ];
    this.optionsPreSelected = [
      {text: 'Item1', value: 'Item1'},
      {text: 'Item2', value: 'Item2'},
      {text: 'Item3', value: 'Item3'}
    ];
    this.onChange = (updated)=> {
      console.log('this is from controller log');
      console.log(updated);
    };
    this.selected=[];
    this.selected.push(this.optionsPreSelected[0]);
  }
}

export default MultiSelectorController;
