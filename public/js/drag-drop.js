var mouseDown = false;
var x_initial, y_initial;
var bool_move = true;
var stay = false;

var original_cx, original_cy;
var new_cx, new_cy;

function final_move(target, x, y, item){
    target.style.webkitTransform = target.style.transform =
                    'translate(' + x + 'px, ' + y + 'px)';
    target.setAttribute('cx', original_cx + x);
    target.setAttribute('cy', original_cy + y);
    new_cx = original_cx + x;
    new_cy = original_cy + y;
    console.log('im x 50');
    stay = false;
    item.mousemove(undefined);
}

function move_circle(target, x, y, item){    
    target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';    
    
    var width_range = parseFloat($("rect").attr("width"));
    var height_range = parseFloat($("rect").attr("height"));
    
    console.log('width_range, ', width_range);
    
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
    if(!mouseDown)
        return;
    console.log('mouse up');
    mouseDown = false;
    bool_move = true;
    x_initial = 0;
    y_initial = 0;
    var target = event.target;
    if(stay === true){
        console.log("im stay!");
        target.style.webkitTransform = target.style.transform =
             'translate(' + 0 + 'px, ' + 0 + 'px)';
        target.setAttribute('cx', original_cx);
        target.setAttribute('cy', original_cy);
    }
    if(stay === false){
        console.log("im not stay!");
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
            $(this).mousemove(function(event){  
                var item = $(this);
                if(mouseDown){
                    console.log('im down!!!!');
                    var target = event.target;
                    var x_distance = event.pageX - x_initial;
                    var y_distance = event.pageY - y_initial;
                    console.log(parseFloat(event.target.getAttribute('cx')), parseFloat(event.target.getAttribute('cy')));

                    if(Math.abs(x_distance) > Math.abs(y_distance))
                        move_circle(target, x_distance, 0, item); 
                    if(Math.abs(x_distance) < Math.abs(y_distance))
                        move_circle(target, 0, y_distance, item); 
                }
            });

        });

        $('.draggable').mouseup(stop_move);
        $('.draggable').mouseleave(stop_move);
});
