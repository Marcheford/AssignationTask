(function ($) {

    $.assignRecords = function (selectedRecords, selectedUsers) {
        var Form_Id = 0;
        if ($('#Form_Id').val() !== null) {
            Form_Id = $('#Form_Id').val();
        } else {
            return;
        }

        var postURL = '/ChecklistRecords/AssignChecklistRecords';
        var ajaxObject = {Form_Id:Form_Id, SelectedRecords: selectedRecords, SelectedUsers: selectedUsers };

        $.AjaxPOSTCall(postURL, ajaxObject, function (returndata) {

            if (returndata.ok) {
                bootbox.alert('Assigned Successfully.', function () {
                    window.location = returndata.redirectToAction;
                });
            } else {
                bootbox.alert('An error occured.');
            }
        }, function (result) {
            bootbox.alert('An error occured.');
        });
    };

    $.loadRecords = function (page, callback, imagesURL,fieldName, fieldValue) {
        $('#content').html('');
        var Form_Layout = $('#Form_Layout').val();
        var layoutjson = JSON.parse(Form_Layout);
        var mainTable = '<table class="table table-striped table-hover table-bordered" >';
        var headers = mainTable + '<tr>';
        headers += '<th><input type="checkbox" id="chkAllRecords" class="chk-records"/></th><th>PDF</th><th>Edit</th><th>Assign</th><th>Record Id</th>';

        $.each(layoutjson, function (index, element) {
            if (element.type !== "header" && element.type !== 'button') {
                headers += '<th>' + element.label + '</th>';

                var exists = 0 != $('#FieldName option[value=' + element.name + ']').length;

                if (!exists && element.type !== 'camera' && element.type!== 'signature') {
                    //Fill Search Control
                    $('#FieldName').append($('<option>', {
                        value: element.name,
                        text: element.label
                    }));
                }
            }
        });
        headers += '<th>Creation Date</th><th>Created by</th></tr>';

        var contentHtml = headers;
        var Form_Id = 0;
        if ($('#Form_Id').val() !== null) {
            Form_Id = $('#Form_Id').val();
        } else {
            return;
        }

        var rows = '';
        var ajaxObject = { Form_Id: Form_Id, page: page, FieldName: fieldName, FieldValue: fieldValue };

        var postURL = '/ChecklistRecords/ChecklistRecordsAjax';

        $.AjaxPOSTCall(postURL, ajaxObject, function (result) {
            var records = result.Data;
            for (var x = 0; x < records.length; x++) {
                rows += "<tr>";
                var itemJson = JSON.parse(records[x].Record);

                var Record_Id = records[x].Record_Id;
                rows += "<td><input type='checkbox' class='chk-records-item' id='" + Record_Id + "' data-recordId='" + Record_Id + "' /></td>";
                rows += "<td><a href='/ChecklistRecords/PreviewPDF?Form_Id=" + Form_Id + "&Record_Id=" + Record_Id + "' target='_blank'><i class='fa fa-file-pdf-o' aria-hidden='true'></i></a>";

                rows += "|<a href='/ChecklistRecords/ExportPDF?Form_Id=" + Form_Id + "&Record_Id=" + Record_Id + "'><i class='fa fa-download' aria-hidden='true'></i></a></td>";

                rows += "<td><a href='/ChecklistRecords/EditChecklistRecord?Form_Id=" + Form_Id + "&Record_Id=" + Record_Id + "'>Edit Checklist Record</a></td>";
                rows += "<td><a href='/ChecklistRecords/AssignChecklistRecord/" + Record_Id + "'>Assign user(s)</a></td>";

                rows += '<td>' + Record_Id + '</td>';

                $.each(layoutjson, function (index, element) {
                    //var chkGroupValues = '';
                    //if(element.name.indexOf('checkbox-group')!== -1){
                    //    var lst = $('input[name="' + element.name + '[]"');

                    //    $.each(lst, function (index, itm) {
                    //        chkGroupValues += $(itm).val()+',';
                    //    });
                    //    chkGroupValues = chkGroupValues.trim();
                    //}else{
                    //    var elementName = element.name;
                    //}
                    var currentElement = itemJson.filter(function (item) { return item.name === element.name; })[0];

                    if (element.type !== "header" && element.type !== 'button') {

                        if (currentElement === undefined) {
                            rows += "<td />";
                        } else {
                            if (element.type === "signature" || element.type === "camera") {

                                var fileId = currentElement.value;
                                var MainFolderName = (element.type === "signature") ? "Signatures" : "Photos";
                                var fileUrl = imagesURL + MainFolderName + "/" + fileId;
                                rows += '<td><a href="' + fileUrl + '" target="_blank"><img src="' + fileUrl + '" class="img-responsive img-rounded" '
                                     + ' style="width:204px;height:auto;" /></a></td>';
                            }
                            else if (element.type === "checkbox") {
                                var isChecked = currentElement.value === 'on' ? 'checked="checked"' : '';
                                rows += "<td><input type='checkbox' disabled " + isChecked + " /></td>";
                            }
                            else if (element.type === "checkbox-group" || element.type === "radio-group") {
                                debugger;
                                var selectedValues = currentElement.value.toString().split(',');
                                var fieldValue = "";
                                
                                $.each(selectedValues,function(index,selectItemValue)
                                {
                                    var currentValue = jQuery.grep(element.values, function (optionValue) { return optionValue.value == selectItemValue });

                                    if (currentValue[0] !== undefined)
                                        fieldValue += currentValue[0].label + ",";
                                });
                        
                                rows += "<td><span>" + fieldValue.toString().slice(0,-1) + "</span></td>";
                            }
                            else {
                                if (currentElement !== undefined) {

                                    if (currentElement.value !== '' && currentElement.value !== null && element.type === "location") {
                                        var location = currentElement.value;
                                        if (location !== '') {
                                            var locationSplitted = location.split(',');
                                            var lat = locationSplitted[0];
                                            var long = locationSplitted.count > 1 ? locationSplitted[1] : locationSplitted[0]
                                            rows += '<td><a href="http://www.google.com/maps/place/' + lat + ',' + long + '" target="_blank">' + currentElement.value + '</a></td>';
                                        } else {
                                            rows += '<td>No Location</td>';
                                        }
                                    } else
                                        rows += '<td>' + currentElement.value + '</td>';
                                }
                                else
                                    rows += '<td />';
                            }
                        }
                    }
                });

                rows += "<td><span>" + records[x].Creation_Date + "</span></td>";
                rows += "<td><span>" + records[x].CreatedBy + "</span></td>";
                rows += "</tr>";
            }
            contentHtml += rows + "</table>";
            $('#content').html(contentHtml);
            callback();
        }, function (result) {
            bootbox.alert('An error occured.');
        });
    };
})(jQuery);