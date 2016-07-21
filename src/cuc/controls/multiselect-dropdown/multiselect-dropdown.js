/* eslint-disable */
class MultiSelectDropdown {
  constructor(element, options = {}) {
    this.mainParent = typeof element === 'object' ? element : document.querySelector(element);
    this.options = options;
    this.reinit();
  }

  reinit() {
    if (this.options) {
      if (Object.keys(this.options).length) {
        this.options.defaultText = (!this.options.defaultText) ? "Select" : this.options.defaultText;
        this.options.itemList = this.options.itemList || [];
        this.options.selectedOptions = this.options.selectedOptions || [];
        this.options.selectedOptionsText = this.options.selectedOptionsText || [];
        this.options.sortField = this.options.sortField || this.options.textField || 'text';
        this.options.sortOrder = this.options.sortOrder || 'asc';
        this.options.size = this.options.defaultSize || 'medium';
        this.sortFieldType = this.options.sortFieldType || 'text';

        //Sort dropdown values
        this.itemList = this.options.itemList.slice(0);
        if (this.itemList) {
          this.itemList = this.itemList.sort((a, b) => {
            if (this.sortFieldType === 'number') {
              a = Number(a[this.options.sortField]);
              b = Number(b[this.options.sortField]);
            }
            else {
              a = a[this.options.sortField].toLowerCase();
              b = b[this.options.sortField].toLowerCase();
            }
            if (this.options.sortOrder === 'asc')
              return a > b;
            else
              return a < b;
          });
        }

        var IconFlag = false;

        for (var i = 0; i < this.itemList.length; i++) {

          if (this.itemList[i].leftImage) {
            IconFlag = true;
            break;
          }
        }
        this.checkBoxPosition = this.mainParent.parentNode.querySelector('div').getAttribute('checkbox');
        this.isCheckBox = this.checkBoxPosition === 'left' || this.checkBoxPosition === 'right';
        this.template = `<button  class="btn dropdown-toggle ${this.options.size}" type="button"  aria-haspopup="true" aria-expanded="true"><span class="selectedText pull-left ${this.options.size}">${this.options.defaultText || '&nbsp;'}</span>
			<span class="caret"></span>
			</button>
			<ul class="dropdown-menu ${this.options.size}" role="menu">

			${this.itemList.map((value, i) =>
            ` ${value.divider ? '<li class="divider"></li>' : ''}<li value="${value[this.options.valueField || 'value']}" class="${!value.class ? '' : value.class}">
          <a value="${value[this.options.valueField || 'value']}">${value.leftImage ? `<img class="em-left-icon"
          src="${value.leftImage}" />` : (IconFlag === true) ? '<span class="em-left-icon"></span>' : ''}
          ${this.isCheckBox ? `<div class="checkbox">
            <input class="em-right-checkbox" id="${value[this.options.valueField || 'value']}" type="checkbox" ${value.check == false ? '' : 'checked'}/>
            <label for="${value[this.options.valueField || 'value']}">${value[this.options.textField || 'text']}</label>
        </div>`: `${value[this.options.textField || 'text']}`}
       ${value.rightImage ? `<img class="em-right-icon" src="${value.rightImage}" />` : ``}
        </a> </li>`
        ).join('')}
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
      this.setDisabledItem();
    }
  }

  init() {
    this.actions();
    this.menu.setAttribute('tabindex', '0'); // Fix onblur on Chrome
    this.menu.addEventListener('click', this.toggle, false);
    this.menu.addEventListener('onmouseup', this.close, false);  //switched from blur to onmouseup due to blur not capturing scroll bar as apart of element
    this.menu.parentNode.addEventListener('click', function (e) {
      e.stopPropagation();
      e.preventDefault();
    }, false);
    document.addEventListener('click', this.closeit.bind(this), false);
  }

  setList() {
    [].forEach.call(this.menu.parentNode.querySelectorAll(".dropdown-menu>li>a"), (value, i) => {
      value.addEventListener('click', (e) => {
        var clickedOption = value.parentNode.getAttribute('value');
        var selectedOptionText = value.parentNode.querySelector('label') ? value.parentNode.querySelector('label').innerHTML
          : value.parentNode.querySelector('a').innerHTML;
        if (this.options.selectedOptions.length == 0 || this.options.selectedOptions.indexOf(clickedOption) == -1) {
          this.options.selectedOptions.push(clickedOption);
          this.options.selectedOptionsText.push(selectedOptionText.trim());
          this.menu.parentNode.querySelector(".btn .selectedText").setAttribute('value', this.options.selectedOptions);
          if (!this.menu.parentNode.querySelector(".btn").classList.contains("completed")) {
            this.menu.parentNode.querySelector(".btn").classList.add("completed");
          }
          this.menu.setAttribute('title', this.options.selectedOptionsText);
        }
        else {
          var index = this.options.selectedOptions.indexOf(clickedOption);
          var selectedOptionIndex = this.options.selectedOptions.indexOf(selectedOptionText.trim());

          if (index > -1) {
            this.options.selectedOptions.splice(index, 1);
            this.options.selectedOptionsText.splice(selectedOptionIndex, 1);
          }
          this.menu.parentNode.querySelector(".btn .selectedText").setAttribute('value', this.options.selectedOptions);
          this.menu.parentNode.querySelector('div').setAttribute('title', this.options.selectedOptionsText);
        }
        this.toggle({currentTarget: this.menu}, true, clickedOption);
        if (this.menu.parentNode.querySelectorAll(".dropdown-menu li[class='selected-text selected-check']").length > 1) {
          this.menu.parentNode.querySelector(".btn .selectedText").innerText = 'Multiple Selected'
        } else if (this.options.selectedOptions.indexOf(clickedOption) > -1) {
          this.menu.parentNode.querySelector(".btn .selectedText").innerText = value.innerText;
        } else if (this.options.selectedOptions.length === 1) {
          this.menu.parentNode.querySelector(".btn .selectedText").innerText =
            this.menu.parentNode.querySelector("li[value='" + this.options.selectedOptions[0] + "']").innerText;
        } else if ((this.options.selectedOptions.length === 0 && this.options.selectedOptions.indexOf(clickedOption) == -1)
          || !value.innerText) {
          this.menu.parentNode.querySelector(".btn .selectedText").textContent = this.options.defaultText;
        }
        if (typeof this.options.onChange === 'function') {
          this.options.onChange(e);
        }
      });
      value.addEventListener('mouseover', (e) => {
        if (e.target.offsetWidth < e.target.scrollHeight)
          e.target.setAttribute('title', e.target.innerHTML);
      });
    });
  }

  setReadonly() {
    [].forEach.call(this.menu.parentNode.querySelectorAll(".readonly .btn"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('readonly');
    });
  }

  setDisabledItem() {
    [].forEach.call(this.menu.parentNode.querySelectorAll(".disabled a"), (value, j) => {
      value.classList.add('disabled');
    });
  }

  setDisabled() {
    [].forEach.call(this.menu.parentNode.querySelectorAll(".disabled .dropdown-toggle"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('disabled');
    });
  }

  setState(value) {
    if (value) {
      this.menu.parentNode.classList.add('disabled');
      this.menu.setAttribute('disabled', 'disabled');
      this.menu.classList.add('disabled');
      //add disabled to each item
      [].forEach.call(this.menu.parentNode.querySelectorAll(".dropdown-menu li a"), (value, j) => {
        value.classList.add('disabled');
      });
    } else {
      this.menu.parentNode.classList.remove('disabled');
      this.menu.removeAttribute('disabled');
      this.menu.classList.remove('disabled');
      //remove disabled to each item
      [].forEach.call(this.menu.parentNode.querySelectorAll(".dropdown-menu li a"), (value, j) => {
        value.classList.remove('disabled');
      });
    }
  }

  setRestricted() {
    [].forEach.call(this.menu.parentNode.querySelectorAll(".restricted .dropdown-menu li a"), (value, i) => {
      value.innerHTML = '&#183;&#183;&#183;&#183;&#183;&#183;';
    });
    [].forEach.call(this.menu.parentNode.querySelectorAll(".restricted .dropdown-toggle"), (value, i) => {
      value.setAttribute('disabled', 'disabled');
      value.classList.add('restricted');
      value.getElementsByTagName('span')[0].innerHTML = "&#183;&#183;&#183;&#183;&#183;&#183;";
    });
  }

  setError() {
    [].forEach.call(this.menu.parentNode.querySelectorAll(".error .btn"), (value, i) => {
      value.classList.add('error');
    });
  }

  closeit(e) {
    setTimeout(() => {
      if (this.menu.parentNode)
        this.menu.parentNode.classList.remove('open');
      if (this.options.selectedOptionsText) {
        this.menu.setAttribute('title', this.options.selectedOptionsText);
      }
      else {
        this.menu.setAttribute('title', this.options.defaultText);
      }
    }, 50);
  }

  actions() {
    this.toggle = (e, selection, unSelectedValue) => {
      var target = e.currentTarget || e.srcElement;
      var selector = this.menu.parentNode;
      target.parentNode.classList.add('open');
      var selValue = unSelectedValue || selector.querySelector(".btn .selectedText").getAttribute('value');
      var selectedValue = selector.querySelector("li[value='" + selValue + "']");
      if (selectedValue && !selectedValue.classList.contains('selected-check')) {
        selectedValue.classList.add('selected-text');
        selectedValue.classList.add('selected-check');
        if(this.isCheckBox)
          selector.querySelector("li[value='" + selValue + "'] a div input").checked = true;
      }
      else if (selection && selectedValue.classList.contains('selected-check')) {
        selectedValue.classList.remove('selected-text');
        selectedValue.classList.remove('selected-check');
        if(this.isCheckBox)
          selector.querySelector("li[value='" + selValue + "'] a div input").checked = false;
      }
      if (e.preventDefault)
        e.preventDefault();
      return false;
    };

    close = function (e) {
      setTimeout(() => { // links inside dropdown-menu don't fire without a short delay
        if (this.menu.parentNode) {
          this.menu.parentNode.classList.remove('open');
        }
      }, 200);
    };
  }

  static load() {
    var MultiSelectDropdown = document.querySelectorAll('[class="em-multiselect-dropdown"]');
    [].forEach.call(MultiSelectDropdown, function (item, index) {
      return new MultiSelectDropdown(item);
    });
  }
}

export {MultiSelectDropdown};
