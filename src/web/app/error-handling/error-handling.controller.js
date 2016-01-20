import {safeApply} from 'ems';
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
      itemList: [{value: 'M', text: 'Male'}, {value: 'F', text: 'Female'}],
      defaultSize: 'flexible-width',
      onChange: (e) => {
        this.drpMaritalStatus = e.target.getAttribute('value');
        safeApply();
      }
    };
  }
renderMaritalStatus1() {
  this.drpMarital1 = {
    defaultText: '',
    itemList: [{value: 'M', text: 'Male'}, {value: 'F', text: 'Female'}],
    defaultSize: 'flexible-width'

  };
}

  /* Render date of birth datepicker control */
  renderDateOfBirth() {
    this.dateTimePicker = {
      parent: 'jcalendar_parent1-angular',
      destDateField: 'txtDatePicker',
      destTimeField: 'txtTimePicker',
      disabledDates: ['14/12/2015', '15/12/2015', '16/12/2015'],
      onDateChange: function (e) { safeApply(); },
      onTimeChange: function (e) { safeApply(); }
    };
  }

  renderContainerError() {
   // modal noti options
   /* var sliderNotiOptions = {};
  //Modal Header Title
    sliderNotiOptions.headerText = 'Lorem ipsum nullam enim';
  //Modal Body content
  //Supported: HTML template or text
    sliderNotiOptions.bodyContent = 'Pellen tesque habitant morbi tristique senectus et negtus.';
  //Modal close icon
  //Default: true

    sliderNotiOptions.closeButton = true;
    sliderNotiOptions.sliderBtnFlag = 'true';
    sliderNotiOptions.sliderType = 'danger';
    sliderNotiOptions.sliderChkFlg = 'false';
    sliderNotiOptions.sliderAutoClose = 'false';
    sliderNotiOptions.containerEl = document.querySelector('#error-container');*/

    this.sNotifications = {
      headerText: 'Lorem ipsum nullam enim',
      bodyContent: 'Pellen tesque habitant morbi tristique senectus et negtus.',
      closeButton: true,
      sliderBtnFlag: 'true',
      sliderType: 'danger',
      sliderChkFlg: 'false',
      sliderAutoClose: 'false'
     // containerEl: document.querySelector('#error-container')
    };
    // this.SliderNotifications(sNotifications);

    // sliderNotiOptions;
  }

  initialize() {
    this.errorHandlingService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default ErrorHandlingController;
