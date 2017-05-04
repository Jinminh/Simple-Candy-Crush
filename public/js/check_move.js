function print_arr(){
    var string;
    for(var i=0; i<10; i++){
       string = '';
        for(var j=0; j<10; j++){
            string += game_array[i][j];
            string += ' ';
        }
        console.log(string);
    }
}

/*traverse the whole matrix to check if there is any 3 in row*/
function check_colors_in_row(arr){ 
//     print_arr();
        
    var x_count = 1;
    var y_count = 1;
    
    var start_x = -1;
    var start_y = -1;
    
    var x_color = -1;
    var y_color = -1;
    
    var obj_array = [];
    var temp_color;
    
    /*check along x axis*/
    for(var i=0; i<10; i++){
        for(var j=0; j<8; j++){
            x_count = 1;
            temp_color = arr[i][j];
            
            for(var k=1; k<5; k++){
//                 console.log('j is ', j);
                if(j+k > 9){
//                     console.log('im in j+k>9',' x>>',j+k, ' y/i>>', i, 'j>>', j, ' color>>', temp_color,' count>>', x_count);
                    break;
                }
                if(arr[i][j+k] === temp_color){
                    x_count++;
//                     console.log('im in count',' x>>',j+k, ' y/i>>', i, 'j>>', j,' my color>>',arr[i][j+k], 'match color>>',temp_color, ' count>>', x_count);
                }else{
//                     console.log('im in break222222',' x>>',j+k, ' y/i>>', i, 'j>>', j,' my color>>', arr[i][j+k], 'match color>>',temp_color,' count>>', x_count);
                    break;
                }
            }
            if(x_count >= 3){
//                 console.log('x_count is>>>>>>>>>>>>>>>>>>>>>>> ', x_count);
                var obj = {color:temp_color, direction:'x', cnt:x_count, start_x:j, start_y:i};
                obj_array.push(obj);
//                 console.log('im in x_count=3 ', JSON.stringify(obj_array));
//                 for(var ii=0; ii<10; ii++){
//                     console.log(arr[0][ii]);
//                 }
                j += (x_count-1);
            }
        }       
    }
    
        /*check along y axis*/
    for(var i=0; i<10; i++){
        for(var j=0; j<8; j++){
            y_count = 1;
            temp_color = arr[j][i];
            
            for(var k=1; k<5; k++){
//                 console.log('j is ', j);
                if(j+k > 9){
//                     console.log('im in break2222',' y>>',j+k, ' x>>', i, ' color>>', temp_color,' count>>', y_count);
                    break;
                }
                if(arr[j+k][i] === temp_color){
                    y_count++;
//                     console.log('im in count',' y>>',j+k, ' x>>', i, ' color>>',temp_color,' count>>', y_count);
                }else{
//                     console.log('im in break222222',' y>>',j+k, ' x>>', i, ' my color>>', arr[j+k][i], 'match color>>',temp_color,' count>>', y_count);
                    break;
                }
            }
            if(y_count >= 3){
//                 console.log('x_count is ', x_count);
                var obj = {color:temp_color, direction:'y', cnt:y_count, start_x:i, start_y:j};
                obj_array.push(obj);
//                 console.log('im in y_count=3 ', JSON.stringify(obj_array));
                j += (y_count-1);
            }
        }       
    }
    
//     console.log('im before return ', JSON.stringify(obj_array));
    return obj_array;
}

function check_switchable(dragged_item, switched_item){
    var temp_game_arr;
    var d_x = parseFloat(dragged_item.attr('pos_x'));
    var d_y = parseFloat(dragged_item.attr('pos_y'));
    var d_color = parseFloat(dragged_item.attr('color_num'));
    
    var s_x = parseFloat(switched_item.attr('pos_x'));
    var s_y = parseFloat(switched_item.attr('pos_y'));
    var s_color = parseFloat(switched_item.attr('color_num'));
    
    temp_game_arr = game_array;
    
    temp_game_arr[d_y][d_x] = s_color;
    temp_game_arr[s_y][s_x] = d_color;
    
//     console.log(s_x, s_y, d_color, temp_game_arr[s_y][s_x]);
//     console.log(d_x, d_y, s_color, temp_game_arr[d_y][d_x]);    

    var obj_array = check_colors_in_row(temp_game_arr);
    if(obj_array.length !== 0){
//         console.log(JSON.stringify(obj_array[0]));
        game_array[d_y][d_x] = s_color;
        game_array[s_y][s_x] = d_color;
        
        return [true, obj_array];
    }else{
        temp_game_arr[d_y][d_x] = d_color;
        temp_game_arr[s_y][s_x] = s_color;
        return [false, obj_array];
    }
    
    /*check dragged_item*/
}


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


