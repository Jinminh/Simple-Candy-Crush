var mouseDown = false;
var x_initial, y_initial;
var bool_move = true;
var stay = false;

var original_cx, original_cy;
var new_cx = 0, new_cy = 0;

function check_edge(x, y, x_distance, y_distance){
    var x_flag = true;
    var y_flag = true;
    if((x == 500 && x_distance > 0) || (x == 300 && x_distance < 0)){
        console.log('XXX');
        x_flag = false;
    }
    
    if((y == 500 && y_distance > 0) || (y == 300 && y_distance < 0)){
        console.log('YYY');
        y_flag = false;
    }
    return [x_flag, y_flag];
}

function final_move(target, x, y, item){
    target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('cx', original_cx + x);
    target.setAttribute('cy', original_cy + y);
    new_cx = original_cx + x;
    new_cy = original_cy + y;
    stay = false;
        
    item.mousemove(undefined);
}

function move_circle(target, x, y, item){  
//     check_edge(target);
    var cx = item.attr('cx');
    var cy = item.attr('cy');
    
//     if(cx == 500 && x > 0) 
//         x = 0;
//     if(cy == 500 && y > 0){
//         y = 0;
//         console.log('imhere!!!');
//     }
        
    
    
    target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';   
    
    var width_range = parseFloat($("rect").attr("width"));
    var height_range = parseFloat($("rect").attr("height"));
     /*Position will be changed if x or y exceed a range*/   
    if(x > (width_range/2)){
        final_move(target, width_range, 0, item);
    }else if(x < (0 - width_range/2)){
        final_move(target, 0-width_range, 0, item);
    }else if(y > height_range/2){
        final_move(target, 0, height_range, item);
    }else if(y < (0 - height_range/2)){
        final_move(target, 0, 0 - height_range, item);
    }else{
        stay = true;
    } 
}

function stop_move(event){
    if(!mouseDown || (new_cx === 0) || (new_cy === 0)){
        return;
    }
    
    bool_move = true;
    x_initial = 0;
    y_initial = 0;
    var target = event.target;
    
    if(stay === true){
        target.style.webkitTransform = target.style.transform =
             'translate(' + 0 + 'px, ' + 0 + 'px)';
        target.setAttribute('cx', original_cx);
        target.setAttribute('cy', original_cy);
    }
    if(stay === false){
        target.style.webkitTransform = target.style.transform =
             'translate(' + 0 + 'px, ' + 0 + 'px)';
        target.setAttribute('cx', new_cx);
        target.setAttribute('cy', new_cy);
    }   
    mouseDown = false;

}


$(document).ready(function(){
    $('.draggable').mousedown(function(event){
            mouseDown = true;
            x_initial = event.pageX;
            y_initial = event.pageY;
            original_cx = parseFloat(event.target.getAttribute('cx'));
            original_cy = parseFloat(event.target.getAttribute('cy'));
//             console.log(original_cx, original_cy);
            $(this).mousemove(function(event){  
                var item = $(this);
                if(mouseDown){
                    var target = event.target;
                    var x_distance = event.pageX - x_initial;
                    var y_distance = event.pageY - y_initial;
//                     console.log(parseFloat(event.target.getAttribute('cx')), parseFloat(event.target.getAttribute('cy')));
                    var flags = check_edge(original_cx, original_cy, x_distance, y_distance);
                    var x_flag = flags[0];
                    var y_flag = flags[1];
                    
                    if((Math.abs(x_distance) > Math.abs(y_distance)) && x_flag)
                        move_circle(target, x_distance, 0, item); 
                    if(Math.abs(x_distance) < Math.abs(y_distance) && y_flag)
                        move_circle(target, 0, y_distance, item); 
                }
            });

        });

        $('.draggable').mouseup(stop_move);
        $('.draggable').mouseleave(stop_move);
});
