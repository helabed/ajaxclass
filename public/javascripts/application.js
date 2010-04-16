// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(document).ready( function() {
  $("#btnAdd").click( function() {
    $.post(  "/tasks.json",
            {"username":$("input[name=user_username]").val(),
             "task[user_id]":$("input[name=user_id]").val(),
             "task[description]":$("#txtTask").val()},
            function(a) {
              var task = a.task;
              //alert(task.id);
              //alert(task.description);
              addTask(task);
            }
          );
    }
  );





  $.get(  "/tasks/my_tasks/"+$("input[name=user_username]").val()+".json",
          {},
          function(tasks) {
            //alert( "alive: size: "+tasks.length );
            for(var i=0; i < tasks.length; i++ ) {
              //alert( i );
              var a = tasks[i];
              var task = a.task;
              //alert(task.id);
              //alert(task.description);
              addTask(task);
            }
          }
        );

});





function removeTask(responseObj) {
  //alert( "task being removed" );
  var to_be_removed = document.getElementById("task_"+responseObj.id);
  to_be_removed.parentNode.removeChild( to_be_removed );
}





function addTask(responseObj) {
  if( responseObj ) {
    var task = document.createElement("li"); //<div></div>
    $(task).attr("id", "task_"+responseObj.id);
    if( responseObj )
    {
      task.appendChild(
          document.createTextNode( responseObj.description )
                      ); //<div>user-entered text</div>
    } else {
      task.appendChild(
          document.createTextNode( $("#txtTask").val())
                      ); //<div>user-entered text</div>
    }
    var button = document.createElement("input"); //<div></div>
    $(button).attr("type", "button");
    $(button).attr("value", "delete me");



    $(button).click( function() {
      $.post(  "/tasks/destroy/"+responseObj.id+".json",
              {},
              function(a) {
                var task = a.task;
                //alert(task.id);
                //alert(task.description);
                removeTask(task);
              }
            );
      }
    );

    task.appendChild( button );
  }
  document.getElementById("task_list").appendChild(task);

  var original_color;
  $(task).mouseover(function() {
      original_color = $(this).css("backgroundColor");
      $(this).css("backgroundColor", "yellow");
  }).mouseout(function() {
      $(this).css("backgroundColor", original_color);
  })
  $("#txtTask").val("");
}
