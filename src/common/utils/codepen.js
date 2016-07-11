// Shorthand for $( document ).ready()
angular.element(document).ready(function() {
  // PostToCodepen


  var PostToCodepen = (function () {
    var codepen_group = document.getElementsByClassName('codepen-group');
    var codepens;
    var codepen;
    var type;
    var codeElement;
    var codeInside;
    var JSONstring;


    // Create the Codepen Button For Each Group
    var createForm = function (container){
      var form = document.createElement('form');
      var data_input = document.createElement('input');
      var data_submit = document.createElement('input');
      var frag = document.createDocumentFragment();

      //form
      form.setAttribute('action', 'http://codepen.io/pen/define');
      form.setAttribute('method', 'POST');
      form.setAttribute('target', '_blank');


      // data input
      data_input.setAttribute('type', 'hidden');
      data_input.setAttribute('name', 'data');
      data_input.setAttribute('value', JSONstring);
      form.appendChild(data_input);


      // Submit Button
      data_submit.setAttribute('type','image');
      data_submit.setAttribute('src','http://s.cdpn.io/3/cp-arrow-right.svg');
      data_submit.setAttribute('width','40');
      data_submit.setAttribute('height','40');
      data_submit.setAttribute('value','Create Pen');
      data_submit.setAttribute('class','codepen-mover-button');
      form.appendChild(data_submit);

      frag.appendChild(form);
      container.appendChild(frag);

    };


    // Replace Quotes and Return object as string.
    var setDataString = function (data){
      var string = JSON.stringify(data);
      string = string.replace(/"/g, "&quot;");
      string = string.replace(/'/g, "&apos;");
      return string;
    };


    // Initializer
    var please = function () {
      var delay=1000; //1 seconds

      setTimeout(function(){
      // For each codegroup
      for (var i = 0, len = codepen_group.length; i < len; i++ ){

        // This data gets submitted to codepen to get processed into a pen
        // We populate css, js, and html properties with the content inside the pre tags
        // With the data-type attribute
        var data = {
          title              : "Controls",
          description        : "Ellie Mae Controls",
          html               : "",
          html_pre_processor : "none",
          css                : "",
          css_pre_processor  : "less",
          css_starter        : "neither",
          css_prefix_free    : false,
          js                 : "",
          js_pre_processor   : "none",
          js_modernizr       : "false",
          js_library         : "angular" || "jquery",
          html_classes       : "",
          css_external       : "//s3-us-west-2.amazonaws.com/s.cdpn.io/t-173/mixins.less",
          js_external        : "//s3.amazonaws.com/Elli/cuc/ci/scripts/emc.js"
        };

        // The pre elements inside each of the groups
        codepens = codepen_group[i].getElementsByClassName('codepen-able');

        for (var j = 0, lenth = codepens.length; j < lenth; j++){

          // Pre Tag
          codepen = codepens[j];

          // Get type to add to data object (js, css, html)
          type = codepen.getAttribute('data-type');

          // The codeinside each element
          codeElement = codepen.firstChild;
          codeInside = codepen.innerHTML;

          // Set Data if there's content
          if (codeInside!==undefined && codeInside.length > 0){
            data[type] = codeInside;
          }

        }

        // Turn Data into Safe String
        JSONstring = setDataString(data);

        // Create Submit to Codepen Button
        // Append Button to each group
        createForm(codepen_group[i]);

      }
      }, delay);
    };

    return {
      please: please
    };

  })();

  // Start It All
  PostToCodepen.please();
});
