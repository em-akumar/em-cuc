/* eslint-disable */
class DropdownEdit {
  constructor(element, options = {}) {
    this.mainParent = typeof element === 'object' ? element : document.querySelector(element);
    this.options = options;
    this.reinit();
  }
  reinit(){
    let isIcon=false;
    if (Object.keys(this.options).length) {
      this.options.defaultText = this.options.defaultText || "Select item";
      this.options.itemList = this.options.itemList || [];
      this.options.size = this.options.defaultSize || 'medium';

      this.template = `<div class="input-group"><input type="text" placeholder=${this.options.defaultText} class="form-control em-combobox ${this.options.size}">
      <div class="btn-group-text"><button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
      <span class="caret"></span></button>
			<ul class="dropdown-menu ${this.options.size}">
			${this.options.itemList.map(function(value, i){
          if(value.leftImage !==undefined || value.rightImage!==undefined){
            isIcon=true;
            return ` ${value.divider?'<li class="divider"></li>':''}<li value="${value[this.options.valueField || 'value']}" class="${value.class===undefined?'':value.class}"><a value="${value[this.options.valueField || 'value']}"><img class="${value.leftImage===undefined?'em-left-icon invisible':'em-left-icon'}" src="${value.leftImage===undefined?'':value.leftImage}" />${value[this.options.textField || 'text']} <img class="${value.rightImage===undefined?'em-right-icon invisible':'em-right-icon'}" src="${value.rightImage===undefined?'':value.rightImage}" /></a></li>`
          }
          else if(isIcon===true){
            return ` ${value.divider?'<li class="divider"></li>':''}<li value="${value[this.options.valueField || 'value']}" class="${value.class===undefined?'':value.class}"><a value="${value[this.options.valueField || 'value']}"><img class="em-left-icon invisible" src="${value.leftImage===undefined?'':value.leftImage}" />${value[this.options.textField || 'text']} <img class="em-right-icon invisible" src="${value.rightImage===undefined?'':value.rightImage}" /></a></li>`
          }
        else{
            if(isIcon===false){
                return ` ${value.divider?'<li class="divider"></li>':''}<li value="${value[this.options.valueField || 'value']}" class="${value.class===undefined?'':value.class}"><a value="${value[this.options.valueField || 'value']}">${value[this.options.textField || 'text']}</a></li>`
              }
          }

      }.bind(this)).join('')}
			</ul></div></div>`;
      this.mainParent.innerHTML = this.template;
    }
    this.menu = this.mainParent.querySelector(".btn");
    this.combobox = this.mainParent.querySelector(".em-combobox");
    this.init();
    this.setList();
    this.setDisabled();
    this.setReadonly();
    this.setRestricted();
    this.setError();
    this.setDisabledItem();
  }
  init() {
    var self = this;
    self.actions();
    self.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome
    self.menu.addEventListener('click', self.toggle, false);
    self.menu.addEventListener('blur', self.close, false);
  }
setSelected(value){
		var self = this;
		 self.combobox.parentNode.querySelector("input.form-control.em-combobox").value = value[this.options.textField || 'text'];;
        self.combobox.parentNode.querySelector("input.form-control.em-combobox").setAttribute('value',  value[this.options.valueField || 'value']);
        if (!self.combobox.parentNode.querySelector("input.form-control.em-combobox").classList.contains("completed")) {
          self.combobox.parentNode.querySelector("input.form-control.em-combobox").classList.add("completed");
        }
	}
  setList() {
    var self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".dropdown-menu>li>a"), (element, i) => {
      element.addEventListener('click', (e) => {
        if(typeof self.options.onChange === 'function'){
					self.options.onChange(e);
				}
        self.combobox.parentNode.querySelector("input.form-control.em-combobox").value = element.innerText;
        self.combobox.parentNode.querySelector("input.form-control.em-combobox").setAttribute('value', element.parentNode.getAttribute('value'));
        if (!self.combobox.parentNode.querySelector("input.form-control.em-combobox").classList.contains("completed")) {
          self.combobox.parentNode.querySelector("input.form-control.em-combobox").classList.add("completed");
        }
      });

      [].forEach.call(self.menu.parentNode.querySelectorAll(".dropdown-menu>li>img"), (element, i) => {
        element.setAttribute('src');
      });

    });

  }

  setReadonly() {
    var self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".readonly .btn"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('readonly');
    });

    [].forEach.call(self.combobox.parentNode.querySelectorAll(".readonly .em-combobox"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('readonly');
    });
  }

  setDisabledItem(){
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

    [].forEach.call(self.combobox.parentNode.querySelectorAll(".disabled .em-combobox"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('disabled');
    });

  }

  setRestricted() {
    var self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".restricted .btn"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('restricted');
    });

    [].forEach.call(self.combobox.parentNode.querySelectorAll(".restricted .em-combobox"), (element, i) => {
      element.value = '*******';
      element.setAttribute('disabled', 'disabled');
      element.classList.add('restricted');
    });
  }

  setError() {
    var self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".error .btn"), (value, i) => {
      value.classList.add('error');
      self.menu.removeEventListener('blur', self.close);
    });
    [].forEach.call(self.combobox.parentNode.querySelectorAll(".error .em-combobox"), (value, i) => {
      value.classList.add('error');
      self.combobox.removeEventListener('blur', self.close);
    });
  }

  actions() {
    var self = this;

    self.toggle = function (e) {
      var target = e.currentTarget || e.srcElement;
     // alert(target);
      target.parentNode.classList.add('open');
     // target.parentNode.addClass +=" open";
      target.parentNode.classList.toggle('open');
    //  console.log(target.parentNode);
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
    var DropdownsEdit = document.querySelectorAll('[class="em-dropdown-edit"]');
    [].forEach.call(DropdownsEdit, function (item, index) {
      return new DropdownEdit(item);
    });
  }
}

export {DropdownEdit};