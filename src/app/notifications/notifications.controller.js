class NotificationsController {
  /* @ngInject */
  constructor(NotificationsService) {
    this.label = 'Notifications Controller !!';
    this.notificationsService = NotificationsService;
    // this.initialize();
  }
  initialize() {
    this.notificationsService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default NotificationsController;
