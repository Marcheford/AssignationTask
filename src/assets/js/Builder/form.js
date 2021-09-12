var files = new Array();

function LoadingInputOfRecords() {
  $(document).on('change', 'input[type="file"]', function () {
    var file = this.files[0];
    //if (file.size > 1024) {
    //  alert('max upload size is 1k');
    //}
    var ctrlName = $(this).attr('name');

    getBase64(file).then(data =>
      files.push({ name: ctrlName, value: data })
    );
  });
}

function editInputRecordsUpdated(filesValue) {
  var filesCtrls = $('input[type="file"]');
  $.each(filesCtrls, function (index, ele) {
    var ctrlName = $(ele).attr('name');

    var fileInfo = filesValue.find(item => {
      return (item.name === ctrlName);
    });
    var fileUrl = '';

    if (fileInfo !== undefined) {
      var base_url = window.location.origin;
      if (window.location.pathname.toLowerCase().split('/')[1].includes('checklist-'))
        base_url += '/' + window.location.pathname.split('/')[1];

      var MainFolderName = (ctrlName.indexOf("signature") !== -1) ? "Signatures" : "Photos";
      fileUrl = base_url + '/' + 'FormsData/' + MainFolderName + '/' +  fileInfo.value;
    }

    $('<img id="' + ctrlName + '_img" src="' + fileUrl + '" class="img-responsive img-rounded" style="width:204px;height:auto;" />').insertAfter(ele);
  });
}

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
      if ((encoded.length % 4) > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4));
      }
      resolve(encoded);
    };
    reader.onerror = error => reject(error);
  });
}

function GetInputsValue() {
  if (files != null) {
    return files;
  }
}
