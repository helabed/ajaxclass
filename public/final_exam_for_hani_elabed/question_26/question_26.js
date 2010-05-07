function Rectangle() {
    var _length;
    var _width;
    
    this.getLength = function() {
        return _length;
    }
    
    this.getWidth = function() {
        return _width;
    }
    
    this.setLength = function(length_in) {
        _length = length_in;
    }
    
    this.setWidth = function(width_in) {
        _width = width_in;
    }
}           
        
//instance method
Rectangle.prototype.perimeter = function() {
    return this.getWidth() * 2 + this.getLength() * 2;
}
        
function init() {    
   var aRectangle = new Rectangle();
   aRectangle.setWidth(10);
   aRectangle.setLength(10);
   alert(aRectangle.perimeter());
   
   
}


