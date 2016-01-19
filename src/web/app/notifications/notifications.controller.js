class NotificationsController {
  /* @ngInject */
  constructor(NotificationsService) {
    this.notificationsService = NotificationsService;
    this.renderNotification();
    // this.initialize();
  }
  renderNotification() {
    this.sNotifications = {
      headerText: 'Lorem ipsum nullam enim',
      bodyContent: 'Pellen tesque habitant morbi tristique senectus et negtus.',
      closeButton: true,
      sliderBtnFlag: 'true',
      sliderType: 'danger',
      sliderChkFlg: 'false',
      sliderAutoClose: 'false',
      containerEl: document.querySelector('#error-container')
    };
  }
  initialize() {
    this.notificationsService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default NotificationsController;
