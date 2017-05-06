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

function falling_down(){
    var str;
    for(var i=0; i<10; i++){
        str = '';
        for(var j=0; j<10; j++){
            str += game_array[j][i];
        }
        console.log(str);
    }
}








