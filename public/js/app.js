function rand_color_generator(){
    var color_num =  Math.floor(Math.random() * 5) + 1;
    switch(color_num){
        case 1:
            return "#ea6912";
        case 2:
            return "#1261ea";
        case 3:
            return "#e00b2b";
        case 4:
            return "#05c42b";
        case 5:
            return "#c405c4";
    }
    
}

function drawGrid(panel){
    var h = panel.innerHeight();
    var w = panel.innerWidth();
    
    console.log(w, h);
    
    var svg = $(makeSVG(w, h));
    
    var rect_h = h/10;
    var rect_w = w/10;
    
    for(var temp_w = 0; temp_w < 10; temp_w++){
        for(var temp_h = 0; temp_h < 10; temp_h++){
            
            /*parameters for rectangle*/
            var x = temp_w * w/10;
            var y = temp_h * h/10;
            var rect_color;
            
            /*draw rectangle*/
            if(temp_w % 2 == temp_h % 2)
                rect_color = "#76b8e8";
            else
                rect_color = "#68acdd";        
            svg.append(makeRectangle(x, y, rect_w, rect_h, rect_color));
        
            var circle_x = x + rect_w/2;
            var circle_y = y + rect_h/2;
            var circle_r = 0.9 * rect_h/2;
            var circle_color = rand_color_generator();
            
            svg.append(makeCircle(circle_x, circle_y, circle_r, circle_color));
        
        }
    }
    panel.append(svg);
}


// $(document).ready(function(){
//     var $item = $("<div class = 'item-grid'></div>");
//     $("#start-btn").click(function(){
//         $(this).hide();
//         var p = $("#game-panel");
//         drawGrid(p);
//     });    
    
// });
