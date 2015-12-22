export default class AppController {
  /* @ngInject */
  constructor(AppService) {
    this.label = 'App Controller !!';
    this.appService = AppService;
    // this.initialize();
  }
  initialize() {
    this.appService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}
