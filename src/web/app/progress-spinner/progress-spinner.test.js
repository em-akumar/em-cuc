import {progressSpinnerModule} from './progress-spinner.module';
import ProgressspinnerController from './progress-spinner.controller';
import progressSpinnerTemplate from './progress-spinner.html';

describe('Progressspinner', () => {
  let $rootScope, makeController; // eslint-disable-line no-unused-vars

  beforeEach(window.module(progressSpinnerModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new ProgressspinnerController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a label property [REMOVE]', () => { // erase if removing this.label from the controller
      let controller = makeController();
      expect(controller).to.have.property('label');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has label in template [REMOVE]', () => {
      expect(progressSpinnerTemplate).to.match(/{{\s?::\s?vm\.label\s?}}/g);
    });
  });
});
