function get_xml_text() {
    return "" +
        "<states>" +
            "<state>" +
                "<abbreviation>WI</abbreviation>" +
                "<fulltext>Wisconsin</fulltext>" +
            "</state>" +
            "<state>" +
                "<abbreviation>IL</abbreviation>" +
                "<fulltext>Illinois</fulltext>" +
            "</state>" +
            "<state>" +
                "<abbreviation>MN</abbreviation>" +
                 "<fulltext>Minnesota</fulltext>" +
            "</state>" +
        "</states>";

}           
        
        
function init() {    
  var _states = get_xml_text();
   
  alert( _states );
   
  var doc0;
  if(window.DOMParser) {
    doc0 = new DOMParser().parseFromString(_states, "application/xml");
  } else {
    doc0 = new ActiveXObject("Microsoft.XMLDOM");
    doc0.loadXML(_states);
  }

  var full_text = doc0.getElementsByTagName("fulltext")[1].childNodes[0].nodeValue;
    
  alert(full_text);
  
  var item = document.createTextNode(full_text);
  document.body.appendChild(item); 
}


