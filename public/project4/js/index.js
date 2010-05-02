$(function() {
  var stop = false;
  $("#accordion h3").click(function(event) {
    if (stop) {
      event.stopImmediatePropagation();
      event.preventDefault();
      stop = false;
    }
  });
  $("#accordion").accordion({
    autoHeight: false,
    header: "> div > h3"
  }).sortable({
    autoHeight: false,
    axis: "y",
    handle: "h3",
    stop: function(event, ui) {
      stop = true;
    }
  });
});
