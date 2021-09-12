(function ($) {


    $.login = function (UserName, Password, rememberMe) {

        var postURL = '';
        var ajaxObject = { UserName: UserName, Password: Password, RememberMe: rememberMe };
        postURL = '/LoginAjax';



        $.AjaxPOSTCall(postURL, ajaxObject, function (returndata) {

            if (returndata.ok) {
                
                if (returndata.companies !== undefined) {
                    var companiesJson = JSON.parse(returndata.companies);
                    //Open Modal to choose default company
                    var mySelect = $('#ddlCompanies');
                    $(mySelect).empty();
                    debugger;
                    $.each(companiesJson, function (index, item) {
                        mySelect.append(
                            $('<option></option>').val(item.Id).html(item.Text)
                        );
                    });
                    $('#selecteDefaultCompany').modal('show');
                } else {
                    window.location = returndata.redirectToAction;
                }

            } else {
                bootbox.alert(returndata.message);
            }
        }, function (result) {
            bootbox.alert('An error occured.');
        });

    };

    $.proceedLogin = function (companyId, username, rememberMe) {
        var postURL = '';
        var ajaxObject = { CompanyId: companyId, Username: username, RememberMe: rememberMe };
        postURL = '/ProceedLogin';

        $.AjaxPOSTCall(postURL, ajaxObject, function (returndata) {
            if (returndata.ok) {
                window.location = returndata.redirectToAction;
            } else {
                bootbox.alert(returndata.message);
            }
        }, function (result) {
            bootbox.alert('An error occured.');
        });
    };

    $.userActivation = function (userId,action,successCallback) {

        var postURL = '';
        var ajaxObject = { userId: userId,action:action};
        postURL = '/User/UserActivation';
         
        

        $.AjaxPOSTCall(postURL, ajaxObject, function (returndata) {

            if (returndata.ok) {
                //$('tr[data-userid=' + userId + ']').remove();
                var activationMsg = (action == "activate") ? "activated" : "deactivated";
                bootbox.alert('User ' + activationMsg + ' successfully.');
                return successCallback(activationMsg);
            } else {
                if (returndata.message != null) {
                    bootbox.alert(returndata.message);
                }
                else
                    bootbox.alert('An error occured.');
            }
        }, function (result) {
            bootbox.alert('An error occured.');
        });

    };
})(jQuery);