/* eslint-disable */
class LogicInput {
constructor(elementId,options ={}) {
    this.element = typeof elementId === "object"? elementId : document.querySelector(elementId);
    this.parentElement = this.element.parentNode;
    this.options = {};
    this.options.readonly = options.readonly || this.element.hasAttribute('readonly');
    this.options.disabled = options.disabled || this.element.hasAttribute('disabled');
    this.label=null;
    this.options.label=options.label;
    this.options.label_position= options.label_position || '';
    this.init();
    this.setList();
  }
  init() {
    //create label dynamically
    this.label = document.createElement('label');
    this.label.innerHTML = this.options.label;
    this.label.classList.add(this.options.readonly);
    this.label.classList.add(this.options.disabled);
    this.element.classList.add(this.options.readonly);
    this.element.classList.add(this.options.disabled);
    var oDiv = document.createElement('div');
    oDiv.className = 'input-group';
    var iDiv = document.createElement('div');
    iDiv.className = 'input-group-btn';
    oDiv.appendChild(iDiv);
    iDiv.innerHTML = `
      <button type="button" class="btn btn-secondary dropdown-toggle operators ${this.options.readonly? 'readonly': ''} ${this.options.disabled? 'disabled': ''}" data-toggle="${(this.options.readonly || this.options.disabled)? '': 'dropdown'}" aria-haspopup="true" aria-expanded="false"></button>
      <ul class="dropdown-menu">
        <li value='equal'><a>&#61;</a></li>
        <li value='not equal'><a>&ne;</a></li>
        <li value='greater than'><a>&gt;</a></li>
        <li value='less than'><a>&lt;</a></li>
        <li value='greater than equal to'><a>&ge;</a></li>
        <li value='less than equal to'><a>&le;</a></li>
      </ul>
        `;
    oDiv.appendChild(this.element);
    if(this.options.label_position == 'right'){
      this.parentElement.appendChild(oDiv);
      this.parentElement.appendChild(this.label);
    }
    else {
      this.parentElement.appendChild(this.label);
      this.parentElement.appendChild(oDiv);
    }
  }
  setList() {
    var self = this;
    [].forEach.call(self.parentElement.querySelectorAll(".dropdown-menu>li>a"), (element, i) => {
      element.addEventListener('click', (e) => {
        self.parentElement.querySelector(".operators").style.background ='none';
        self.parentElement.querySelector(".operators").innerHTML = element.innerText;
        self.parentElement.querySelector(".operators").setAttribute('value', element.parentNode.getAttribute('value'));
      });

    });

  }
}

export {LogicInput};
