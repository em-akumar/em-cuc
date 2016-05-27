class NotificationsController {
  /* @ngInject */
  constructor(NotificationsService) {
    this.notificationsService = NotificationsService;
    this.renderNotification();
    // this.initialize();
  }
  //Page notification
  renderNotification() {
    this.pageNotifications = {
      contentTmpl: '<span class="alert-text-header">Errors Found - </span><span class="alert-text-body">&nbsp;Error message description.</span>', // notification html template
      closeButton: 'true',  // notification close icon 'true' , 'false'
      sliderType: 'danger', // notification type 'error', 'success', 'warning'
      sliderAutoClose: 'true', // notification auto close 'true', 'false'
      sliderIconFlag: 'true', // notification image icon 'true', 'false'
      sliderPosition: 'fixed' // Notification sticky 'fixed', by default non-sticky 'relative'
    };

    // Container notification
    this.containerNotifications = {
      contentTmpl: '<span class="alert-text-header">Errors Found - </span><span class="alert-text-body">&nbsp;Error message description.</span>',
      closeButton: 'true',
      sliderType: 'success',
      sliderAutoClose: 'false',
      sliderIconFlag: 'true',
     // isComplex: 'true', // Notification details (complex) 'true', 'false'
     // complexTmpl: 'Complex details template will come here', // notification details html template
      containerEl: '#abc' // Container element id.
    };

 this.containerNotifications1 = {
      contentTmpl: '<span class="alert-text-header">Errors Found1 - </span><span class="alert-text-body">&nbsp;Error message description.</span>',
      closeButton: 'true',
      sliderType: 'success',
      sliderAutoClose: 'false',
      sliderIconFlag: 'true',
     // isComplex: 'true', // Notification details (complex) 'true', 'false'
     // complexTmpl: 'Complex details template will come here', // notification details html template
      containerEl: '#abc' // Container element id.
    };
  }
  initialize() {
    this.notificationsService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default NotificationsController;
