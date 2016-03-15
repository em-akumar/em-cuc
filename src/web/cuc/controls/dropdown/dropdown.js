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
      this.options.defaultText = (this.options.defaultText === undefined) ? "Select One" : this.options.defaultText;
      this.options.itemList = this.options.itemList || [];
      this.options.sortField = this.options.sortField || this.options.textField || 'text';
      this.options.sortOrder = this.options.sortOrder || 'asc';
      this.options.size = this.options.defaultSize || 'medium';

      //Sort dropdown values
      if (this.options.itemList) {
        this.options.itemList.sort((obj1, obj2) => {
          var x = obj1[this.options.sortField].toLowerCase();
          var y = obj2[this.options.sortField].toLowerCase();
          if (this.options.sortOrder === 'desc') {
            return x > y ? -1 : x < y ? 1 : 0;
          } else {
            return x < y ? -1 : x > y ? 1 : 0;
          }});
      }

      var IconFlag = false;
      for (var i = 0; i < this.options.itemList.length; i++) {

          if (this.options.itemList[i].leftImage != undefined) {
              IconFlag = true;
              break;
          }
      }

      this.template = `<button  class="btn dropdown-toggle ${this.options.size}" type="button"  aria-haspopup="true" aria-expanded="true"><span class="selectedText pull-left ${this.options.size}">${this.options.defaultText || '&nbsp;'}</span>
			<span class="caret"></span>
			</button>
			<ul class="dropdown-menu ${this.options.size}" role="menu">
			${this.options.itemList.map((value, i) =>
        ` ${value.divider ? '<li class="divider"></li>' : ''}<li value="${value[this.options.valueField || 'value']}" class="${value.class === undefined ? '' : value.class}"><a value="${value[this.options.valueField || 'value']}">${value.leftImage!==undefined? `<img class="em-left-icon" src="${value.leftImage}" />`: (IconFlag === true) ? '<span class="em-left-icon"></span>':''} ${value[this.options.textField|| 'text']}
       ${value.rightImage!==undefined? `<img class="em-right-icon" src="${value.rightImage}" />`:``}</a> </li>`
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
    self.menu.parentNode.addEventListener('click',function(e){ e.stopPropagation();},false);
    document.addEventListener('click', self.closeit.bind(self), false);

    document.getElementsByTagName('html')[0].addEventListener('keydown',  ( e )=> {
      if ( e.keyCode === 27 ) {  //Closes dropdown on Esc key
        self.menu.parentNode.classList.remove('open');
    }});

    self.menu.parentNode.querySelector('.dropdown-menu').addEventListener('mouseover', (e) => {
      let dropdownSelect = self.menu.parentNode.querySelector('.dropdown-menu li.selected-text');

      if (dropdownSelect && dropdownSelect.classList.contains('selected-text')) {
        dropdownSelect.classList.remove('selected-text');
      }
    });

    self.menu.addEventListener('keydown', (e) => {
      if (e.keyCode === 40) {  // scroll dropdown option using down array key
       //console.log("down");
        let list = self.menu.parentNode.querySelectorAll('.dropdown-menu li');
        let index = 0;
        while (index < list.length) {
          let item = list[index];
            if (item.classList.contains('selected-text')) {
            if(list.length>=(index )){
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
      //console.log("up");
        let list = self.menu.parentNode.querySelectorAll('.dropdown-menu li');
        let index = 0;
        while (index < list.length) {
          let item = list[index];
            if (item.classList.contains('selected-text')) {
            if(index>0){
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
          if (item.innerText == undefined) {
            self.menu.parentNode.querySelector(".btn .selectedText").textContent = item.textContent;
          } else {
            self.menu.parentNode.querySelector(".btn .selectedText").innerText = item.innerText;
          }
          self.menu.parentNode.querySelector(".btn .selectedText").setAttribute('value', item.parentNode.getAttribute('value'));
          if (!self.menu.parentNode.querySelector(".btn").classList.contains("completed")) {
            self.menu.parentNode.querySelector(".btn").classList.add("completed");
          }
        }
      }
    });
  }
  setSelected(value) {
    var self = this;
    self.menu.parentNode.querySelector(".btn .selectedText").innerHTML = value[this.options.textField || 'text'];
				self.menu.parentNode.querySelector(".btn .selectedText").setAttribute('value', value[this.options.valueField || 'value']);
				if (!self.menu.parentNode.querySelector(".btn").classList.contains("completed")) {
      self.menu.parentNode.querySelector(".btn").classList.add("completed");
        }
  }
  setList() {
    var self = this;

    [].forEach.call(self.menu.parentNode.querySelectorAll(".dropdown-menu>li>a"), (value, i) => {
      value.addEventListener('click', (e) => {
        if (value.innerText == undefined) {
          self.menu.parentNode.querySelector(".btn .selectedText").textContent = value.textContent;
        } else {
          self.menu.parentNode.querySelector(".btn .selectedText").innerText = value.innerText;
        }
        value.parentNode.classList.add('selected-text');
        //console.log(value.classList);
        self.menu.parentNode.querySelector(".btn .selectedText").setAttribute('value', value.parentNode.getAttribute('value'));
        if (!self.menu.parentNode.querySelector(".btn").classList.contains("completed")) {
          self.menu.parentNode.querySelector(".btn").classList.add("completed");
        }
        self.toggle({currentTarget:self.menu});
        if (typeof self.options.onChange === 'function') {
          self.options.onChange(e);
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

  closeit(e) {
    var target = this.menu;
      setTimeout(function () { // links inside dropdown-menu don't fire without a short delay
        if (target.parentNode && target.parentNode !== null){
           target.parentNode.classList.remove('open');}
      }, 350);
  }
  actions() {
    var self = this;

    self.toggle = function (e) {
      var target = e.currentTarget || e.srcElement;
      target.parentNode.classList.toggle('open');
      var selValue = self.menu.parentNode.querySelector(".btn .selectedText").getAttribute('value');
      if (selValue == null) {
        self.menu.parentNode.querySelector('.dropdown-menu li:first-child').classList.add('selected-text');
      } else {
         //var selValue = self.menu.parentNode.querySelector(".btn .selectedText").getAttribute('value');
         //console.log(self.menu.parentNode.querySelector("li[value='" + selValue + "']"));
         if(self.menu.parentNode.querySelector("li[value='" + selValue + "']")!==null)
          self.menu.parentNode.querySelector("li[value='" + selValue + "']").classList.add('selected-text');
      }
      if(e.preventDefault)
        e.preventDefault();
      return false;
    };

    self.close = function (e) {
      var target = e.currentTarget || e.srcElement;
      setTimeout(function () { // links inside dropdown-menu don't fire without a short delay
        if (target.parentNode && target.parentNode !== null){
           target.parentNode.classList.remove('open');}
      }, 350);
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
