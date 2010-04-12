// jQuery(document).ready( function() { //initialization code goes here });
$(document).ready( function() {
  $("#btnLogin").click( function() {
    var username = $("#txtName").val();
    var password = $("#txtPassword").val();
    $.post(  "/users/login",
            {"username":username, "password":password},
            function(a) {
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
            }
          );
    });




  //$("#btnAjax").click( function() {
  //  $.get("cubs.php", {"team":"bears"}, function(a) {alert(a);});
  //});

});
