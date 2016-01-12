/* eslint-disable */
class Dropdown {
  constructor(element, options = {}) {
    this.mainParent = typeof element === 'object' ? element : document.querySelector(element);
    this.options = options;
    this.reinit();
  }
  reinit() {
if(this.options !== undefined){
    if (Object.keys(this.options).length) {
      this.options.defaultText = this.options.defaultText || "Select item";
      this.options.itemList = this.options.itemList || [];
      this.options.size = this.options.defaultSize || 'medium';
      this.template = `<button  class="btn dropdown-toggle ${this.options.size}" type="button"  aria-haspopup="true" aria-expanded="true"><span class="selectedText pull-left ${this.options.size}">${this.options.defaultText}</span>
				<span class="caret"></span>
			</button>
			<ul class="dropdown-menu ${this.options.size}">
			${this.options.itemList.map((value, i) =>
        ` ${value.divider ? '<li class="divider"></li>' : ''}<li value="${value[this.options.valueField || 'value']}" class="${value.class === undefined ? '' : value.class}"><a value="${value[this.options.valueField || 'value']}">${value[this.options.textField || 'text']}</a></li>`
        ).join('') }
			</ul>`;
      this.mainParent.innerHTML = this.template;
    }
    this.menu = this.mainParent.querySelector(".btn");
    this.init();
    this.setList();
    this.setDisabled();
    this.setReadonly();
    this.setRestricted();
    this.setError();
    this.setDisabledItem();}
  }
  init() {
    var self = this;
    self.actions();
    self.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome
    self.menu.addEventListener('click', self.toggle, false);
    self.menu.addEventListener('blur', self.close, false);
  }
  setSelected(value) {
    var self = this;
    self.menu.parentNode.querySelector(".btn .selectedText").innerText = value[this.options.textField || 'text'];
				self.menu.parentNode.querySelector(".btn .selectedText").setAttribute('value', value[this.options.valueField || 'value']);
				if (!self.menu.parentNode.querySelector(".btn").classList.contains("completed")) {
      self.menu.parentNode.querySelector(".btn").classList.add("completed");
				}
  }
  setList() {
    var self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".dropdown-menu>li>a"), (value, i) => {
      value.addEventListener('click', (e) => {
        if (typeof self.options.onChange === 'function') {
          self.options.onChange(e);
        }
        self.menu.parentNode.querySelector(".btn .selectedText").innerText = value.innerText;
        self.menu.parentNode.querySelector(".btn .selectedText").setAttribute('value', value.parentNode.getAttribute('value'));
        if (!self.menu.parentNode.querySelector(".btn").classList.contains("completed")) {
          self.menu.parentNode.querySelector(".btn").classList.add("completed");
        }
      });

    });

  }

  setReadonly() {
    var self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".readonly .btn"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('readonly');
    });
  }

  setDisabledItem() {
    var self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".disabled a"), (value, j) => {
      value.classList.add('disabled');
    });
  }

  setDisabled() {
    var self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".disabled .dropdown-toggle"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('disabled');
    });

  }

  setRestricted() {
    var self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".restricted .dropdown-menu li a"), (value, i) => {
      value.innerHTML = '&#183;&#183;&#183;&#183;&#183;&#183;';
    });
    [].forEach.call(self.menu.parentNode.querySelectorAll(".restricted .dropdown-toggle"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('restricted');
      value.getElementsByTagName('span')[0].innerHTML = "&#183;&#183;&#183;&#183;&#183;&#183;";
    });
  }

  setError() {
    var self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".error .btn"), (value, i) => {
      value.classList.add('error');
      //self.menu.removeEventListener('blur', self.close);
    });
  }

  actions() {
    var self = this;

    self.toggle = function (e) {
      var target = e.currentTarget || e.srcElement;
      target.parentNode.classList.toggle('open');
      e.preventDefault();
      return false;
    };

    self.close = function (e) {
      var target = e.currentTarget || e.srcElement;

      setTimeout(function () { // links inside dropdown-menu don't fire without a short delay
        target.parentNode.classList.remove('open');
      }, 200);
    };
  }

  static load() {
    var Dropdowns = document.querySelectorAll('[class="em-dropdown"]');
    [].forEach.call(Dropdowns, function (item, index) {
      return new Dropdown(item);
    });
  }
}

export {Dropdown};
