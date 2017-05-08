var game_array = [
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],                
                   [0,0,0,0,0,0,0,0,0,0], 
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0],
                   [0,0,0,0,0,0,0,0,0,0]
                ];

function basic_rand_color_generator(){
    var color_num = Math.floor(Math.random() * 5) + 1;
    switch(color_num){
        case 1:
            return ["#ea6912", 1];
        case 2:
            return ["#1261ea", 2];
        case 3:
            return ["#e00b2b", 3];
        case 4:
            return ["#05c42b", 4];
        case 5:
            return ["#c405c4", 5];
    }
}

function rand_color_generator(x, y){
    var color_num;
    var x_valid_color = false;
    var y_valid_color = false;
//     console.log("coor, ", x, y);
    for(;;){
        color_num =  Math.floor(Math.random() * 5) + 1;
        
        /*walk through x, y*/
        for(var i=1; i<=2; i++){
            if(x-i >= 0){
//                 console.log('im in x-i');
                if(game_array[x-i][y] != color_num){
//                     console.log('im in game_array[x-i][y] != color_num');
                    x_valid_color = true;
                    break;
                }else{
                    continue;
                }
            }else{
//                 console.log('im first else!!!');
                x_valid_color = true;
                break;
            }         
        }
        
        for(var i=1; i<=2; i++){
            if(y-i >= 0){
//                 console.log('im in y-i');
                if(game_array[x][y-i] != color_num){
//                     console.log('im in game_array[x][y-i] != color_num');
                    y_valid_color = true;
                    break;
                }else{
                    continue;
                }
            }else{
//                 console.log('im second else!!!');
                y_valid_color = true;
                break;
            }
        }
        /*check validation*/
        if((x_valid_color === true) && (y_valid_color === true)){   
            break;
        }else{
//             console.log('continue!!!');
            continue;
        }
    }   
    
    game_array[x][y] = color_num;
    switch(color_num){
        case 1:
            return ["#ea6912", 1];
        case 2:
            return ["#1261ea", 2];
        case 3:
            return ["#e00b2b", 3];
        case 4:
            return ["#05c42b", 4];
        case 5:
            return ["#c405c4", 5];
    }
}

function drawGrid(panel){
    var h = panel.innerHeight();
    var w = panel.innerWidth();
    
    console.log(w, h);
    
    var svg = $(makeSVG(w, h));
    
    var rect_h = h/10;
    var rect_w = w/10;
    
    for(var temp_h = 0; temp_h < 10; temp_h++){
        for(var temp_w = 0; temp_w < 10; temp_w++){
            
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
            var color_generator = rand_color_generator(temp_h, temp_w);
            var circle_color = color_generator[0];
            var circle_color_num = color_generator[1];
            
            svg.append(makeCircle(circle_x, circle_y, circle_r, circle_color, temp_w, temp_h, circle_color_num));
        }
    }
    panel.append(svg);
}

