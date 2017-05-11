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
                
               // console.log('removing>>>>>>',circ_x, start_y);
            }
            if(temp_list[i].direction === 'y'){
                circ_y = start_y+j;
                circle = $('.draggable[pos_x="'+start_x+'"][pos_y="'+circ_y+'"]').get(0);
                game_array[circ_y][start_x] = 0;
             //   console.log('removing>>>>>>',start_x, circ_y);
            }
            if(!list_contains(circle_list, circle))
                circle_list.push(circle);
        }
    }
    
    for(var k=0; k<circle_list.length; k++){
//         console.log(circle_list[k]);
        $(circle_list[k]).remove();
    }
//     for(var i=0; i<10; i++){
//         console.log(game_array[0][i]);
//     } 
}


function new_circle_falling(circle, pos_y){
    var falling_distance = 37.5 + 75*pos_y;
//     console.log('falling_distance111>>>>', falling_distance);

//     console.log('falling dis>>>>', falling_distance);
    
    var myFunc = function(i, circ, pos_y){
        $(circ).attr('cy', i);
//         console.log('i>>>>>>>', i);
        if(i > (falling_distance-1)){
            
			//console.log("im i>>>>",i, " im dis>>>",falling_distance, " im pos_y>>>>",pos_y);
            
			$(circ).attr('cy', falling_distance);     
			
			//console.log('im circ>>>',circ);
			
			$('svg').append(circ);
			
            return;
        }
        setTimeout(function() {
            myFunc(i + 1, circ, pos_y);
        }, 3);
    }  
    myFunc(0, circle, pos_y);
//     circle.setAttribute('cy', falling_distance);
//     console.log('falling_distance>>>>', typeof falling_distance);
    
}

function create_new_circles(x, num){
    var color_arr, color, color_num, cx, cy, pos_x, pos_y, circle;
    
//     var cy = 0;

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
        new_circle_falling(circle, pos_y);
        game_array[pos_y][pos_x] = color_num;
    }
}

function move_falling_circles(list){
    var len = list.length;
    var x = list[0].x;
// 	var start_y;
    var start_y = list[0].y-1;
    var circle;
    var falling_distance = 75*len;
    
	console.log('list>>>>',JSON.stringify(list));
	
	var y_arr = [];
	
	for(var cnt=0; cnt<len; cnt++){
		y_arr.push(list[cnt].y);
	}

	console.log('y_arr>>>>',JSON.stringify(y_arr));
	
	
    /*traverse from the first element above the empty location*/
    for(var i = start_y; i>=0; i--){  
        circle = $('.draggable[pos_x="'+x+'"][pos_y="'+i+'"]').get(0);       
        $("svg").append(circle);
        var prev_cy = parseFloat($(circle).attr('cy'));  
        
        //falling effect
        var myFunc = function(i, circ, prev_cy){
            $(circ).attr('cy', prev_cy+i);
            
            if(i === falling_distance){
                return;
            }
            setTimeout(function() {
                myFunc(i + 1, circ, prev_cy);
            }, 3);
        }  
        myFunc(0, circle, prev_cy);
        
        
        var prev_pos_y = parseFloat($(circle).attr('pos_y'));
        $(circle).attr('pos_y', prev_pos_y+len);
        var pos_x = parseFloat($(circle).attr('pos_x'));
        var pos_y = parseFloat($(circle).attr('pos_y'));
        var color_num = parseFloat($(circle).attr('color_num'));
        
        game_array[pos_y][pos_x] = color_num;
        game_array[prev_pos_y][pos_x] = 0;
    }
	
	
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

        }
    }
    
    print_arr();
//     function myFunction() {
//         setTimeout(function(){ 
//             print_arr();}, 300); 
//     }
}