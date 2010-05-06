jQuery.fn.search = function(search_string) {
  $(this).each( function() {
    // return the item if it matches only
    if( $(this).text().indexOf(search_string) != -1) {
      return $(this);
    }
  })
}