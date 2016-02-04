import radioButtonModule from './radio-button.module';
import RadioButtonController from './radio-button.controller';
import radioButtonComponent from './radio-button.component';
import radioButtonTemplate from './radio-button.html';

describe('RadioButton', () => {
  let $rootScope, makeController; // eslint-disable-line no-unused-vars

  beforeEach(window.module(radioButtonModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new RadioButtonController();
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
      expect(radioButtonTemplate).to.match(/{{\s?::\s?vm\.label\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
    let component = radioButtonComponent();

    it('includes the intended template', () => {
      expect(component.template).to.equal(radioButtonTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(RadioButtonController);
    });
  });
});
