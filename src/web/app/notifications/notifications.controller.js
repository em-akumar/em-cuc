class NotificationsController {
  /* @ngInject */
  constructor(NotificationsService) {
    this.notificationsService = NotificationsService;
    this.renderNotification();
    // this.initialize();
  }
  renderNotification() {
    this.pageNotifications = {
    //  headerText: 'Lorem ipsum nullam enim',
     // bodyContent: 'Pellen tesque habitant morbi tristique senectus et negtus.',
      contentTmpl: '<span class="alert-text-header">Errors Found - </span><span class="alert-text-body">&nbsp;Error message description.</span>',
      closeButton: 'true',
      sliderBtnFlag: 'true',
      sliderType: 'danger',
      sliderChkFlg: 'false',
      sliderAutoClose: 'false',
      sliderIconFlag: 'true',
      sliderPosition: 'fixed'
    };

    this.containerNotifications = {
    //  headerText: 'Lorem ipsum nullam enim',
     // bodyContent: 'Pellen tesque habitant morbi tristique senectus et negtus.',
      contentTmpl: '<span class="alert-text-header">4&nbsp;Errors Found - </span><span class="alert-text-body">&nbsp;Error message description.</span>',
      closeButton: 'true',
      sliderBtnFlag: 'true',
      sliderType: 'danger',
      sliderChkFlg: 'false',
      sliderAutoClose: 'false',
      sliderIconFlag: 'true',
      isComplex: 'true',
      complexTmpl: 'Complex details template will come here',
      containerEl: '#error-container' //For container notification pass ID/CLASS and for page level container no need to set this attribute.
    };
  }
  initialize() {
    this.notificationsService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default NotificationsController;
