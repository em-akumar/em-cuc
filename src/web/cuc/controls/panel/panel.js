/* eslint-disable */
class PanelComposite{

    constructor(element, options){
        this.element = typeof element === 'object' ? element : document.querySelector(element);
        this.options = {};
        this.categorydiv = null;
        this.groupboxdiv = null;
        this.panelcontentdiv = null;
        this.options.categoryHeader = options.categoryHeader;
        this.options.groupboxHeader = options.groupboxHeader;
        this.options.panelContent = options.panelContent;
        this.options.categoryCss = options.categoryCss;
        this.options.categoryMainCss="panel-heading";
        this.options.groupboxCss = options.groupboxCss;
        this.options.groupboxMainCss ="panel-heading";
        this.options.panelCss = options.panelCss;
        this.options.panelMainCss =  "panel-body";
        this.init();
    }

    init() {
        if(this.element) {

            //create category box dynamically
            this.categorydiv = document.createElement('div');
            this.categorydiv.classList.add(this.options.categoryMainCss);
            this.categorydiv.classList.add(this.options.categoryCss);
            this.categorydiv.innerHTML = this.options.categoryHeader;

            //create group box dynamically
            this.groupboxdiv = document.createElement('div');
            this.groupboxdiv.classList.add(this.options.groupboxMainCss);
            this.groupboxdiv.classList.add(this.options.groupboxCss);
            this.groupboxdiv.innerHTML = this.options.groupboxHeader;

            //create panel dynamically
            this.panelcontentdiv = document.createElement('div');
            this.panelcontentdiv.classList.add(this.options.panelMainCss);
            this.panelcontentdiv.classList.add(this.options.panelCss);
            this.panelcontentdiv.innerHTML = this.options.panelContent;

           this.element.appendChild(this.categorydiv);
           this.element.appendChild(this.groupboxdiv);
           this.element.appendChild(this.panelcontentdiv);
        }
        this.actions();

    }

    actions() {
        var self = this;


    }
    static load() {
        var panelComposite = document.querySelectorAll('[class="em-panel-composite"]');
        [].forEach.call(panelComposite, function (item, index) {
            return new PanelComposite(item);
        });
    }
}

export {PanelComposite};