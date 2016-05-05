/* eslint-disable */
class TextInputField {
  constructor(element, options = {}) {
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.span_password = null;
    this.options = options;
    this.init();
  }

  init() {
    var self = this;

    if (self.element) {
      //create hide/show span
      self.span_password = document.createElement('span');
      self.span_password.setAttribute('class', 'em-toggle-password');
      self.element.parentNode.insertBefore(self.span_password, self.element.nextSibling);

      self.span_password.addEventListener('click', () => {
          this.addOnPassword();

        }, false);
    }

  }

/* Valid of password input type, On the click of eye icon, convert into text type and vice versa */
  addOnPassword() {
    var self = this;
    if (self.element.getAttribute('type') == 'password') {
      self.element.setAttribute('type','text');
      self.span_password.classList.remove('em-toggle-password');
      self.span_password.classList.add('em-toggle-show-password');
    } else if (self.element.getAttribute('type') == 'ssn') {
      if (self.element.value.indexOf('xxx') === -1) {
        sessionStorage.setItem('ssnValue', self.element.value);
        var temp = self.element.value.substr(0, 9);
        self.element.value = self.element.value.replace(temp, ' xxx - xx ');
      } else {
        self.element.value=sessionStorage.getItem('ssnValue');
      }

    }else {
      self.element.setAttribute('type','password');
      self.span_password.classList.remove('em-toggle-show-password');
      self.span_password.classList.add('em-toggle-password');
    }
  }

  static load() {
    var textInputField = document.querySelectorAll('[class="em-toggle-password"]');
    [].forEach.call(textInputField, function (item, index) {
      return new TextInputField(item);
    });
  }
}

export {TextInputField};
