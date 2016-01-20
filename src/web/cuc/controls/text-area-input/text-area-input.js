/* eslint-disable */
class LabelTextAreaInputField{

    constructor(element, options){
        this.element = typeof element === 'object' ? element : document.querySelector(element);
        this.options = {};
        this.label = null;
        this.textareafield = null;
        this.options.title = options.title;
        this.options.id_from_textarea = options.name;
        this.options.position = options.position;
        this.options.type=options.type || "text" ;
        this.options.placeholder=options.placeholder;
        this.options.sizes = options.sizes || "medium";
        this.options.value=options.value;
        this.options.name=options.name;
        this.options.states = options.states;
        this.options.validation = options.validation;
        this.options.cssClasses = options.cssClasses || "form-control";
        this.init();
    }

    init() {
        if(this.element) {

            //create label dynamically
            this.label = document.createElement('label');
            this.label.setAttribute("for", this.options.id_from_textarea);
            this.label.innerHTML = this.options.title;
            this.label.classList.add("em-txt-area-label");

            //create textarea text field dynamically
            this.textareafield = document.createElement("textarea");
            if(this.options.placeholder)
                this.textareafield.setAttribute("placeholder", this.options.placeholder);
            if(this.options.value)
                this.textareafield.innerHTML = this.options.value;
            if(this.options.name)
                this.textareafield.setAttribute("name", this.options.name);
                this.textareafield.setAttribute("id", this.options.name);

            if(this.options.sizes)
                this.textareafield.classList.add(this.options.sizes);
           if (this.options.states){
             this.textareafield.setAttribute(this.options.states,this.options.states);
             this.label.classList.add(this.options.states);
           }
          if (this.options.states == 'restricted'){
            this.textareafield.defaultValue = this.textareafield.innerHTML.substr(0,6);
            this.textareafield.setAttribute('disabled','disabled');
          }
            if(this.options.validation)
                this.textareafield.classList.add(this.options.validation);
            this.textareafield.classList.add(this.options.cssClasses);

            //add label and input text field inside div
            if(this.options.position)
                this.element.classList.add(this.options.position);

            if(this.options.position==="em-lbl-right"){
                this.element.appendChild(this.textareafield);
                this.element.appendChild(this.label);
            }
            else {
                this.element.appendChild(this.label);
                this.element.appendChild(this.textareafield);
            }
        }
        this.actions();

    }

    actions() {
        var self = this;


    }
    static load() {
        var labelTextAreaInputField = document.querySelectorAll('[class="em-label-TextArea"]');
        [].forEach.call(labelTextAreaInputField, function (item, index) {
            return new labelTextAreaInputField(item);
        });
    }
}

export {LabelTextAreaInputField};
