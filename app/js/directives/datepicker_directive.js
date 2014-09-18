angular.module("app").directive("datepicker", function() {
  return {
    link: function(scope, element, attrs) {
      var datepicker_inline = element.inheritedData('inline') ? element.inheritedData('inline') : false;
      element.datepicker({
        inline: datepicker_inline,
        formatDate:'Y-m-d',
      });
    }
  };
});