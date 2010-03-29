function ajax() {
    var ajaxObj;
    if(window.XMLHttpRequest) {
        ajaxObj = new XMLHttpRequest();
    } else {
        ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
        
    ajaxObj.onreadystatechange = function() {
        //0 open has not been called
        //1 open has been called but not send
        //2 send has been called but no response from the server
        //3 data is in the process of being received
        //4 response from the server  is ready to be processed
        if(ajaxObj.readyState==4) {
            alert(ajaxObj.responseText);
        }
    }
    
    
    
    //open (method, url,async)
    ajaxObj.open("get", "hello.php", true);

    //send
    ajaxObj.send(null);
}

function init() {
    
    
    //string of xml
    /*
    var users = "<users><user><id> " +
    "1</id><name><first>bill</first><last>gates</last></name></user><user><id>2</id><name><first>steve</first><last>jobs</last></name></user></users>";
    
    var doc;
    if(window.DOMParser) {
        doc = new DOMParser().parseFromString(users, "application/xml");
    }else {
        doc = new ActiveXObject("Microsoft.XMLDOM");
        doc.loadXML(users);
    }
    */
    
    
    //file on the file system
    /*
    var doc;
    if(window.document.implementation && window.document.implementation.createDocument) {
        //alert("test");
        doc = window.document.implementation.createDocument("", "", null);
        doc.load("users.xml");
        //alert(doc.documentElement);
        doc.onload = function() {
            var counter =0;
            while(counter < doc.getElementsByTagName("last").length) {
                alert(doc.getElementsByTagName("last")[counter].childNodes[0].nodeValue);
                counter++;
            }
        }
    } else {
        doc = new ActiveXObject("Microsoft.XMLDOM");
        //doc.async = false;
        doc.load("users.xml");
    }
    
    //remote file
    //ajax response
    
    
    //alert(doc.getElementsByTagName("name")[0].childNodes[1].childNodes[0].nodeValue);
    var counter =0;
    while(counter < doc.getElementsByTagName("last").length) {
        alert(doc.getElementsByTagName("last")[counter].childNodes[0].nodeValue);
        counter++;
    }
    */    
}