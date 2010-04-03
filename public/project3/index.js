function init() {
  var label_cell_id = "spinner";
  var waitingImage = InProgressSpinner.showInProgressImage(label_cell_id);
  init_car_models_events_handler();
  populate_car_makes_selection(waitingImage, label_cell_id);
}




function populate_car_makes_selection(waitingImage, label_cell_id) {
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


function init_car_models_events_handler() {
  var load_car_models = function() {
    var ajaxObj;
    if(window.XMLHttpRequest) {
      ajaxObj = new XMLHttpRequest();
    } else {
      ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var label_cell_id = "spinner";
    var waitingImage = InProgressSpinner.showInProgressImage(label_cell_id);
    ajaxObj.onreadystatechange = function() {
      //0 open has not been called
      //1 open has been called but not send
      //2 send has been called but no response from the server
      //3 data is in the process of being received
      //4 response from the server  is ready to be processed
      if(ajaxObj.readyState==4) {
        var myObj = JSON.parse(ajaxObj.responseText);
        var old_car_models = document.getElementById("carModels");
        if( old_car_models ) {
          var parent_node_of_car_models = old_car_models.parentNode;
          old_car_models.parentNode.removeChild(old_car_models);
        }
        var car_models = document.createElement("select");
        car_models.setAttribute("id", "carModels");
        car_models.className = "car_models_class";
        for( var i = 0; i < myObj.length; i++ ) {
          var a_car_model = document.createElement("option"); //<option></option>
          a_car_model.setAttribute("value", myObj[i].car_model.id);//<option value="1"></option>
          a_car_model.appendChild(document.createTextNode(myObj[i].car_model.model)); //<option value="1">prius</option>
          car_models.appendChild(a_car_model);
        }
        parent_node_of_car_models.appendChild(car_models);
        InProgressSpinner.hideInProgressImage(label_cell_id, waitingImage);
      }
    }
    var selected_car_make_id = document.getElementById("carMakes").value;
    //open (method, url,async)
    ajaxObj.open("get", "/car_models.json?car_make_id="+selected_car_make_id, true);
    //send
    ajaxObj.send(null);
  }
  var car_makes = document.getElementById("carMakes");
  if( navigator.appName == "Microsoft Internet Explorer") {
    car_makes.attachEvent("onchange", load_car_models); // IE only
  } else {
      // firefox this is the control that triggered the event...
      // undefined in IE
    car_makes.addEventListener("change", load_car_models, false); // false, i.e don not stop event propagation
  }
}


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


