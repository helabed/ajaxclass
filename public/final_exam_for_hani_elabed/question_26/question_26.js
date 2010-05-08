$(document).ready( function() {
  var spinner_id = "spinner";
  var inProgressImage = null;
  $("#btnGetMOTD").click( function() {
    var uname = $("#txtUserName").val();
    inProgressImage = InProgressSpinner.showInProgressImage(spinner_id);
    $.get("/motd.php",
        {"uname":uname},
        processResponse
      );
    });

    var processResponse = 
        function(a) {
          try {
            alert( "we have a response\n\n" + a );
          } finally {
            if( inProgressImage) {
                InProgressSpinner.hideInProgressImage(spinner_id, inProgressImage);
            }
          }
        };
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

