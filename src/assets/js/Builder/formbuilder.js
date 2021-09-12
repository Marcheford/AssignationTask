var typeUserAttrs =
{
  bindable: {
    Hint: {
      label: 'Hint',
      type: "label",
      value: "Value '=userid, =location, =email, =date'",
      style: 'border: none;pointer-events: none;background-color: #f7f7f7;width:100%'
    },
    is_stamp: {
      label: 'Is Stamp',
      type: 'checkbox'
    }
  },
  text: {
    is_stamp: {
      label: 'Is Stamp',
      type: 'checkbox'
    }
  },
  hidden: {
    is_stamp: {
      label: 'Is Stamp',
      type: 'checkbox'
    }
  },
  date: {
    is_stamp: {
      label: 'Is Stamp',
      type: 'checkbox'
    }
  },
  textarea: {
    is_stamp: {
      label: 'Is Stamp',
      type: 'checkbox'
    }
  },
  select: {
    is_stamp: {
      label: 'Is Stamp',
      type: 'checkbox'
    }
  },
  checkbox: {
    is_stamp: {
      label: 'Is Stamp',
      type: 'checkbox'
    }
  },
  radio: {
    is_stamp: {
      label: 'Is Stamp',
      type: 'checkbox'
    }
  }
};

var typeUserEvents = {

  button: {
    onadd: function (fld) {
      //debugger;
      $('.form-group.subtype-wrap').remove();
      $($(fld).find('button')[1]).remove();

      var button = $(fld).find('button')[0];
      var btnStyle = $(button).attr('style');
      if ($(button).attr('style') !== 'default') {
        //$(button).attr('style', btnStyle).attr('class', 'form-control btn-' + btnStyle + ' btn');
        //$('.btn-style').val(btnStyle);
        //var currentButton = $(fld).find('.btn-xs.btn.btn-' + btnStyle);
        //$(currentButton).addClass('active');
      } else {
        $(button).attr('style', btnStyle).attr('class', 'form-control btn-primary btn');
        $('.btn-style').val(btnStyle);
        var currentButton = $(fld).find('.btn-xs.btn.btn-primary');
        $(currentButton).addClass('active');
      }
    }
  },
  bindable: {
    onadd: function (fld) {
      markIsStamp(fld);
    }
  },
  text: {
    onadd: function (fld) {
      markIsStamp(fld);
    }
  },
  hidden: {
    onadd: function (fld) {
      markIsStamp(fld);
    }
  },
  date: {
    onadd: function (fld) {
      markIsStamp(fld);
    }
  },
  textarea: {
    onadd: function (fld) {
      markIsStamp(fld);
    }
  },
  select: {
    onadd: function (fld) {
      markIsStamp(fld);
    }
  },
  checkbox: {
    onadd: function (fld) {
      markIsStamp(fld);
    }
  },
  radio: {
    onadd: function (fld) {
      markIsStamp(fld);
    }
  },
};

function markIsStamp(field) {
  var isStamp = field.querySelector(".fld-is_stamp");
  var currentValue = $(isStamp).val();
  if (currentValue == "true")
    $(isStamp).attr('checked', 'checked');
}

var inputSets = new Array(
  {
    label: 'Group Control',
    name: 'group',
    fields: [
      {
        type: 'button',
        label: 'Group',
        className: 'form-control'
      }
    ]
  },
  {
    label: 'Signature Pad',
    name: 'Signature',
    fields: [
      {
        type: 'signature',
        label: 'Signature',
        className: 'form-control'
      }
    ]
  },
  {
    label: 'Open Camera',
    name: 'Camera',
    fields: [
      {
        type: 'camera',
        label: 'Camera',
        className: 'form-control'
      }
    ]
  },
  {
    label: 'User Location',
    name: 'Location',
    fields: [
      {
        type: 'location',
        label: 'Location',
        className: 'form-control'
      }
    ]
  },
  {
    label: 'Bindable',
    name: 'Bindable',
    fields: [
      {
        type: 'bindable',
        label: 'Bindable',
        className: 'form-control'
      }
    ]
  }
);
debugger;
var buildWrap = document.querySelector('.build-wrap'),
  renderWrap =  document.querySelector('.render-wrap'),
  editBtn = document.getElementById('edit-form'),
  formData = null, //window.sessionStorage.getItem('formData'),
  editing = true,
  fbOptions = {
    dataType: 'json',
    disableFields: ['autocomplete', 'number', 'file', 'paragraph', 'button'],
    inputSets: inputSets,
    typeUserAttrs: typeUserAttrs,
    typeUserEvents: typeUserEvents,
    stickyControls: false,
    controlPosition: 'right',
    showActionButtons: false,

  };

function BuildFbOption() {
  debugger;
  return fbOptions;
}

//isEdit form 
if ($('#FormControls').val() != null) {
  fbOptions.formData = $('#FormControls').val();
} else if (formData) {
  fbOptions.formData = JSON.parse(formData);
}

var toggleEdit = function () {
  document.body.classList.toggle('form-rendered', editing);
  editing = !editing;
};

var formBuilder = $(buildWrap).formBuilder(fbOptions).data('formBuilder');

//$('#frmb-0-cb-wrap').attr('style', 'overflow-y: scroll;height: 45%;position:fixed;width: 22%;');

function addLoadFormBuilder() {
    var formBuilder = $(buildWrap).formBuilder(fbOptions).data('formBuilder');
}

function loadformbuilder() {
  //toggleEdit();
  debugger;
  var formBuilder = $(buildWrap).formBuilder(fbOptions).data('formBuilder');

  if (formBuilder != 'defined') {
    $(renderWrap).formRender({
      dataType: 'json',
      formData: formBuilder.formData
    });
    var checklistContent = formBuilder.formData.toString().replace(/\t/g, '').split('\r\n');

    //if (checklistContent == '[]') {
    //  bootbox.alert("There are no controls to save.");
    //  return;
    //}

    return checklistContent;
  }
  return '[]';
  //window.sessionStorage.setItem('formData', JSON.stringify(checklistContent));
}

function EditLoadformbuilder(dataFormbuilder) {
  var buildWrap = document.querySelector('.build-wrap'),
    renderWrap = document.querySelector('.render-wrap'),
    editBtn = document.getElementById('edit-form'),
    formData = null, //window.sessionStorage.getItem('formData'),
    editing = true,
    fbOptions = {
      dataType: 'json',
      disableFields: ['autocomplete', 'number', 'file', 'paragraph', 'button'],
      inputSets: inputSets,
      typeUserAttrs: typeUserAttrs,
      typeUserEvents: typeUserEvents,
      stickyControls: false,
      controlPosition: 'right',
      showActionButtons: false,

    };
  


     debugger;
  fbOptions.formData = dataFormbuilder;
     
  var formBuilder = $(buildWrap).formBuilder(fbOptions).data('formBuilder');

  $(renderWrap).formRender({
      dataType: 'json',
    formData: formBuilder.formData 
    });

    ////buildWrap.toggle();
    ////renderWrap.toggle();
    ////fbOptions.formData = JSON.parse(JSON.stringify(dataFormbuilder));
    //   $('#fb-editor').html('');
    //    fbOptions.formData = JSON.parse(dataFormbuilder);
    // //  fbOptions.formData = dataFormbuilder;
    //   // formBuilder.actions.setData(dataFormbuilder);
    // formBuilder = $(buildWrap).formBuilder(fbOptions).data('formBuilder');
    //$('#FormControls').val() = dataFormbuilder;

    //var formData = dataFormbuilder;
    //var formContainer = document.getElementById('fb-editor');
    //debugger;
    //var formRenderOpts = {
    //  container: formContainer,
    //  dataType: 'json',
    //  formData: formData
    //};



    //$(formContainer).formRender(formRenderOpts);



    //$('.actionGroup').appendTo('#fb-rendered-form');




    //$('input[type="date"]').addClass('form-control');


  return 0;
}

function LoadFormControl() {
  const fbTemplate = document.getElementById('fb-editor');
  if (fbTemplate != null)
    $(fbTemplate).formBuilder();

  $('#frmb-0-clear-all').hide();
  $('#frmb-0-view-data').hide();
  $('#frmb-0-save').hide();
  return 1;
}

$('.form-builder-save').click(function () {
  //toggleEdit();
  $(renderWrap).formRender({
    dataType: 'json',
    formData: formBuilder.formData
  });
  var checklistContent = formBuilder.formData.toString().replace(/\t/g, '').split('\r\n');

  if (checklistContent == '[]') {
    bootbox.alert("There are no controls to save.");
    return;
  }

  $.saveForm($('#Form_Name').val(), checklistContent);

  //window.sessionStorage.setItem('formData', JSON.stringify(checklistContent));
});

$('.form-builder-export').click(function () {
  var checklistContent = formBuilder.formData.toString().replace(/\t/g, '').split('\r\n');

  if (checklistContent == '[]') {
    bootbox.alert("There are no controls to export template.");
    return;
  }

  var checklistTemplate = JSON.parse(checklistContent);
  saveJSON(checklistTemplate);
});

$('.form-builder-import').click(function () {
  $('#myFileInput').click();
});

$('#myFileInput').change(function (e) {
  var selectedFile = e.target.files[0];
  if (selectedFile) {
    var reader = new FileReader();
    reader.readAsText(selectedFile);
    reader.onload = function (e) {
      $('#fb-editor').html('');
      fbOptions.formData = JSON.parse(JSON.stringify(e.target.result.toString()));
      formBuilder = $(buildWrap).formBuilder(fbOptions).data('formBuilder');

      $('#frmb-0-cb-wrap').attr('style', 'overflow-y: scroll;height: 45%;position:fixed;width: 22%;');

      return;
    }
  } else {
    //bootbox.alert("Failed to load file.");
    return;
  }
  return;
});

//editBtn.onclick = function () {
//  toggleEdit();
//};
$(".stage-wrap").prepend("<div id='frmTitle' style='background: darkgray;padding: 1px;margin: 2px;padding-top: unset;color: white;text-align: center;'><h2>Form</h2></div>");

$('.cb-wrap').attr('style', 'padding: 5px;');
$(".cb-wrap").prepend("<div style='background: darkgray;padding: 1px;margin: 2px;padding-top: unset;color: white;text-align: center;width: 334.734px;'><h2>Controls</h2></div>");

/* function to save JSON to file from browser
* adapted from http://bgrins.github.io/devtools-snippets/#console-save
* @param {Object} data -- json object to save
* @param {String} file -- file name to save to 
*/
function saveJSON(data, filename) {

  if (!data) {
    console.error('No data')
    return;
  }

  if (!filename) filename = 'checklist_template.json'

  if (typeof data === "object") {
    data = JSON.stringify(data, undefined, 4)
  }

  var blob = new Blob([data], { type: 'text/json' }),
    e = document.createEvent('MouseEvents'),
    a = document.createElement('a')

  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
}
