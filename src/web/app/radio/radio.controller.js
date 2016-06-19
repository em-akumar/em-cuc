class radioController {
  /* @ngInject */
  constructor(radioService) {
    this.radioService = radioService;
    // this.initialize();
  }
  initialize() {
    this.radioService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default radioController;
