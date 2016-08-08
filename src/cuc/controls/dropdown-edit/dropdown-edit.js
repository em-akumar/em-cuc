/* eslint-disable */
class DropdownEdit {
  constructor(element, options = {}) {
    this.mainParent = typeof element === 'object' ? element : document.querySelector(element);
    this.options = options;
    this.reinit();
  }
  reinit() {
    if (this.options) {
      let isIcon = false;
      if (Object.keys(this.options).length) {
        this.options.defaultText = (this.options.defaultText === undefined) ? " " : this.options.defaultText;
        this.options.itemList = this.options.itemList || [];
        this.options.sortField = this.options.sortField || this.options.textField || 'text';
        this.options.sortOrder = this.options.sortOrder || 'asc';
        this.options.size = this.options.defaultSize || 'medium';

        //Sort dropdown values
        if (this.options.itemList) {
          this.options.itemList.sort((obj1, obj2) => {
            let x = obj1[this.options.sortField].toLowerCase();
            let y = obj2[this.options.sortField].toLowerCase();
            if (this.options.sortOrder === 'desc') {
              return x > y ? -1 : x < y ? 1 : 0;
            } else {
              return x < y ? -1 : x > y ? 1 : 0;
            }
          });
        }

        //Check wheather any item has image in dropdown options
        let IconFlagEdit = false;
        for (let i = 0; i < this.options.itemList.length; i++) {
          if (this.options.itemList[i].leftImage != undefined) {
            IconFlagEdit = true;
            break;
          }
        }

        this.template = `<div class="input-group"><input type="text" placeholder="${this.options.defaultText}" class="form-control em-combobox selectedText ${this.options.size}" tabindex="-1">
      <div class="btn-group-text"><button type="button" class="btn dropdown-toggle" data-toggle="dropdown">
      <span class="caret"></span></button>
			<ul class="dropdown-menu ${this.options.size}" role="menu">
			${this.options.itemList.map((value, i) =>
            ` ${value.divider ? '<li class="divider"></li>' : ''}<li value="${value[this.options.valueField || 'value']}" class="${value.class === undefined ? '' : value.class}"><a value="${value[this.options.valueField || 'value']}">${value.leftImage !== undefined ? `<img class="em-left-icon" src="${value.leftImage}" />` : (IconFlagEdit == true) ? '<span class="em-left-icon"></span>' : ''} ${value[this.options.textField || 'text']}
       ${value.rightImage !== undefined ? `<img class="em-right-icon" src="${value.rightImage}" />` : ``}</a> </li>`
          ).join('')}
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
      this.trackInputChange();
    }
  }
  init() {
    let self = this;
    self.actions();
    self.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome
    self.menu.addEventListener('click', self.toggle, false);
    self.menu.addEventListener('focus', self.open, false);
     self.menu.addEventListener('blur', self.close, false);

    self.menu.parentNode.addEventListener('click', (e) => {
      e.stopPropagation();
    });
    //document.addEventListener('click', self.closeit.bind(self), false);
    self.menu.parentNode.querySelector('.dropdown-menu').addEventListener('mousedown', (e) => {
      self.mousedown = true;
    });
     document.addEventListener('click', self.close, false);

    document.getElementsByTagName('html')[0].addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {  //Closes dropdown on Esc key
        self.menu.parentNode.classList.remove('open');
      }
    });

    self.menu.parentNode.querySelector('.dropdown-menu').addEventListener('mouseover', (e) => {
      let dropdownSelect = self.menu.parentNode.querySelector('.dropdown-menu li.selected-text');

      if (dropdownSelect && dropdownSelect.classList.contains('selected-text')) {
        dropdownSelect.classList.remove('selected-text');
      }
    });
    self.menu.addEventListener('keydown', (e) => {
      if (e.keyCode === 40) {  // scroll dropdown option using down array key
        let list = self.menu.parentNode.querySelectorAll('.dropdown-menu li');
        let index = 0;
        while (index < list.length) {
          let item = list[index];
          if (item.classList.contains('selected-text')) {
            if (list.length >= (index)) {
              item.classList.remove('selected-text');
              list[index + 1].classList.add('selected-text');

              break;
            }
          }
          index++;
        }
        e.preventDefault();
      }

      if (e.keyCode === 38) { // scroll dropdown option using up array key
        let list = self.menu.parentNode.querySelectorAll('.dropdown-menu li');
        let index = 0;
        while (index < list.length) {
          let item = list[index];
          if (item.classList.contains('selected-text')) {
            if (index > 0) {
              item.classList.remove('selected-text');
              list[index - 1].classList.add('selected-text');

              break;
            }
          }
          index++;
        }
        e.preventDefault();
      }
      if (e.keyCode === 13) { // select dropdwon value on enter key
        if (!self.menu.parentNode.querySelector('li.selected-text').classList.contains("disabled")) {
          let item = self.menu.parentNode.querySelector('li.selected-text a');
          self.combobox.parentNode.querySelector("input.form-control.em-combobox").value = item.innerText || item.textContent;

          self.combobox.parentNode.querySelector("input.form-control.em-combobox").setAttribute('value', item.parentNode.getAttribute('value'));
          if (!self.combobox.parentNode.querySelector("input.form-control.em-combobox").classList.contains("completed")) {
            self.combobox.parentNode.querySelector("input.form-control.em-combobox").classList.add("completed");
          }
        }
      }
    });
  }


  trackInputChange() {
    if (typeof this.options.onChange === 'function') {
      this.mainParent.querySelector('input').addEventListener('input', (e) => {
        this.options.onChange(e);
      });
    }
  }


  setSelected(value) {
    let self = this;
    if (typeof value === 'object' && value !== null) {
      self.combobox.parentNode.querySelector("input.form-control.em-combobox").value = value[this.options.textField || 'text'];;
      self.combobox.parentNode.querySelector("input.form-control.em-combobox").setAttribute('value', value[this.options.valueField || 'value']);
    }
    else if (value) {
      this.mainParent.querySelector('input').value = value;
    }

    if (!self.combobox.parentNode.querySelector("input.form-control.em-combobox").classList.contains("completed")) {
      self.combobox.parentNode.querySelector("input.form-control.em-combobox").classList.add("completed");
    }
  }
  setList() {
    let self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".dropdown-menu>li>a"), (element, i) => {
      element.addEventListener('click', (e) => {
        if (typeof self.options.onChange === 'function') {
          self.options.onChange(e);
        }
        self.combobox.parentNode.querySelector("input.form-control.em-combobox").value = element.innerText || element.textContent;
        self.combobox.parentNode.querySelector("input.form-control.em-combobox").setAttribute('value', element.parentNode.getAttribute('value'));
        if (!self.combobox.parentNode.querySelector("input.form-control.em-combobox").classList.contains("completed")) {
          self.combobox.parentNode.querySelector("input.form-control.em-combobox").classList.add("completed");
        }
      });

      [].forEach.call(self.menu.parentNode.querySelectorAll(".dropdown-menu>li>img"), (element, i) => {
        element.setAttribute('src');
      });
      element.addEventListener('mouseover', (e) => {
        if (e.target.offsetWidth < e.target.scrollWidth)
          e.target.setAttribute('title', e.target.innerHTML);
      });

    });

  }

  setReadonly() {
    let self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".readonly .btn"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('readonly');
    });

    [].forEach.call(self.combobox.parentNode.querySelectorAll(".readonly .em-combobox"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('readonly');
    });
  }

  setDisabledItem() {
    let self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".disabled a"), (value, j) => {
      value.classList.add('disabled');
    });
  }

  setDisabled() {
    let self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".disabled .dropdown-toggle"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('disabled');
    });

    [].forEach.call(self.combobox.parentNode.querySelectorAll(".disabled .em-combobox"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('disabled');
    });
  }

  setEnabled() {
    let self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".disabled .dropdown-toggle"), (value, i) => {
      value.removeAttribute('disabled');
      value.classList.remove('disabled');
    });

    [].forEach.call(self.combobox.parentNode.querySelectorAll(".disabled .em-combobox"), (value, i) => {
      value.removeAttribute('disabled', 'disabled');
      value.classList.remove('disabled');
    });
  }

  setRestricted() {
    let self = this;
    [].forEach.call(self.menu.parentNode.querySelectorAll(".restricted .btn"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('restricted');
    });

    [].forEach.call(self.combobox.parentNode.querySelectorAll(".restricted .em-combobox"), (element, i) => {

      element.value = '······';
      element.setAttribute('disabled', 'disabled');
      element.classList.add('restricted');
    });
  }

  setError() {
    let self = this;
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
    let self = this;

    self.toggle = (e) => {
      let target = e.currentTarget || e.srcElement;
      self.menu.parentNode.classList.remove("dropup");

      target.parentNode.classList.toggle('open');
      //dropdown position left or right justify
      let dropdownUL = self.menu.parentNode.querySelector('.dropdown-menu');
      var divposition = dropdownUL.getBoundingClientRect();

       if( (window.innerHeight - (divposition.top + divposition.height)) < 0) {
        self.menu.parentNode.classList.add("dropup");
      }

      // if dropdown is off to right side
      if( (divposition.left + divposition.width) > window.innerWidth) {
        dropdownUL.classList.add("dropdown-right-off");
      }

      let selValue = self.combobox.parentNode.querySelector("input.form-control.em-combobox").getAttribute('value');

      if (selValue == '' || selValue == null) {
        self.menu.parentNode.querySelector('.dropdown-menu li:first-child').classList.add('selected-text');
      } else {
        self.menu.parentNode.querySelector("li[value='" + selValue + "']").classList.add('selected-text');
      }
      e.preventDefault();
      return false;
    };

    self.open = (e) => {
      let target = self.menu;

      setTimeout(()=> { // links inside dropdown-menu don't fire without a short delay
        if (target.parentNode && target.parentNode !== null) {
          target.parentNode.classList.add('open');
        }
      }, 200);
    };

    self.close = (e) =>  {
      if (self.mousedown) {
        self.mousedown = false;
        return true;
      }
      let target = self.menu;
      setTimeout(()=> { // links inside dropdown-menu don't fire without a short delay
        if (target.parentNode && target.parentNode !== null) {
          self.menu.parentNode.classList.remove("dropup");
          target.parentNode.classList.remove('open');
        }
      }, 200);
    };
  }

  static load() {
    let DropdownsEdit = document.querySelectorAll('[class="em-dropdown-edit"]');
    [].forEach.call(DropdownsEdit, function (item, index) {
      return new DropdownEdit(item);
    });
  }
}

export {DropdownEdit};
