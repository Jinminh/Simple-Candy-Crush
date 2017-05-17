var new_circ_count = 0;
var falling_func_count = 0;
var count = 0;

function list_contains(list, item){
//     console.log("im item>>>>>", item);
    var x = $(item).attr("pos_x");
    var y = $(item).attr("pos_y");
    var temp_x, temp_y;
    for(var i=0; i<list.length; i++){
        temp_x = $(list[i]).attr("pos_x");
        temp_y = $(list[i]).attr("pos_y");
        
        if((x === temp_x) && (y === temp_y))
            return true;
    }
    return false;
}

function remove_circles(temp_list){
    var circle_list = [];
    var circle;
    var start_x, start_y, circ_x, circ_y;
    for(var i=0; i<temp_list.length; i++){
        start_x = temp_list[i].start_x;
        start_y = temp_list[i].start_y;
        /*remove circle from the screen*/
        for(var j = 0; j < temp_list[i].cnt; j++){
            start_x = parseFloat(temp_list[i].start_x);
            start_y = parseFloat(temp_list[i].start_y);
            
            if(temp_list[i].direction === 'x'){
                circ_x = start_x+j;
                circle = $('.draggable[pos_x="'+circ_x+'"][pos_y="'+start_y+'"]').get(0);
                game_array[start_y][circ_x] = 0; 

            }
            if(temp_list[i].direction === 'y'){
                circ_y = start_y+j;
                circle = $('.draggable[pos_x="'+start_x+'"][pos_y="'+circ_y+'"]').get(0);
                game_array[circ_y][start_x] = 0;
            }
            if(!list_contains(circle_list, circle))
                circle_list.push(circle);
        }
    }
    
    for(var k=0; k<circle_list.length; k++){
        $(circle_list[k]).remove();
    }

}


function new_circle_falling(circle, pos_y, num){
    var falling_distance = 37.5 + 75*pos_y;

    var myFunc = function(i, circ, pos_y){
        $(circ).attr('cy', i);
        if(i > (falling_distance-1)){
			$(circ).attr('cy', falling_distance);     
			$('svg').append(circ);
			new_circ_count++;
            return;
        }
        setTimeout(function() {
            myFunc(i + 1, circ, pos_y);
        }, 1);
    }  
    myFunc(0, circle, pos_y);
	
// 	console.log('im in new_circle_falling');
// 	print_arr();
	
}

function create_new_circles(x, num){
    var color_arr, color, color_num, cx, cy, pos_x, pos_y, circle;

    for(var i=0; i<num; i++){
        color_arr = basic_rand_color_generator();
        color = color_arr[0];
        color_num = color_arr[1];
        cx = 50 + x*100;
        cy = 0;
        pos_x = x;
        pos_y = num-1-i;
        circle = makeCircle(cx, cy, 33.75, color, pos_x, pos_y, color_num);
        $('svg').append(circle);
        new_circle_falling(circle, pos_y, num);
// 		console.log('(',pos_x, ',', pos_y, ')', color_num);
		
        game_array[pos_y][pos_x] = color_num;
    }
	attachEvent();
}

function update_array(rm_list){
	var start_x, start_y, cnt, direction;
	for(var i=0; i<rm_list.length; i++){
		start_x = rm_list[i].start_x;
		start_y = rm_list[i].start_y;
		cnt = rm_list[i].cnt;
		direction = rm_list[i].direction;
		var color_num, curr_x, curr_y, circ;
		for(var j=0; j<cnt; j++){
			if(direction === 'x'){
				curr_x = start_x+j;
				curr_y = start_y;
			}
			if(direction === 'y'){
				curr_x = start_x;
				curr_y = start_y+j;
			}
// 			console.log('curr>>>', curr_x, curr_y);
			
			circ = $('.draggable[pos_x="'+curr_x+'"][pos_y="'+curr_y+'"]').get(0);
			
// 			console.log('circ>>>>', circ);
// 			console.log('unmove>>>',$('.draggable[pos_x="'+9+'"][pos_y="'+9+'"]').get(0));
			
			color_num = parseFloat($(circ).attr('color_num'));
			game_array[curr_y][curr_x] = color_num;
// 			console.log(game_array[curr_y][curr_x]);
			
			
		}
	}
// 	var list = check_colors_in_row(game_array);
// 	if(list.length !== 0){
// 		if(list[0].color === 0){
// 			console.log('i fount some 0000000');
// 			setTimeout(function(){
// 				update_array(rm_list);
// 			}, 800);
// 			print_arr();
// 			return;
// 		}
// 		remove_circles(list);
// 		falling_down();				
// 	}
}

function check_falling_distance(arr, y){
	var len = arr.length;
	for(var i=0; i<len; i++){
		if(y < arr[i]){
			return 75*(len - i);
		}
	}
	return 0;
}


function falling_together(falling_list){
// 	for(var i=0; i<falling_list.length; i++){
// 		console.log('circ>>>>', $(falling_list[i].circ).attr('cy'), 'falling_dis>>>', falling_list[i].falling_dis);
// 	}
		
	var falling_func = function(cnt ,falling_list){	
		for(var i=0; i<falling_list.length; i++){
			var prev_cy = parseFloat($(falling_list[i].circ).attr('cy'));
			var circ = falling_list[i].circ;
			var falling_dis = falling_list[i].falling_dis;
			
			/*if the circle reaches the falling distance, remove it*/
			if(cnt >= falling_dis){
				var prev_pos_y = parseFloat($(circ).attr('pos_y'));
				var cy = parseFloat($(circ).attr('cy'));
				$(circ).attr('pos_y', prev_pos_y+(falling_dis/75));
				var pos_x = parseFloat($(circ).attr('pos_x'));
				var pos_y = parseFloat($(circ).attr('pos_y'));
				var color_num = parseFloat($(circ).attr('color_num'));
				game_array[pos_y][pos_x] = color_num;
				falling_list.splice(i, 1);
				continue;
			}
			
			/*falling by 1*/
			$(circ).attr('cy', prev_cy+1);
		}
		
// 		console.log('falling_list>>>>',JSON.stringify(falling_list));
		
		if(falling_list.length === 0){			
			falling_func_count++;
			console.log("falling_cout>>>", falling_func_count, " count>>>", count);
			
			if(falling_func_count >= count){
				count = 0;
				falling_func_count = 0;						
				setTimeout(function(){
					var rm_list = check_colors_in_row(game_array);
					console.log('first print>>>>>');
					print_arr();
					if(rm_list.length !== 0){
// 						print_arr();
						remove_circles(rm_list);
						falling_down();		
					}
				}, 200);
				
				
				
// 				if(rm_list.length !== 0){
// 					if(rm_list[0].color === 0){
// 						console.log('i fount some 0000000');
// 						setTimeout(function(){
// 							update_array(rm_list);
// 							print_arr();
// 						}, 1000);
// 						return;
// 					}
// 					console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
// 					remove_circles(rm_list);
//             		falling_down();				
// 				}
			}
			console.log('last>>>>');
			print_arr();
			return;
		}
		setTimeout(function(){
			falling_func(cnt + 1, falling_list);
		}, 1);
	}
	falling_func(0, falling_list);
}


function move_falling_circles(list){
    var len = list.length;
    var x = list[0].x;
    var start_y = list[0].y-1;
    var circle;
    var falling_distance;
	
	var y_arr = [];
	var falling_circ_arr = [];
	
// 	console.log('list len>>>>', len);
	
	for(var cnt=0; cnt<len; cnt++){
		y_arr.push(list[cnt].y);
	}
	
	/*traverse the whole column*/
	for(var i=0; i<10; i++){
		
		/*if there is no circle in this grid, skip it*/
		if(game_array[i][x] === 0){	
// 			console.log('empty>>>x, y',x,i);
			continue;
		}
		
		falling_distance = check_falling_distance(y_arr, i);
		
		/*means there is no more empty grid in this column*/
		if(falling_distance === 0){
			break;
		}
		
		circle = $('.draggable[pos_x="'+x+'"][pos_y="'+i+'"]').get(0);
		$("svg").append(circle);
        var prev_cy = parseFloat($(circle).attr('cy'));
		falling_circ_arr.push({circ: circle, falling_dis: falling_distance});	
	}
	//falling effect
	falling_together(falling_circ_arr);
	
    create_new_circles(x, len);
}

/*falling down effect for circles*/
function falling_down(){
    var temp_list;
    
    /*Traverse each column*/
    for(var i=0; i<10; i++){
        temp_list = [];
        for(var j=0; j<10; j++){
            /*when there is an empty position, push it to temp_list*/
            if(game_array[j][i] === 0){
                temp_list.push({x:i, y: j});
            }     
        }
        if(temp_list.length !== 0){
            move_falling_circles(temp_list);
			count++;
        }
    }
    
// 	console.log('count>>>>', count);
// 	count = 0;
}