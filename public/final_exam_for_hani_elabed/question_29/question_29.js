function jsonInit() {
    /*
      {} -> represent an object, var myObj = {};
      [] -> represent an array
      key:value   // key is always quoted
    */
    
    alert("hello");
    
    
    // this is a JSON object in Javascript
    
    var jsonStates = {
      "states": [
        {
            "abbreviation": "WI",
            "fulltext": "Wisconsin"
        },
        {
            "abbreviation": "IL",
            "fulltext": "Illinois"
        },
        {
            "abbreviation": "MN",
            "fulltext": "Minnesota"
        }
      ]
    };
    
    alert( jsonStates.states[1].abbreviation );  // IL
    alert( jsonStates.states[1].fulltext );  // Illinois
    
}