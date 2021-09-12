(function ($) {

    $.ajaxPrefilter(function (options, originalOptions) {
        if (options.type.toUpperCase() === "POST") {
            var token = $('input[name="__RequestVerificationToken"]').val();
            if (options.url !== '/ProfileImage') {
                options.data = $.param($.extend(originalOptions.data, { __RequestVerificationToken: token }));
            } else {
                options.data.append('__RequestVerificationToken', token);
            }
        }
    });


    /*
* Base Ajax Function 
* Parameters : 
*      URL -> URL
*      ajaxSendObject -> Json Object
*      callBackSuccess -> Function to be called In case of success call the web method
*      callBackError -> Function to be called In case of error call the web method
*/
    $.AjaxGetCall = function (URL, ajaxSendObject, callBackSuccess, callBackError) {
        $.ajax({
            type: 'GET',
            url: URL,
            data: ajaxSendObject,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                return callBackSuccess(result)
            },
            error: function (result) {
                return callBackError(result);
            }
        });
    };

    /*
 * Base Ajax Function 
 * Parameters : 
 *      URL -> URL
 *      ajaxSendObject -> Json Object
 *      callBackSuccess -> Function to be called In case of success call the web method
 *      callBackError -> Function to be called In case of error call the web method
 */
    $.AjaxPOSTCall = function (URL, ajaxSendObject, callBackSuccess, callBackError) {
        $.ajax({
            type: 'POST',
            url: URL,
            data: ajaxSendObject,
            //contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (result) {
                return callBackSuccess(result)
            },
            error: function (result) {
                return callBackError(result);
            }
        });
    };

    $.BuilderNotify = function (title, message, type) {
        
        $.notify({
            // options
            message: message,
            title: '<strong>' + title + '</strong>'
        }, {
            // settings
            type: type,
            allow_dismiss: true,
            placement: {
                from: "top",
                align: "center"
            },
            animate: {
                enter: 'animated fadeInDown',
                exit: 'animated fadeOutUp'
            },
            delay: 2000
        });

        //notify.close();
    };

    
})(jQuery);