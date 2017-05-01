var mouseDown = false;
var x_initial, y_initial;
var bool_move = true;
var stay = true;
var switched_circle;

var original_cx, original_cy;
var new_cx = 0, new_cy = 0;

/*not allow user to move circle outside the circle*/
function check_edge(x, y, x_distance, y_distance){
    var x_flag = true;
    var y_flag = true;
    if((x == 950 && x_distance > 0) || (x == 50 && x_distance < 0)){
        x_flag = false;
    }
    
    if((y == 712.5 && y_distance > 0) || (y == 37.5 && y_distance < 0)){
        y_flag = false;
    }
    return [x_flag, y_flag];
}



function move_circle(target, x, y, item, direction){  
    if(!stay)
        return;
    var cx = item.attr('cx');
    var cy = item.attr('cy');

    var temp_x = parseFloat(cx);
    var temp_y = parseFloat(cy);
    
    if(x !== 0){
        if(direction === 'right'){
            temp_x = temp_x + 100;
        }
        if(direction === 'left'){
            temp_x = temp_x - 100;
        }
    }
    if(y !== 0){
        if(direction === 'down'){
            temp_y = temp_y + 75;
            console.log('im down!!!');
        }
        if(direction === 'up'){
            temp_y = temp_y - 75;
            console.log('im up!!!');
        }
    }
    
    console.log('x: '+ temp_x +' y: '+temp_y + ' stayed: '+ stay);
    switched_circle = $('.draggable[cx="'+temp_x+'"][cy="'+temp_y+'"]').get(0);
    var switched_cx = $(switched_circle).attr('cx');
    var switched_cy = $(switched_circle).attr('cy');
    console.log('switched_cx, cy', switched_cx, switched_cy);
    

    
    /*move the switched circle*/
    var move_x = 0 - x;
    var move_y = 0 - y;
    
    switched_circle.style.webkitTransform =
    switched_circle.style.transform =
    'translate(' + move_x + 'px, ' + move_y + 'px)'; 
    
    target.style.webkitTransform =
    target.style.transform =
    'translate(' + x + 'px, ' + y + 'px)';   
    
    var width_range = parseFloat($("rect").attr("width"));
    var height_range = parseFloat($("rect").attr("height"));
    
        
     /*Position will be changed if x or y exceed a range*/   
    if((Math.abs(x) > 2*width_range/5) || (Math.abs(y) > 2*height_range/5)){
        final_move(target, switched_cx, switched_cy, item);
    }else{
        stay = true;
    } 
}

function final_move(target, x, y, item){

    target.setAttribute('cx', x);
    target.setAttribute('cy', y);
    new_cx = x;
    new_cy = y;
    
//     var reverse_x = 0 - x;
//     var reverse_y = 0 - y;
    
    console.log('target ', target);
    
//     switched_circle.style.webkitTransform = switched_circle.style.transform =
//         'translate(' + reverse_x + 'px, ' + reverse_y + 'px)';
    switched_circle.setAttribute('cx', original_cx);
    switched_circle.setAttribute('cy', original_cy);
    switched_circle.style.webkitTransform = switched_circle.style.transform =
    'translate(' + 0 + 'px, ' + 0 + 'px)';
    
    console.log('switched: ', switched_circle);
    
//     $('svg').append(makeCircle(original_cx, original_cy, 33.75, '#000000'));
    
    switched_circle = undefined;
    stay = false;
        
    item.mousemove(undefined);
}

function stop_move(event){
    var target = event.target;
    if(!mouseDown || (new_cx === 0) || (new_cy === 0)){
        target.style.webkitTransform = target.style.transform =
             'translate(' + 0 + 'px, ' + 0 + 'px)';
        
        if(switched_circle !== undefined){
            switched_circle.style.webkitTransform = switched_circle.style.transform = 
                'translate(' + 0 + 'px, ' + 0 + 'px)';
//             switched_circle = undefined;
            console.log('im in if!!!');
        }
        mouseDown = false;
        return;
    }

    bool_move = true;
    x_initial = 0;
    y_initial = 0;
    
    if(stay === true){
        target.style.webkitTransform = target.style.transform =
             'translate(' + 0 + 'px, ' + 0 + 'px)';
        target.setAttribute('cx', original_cx);
        target.setAttribute('cy', original_cy);
        
        switched_circle.style.webkitTransform = switched_circle.style.transform = 
            'translate(' + 0 + 'px, ' + 0 + 'px)';     
        
        console.log('stay is true: ');
        switched_circle = undefined;
    }
    if(stay === false){
        target.style.webkitTransform = target.style.transform =
             'translate(' + 0 + 'px, ' + 0 + 'px)';
        target.setAttribute('cx', new_cx);
        target.setAttribute('cy', new_cy);
        switched_circle = undefined;
//         switched_circle.style.webkitTransform = switched_circle.style.transform =
//             'translate(' + 0 + 'px, ' + 0 + 'px)';
//         switched_circle.setAttribute('cx', original_cx);
//         switched_circle.setAttribute('cy', original_cy);
        
        
//         var color = $(switched_circle).attr('fill');
//         console.log('stay is false: '+ switched_circle + ' color: '+ color +'\ncx:' +original_cx + ' cy: ' + original_cy);
        
        new_cx = 0;
        new_cy = 0;
    }   
    mouseDown = false;
}


function attachEvent(){
    $('.draggable').mousedown(function(event){
        mouseDown = true;
        stay = true;
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
                var flags = check_edge(original_cx, original_cy, x_distance, y_distance);
                var x_flag = flags[0];
                var y_flag = flags[1];
                var direction;
                if((Math.abs(x_distance) > Math.abs(y_distance)) && x_flag){               
                    if(x_distance > 0)
                        direction = 'right';
                    else
                        direction = 'left';                
                    move_circle(target, x_distance, 0, item, direction); 
                }
                if(Math.abs(x_distance) < Math.abs(y_distance) && y_flag){
                    if(y_distance > 0)
                        direction = 'down';
                    else
                        direction = 'up';                
                    move_circle(target, 0, y_distance, item, direction);                        
                }
            }
        });
    });

    $('.draggable').mouseup(stop_move);
    $('.draggable').mouseleave(stop_move);
}

$(document).ready(function(){
    
    var $item = $("<div class = 'item-grid'></div>");
    $("#start-btn").click(function(){
        $(this).hide();
        var p = $("#game-panel");
        drawGrid(p);
        attachEvent();
    });  
     
//     $('.draggable').mousedown(function(event){
//             alert('here!');
//             mouseDown = true;
//             stay = true;
//             x_initial = event.pageX;
//             y_initial = event.pageY;
//             original_cx = parseFloat(event.target.getAttribute('cx'));
//             original_cy = parseFloat(event.target.getAttribute('cy'));
// //             console.log(original_cx, original_cy);
//             $(this).mousemove(function(event){  
//                 var item = $(this);
//                 if(mouseDown){
//                     var target = event.target;
//                     var x_distance = event.pageX - x_initial;
//                     var y_distance = event.pageY - y_initial;
//                     var flags = check_edge(original_cx, original_cy, x_distance, y_distance);
//                     var x_flag = flags[0];
//                     var y_flag = flags[1];
//                     var direction;
//                     if((Math.abs(x_distance) > Math.abs(y_distance)) && x_flag){               
//                         if(x_distance > 0)
//                             direction = 'right';
//                         else
//                             direction = 'left';                
//                         move_circle(target, x_distance, 0, item, direction); 
//                     }
//                     if(Math.abs(x_distance) < Math.abs(y_distance) && y_flag){
//                         if(y_distance > 0)
//                             direction = 'down';
//                         else
//                             direction = 'up';                
//                         move_circle(target, 0, y_distance, item, direction);                        
//                     }
//                 }
//             });
//         });

//         $('.draggable').mouseup(stop_move);
//         $('.draggable').mouseleave(stop_move);
});
