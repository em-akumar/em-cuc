class IncrementController {
  /* @ngInject */
  constructor(IncrementService) {
    this.incrementService = IncrementService;
  }
  initialize() {
    this.incrementService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default IncrementController;
