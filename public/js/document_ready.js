$(document).ready(function(){
	$(window).resize(function() {
		if ($(window).width() < 1300) {
// 	   		alert('Less than 1300');
			$('.g-btns').hide();
		}else{
			if(is_started)
				$('.g-btns').show();
		}
	});
	
    $('#restore-btn').click(function(){
		$('.dropdown-content').css('display', 'inline-block');
	});
	
	$(window).click(function(event){
		var target = $(event.target);
		if(!target.is("#restore-btn"))
			$(".dropdown-content").hide();	
	});
	
//     var $item = $("<div class = 'item-grid'></div>");
    $("#start-btn").click(function(){
		is_started = true;
		if($(window).width() > 1300)
			$('.g-btns').show();
		
        $(this).hide();
        var p = $("#game-panel");
        drawGrid(p);
        var rm_list = check_colors_in_row(game_array);
        
        if(rm_list.length !== 0){
            remove_circles(rm_list);
            falling_down();
        }   
        attachEvent();
    });  
	
	$('#restart-btn').click(function() {
		location.reload();
	});

});