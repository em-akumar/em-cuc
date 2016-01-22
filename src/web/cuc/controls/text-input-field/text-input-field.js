/* eslint-disable */
class TextInputField {
  constructor(element, options = {}) {
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = options;
    this.init();
  }

  init() {
    var self = this;
    self.element.addEventListener('click', () => {
      this.addOnPassword();

    }, false);
    this.action();
  }

  action() {
    this.addOnPassword();
  }

  addOnPassword() {
    var self = this;
    console.log(self.element.getAttribute('type'));
    if (self.element.getAttribute('type') == 'password') {
      self.element.setAttribute('type','text');
      self.element.classList.remove('em-eye-password');
      self.element.classList.add('em-eye-show-password');
    } else {
      self.element.setAttribute('type','password');
      self.element.classList.remove('em-eye-show-password');
      self.element.classList.add('em-eye-password');
    }
  }
  static load() {
    var textInputField = document.querySelectorAll('[class="em-eye-password"]');
    [].forEach.call(textInputField, function (item, index) {
      return new TextInputField(item);
    });
  }
}

export {TextInputField};
