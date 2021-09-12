jQuery(function ($) {

  var $fbEditor = $(document.getElementById('fb-editor')),
      $formContainer = $(document.getElementById('render-editor')),

    fbOptions = {
      onSave: function () {
        $fbEditor.toggle();
        $formContainer.toggle();
        $('form', $formContainer).formRender({
          formData: formBuilder.formData
        });
      }
    },
    formBuilder = $fbEditor.formBuilder(fbOptions);

  $('.edit-formm', $formContainer).click(function () {
    $fbEditor.toggle();
    $formContainer.toggle();
  });

  function getFormData() {
    return formBuilder.formData;
  }
});

