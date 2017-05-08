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
//         console.log(circle_list[k]);
        $(circle_list[k]).remove();
    }
//     for(var i=0; i<10; i++){
//         console.log(game_array[0][i]);
//     } 
}

// function fill

function move_falling_circles(x, y){
    var circle;
    var prev_cy, prev_pos_y;
    for(var i=y; i>0; i--){
        game_array[i][x] = game_array[i-1][x];
        circle = $('.draggable[pos_x="'+x+'"][pos_y="'+(i-1)+'"]').get(0);
//         console.log('x, y', x, (i-1));
//         console.log($(circle)[0]);      
        
        prev_cy = parseFloat($(circle).attr('cy'));
        prev_pos_y = parseFloat($(circle).attr('pos_y'));
        console.log('cy, pos_y', prev_cy, prev_pos_y);

        
//         var myFunc = function(i) {
//             $(circle)[0].setAttribute('cy', prev_cy+i);
            
//             if(i === 75){
//                 console.log('im myFunc ', $(circle)[0]);
//                 return;
//             }

//             setTimeout(function() {
//                 myFunc(i + 1);
//             }, 3);
//         }
        
//         myFunc(0);
        
        $(circle).attr('cy', prev_cy+75); 
        $(circle).attr('posy', prev_pos_y+1);
        
        $("svg").append(circle);
        
    }
    
//     var cy = 37.5;
//     var cx = 50 + x*100;
//     var temp_color = basic_rand_color_generator();
//     var color = temp_color[0];
//     var color_num = temp_color[1];  
    
    game_array[0][x] = 9;
    
//     console.log('im doing when 0 x, y',  x, 0);
    
//     $('svg').append(makeCircle(cx, cy, 33.75, color, cx, cy, color_num)); 
}

function falling_down(){
    var str;
//     var falling_circle_list;
    for(var i=0; i<10; i++){
//         str = '';
        for(var j=0; j<10; j++){
//             str += game_array[j][i];
            if(game_array[j][i] === 0){
//                 console.log('im 0 i, j',i, j );
                move_falling_circles(i, j);
            }
            
        }
//         console.log(str);
    }
    print_arr();
}








