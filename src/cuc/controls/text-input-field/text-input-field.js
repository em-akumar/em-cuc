class LabelTextInputField {

  constructor(element, options) {
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.options = {};
    this.label = null;
    this.helpterlabel = null;
    this.inputfield = null;
    this.options.title = options.title;
    this.options.helpertext = options.helpertext;
    this.options.id_from_input = options.name;
    this.options.position = options.position;
    this.options.type = options.type || "text";
    this.options.placeholder = options.placeholder;
    this.options.sizes = options.sizes || "medium";
    this.options.value = options.value;
    this.options.name = options.name;
    this.options.states = options.states;
    this.options.validation = options.validation;
    this.options.cssClasses = options.cssClasses || "form-control";
    this.span_password = null;
    this.addClass = function (el, className) {
      if (el.classList)
        el.classList.add(className)
      else if (!this.hasClass(el, className)) el.className += " " + className
    };
    this.removeClass = function (el, className) {
      if (el.classList)
        el.classList.remove(className)
      else if (this.hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)')
        el.className = el.className.replace(reg, ' ')
      }
    };
    this.init();
  }

  init() {
    if (this.element) {

      //create hide/show span
      this.span_password = document.createElement('span');
      this.span_password.setAttribute('class', 'input-group-addon em-hide-password');

      //create label dynamically
      this.label = document.createElement('label');
      this.label.setAttribute("for", this.options.id_from_input);
      this.label.innerHTML = this.options.title;

      //create input text field dynamically
      this.inputfield = document.createElement("input");
      this.inputfield.setAttribute("type", this.options.type);
      if (this.options.placeholder)
        this.inputfield.setAttribute("placeholder", this.options.placeholder);
      if (this.options.value)
        this.inputfield.setAttribute("value", this.options.value);
      if (this.options.name)
        this.inputfield.setAttribute("name", this.options.name);
      this.inputfield.setAttribute("id", this.options.name);
      if (this.options.sizes)
        this.inputfield.classList.add(this.options.sizes);
      if (this.options.states){
        this.inputfield.setAttribute(this.options.states,this.options.states);
      }
      if (this.options.validation)
        this.inputfield.classList.add(this.options.validation);
      this.inputfield.classList.add(this.options.cssClasses);

      //add label and input text field inside div
      if (this.options.position)
        this.element.classList.add(this.options.position);

      if (this.options.position === "em-lbl-right") {
        this.element.appendChild(this.inputfield);
        if (this.options.title)
          this.element.appendChild(this.label);

      }
      //create helper text label dynamically
      else if (this.options.helpertext || (this.options.helpertext && this.options.position === "em-lbl-right")) {
        this.helpterlabel = document.createElement('label');
        this.helpterlabel.className = "em-helper-text";
        this.helpterlabel.innerHTML = this.options.helpertext;
        if (this.options.title)
          this.element.appendChild(this.label);
        this.element.appendChild(this.inputfield);
        this.element.appendChild(this.helpterlabel);
      }
      else {
        if (this.options.title) {
          this.element.appendChild(this.label);
        }
        this.element.appendChild(this.inputfield);
      }
      if (this.options.type == "password") {
        this.element.appendChild(this.span_password);
      }
    }

    this.actions();

  }

  tog(v) {
    return v ? this.addClass : this.removeClass;
  }

  hasClass(el, className) {
    if (el.classList)
      return el.classList.contains(className)
    else
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'))
  }


  actions() {
    this.inputClear();
    this.addOnPassword();
  }
  inputClear(){
    var self = this;
    if (self.options.validation == 'clearable') {
      self.element.querySelector('.clearable').addEventListener('input', function () {
        self.tog(this.value)(this, 'x');
        var selfOn = self.element.querySelector('.x');
        if (selfOn) {
          selfOn.addEventListener('mousemove', function (e) {
            self.tog(selfOn.offsetWidth - 18 < e.clientX - selfOn.getBoundingClientRect().left)(selfOn, 'onX');
            var selfOnX = self.element.querySelector('.onX');
            if (selfOnX) {
              selfOnX.addEventListener('click', function (ev) {
                ev.preventDefault();
                self.removeClass(selfOnX, 'x');
                self.removeClass(selfOnX, 'onX');
                selfOnX.value = "";
                if ("createEvent" in document) {
                  var evt = document.createEvent("HTMLEvents");
                  evt.initEvent("change", false, true);
                  selfOnX.dispatchEvent(evt);
                }
                else
                  selfOnX.fireEvent("onchange");
              });
            }
          });
        }
      });
    }
  }
  addOnPassword(){
    var self = this;
    if (self.span_password) {
      self.span_password.addEventListener('click', function () {
        if (self.inputfield.getAttribute('type') == "password") {
          self.inputfield.removeAttribute("type");
          self.inputfield.setAttribute("type", "text");
        } else {
          self.inputfield.removeAttribute("type");
          self.inputfield.setAttribute("type", "password");
        }
      });
    }
  }
  static load() {
    var labelTextInputField = document.querySelectorAll('[class="em-label-TextBox"]');
    [].forEach.call(labelTextInputField, function (item, index) {
      return new labelTextInputField(item);
    });
  }
}

export {LabelTextInputField};
