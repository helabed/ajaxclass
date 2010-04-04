function init() {
  init_car_makes_events_handler();
  populate_car_makes_selection();
}


function populate_car_makes_selection() {
  populate_selection_list( "carMakes", "/car_makes.json", "car_make", "id", "name" );
}


function init_car_makes_events_handler() {
  var car_makes = document.getElementById("carMakes");
  if( navigator.appName == "Microsoft Internet Explorer") {
    car_makes.attachEvent("onchange", update_selection_list_function); // IE only
  } else {
    car_makes.addEventListener("change", update_selection_list_function, false); 
  }
}


function init_car_models_events_handler() {
  var car_models = document.getElementById("carModels");
  if( navigator.appName == "Microsoft Internet Explorer") {
    car_models.attachEvent("onchange", load_car_trims); // IE only
  } else {
    car_models.addEventListener("change", load_car_trims, false);
  }
}


function populate_selection_list(select_id, request, json_obj, option_value, option_text) {
  var spinner_id = "spinner";
  var inProgressImage = InProgressSpinner.showInProgressImage(spinner_id);
  var ajaxObj;
  if(window.XMLHttpRequest) {
    ajaxObj = new XMLHttpRequest();
  } else {
    ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
  }
  ajaxObj.onreadystatechange = function() {
    if(ajaxObj.readyState==4) {
      var myObj = JSON.parse(ajaxObj.responseText);
      var select_list = document.getElementById(select_id);

      var empty_option_tag = document.createElement("option"); //<option></option>
      empty_option_tag.setAttribute("value", 0);//<option value="0"></option>
      empty_option_tag.appendChild(document.createTextNode("")); //<option value="0"></option>
      select_list.appendChild(empty_option_tag);
      for( var i = 0; i < myObj.length; i++ ) {
        var a_option_tag = document.createElement("option"); //<option></option>
        var my_json_obj_i = myObj[i][json_obj];
        a_option_tag.setAttribute("value", my_json_obj_i[option_value]);//<option value="1"></option>
        a_option_tag.appendChild(document.createTextNode(my_json_obj_i[option_text])); //<option value="1">Toyota</option>
        //a_option_tag.setAttribute("value", myObj[i].car_make.id);//<option value="1"></option>
        //a_option_tag.appendChild(document.createTextNode(myObj[i].car_make.name)); //<option value="1">Toyota</option>
        select_list.appendChild(a_option_tag);
      }
      InProgressSpinner.hideInProgressImage(spinner_id, inProgressImage);
      document.getElementById("content").style.display = "";
    }
  }
  //open (method, url,async)
  ajaxObj.open("get", request, true);

  //send
  ajaxObj.send(null);
}







var update_selection_list_function = function () {
	load_car_models();
  //clear_selection_list("carModels");
  //populate_selection_list( "carModels", "/car_models.json", "car_model", "id", "model" );

	clear_selection_list("carTrims");
}

var clear_selection_list = function (select_id) {
  var old_select = document.getElementById(select_id);
  if( old_select ) {
    var parent_node_of_select = old_select.parentNode;
    old_select.parentNode.removeChild(old_select);
  }
  var new_select = document.createElement("select");
  new_select.setAttribute("id", select_id);
  parent_node_of_select.appendChild(new_select);
}


var load_car_models = function() {
	var spinner_id = "spinner";
	var inProgressImage = InProgressSpinner.showInProgressImage(spinner_id);
	var ajaxObj;
	if(window.XMLHttpRequest) {
		ajaxObj = new XMLHttpRequest();
	} else {
		ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
	}
	ajaxObj.onreadystatechange = function() {
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

			var empty_car_model = document.createElement("option"); //<option></option>
			empty_car_model.setAttribute("value", 0);//<option value="0"></option>
			empty_car_model.appendChild(document.createTextNode("")); //<option value="0"></option>
			car_models.appendChild(empty_car_model);

			for( var i = 0; i < myObj.length; i++ ) {
				var a_car_model = document.createElement("option"); //<option></option>
				a_car_model.setAttribute("value", myObj[i].car_model.id);//<option value="1"></option>
				a_car_model.appendChild(document.createTextNode(myObj[i].car_model.model)); //<option value="1">prius</option>
				car_models.appendChild(a_car_model);
			}
			parent_node_of_car_models.appendChild(car_models);

			// we are doing the init here because the Car Trims Selection list depends on the Car Models Selection list
			// and we need the latest version of the selection list element, not the one that was deleted above.
			init_car_models_events_handler();

			InProgressSpinner.hideInProgressImage(spinner_id, inProgressImage);
		}
	}
	var selected_car_make_id = document.getElementById("carMakes").value;
	//open (method, url,async)
	ajaxObj.open("get", "/car_models.json?car_make_id="+selected_car_make_id, true);
	//send
	ajaxObj.send(null);
}




var load_car_trims = function() {
	var ajaxObj;
	if(window.XMLHttpRequest) {
		ajaxObj = new XMLHttpRequest();
	} else {
		ajaxObj = new ActiveXObject("Microsoft.XMLHTTP");
	}
	var spinner_id = "spinner";
	var inProgressImage = InProgressSpinner.showInProgressImage(spinner_id);
	ajaxObj.onreadystatechange = function() {
		if(ajaxObj.readyState==4) {
			var myObj = JSON.parse(ajaxObj.responseText);
			var old_car_trims = document.getElementById("carTrims");
			if( old_car_trims ) {
				var parent_node_of_car_trims = old_car_trims.parentNode;
				old_car_trims.parentNode.removeChild(old_car_trims);
			}
			var car_trims = document.createElement("select");
			car_trims.setAttribute("id", "carTrims");
			car_trims.className = "car_trims_class";


			var empty_car_trim = document.createElement("option"); //<option></option>
			empty_car_trim.setAttribute("value", 0);//<option value="0"></option>
			empty_car_trim.appendChild(document.createTextNode("")); //<option value="0"></option>
			car_trims.appendChild(empty_car_trim);

			for( var i = 0; i < myObj.length; i++ ) {
				var a_car_trim = document.createElement("option"); //<option></option>
				a_car_trim.setAttribute("value", myObj[i].car_trim.id);//<option value="1"></option>
				a_car_trim.appendChild(document.createTextNode(myObj[i].car_trim.trim)); //<option value="1">prius</option>
				car_trims.appendChild(a_car_trim);
			}
			parent_node_of_car_trims.appendChild(car_trims);
			InProgressSpinner.hideInProgressImage(spinner_id, inProgressImage);
		}
	}
	var selected_car_model_id = document.getElementById("carModels").value;
	//open (method, url,async)
	ajaxObj.open("get", "/car_trims.json?car_model_id="+selected_car_model_id, true);
	//send
	ajaxObj.send(null);
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

