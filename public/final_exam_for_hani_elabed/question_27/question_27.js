$(document).ready(function() {
    
  $("li.draggable").draggable({
    "revert":true,
    "start":function() {
      $("#cart").css("border", "solid");
    },
    "stop": function() {
      $("#cart").css("border", "none");
    }
  });

  $("#cart").droppable({
    "drop" :function(event, ui) {
      $("#items_in_cart").html(
        $("#items_in_cart").html()
        +"<li>"+ ui.draggable.html() + "</li>");
      ui.draggable.fadeOut();
    }
  });
    
})