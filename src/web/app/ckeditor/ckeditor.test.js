import ckeditorModule from './ckeditor.module';
import CkeditorController from './ckeditor.controller';
import ckeditorComponent from './ckeditor.component';
import ckeditorTemplate from './ckeditor.html';

describe('Ckeditor', () => {
  let $rootScope, makeController; // eslint-disable-line no-unused-vars

  beforeEach(window.module(ckeditorModule.name));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new CkeditorController();
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
      expect(ckeditorTemplate).to.match(/{{\s?::\s?vm\.label\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
    let component = ckeditorComponent();

    it('includes the intended template', () => {
      expect(component.template).to.equal(ckeditorTemplate);
    });

    it('uses `controllerAs` syntax', () => {
      expect(component).to.have.property('controllerAs');
    });

    it('invokes the right controller', () => {
      expect(component.controller).to.equal(CkeditorController);
    });
  });
});
