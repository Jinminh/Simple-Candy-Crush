function save_state(){
    var save = prompt("Please enter a name for this ");
    if(save !== null){
		var obj = {name: save, board: game_array};
        
        var current_cookie = document.cookie;
        
        if(!current_cookie){
            console.log('i shouldent be here>>>>>>>');
            document.cookie = JSON.stringify(obj);
            return;
        }
        
//         console.log('obj>>>', JSON.stringify(obj));
        
        current_cookie += (';' +JSON.stringify(obj));
        
        console.log(current_cookie);
        
        document.cookie = current_cookie;
        
//         console.log(">>>>>>>obj>>>>>>>>>", JSON.stringify(obj));
        
//         document.cookie = JSON.stringify(obj);

        console.log("cookie>>>>>", document.cookie);
    }
}

function get_state(){
	var state = (document.cookie).split(';');
	var obj;
    console.log(document.cookie);
    
    for(var i=0; i<state.length; i++){
        obj = JSON.parse(state[i]);
        $(".list").html('<li id="'+obj.name + '" class="link" data-toggle="collapse" data-target="#game-panel">'+obj.name+'</li>');
    }
    
    $('.list li').click(function(){
        $('.start-panel').hide();
        for(var j=0; j<state.length; j++){
            obj = JSON.parse(state[j]);
//             console.log('im here>>>',obj, this.id);
            
            if(obj.name === this.id){
                console.log('table>>>>',JSON.stringify(obj.board));
                
                var p =$("#game-panel");
                drawGrid_1(p, obj.board);
                attachEvent();
                game_array = obj.board;
                
                is_started = true;
                if($(window).width() > 1300)
			        $('.g-btns').show();
            }
        }
    });
}



function drawGrid_1(panel, board){
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
//             var circle_color = color_generator[0];
            var circle_color_num = board[temp_h][temp_w];
            var circle_color
            switch(circle_color_num){
                case 1:
                    circle_color = "#ea6912";
                    break;
                case 2:
                    circle_color = "#1261ea";
                    break;
                case 3:
                    circle_color = "#e00b2b";
                    break;
                case 4:
                    circle_color = "#05c42b";
                    break;
                case 5:
                    circle_color = "#c405c4";
                    break;
            }
                      
            svg.append(makeCircle(circle_x, circle_y, circle_r, circle_color, temp_w, temp_h, circle_color_num));
        }
    }
    panel.append(svg);
}








