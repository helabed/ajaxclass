// Place your application-specific JavaScript functions and classes here
// This file is automatically included by javascript_include_tag :defaults


$(document).ready( function() {$
  $("#btnAdd").click( function() {
    addTask();
    $.post(  "/tasks",
            {"username":"hani","task[user_id]":1,
             "task[description]":$("#txtTask").val())},
            function(a) {
              alert(a);
            }
          );
    });

  //init();
});

function init() {
    if(navigator.appName=="Microsoft Internet Explorer") {
        document.getElementById("btnAdd").attachEvent("onclick", addTask);
    } else {
        document.getElementById("btnAdd").addEventListener("click", addTask, false);
    }
}

function addTask() {
    var task = document.createElement("div"); //<div></div>
    task.appendChild(document.createTextNode(document.getElementById("txtTask").value)); //<div>user-entered text</div>
    document.getElementById("task_list").appendChild(task);

    if(navigator.appName=="Microsoft Internet Explorer") {
        task.attachEvent("onmouseover", function() {changeBGColor("blue",window.event.srcElement);});
        task.attachEvent("onmouseout", function() {changeBGColor("blue",window.event.srcElement);});
    }else {
        task.addEventListener("mouseover", function() { changeBGColor("blue", this);},false);
        task.addEventListener("mouseout", function() {changeBGColor("blue", this);},false);
    }
    document.getElementById("txtTask").value="";
}

function changeBGColor(color, ctrl) {


    if(ctrl.style.backgroundColor=="") {
        ctrl.style.backgroundColor =color;
    } else {
        ctrl.style.backgroundColor="";
    }

}
