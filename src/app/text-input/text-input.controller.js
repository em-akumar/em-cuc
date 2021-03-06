import angular from 'angular';
class TextInputController {
  /* @ngInject */
  constructor(TextInputService) {
    this.textInputService = TextInputService;
    this.numWithCurrencyValue = 1224432453242;
    this.options = {
      defaultText: '323-22-2322',
      onChange: (target) => {
          // ssn value chnage handler.
      }
    };
  this.lockFieldOptions = {
    align: 'left',
    isActive: true,
    click: (e) => {
      console.log('clicked');
    }
  };
    // this.initialize();
    this.change_event = ($event) => {
      console.log(angular.element($event.srcElement).hasClass('locked'));
      if (angular.element($event.srcElement).hasClass('locked')) {
        angular.element($event.srcElement).removeClass('locked').addClass('active').next('div').find('input').attr('readonly', false);
      } else {
        angular.element($event.srcElement).removeClass('active').addClass('locked').next('div').find('input').attr('readonly', true);
      }
    };
  }
  initialize() {
    this.textInputService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default TextInputController;
