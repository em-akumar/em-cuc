import demoModule from './demo.module';
import DemoController from './demo.controller';
import demoComponent from './demo.component';
import demoTemplate from './demo.html';

describe('Demo', () => {
  let $rootScope, makeController; // eslint-disable-line no-unused-vars

  beforeEach(window.module(demoModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new DemoController();
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
      expect(demoTemplate).to.match(/{{\s?::\s?vm\.label\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
    let component = demoComponent();

    it('includes the intended template', () => {
      expect(component.template).to.equal(demoTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(DemoController);
    });
  });
});
