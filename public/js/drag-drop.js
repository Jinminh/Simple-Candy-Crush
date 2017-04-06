var f_x, f_y;
// target elements with the "draggable" class
interact('.draggable')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
   restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },
    // enable autoScroll
    autoScroll: true,

    // call this function on every dragmove event
    onmove: dragMoveListener,
    // call this function on every dragend event
    onend: function (event) {
       var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
        
        console.log('final: ',f_x, f_y);
      
      var textEl = event.target.querySelector('p');
      textEl && (textEl.textContent =
                'moved a distance of '+ (Math.sqrt(event.dx * event.dx + event.dy * event.dy)|0) + 'px');
    }
  });


  function dragMoveListener (event) { 
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    
      
    /*Allow the item only can move along a or y axis*/
    if(Math.abs(event.dx) > Math.abs(event.dy)){
        target.style.webkitTransform =
        target.style.transform =
        'translate(' + x + 'px, ' + 0 + 'px)';
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', 0);
    }
    
    if(Math.abs(event.dx) < Math.abs(event.dy)){
        target.style.webkitTransform =
        target.style.transform =
        'translate(' + 0 + 'px, ' + y + 'px)';
        target.setAttribute('data-y', y);
        target.setAttribute('data-x', 0);
    } 
       
    
    /*Position will be changed if x or y exceed a range*/
    if(x > 50){
        target.setAttribute('cx', 500-x);
        target.setAttribute('cy', 400);
    }
    if(x < -50){
        target.setAttribute('cx', 300-x);
        target.setAttribute('cy', 400);
    }
    
    if(y > 50){
        target.setAttribute('cx', 400);
        target.setAttribute('cy', 500-y);
    }
    if(y < -50){
        target.setAttribute('cx', 400);
        target.setAttribute('cy', 300-y);
    }  
    
    
    console.log(x,y);
    f_x = x;
    f_y = y;
  }
    
    

  // this is used later in the resizing and gesture demos
  window.dragMoveListener = dragMoveListener;





