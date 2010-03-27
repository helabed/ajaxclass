function ajaxInit() {
    var ajaxObj;
    if(window.XMLHttpRequest) {
        ajaxObj = new XMLHttpRequest();
    } else {
        ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
    }
    ajaxObj.open("get", "response.php", true);
    //setup event handler
    ajaxObj.onreadystatechange = function() {
        //0 open has not been called
        //1 send has been called but not open
        //2 send has been called but no response from the server
        //3 data is in the process of being received
        //4 response from the server is ready to be processed
        
        // the only time we care is readystate 4
        if(ajaxObj.readyState == 4) {
            // this is when the data is available from the server
            var response = ajaxObj.responseText;
            alert( response);
            var responseObject = JSON.parse( response );
        }
    }
    ajaxObj.send(null);
}