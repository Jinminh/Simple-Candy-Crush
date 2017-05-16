var mouseDown = false;
var x_initial, y_initial;
var bool_move = true;
var stay = true;
var switched_circle;
var is_started = false;
var original_cx, original_cy, original_pos_x, original_pos_y;

var new_cx = 0, new_cy = 0, new_pos_x = 0, new_pos_y = 0; 
var final_rm_list = [];

function move_circle(target, x, y, item, direction){  
   // final_rm_list = [];
// 	console.log('im in move_circle>>>');
// 	print_arr();
	
    if(!stay)
        return;
    
    var cx = item.attr('cx');
    var cy = item.attr('cy');

    var temp_pos_x = parseFloat(item.attr('pos_x'));
    var temp_pos_y = parseFloat(item.attr('pos_y'));
    
    if(x !== 0){
        if(direction === 'right'){
            temp_pos_x += 1;
        }
        if(direction === 'left'){
            temp_pos_x -= 1;
        }
    }
    if(y !== 0){
        if(direction === 'down'){
            temp_pos_y += 1;
        }
        if(direction === 'up'){
            temp_pos_y -= 1;
        }
    }
    
//     console.log('x: '+ temp_x +' y: '+temp_y + ' stayed: '+ stay);
    switched_circle = $('.draggable[pos_x="'+temp_pos_x+'"][pos_y="'+temp_pos_y+'"]').get(0);
        
	//console.log('im switched>>>',switched_circle);
		
		
    var switched_cx = $(switched_circle).attr('cx');
    var switched_cy = $(switched_circle).attr('cy');
    var switched_pos_x = $(switched_circle).attr('pos_x'); 
    var switched_pos_y = $(switched_circle).attr('pos_y'); 
    
    $("svg").append(switched_circle);
    $("svg").append(target);
    
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
        final_move(target, switched_cx, switched_cy, switched_pos_x, switched_pos_y, item);
    }else{
        stay = true;
    } 
}

function final_move(target, x, y, pos_x, pos_y, item){ 
    var temp_arr = check_switchable($(target), $(switched_circle));
    var is_switchable = temp_arr[0];
    var rm_circle_list = temp_arr[1];
    
//     console.log("im temp_arr>>>>", JSON.stringify(rm_circle_list));
    
    
    if(!is_switchable){
        console.log('not switchable!!!');
        target.style.webkitTransform = target.style.transform =
                                'translate(' + 0 + 'px, ' + 0 + 'px)';
        switched_circle.style.webkitTransform = switched_circle.style.transform =
                                'translate(' + 0 + 'px, ' + 0 + 'px)';
        switched_circle = undefined;
        stay = false;
        item.mousemove(undefined);
        return;
    }
    
    target.setAttribute('cx', x);
    target.setAttribute('cy', y);
    target.setAttribute('pos_x', pos_x);
    target.setAttribute('pos_y', pos_y);
    new_cx = x;
    new_cy = y;  
    new_pos_x = pos_x;
    new_pos_y = pos_y;

    switched_circle.setAttribute('cx', original_cx);
    switched_circle.setAttribute('cy', original_cy);
    switched_circle.setAttribute('pos_x', original_pos_x);
    switched_circle.setAttribute('pos_y', original_pos_y);
    
    switched_circle.style.webkitTransform = switched_circle.style.transform =
    'translate(' + 0 + 'px, ' + 0 + 'px)';
    
//     target.style.webkitTransform = target.style.transform =
//     'translate(' + 0 + 'px, ' + 0 + 'px)';
//     switched_circle = undefined;
//     remove_circles(rm_circle_list);
    final_rm_list = rm_circle_list;
    
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
        
        switched_circle = undefined;
    }
    if(stay === false){
        target.style.webkitTransform = target.style.transform =
             'translate(' + 0 + 'px, ' + 0 + 'px)';
        target.setAttribute('cx', new_cx);
        target.setAttribute('cy', new_cy);
        
        
        // console.log('switched_circle>>>>>', switched_circle);
                    
        switched_circle.setAttribute('cx', original_cx);
        switched_circle.setAttribute('cy', original_cy);
        switched_circle.setAttribute('pos_x', original_pos_x);
        switched_circle.setAttribute('pos_y', original_pos_y);
        switched_circle = undefined;
        
        remove_circles(final_rm_list);
        console.log(JSON.stringify(final_rm_list));
		
        falling_down();
    }
    final_rm_list = [];
    new_cx = 0;
    new_cy = 0;
    mouseDown = false;
//     console.log(game_array);
}


function attachEvent(){
    $('.draggable').mousedown(function(event){
        mouseDown = true;
        stay = true;
        x_initial = event.pageX;
        y_initial = event.pageY;
        original_cx = parseFloat(event.target.getAttribute('cx'));
        original_cy = parseFloat(event.target.getAttribute('cy'));
        original_pos_x = parseFloat(event.target.getAttribute('pos_x'));
        original_pos_y = parseFloat(event.target.getAttribute('pos_y'));
             //console.log(original_cx, original_cy);
        $(this).mousemove(function(event){  
            var item = $(this);
            if(mouseDown){
                var target = event.target;
				//console.log('target>>>>>', target);
				
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

