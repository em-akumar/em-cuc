/* eslint-disable */
class TextInputField {
  constructor(element, options = {}) {
    this.element = typeof element === 'object' ? element : document.querySelector(element);
    this.span_password = null;
    this.options = options;

    this.delimiterChar = "-";
    this.maskChar =  "*";
    this.unmaskedValAttr = "unmaskedval";
    this.ssnMaskModes = {masked : "masked", unmasked : "unmasked"};
    this.ssnMaskModeAttr = "ssnMaskMode";

    this.init();
  }

  init() {
    var self = this;

    if (self.element) {
      //create hide/show span
      self.span_password = document.createElement('span');
      if (self.element.getAttribute('type') == 'ssn') {
        self.span_password.setAttribute('class', 'em-toggle-show-password');
        self.element.setAttribute(this.ssnMaskModeAttr, this.ssnMaskModes.masked);

        if (this.options !== undefined) {
          if (Object.keys(this.options).length) {
            this.options.defaultText = this.options.defaultText || '';
            this.setCurrentVal(this.options.defaultText);
          }
        }

      } else {
        self.span_password.setAttribute('class', 'em-toggle-password');
      }

      self.element.parentNode.insertBefore(self.span_password, self.element.nextSibling);

      self.span_password.addEventListener('click', () => {
          this.addOnPassword();
      }, false);
     /* self.element.addEventListener('blur', e => {
        var parentDiv = (self.element.parentElement).parentElement;
        if (self.element.getAttribute('type') === 'ssn' && /(\d{3}-\d{2}|\*{3}-\*{2})-\d{4}/.test(self.element.value)) {
          parentDiv.classList.remove('has-error');
        }
        else {
          parentDiv.classList.add('has-error');
        }
      });*/

      self.element.addEventListener('keydown', e => {
        if (self.element.getAttribute('type') === 'ssn') {
          this.processKey(e);
        }
      });
    }
  }

/* masking and unmasking SSN */
  toggleMaskSSN() {
    var self = this;
    if(self.element.getAttribute(this.ssnMaskModeAttr) === this.ssnMaskModes.masked){
      self.element.setAttribute(this.ssnMaskModeAttr, this.ssnMaskModes.unmasked);
    }else {
      self.element.setAttribute(this.ssnMaskModeAttr, this.ssnMaskModes.masked);
    }
    this.setCurrentVal(this.getCurrentVal());
  }

/* Valid of password input type, On the click of eye icon, convert into text type and vice versa */
  addOnPassword() {
    var self = this;
    if (self.element.getAttribute('type') == 'password') {
      self.element.setAttribute('type','text');
      self.span_password.classList.remove('em-toggle-password');
      self.span_password.classList.add('em-toggle-show-password');
    } else if (self.element.getAttribute('type') == 'ssn') {
      self.toggleMaskSSN();
      if (self.span_password.classList.value === 'em-toggle-show-password') {
        self.span_password.classList.remove('em-toggle-show-password');
        self.span_password.classList.add('em-toggle-password');
      }
      else {
        self.span_password.classList.remove('em-toggle-password');
        self.span_password.classList.add('em-toggle-show-password');
      }
    }else {
      self.element.setAttribute('type','password');
      self.span_password.classList.remove('em-toggle-show-password');
      self.span_password.classList.add('em-toggle-password');
    }
  }

    // Methods for SSN functionality
    processKey(event) {
        var self = this;
        var ignoreKeyList = [36, 35, 37, 39, 110, 9];
        var disbaleKeyList = [16, 17, 18];
        var keyCode = event.keyCode || event.which;

        if (ignoreKeyList.indexOf(keyCode) > -1)
        {
          return true;
        }

        event.preventDefault();
        if (disbaleKeyList.indexOf(keyCode) > -1)
        {
          return false;
        }

        if (keyCode === 8 ){
          //backspace
          if(this.isTextSelected()) {
            // removing all content as of now, should remove onlu selected content.
            this.clearVal();
          } else {
            if(this.getCursorPos() > 0) {
              this.removeText(self.element.value[self.element.value.length-2] === this.delimiterChar ? (this.getCursorPos() - 1) : this.getCursorPos());
            }
          }
          return false;
        } else if (keyCode === 46 || keyCode === 110){
          //delete
          if(this.isTextSelected()) {
            // removing all content as of now, should remove onlu selected content.
            this.clearVal();
          } else {
            if((this.getCursorPos()) > -1) {
              this.removeText(this.getCursorPos()+1);
            }
          }
          return false;
        } else if ((keyCode < 48 || keyCode > 57) && (keyCode < 96 || keyCode > 105) || (this.getCurrentVal().length > 8)) {
          return false;
        }

        if((self.element.selectionEnd - self.element.selectionStart) > 0 ) {
          //currently deleting all, should be deleting only selected char/s
          this.clearVal();
        }

        //update currently pressed key to value.
        var valToUpdate = this.getCurrentVal();
        if(this.getCursorPos() === self.element.value.length) {
          //append at end
          valToUpdate += event.key;
        } else {
          //insert in between
          var arrCurrentVal = valToUpdate.split('');
          arrCurrentVal.splice(this.getCursorPosOffset(this.getCursorPos()), 0, event.key);
          valToUpdate = arrCurrentVal.join('');
        }
        this.setCurrentVal(valToUpdate);

        event.preventDefault();
        return false;
      }

      getCurrentVal() {
        var self = this;
        return self.element.getAttribute(this.unmaskedValAttr) || "";
      }

      setCurrentVal(val) {
        var self = this;
        self.element.setAttribute(this.unmaskedValAttr, val);
        self.element.value = this.toSsnString(val);
        if (this.options) {
          if (this.options.onChange) {
            this.options.onChange(self);
          }
        }
      }

     removeText(startIndex, endIndex) {
        var self = this;
        if(endIndex) {
          var newVal = new Array();
          for (var i = startIndex; i < endIndex; i++) {
            var offset = this.getCursorPosOffset(startIndex - 1);
            newVal.concat([].filter.call(this.getCurrentVal(), function(val, i) {
                    return i !== offset; }));
          }
          this.setCurrentVal(newVal.join(""));
        } else {
          var offset = this.getCursorPosOffset(startIndex - 1);
          var newVal = [].filter.call(this.getCurrentVal(), function(val, i) {
                  return i !== offset; });
          this.setCurrentVal(newVal.join(""));
        }
        self.element.selectionStart = self.element.selectionEnd = (startIndex > 0 ? (startIndex-1): 0);
    }

    clearVal() {
      var self = this;
      self.element.setAttribute(this.unmaskedValAttr, "");
      self.element.value = (self.element.getAttribute(this.unmaskedValAttr)|| "");
    }

    isTextSelected() {
      var self = this;
      if((self.element.selectionEnd - self.element.selectionStart) > 0 ){
        return true;
      }
    }

    getCursorPosOffset(posIndex) {
      if(posIndex > 7){
        return posIndex-2;
      }else if(posIndex > 4){
        return posIndex-1;
      } else {
        return posIndex;
      }
             }

    getCursorPos() {
      var self = this;
      return self.element.selectionStart;
    }

    toSsnString(val) {
      var ssnCharArray = val.split('');
      if(ssnCharArray.length > 5) {
        ssnCharArray.splice(0, 5, this.applyMask(ssnCharArray[0]), this.applyMask(ssnCharArray[1]), this.applyMask(ssnCharArray[2]), this.delimiterChar, this.applyMask(ssnCharArray[3]), this.applyMask(ssnCharArray[4]), this.delimiterChar);
      } else if(ssnCharArray.length > 4) {
        ssnCharArray.splice(0, 4, this.applyMask(ssnCharArray[0]), this.applyMask(ssnCharArray[1]), this.applyMask(ssnCharArray[2]), this.delimiterChar, this.applyMask(ssnCharArray[3]));
      } else if(ssnCharArray.length > 3) {
        ssnCharArray.splice(0, 3, this.applyMask(ssnCharArray[0]), this.applyMask(ssnCharArray[1]), this.applyMask(ssnCharArray[2]),  this.delimiterChar);
      } else  if(ssnCharArray.length > 2) {
        ssnCharArray.splice(0, 2, this.applyMask(ssnCharArray[0]), this.applyMask(ssnCharArray[1]));
      } else if(ssnCharArray.length > 1) {
        ssnCharArray.splice(0, 1, this.applyMask(ssnCharArray[0]));
      }
      return ssnCharArray.join('');
    }

    applyMask(val) {
      var self = this;
      if(self.element.getAttribute(this.ssnMaskModeAttr) == this.ssnMaskModes.masked) {
          return this.maskChar;
      }else {
        return val;
      }
    }
  // End Methods for SSN functionality

  static load() {
    var textInputField = document.querySelectorAll('[class="em-toggle-password"]');
    [].forEach.call(textInputField, function (item, index) {
      return new TextInputField(item);
    });
  }
}

export {TextInputField};
