// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults
$(document).ready( function() {$
  $("#btnAdd").click( function() {
    $.post(  "/tasks.json",
            {"username":$("input[name=user_username]").val(),
             "task[user_id]":$("input[name=user_id]").val(),
             "task[description]":$("#txtTask").val()},
            function(a) {
              var task = a.task;
              alert(task.id);
              alert(task.description);
              addTask(task);
            }
          );
    });
});


function addTask(responseObj) {
    var task = document.createElement("div"); //<div></div>
    task.appendChild(
        document.createTextNode( $("#txtTask").val())
                    ); //<div>user-entered text</div>
    if( responseObj ) {
      var button = document.createElement("input"); //<div></div>
      $(button).attr("type", "button");
      $(button).attr("value", "delete me");
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
