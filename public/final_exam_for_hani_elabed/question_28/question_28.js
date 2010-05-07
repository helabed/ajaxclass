$(document).ready(function() {
    
    //var original_color;
    $(".menu").mouseover(function() {
        //original_color = $(this).css("backgroundColor");
        $(this).css("backgroundColor", "lightblue");
    }).mouseout(function() {
        //$(this).css("backgroundColor", original_color);
        $(this).css("backgroundColor", "white");
    })
    
});