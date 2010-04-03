
function InProgressSpinner() {};

InProgressSpinner.showInProgressImage = function( section_id ) {
  var waitingImage = document.createElement("img");
  waitingImage.setAttribute("src","/images/spinner_red_large.gif");
  var tag_used = document.getElementById(section_id);
  if( tag_used.nodeName == 'A' || tag_used.nodeName == 'a' ) {
    document.getElementById(section_id).parentNode.appendChild(waitingImage);
  } else {
    document.getElementById(section_id).appendChild(waitingImage);
  }
  return waitingImage;
}

InProgressSpinner.hideInProgressImage = function( section_id, waitingImage ) {
  var tag_used = document.getElementById(section_id);
  if( tag_used.nodeName == 'A' || tag_used.nodeName == 'a' ) {
    setTimeout( function() { document.getElementById(section_id).parentNode.removeChild(waitingImage);},  500 );
  } else {
    setTimeout( function() { document.getElementById(section_id).removeChild(waitingImage);},  500 );
  }
}






function ajax(waitingImage, label_cell_id) {
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
					
				var myObj = JSON.parse(ajaxObj.responseText);
				//alert(myObj.length);
				//alert(typeof myObj);
				//alert(myObj[0].car_make.name); 
				//alert(myObj[1].car_make.name); 
				//alert(myObj[2].car_make.name); 
    		var car_makes = document.getElementById("carMakes");

				var empty_car_make = document.createElement("option"); //<option></option>
				empty_car_make.setAttribute("value", 0);//<option value="0"></option>
				empty_car_make.appendChild(document.createTextNode("")); //<option value="0"></option>
				car_makes.appendChild(empty_car_make);
    
			  for( var i = 0; i < myObj.length; i++ ) {
					var a_car_make = document.createElement("option"); //<option></option>
					a_car_make.setAttribute("value", myObj[i].car_make.id);//<option value="1"></option>
					a_car_make.appendChild(document.createTextNode(myObj[i].car_make.name)); //<option value="1">Toyota</option>
					car_makes.appendChild(a_car_make);
				}	




          
          InProgressSpinner.hideInProgressImage(label_cell_id, waitingImage);
          document.getElementById("content").style.display = "";
        }
    }
    
    
    
    //open (method, url,async)
    ajaxObj.open("get", "/car_makes.json", true);

    //send
    ajaxObj.send(null);
}

function init() {
  //alert( "here");
  var label_cell_id = "spinner";
  var waitingImage = InProgressSpinner.showInProgressImage(label_cell_id);
    
	ajax(waitingImage, label_cell_id);
  
    
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
