/*save currernt board*/
function save_state(){
    var save = prompt("Please enter a name for this ");
    if(save !== null){
		var obj = {name: save, board: game_array};
		var storage = localStorage.getItem("states");
		var states_arr = [];
		if(storage == null){	
			states_arr.push(obj);
		}else{
			states_arr = JSON.parse(storage);
			states_arr.push(obj);
		}	
		localStorage.setItem("states", JSON.stringify(states_arr));
		alert('Current board is successfully saved!');
		return;
	}
}

/*restore saved board*/
function get_state(){
	$(".list").html('');
	var storage = localStorage.getItem("states");
	if(storage == null){
		return;
	}
	var states_arr = JSON.parse(storage);
	
	
    var obj;
    for(var i=0; i<states_arr.length; i++){
        obj = states_arr[i];
        $(".list").append('<li id="'+obj.name + '" class="link" data-toggle="collapse" data-target="#game-panel">'+obj.name+'</li>');
    }
    
// 	var restore = restore_board(obj, states_arr);
	
	/*Draw board*/
    $('.list li').click(function(){
		console.log("list li clicked>>>>");
		
        $('.start-panel').hide();
        for(var j=0; j<states_arr.length; j++){
            obj = states_arr[j];
            
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
	
	var item_id;
	
	/*delete when right click*/
	$('.list li').bind('contextmenu', function(e){
		console.log('this>>>>>>>',$(this)[0].id);
		item_id = $(this)[0].id;
		e.preventDefault();
	  	$("#right-click-menu").css("left",e.pageX);
  		$("#right-click-menu").css("top",e.pageY);
		$("#right-click-menu").fadeIn(200,startFocusOut(item_id, states_arr)); 
	});
}

/*implementation of delete function*/
function startFocusOut(item_id, states_arr){
	$(document).on("click",function(){
		$("#right-click-menu").hide();        
		$(document).off("click");
	});
	
	/*delete from DOM and the session store*/
	$("#delete").click(function(){
		$('#'+item_id).remove();
		var obj;
		for(var i=0; i<states_arr.length; i++){
			obj = states_arr[i];
			if(obj.name == item_id){
				states_arr.splice(i, 1);
				localStorage.setItem("states", JSON.stringify(states_arr));
				return;
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








