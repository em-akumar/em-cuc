class ErrorHandlingController {
  /* @ngInject */
  constructor(ErrorHandlingService) {
    this.label = 'ErrorHandling Controller !!';
    this.errorHandlingService = ErrorHandlingService;
    this.renderMaritalStatus();
    this.renderMaritalStatus1();
    this.renderDateOfBirth();
    this.renderContainerError();
    // this.initialize();
  }



  /* Render Marital Status dropdown control */
  renderMaritalStatus() {
    this.drpMarital = {
      defaultText: '',
      itemList:[{value:'M', text:'Male'}, {value:'F', text:'Female'}],
      defaultSize: 'flexible-width'
    };
  }
renderMaritalStatus1() {
  this.drpMarital1 = {
    defaultText: '',
    itemList:[{value:'M', text:'Male'}, {value:'F', text:'Female'}],
    defaultSize: 'flexible-width'
  };
}

  /* Render date of birth datepicker control */
  renderDateOfBirth() {
    this.dateTimePicker = {
      parent: 'jcalendar_parent1-angular',
      destDateField: 'txtDatePicker',
      destTimeField: 'txtTimePicker',
      disabledDates: ['14/12/2015', '15/12/2015', '16/12/2015']
    };
  }

  renderContainerError() {
   //modal noti options
    let sliderNotiOptions = {};
  //Modal Header Title
    sliderNotiOptions.headerText = 'Lorem ipsum nullam enim';
  //Modal Body content
  //Supported: HTML template or text
    sliderNotiOptions.bodyContent = 'Pellen tesque habitant morbi tristique senectus et negtus.';
  //Modal close icon
  //Default: true
    sliderNotiOptions.closeButton = true;
    sliderNotiOptions.sliderBtnFlag = true;
    sliderNotiOptions.sliderType = 'Error';
    sliderNotiOptions.sliderChkFlg = 'Default';
    sliderNotiOptions.sliderAutoClose = 'yes';
    sliderNotiOptions.containerEl = document.querySelector('.em-category-box');
    this.SliderNotifications = sliderNotiOptions;
  }

  initialize() {
    this.errorHandlingService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ErrorHandlingController;
