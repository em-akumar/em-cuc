
class ReoDropdown {
  constructor(element, options = {}) {
    this.mainParent = typeof element === 'object' ? element : document.querySelector(element);
    this.options = options;
    this.domClassName = '.em-reo-dropdown-t';
    this.buildHTML();
  }

  buildHTML() {
    if (this.options !== undefined) {
      if (Object.keys(this.options).length) {
        this.options.defaultText = (this.options.defaultText === undefined) ? "Select One" : this.options.defaultText;
        this.options.itemList = this.options.itemList || [];
        this.options.sortField = this.options.sortField || this.options.textField || 'text';
        this.options.sortOrder = this.options.sortOrder || 'asc';
        this.options.size = this.options.defaultSize || 'medium';

        //Sort dropdown values
        if (this.options.itemList) {
          var len = this.options.itemList.length;
          for (var i = len - 1; i >= 0; i--) {
            for (var j = 1; j <= i; j++) {
              if (this.options.itemList[j - 1][this.options.sortField].toLowerCase() > this.options.itemList[j][this.options.sortField].toLowerCase()) {
                var temp = this.options.itemList[j - 1];
                this.options.itemList[j - 1] = this.options.itemList[j];
                this.options.itemList[j] = temp;
              }
            }
          }
        }

        var IconFlag = false;
        for (var i = 0; i < this.options.itemList.length; i++) {
          if (this.options.itemList[i].leftImage != undefined) {
            IconFlag = true;
            break;
          }
        }


        this.menuButton = document.createElement("BUTTON");
        this.menuButtonClasses = `multiselect btn dropdown-toggle ${this.options.size}`;
        this.menuButton.className = this.menuButtonClasses;

        this.menuSelectedSpan = document.createElement("SPAN");
        this.menuSelectedSpanClasses = `selectedText pull-left ${this.options.size}`;
        this.menuSelectedSpan.className = this.menuSelectedSpanClasses;

        this.caretSpanDiv = document.createElement("DIV");
        this.caretSpanDiv.className = `caret-div`;

        this.menuCaretSpan = document.createElement("SPAN");
        this.menuCaretSpanClasses = `caret`;
        this.menuCaretSpan.className = this.menuCaretSpanClasses;

        //nodeValue   TO CH
        this.selectedText = document.createTextNode(this.options.defaultText);

        //collect
        this.menuSelectedSpan.appendChild(this.selectedText);
        this.menuButton.appendChild(this.menuSelectedSpan);
        this.caretSpanDiv.appendChild(this.menuCaretSpan);
        this.menuButton.appendChild(this.caretSpanDiv);

        //options UL
        this.menuOptionsDom = document.createElement("UL");
        this.menuOptionsDomClasses = `multiselect-container dropdown-menu ${this.options.size}`;
        this.menuOptionsDom.className = this.menuOptionsDomClasses;
        //add li

        //first li
        let firstMenuOptionLI = document.createElement("LI");
        let liFirstlabel = document.createElement("LABEL");
        let labelFirstLiText = document.createTextNode('Salect One or Multiple');
        liFirstlabel.appendChild(labelFirstLiText);

        firstMenuOptionLI.appendChild(liFirstlabel);
        this.menuOptionsDom.appendChild(firstMenuOptionLI);

        this.options.itemList.map((value, i) => {//loop
          let menuOptionLI = document.createElement("LI");
          let attr = document.createAttribute("value");
          attr.value = value[this.options.valueField || 'value'];
          menuOptionLI.setAttributeNode(attr);

          let chAnchor = document.createElement("A");

          let chDIV = document.createElement("DIV");
          chDIV.className = "checkbox";

          let checkbox = document.createElement("INPUT");
          checkbox.type = "checkbox";
          checkbox.name = `${this.makeid()}_${i}`;
          checkbox.value = value[this.options.valueField || 'value'];
          let attrLable = document.createAttribute("data-label");
          attrLable.value = value[this.options.textField || 'text'];
          checkbox.setAttributeNode(attrLable);

          let label = document.createElement("LABEL");
          let labelText = document.createTextNode(value[this.options.textField || 'text']);
          label.appendChild(labelText);

          chDIV.appendChild(checkbox);
          chDIV.appendChild(label);

          chAnchor.appendChild(chDIV);

          menuOptionLI.appendChild(chAnchor);
          //menuOptionLI.appendChild(chDIV);

          this.menuOptionsDom.appendChild(menuOptionLI);

          let statusss = true;

          menuOptionLI.addEventListener('click', (e) => {
            let chbxe = menuOptionLI.getElementsByTagName("INPUT")[0];
            chbxe.checked = !chbxe.checked;
            // attach listener for value change
            this.onValueChanged();
          });
        });//end LOOP

        this.mainParent.appendChild(this.menuButton);
        this.mainParent.appendChild(this.menuOptionsDom);

        //events
        this.menuButton.addEventListener("click", (e) => {
          //toggle options
          this.mainParent.className = this.mainParent.className.indexOf('open') > -1 ? this.mainParent.className.replace(' open', '') : this.mainParent.className + ' open';
        });
        //global click handler
        window.onclick = (ev) => {
          let allDropdown = document.querySelectorAll(this.domClassName);
          for (let domele of allDropdown) {
            if (!domele.contains(ev.target)) {
              if (domele.className.indexOf('open') > -1) {
                domele.className = domele.className.replace(' open', '');
              }
            }
          }
        };//events END

      }
    }
  }

/**
 * On change in option selection listener
 */
  onValueChanged() {
    //this.menuOptionsDom => All options DOM UL
    //get all checked checkboxes
    let checkedBoxes = this.menuOptionsDom.querySelectorAll('input[type="checkbox"]:checked');
    let checkecdValues = [];
    this.selectedValueText = [];
    for (let checkedCH of checkedBoxes) {
      checkecdValues.push(checkedCH.value);
      this.selectedValueText.push(checkedCH.getAttribute('data-label'));
    }
    this.selected = checkecdValues;// save some where in object to

    //chenge node text on change in selected
    this.updateSelectedText();

    //check for user event registartion for on change
    this.options.onChange != undefined && typeof this.options.onChange == 'function' ? this.options.onChange(checkecdValues) : '';
  }

  /**
   * change selection value in button text node
   */
  updateSelectedText() {
    if ( this.selectedValueText.join(",").trim() == "" ) {
      this.selectedText.nodeValue = this.options.defaultText;
      if ( this.mainParent.className.indexOf('selection') > -1 ) {//has class
        this.mainParent.className = this.mainParent.className.replace(' selection', '');
      }
    } else {
      this.selectedText.nodeValue = this.selectedValueText.join(",").trim();
      if ( this.mainParent.className.indexOf('selection') <= -1 ) {//class not exist
        this.mainParent.className = this.mainParent.className + ' selection';
      }
    }
  }

  makeid() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }
}

export {ReoDropdown};
