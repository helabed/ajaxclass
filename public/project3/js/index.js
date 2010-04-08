function CarDealership() {};

CarDealership.init = function() {
  CarServiceMisc.init();
}

function CarService() {

  var the_car_make;
  var the_car_model;
  var the_car_trim;
  var the_car_price;


  var loan_amount;
  var loan_down_payment;
  var loan_interest_rate;
  var loan_duration_in_months;
  var loan_monthly_payment;


    // public properties getters and setters
  this.getCarMake = function() { return the_car_make; }
  this.setCarMake = function(in_value) { the_car_make = in_value; }


  this.getCarModel = function()  { return the_car_model; }
  this.setCarModel = function(in_value) { the_car_model = in_value; }


  this.getCarTrim = function()  { return the_car_trim; }
  this.setCarTrim = function(in_value) { the_car_trim = in_value; }


  this.getCarPrice = function()  { return the_car_price; }
  this.setCarPrice = function(in_value) { the_car_price = in_value; }



  this.getLoanAmount = function()  { return loan_loan_amount; }
  this.setLoanAmount = function(in_value) { loan_loan_amount = in_value; }

  this.getDownPayment = function()  { return loan_down_payment; }
  this.setDownPayment = function(in_value) { loan_down_payment = in_value; }

  this.getInterestRate = function()  { return loan_interest_rate; }
  this.setInterestRate = function(in_value) { loan_interest_rate = in_value; }

  this.getDurationInMonths = function()  { return loan_duration_in_months; }
  this.setDurationInMonths = function(in_value) { loan_duration_in_months = in_value; }

};



//
//
//
//The formula has a principal, P, interest rate, r, and number of monthly payments, m.
//
//   P ( r / 12 )
//-------------------------
//                     -m  
//  (1 - ( 1 + r / 12 )   )
//
//For example, a 3 year (36 month) loan of $15,000 at 7% interest would look like this:
//
//    15000 ( 0.07/ 12 )
//------------------------------
//                         -36
//   (1 - ( 1 + 0.07 / 12 )    )
//
//The payment for this car will be $463.16 per month.
//
//
//
CarService.prototype.calcMonthlyPayment = function() {
  var amount_financed =  this.getLoanAmount() - this.getDownPayment();

  var monthly_payment;
  var monthly_interest_rate = (this.getInterestRate() / 100.0) / 12.0;

  var n = this.getDurationInMonths() * 1.0;
  var i = monthly_interest_rate * 1.0;
  var p = amount_financed * 1.0;

  if( i === 0 ) {
    monthly_payment = p * 1.0 / n;
  } else {
    var one_plus_i_to_minus_n = Math.pow((1.0+i),(-n));
    var nominator = p * ( i );
    var denominator = 1 - one_plus_i_to_minus_n;
    monthly_payment = nominator / denominator;
  }
  return monthly_payment;
}

// learned this style of encapsulating all code in a function that returns an object containing
// function names as keys from watching the Douglas Crockford videos on Javascript the Good part.
var CarServiceMisc = ( function () {

  var car_service_instance;

  function init_calc_button_event_handler() {
    //enable button click, do not use HTML event handler like onclick(..)
    var calculateButton = document.getElementById("calculate_button");
    if( navigator.appName == "Microsoft Internet Explorer") {
      calculateButton.attachEvent("onclick", calculateButtonFunction); // IE only
    } else {
      calculateButton.addEventListener("click", calculateButtonFunction, false);
    }
  }


  function calculateButtonFunction() {
    var loan_amount_valid = false;
    var down_payment_valid = false;
    var error_occured = false;
    var error_id_prefix = ElabedEnterprisesLLC.error_id_prefix;
    var my_car_service_instance = CarServiceMisc.getCarService();

    try {
      var loan_amount = document.getElementById("loan_amount").value;
      if( ElabedEnterprisesLLC.validate_textfield_is_not_empty("loan_amount", error_id_prefix) == true ) {
        if( ElabedEnterprisesLLC.validate_numericality_of("loan_amount",
                                                          error_id_prefix,
                                                          "numbers only, 2 to 7 digits",
                                                          /^([0-9]{2,7})$/ ) == true ) {
          if( my_car_service_instance && loan_amount ) {
            my_car_service_instance.setLoanAmount(parseFloat(loan_amount));
            loan_amount_valid = true;
          }
        }
      }
    } catch(ex) {
      alert(ex.message);
      error_occured = true;
    }

    try {
      var down_payment = document.getElementById("down_payment").value;
      if( ElabedEnterprisesLLC.validate_textfield_is_not_empty("down_payment", error_id_prefix) == true ) {
        if( ElabedEnterprisesLLC.validate_numericality_of("down_payment",
                                                          error_id_prefix,
                                                          "numbers only, 1 to 6 digits",
                                                          /^([0-9]{1,6})$/ ) == true ) {
          if( my_car_service_instance && down_payment ) {
            my_car_service_instance.setDownPayment(parseFloat(down_payment));
            down_payment_valid = true;
          }
        }
      }
    } catch(ex) {
      alert(ex.message);
      error_occured = true;
    }


    if( error_occured === false && loan_amount_valid && down_payment_valid )
    {
      my_car_service_instance.setInterestRate(parseFloat(get_selected_object("interest_rate").text));
      my_car_service_instance.setDurationInMonths(parseFloat(get_selected_object("duration_in_months").text));
      //alert( my_car_service_instance.getLoanAmount() );
      //alert( my_car_service_instance.getDownPayment() );
      //alert( my_car_service_instance.getInterestRate() );
      //alert( my_car_service_instance.getDurationInMonths() );
      var monthlyPay = my_car_service_instance.calcMonthlyPayment();
      var roundedPayment = Math.round(monthlyPay*100)/100;
      alert( "Monthly Payment: $"+roundedPayment );
    }
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
    //alert( "before" );
    make_ajax_request("/car_trims.json?car_model_id="+selected_car_model_id, car_trims_callback)
    //alert( "after" );
    if ( selected_car_model_id === "0" ) {
      document.getElementById("loan_amount").value = '';
    }
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
    //alert( "before" );
    var selected_car_trim = get_selected_object("carTrims");
    var car_trim_id = selected_car_trim.value;
    if( car_trim_id !== "0" ) {
      var car_trim_text = selected_car_trim.text;

      var selected_car_model = get_selected_object("carModels");
      var car_model_id = selected_car_model.value;
      var car_model_text = selected_car_model.text;

      var selected_car_make = get_selected_object("carMakes");
      var car_make_id = selected_car_make.value;
      var car_make_text = selected_car_make.text;

      var myService = new CarService();
      myService.setCarMake(car_make_text);
      myService.setCarModel(car_model_text);
      myService.setCarTrim(car_trim_text);

      var my_2_params_function = function(result_obj) {
        var car_service_obj = myService;
        a_car_trim_callback(result_obj, car_service_obj);
      }
      //alert( "before ajax" );
      make_ajax_request("/car_trims/"+car_trim_id+".json", my_2_params_function)
      //alert( "after" );
    } else {
      document.getElementById("loan_amount").value = '';
    }
  }


  function a_car_trim_callback(result_obj, that) {
    that.setCarPrice( parseFloat(result_obj.car_trim.price) );
    //alert("you selected: " +
    //  "\n"+that.getCarMake()+
    //  "\n"+that.getCarModel()+
    //  "\n"+that.getCarTrim()+
    //  "\n"+that.getCarPrice());
    document.getElementById("loan_amount").value = that.getCarPrice();
    CarServiceMisc.setCarService(that);
  }



  function get_selected_object(select_id) {
    var selected_option_tag = document.getElementById(select_id);
    var option_tag_id = selected_option_tag.value;

    var selectedIndex = selected_option_tag.selectedIndex;
    var option_tag_text = selected_option_tag.options[selectedIndex].text;

    return {"text" : option_tag_text,
            "value": option_tag_id};
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
      select_list.appendChild(a_option_tag);
    }
  }


  function make_ajax_request(request, call_back_function) {
    try {
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
          try {
            var myObj = JSON.parse(ajaxObj.responseText);
            call_back_function(myObj);
            InProgressSpinner.hideInProgressImage(spinner_id, inProgressImage);
          } catch ( ex ) {
            InProgressSpinner.hideInProgressImage(spinner_id, inProgressImage);
            alert(ex.message + ex.lineNumber + ex.stack);
          }  
        }
      }
      //open (method, url, async)
      ajaxObj.open("get", request, true);

      //send
      ajaxObj.send(null);
    } catch ( ex ) {
      InProgressSpinner.hideInProgressImage(spinner_id, inProgressImage);
      alert(ex.message + ex.lineNumber + ex.stack);
    }  
  }


  return {
    setCarService:  function(in_value) {
      car_service_instance = in_value;
    },
    getCarService:  function() {
      return car_service_instance;
    },
    init:  function() {
      init_calc_button_event_handler();
      init_car_makes_events_handler();
      populate_car_makes_selection();
      document.getElementById("content").style.display = "";
    }
  };

} () );



function InProgressSpinner() {};


InProgressSpinner.showInProgressImage = function( section_id ) {
  var waitingImage = document.createElement("img");
  waitingImage.setAttribute("src","./images/ajax.gif");
  var tag_used = document.getElementById(section_id);
  document.getElementById(section_id).appendChild(waitingImage);
  return waitingImage;
}


InProgressSpinner.hideInProgressImage = function( section_id, waitingImage ) {
  var tag_used = document.getElementById(section_id);
  setTimeout( function() { document.getElementById(section_id).removeChild(waitingImage);},  500 );
}





function ElabedEnterprisesLLC() {};

  // Static Method
ElabedEnterprisesLLC.validate_numericality_of = function(element_id, error_id_prefix, error_message, regex) {
  var element_text =  document.getElementById(element_id).value;
  ElabedEnterprisesLLC.log("element_text: " + element_text);
  var pattern = regex;
  var result = pattern.test(element_text);
  if( result === false ) {
    ElabedEnterprisesLLC.display_error_message( element_id, error_message, error_id_prefix, true);
    return false;
  } else {
    ElabedEnterprisesLLC.hide_error_message( element_id , error_id_prefix);
    return true;
  }
}

  // Static Method
ElabedEnterprisesLLC.hide_error_message = function(id_of_parent_element, error_id_prefix) {
  var id_name = error_id_prefix + id_of_parent_element;
  var error_element = document.getElementById(id_name);
  error_element.innerHTML = "";
  error_element.style.display = "none";
}

  // Static Method
ElabedEnterprisesLLC.display_error_message = function(id_of_parent_element, message, error_id_prefix, do_not_show_id_name) {
  var id_name = error_id_prefix + id_of_parent_element;
  var error_element = document.getElementById(id_name);
  error_element.innerHTML = (do_not_show_id_name ? "" : id_of_parent_element) + " " + message;
  error_element.style.display = "inline";
}

  // Static Method
ElabedEnterprisesLLC.validate_textfield_is_not_empty = function ( element_id, error_id_prefix) {
  ElabedEnterprisesLLC.log("inside validate_textfield_is_not_empty() for element " + element_id);
  var node = document.getElementById(element_id);
  var text;
  if( node === null || node.value === null || node.value === '' ) {
    ElabedEnterprisesLLC.display_error_message( element_id , " cannot be empty", error_id_prefix, false);
    return false;
  } else {
    ElabedEnterprisesLLC.hide_error_message( element_id , error_id_prefix);
    text = node.value;
    ElabedEnterprisesLLC.log( text );
    ElabedEnterprisesLLC.log( typeof text);
    return true;
  }
}

  // Static Vars here
ElabedEnterprisesLLC.debug_flag = false;
ElabedEnterprisesLLC.error_id_prefix = "error_message_for_"

  // Static Method
ElabedEnterprisesLLC.log = function(s) {
  if (ElabedEnterprisesLLC.debug_flag) {
    if (typeof console !== "undefined" && typeof console.debug !== "undefined") {
      console.log(s);
    } else {
     alert(s);
    }
  }
}
