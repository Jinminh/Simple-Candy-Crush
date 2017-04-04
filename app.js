//  Namespace for SVG elements, different than normal HTML element namespace.
var SVGNameSpace = "http://www.w3.org/2000/svg";

$(document).ready(function(){
    
    var $item = $("<div class = 'item-grid'></div>");
    $("#start-btn").click(function(){
        $(this).hide();
        for (var i = 0; i<100; i++){
            $("#game-panel").insert($item);
            console.log(i);
        }
    });    
    
});