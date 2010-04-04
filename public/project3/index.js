function init() {
  init_car_makes_events_handler();
  populate_car_makes_selection();
}


function init_car_makes_events_handler() {
  init_onchange_event_handler("carMakes", update_selection_list_function);
}


function init_onchange_event_handler(control_id, call_back_function) {
  var control = document.getElementById(control_id);
  if( navigator.appName == "Microsoft Internet Explorer") {
    control.attachEvent("onchange", call_back_function); // IE only
  } else {
    control.addEventListener("change", call_back_function, false);
  }
}


var update_selection_list_function = function () {
  populate_car_models_selection();
  clear_selection_list("carTrims");
}


function populate_car_makes_selection() {
  make_ajax_request("/car_makes.json", car_makes_callback)
}


function car_makes_callback(result_obj) {
  populate_selection_list( "carMakes", "car_make", "id", "name", result_obj );
}



function populate_car_models_selection() {
  var selected_car_make_id = document.getElementById("carMakes").value;
  make_ajax_request("/car_models.json?car_make_id="+selected_car_make_id, car_models_callback)
}


function car_models_callback(result_obj) {
  clear_selection_list("carModels");
  populate_selection_list( "carModels", "car_model", "id", "model", result_obj );
  init_car_models_events_handler();
}


function init_car_models_events_handler() {
  init_onchange_event_handler("carModels", populate_car_trims_selection);
}


function populate_car_trims_selection() {
  var selected_car_model_id = document.getElementById("carModels").value;
  make_ajax_request("/car_trims.json?car_model_id="+selected_car_model_id, car_trims_callback)
}


function car_trims_callback(result_obj) {
  clear_selection_list("carTrims");
  populate_selection_list( "carTrims", "car_trim", "id", "trim", result_obj );
  init_car_trims_events_handler();
}

function init_car_trims_events_handler() {
  init_onchange_event_handler("carTrims", car_trims_selection_changed);
}

function car_trims_selection_changed() {
  var selected_car_trim = get_selected_object("carTrims");
  var car_trim_id = selected_car_trim.value;
  var car_trim_text = selected_car_trim.text;

  var selected_car_model = get_selected_object("carModels");
  var car_model_id = selected_car_model.value;
  var car_model_text = selected_car_model.text;

  var selected_car_make = get_selected_object("carMakes");
  var car_make_id = selected_car_make.value;
  var car_make_text = selected_car_make.text;

  alert("you selected: "+car_make_text+ ", id="+ car_make_id +
    "\n"+car_model_text+ ", id="+ car_model_id +
    "\n"+car_trim_text+ ", id="+ car_trim_id);

  make_ajax_request("/car_trims/23.json", a_car_trim_callback)
}


function a_car_trim_callback(result_obj) {
  alert("Price: "+result_obj.car_trim.price);
}



function get_selected_object(select_id) {
  var selected_option_tag = document.getElementById(select_id);
  var option_tag_id = selected_option_tag.value;

  var selectedIndex = selected_option_tag.selectedIndex;
  var option_tag_text = selected_option_tag.options[selectedIndex].text;

  return {"text" : option_tag_text,
          "value": option_tag_id};
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


function populate_selection_list(select_id, json_obj, option_value, option_text, myObj) {
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
  document.getElementById("content").style.display = "";
}


function make_ajax_request(request, call_back_function) {
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
      call_back_function(myObj);
      InProgressSpinner.hideInProgressImage(spinner_id, inProgressImage);
    }
  }
  //open (method, url,async)
  ajaxObj.open("get", request, true);

  //send
  ajaxObj.send(null);
}
