class TextInputController {
  /* @ngInject */
  constructor(TextInputService) {
    this.textInputService = TextInputService;
    // this.initialize();
    this.change_event = ($event) => {
      console.log(angular.element($event.srcElement).hasClass('locked'));
      if (angular.element($event.srcElement).hasClass('locked')) {
        angular.element($event.srcElement).removeClass('locked').addClass('active').next('div').find('input').attr('readonly', false);
      } else {
        angular.element($event.srcElement).removeClass('active').addClass('locked').next('div').find('input').attr('readonly', true);
      }
    }
  }
  initialize() {
    this.textInputService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default TextInputController;
