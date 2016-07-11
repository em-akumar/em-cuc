class CkeditorController {
  /* @ngInject */
  constructor(CkeditorService) {
    this.ckeditorService = CkeditorService;
    this.ckEditors = [];
    this.configAll = {
      "toolbarGroups" : [
        { "name": 'document', "groups": [ 'mode', 'document', 'doctools' ] },
        { "name": 'clipboard', "groups": [ 'clipboard', 'undo' ] },
        { "name": 'editing', "groups": [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { "name": 'forms', "groups": [ 'forms' ] },
        '/',
        { "name": 'insert', "groups": [ 'insert' ] },
        '/',
        { "name": 'styles', "groups": [ 'styles' ] },
        { "name": 'basicstyles', "groups": [ 'basicstyles', 'cleanup' ] },
        { "name": 'paragraph', "groups": [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { "name": 'colors', "groups": [ 'colors' ] },
        { "name": 'tools', "groups": [ 'tools' ] },
        { "name": 'others', "groups": [ 'others' ] },
        { "name": 'links', "groups": [ 'links' ] },
        { "name": 'about', "groups": [ 'about' ] }
      ]
    };
    this.config = {
      "toolbarGroups" : [
        { "name": 'document', "groups": [ 'mode', 'document', 'doctools' ] },
        { "name": 'clipboard', "groups": [ 'clipboard', 'undo' ] },
        { "name": 'editing', "groups": [ 'find', 'selection', 'spellchecker', 'editing' ] },
        { "name": 'forms', "groups": [ 'forms' ] },
        '/',
        { "name": 'insert', "groups": [ 'insert' ] },
        '/',
        { "name": 'styles', "groups": [ 'styles' ] },
        { "name": 'basicstyles', "groups": [ 'basicstyles', 'cleanup' ] },
        { "name": 'paragraph', "groups": [ 'list', 'indent', 'blocks', 'align', 'bidi', 'paragraph' ] },
        { "name": 'colors', "groups": [ 'colors' ] },
        { "name": 'tools', "groups": [ 'tools' ] },
        { "name": 'others', "groups": [ 'others' ] },
        { "name": 'links', "groups": [ 'links' ] },
        { "name": 'about', "groups": [ 'about' ] }
      ],
      "removeButtons" : 'Styles,Format,Underline,Strike,Subscript,Superscript,RemoveFormat,Blockquote,CreateDiv,JustifyLeft,JustifyCenter,JustifyRight,JustifyBlock,BidiLtr,BidiRtl,Language,Anchor,Image,Flash,Table,HorizontalRule,Smiley,SpecialChar,PageBreak,Iframe,TextColor,BGColor,Maximize,ShowBlocks,Source,Save,NewPage,Preview,Print,Templates,Cut,Copy,Paste,PasteText,PasteFromWord,Undo,Redo,Find,Replace,SelectAll,Scayt,Form,Radio,TextField,Checkbox,Textarea,Select,Button,ImageButton,HiddenField'
    };

    // this.initialize();
  }

  initialize() {
    this.ckeditorService.resolvePromise().then((response) => {
      this.data = response.data;
    });
  }
}

export default CkeditorController;