// jQuery(document).ready( function() { //initialization code goes here });
$(document).ready( function() {
  $("#btnLogin").click( function() {
    var username = $("#txtName").val();
    var password = $("#txtPassword").val();
    var spinner_id = "spinner";
    var inProgressImage = InProgressSpinner.showInProgressImage(spinner_id);
    $.post(  "/users/login",
        {"username":username, "password":password},
        function(a) {
          try {
            if( a === 'true' ) {
              alert( "You are a valid user... enjoy" );
              var my_form = document.getElementById("login");
              var form_elements = my_form.elements;
              var my_action = jQuery('#login').attr('action');
              my_action = "/tasks/my_tasks/"+username;
              jQuery('#login').attr('action', my_action );
              //alert( jQuery('#login').attr('action') );
              my_form.submit();
            } else {
              alert( "username/password not valid" );
            }
          } finally {
            InProgressSpinner.hideInProgressImage(spinner_id, inProgressImage);
          }
        }
      );
    });




  //$("#btnAjax").click( function() {
  //  $.get("cubs.php", {"team":"bears"}, function(a) {alert(a);});
  //});

});





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

