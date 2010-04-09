// or
// jQuery(document).ready( function() { //initialization code goes here });
$(document).ready( function() {

  //alert("hello");

	var username = $("#txtName").val();
	var password = $("#txtPassword").val();

	//alert( username );
	//alert( password );

  $("#btnLogin").click( function() {
    $.post(	"/users/login", 
						{"username":username, "password":password}, 
						function(a) {
							alert( "Server Response: "+ a );
						}
					);
  	});




  //$("#btnAjax").click( function() {
  //  $.get("cubs.php", {"team":"bears"}, function(a) {alert(a);});
  //});

} );
