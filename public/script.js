(function(scope) {


	scope.fw = window.fw || {}
    
    scope.fw.on_clear_content = function() {
    	console.log("FW - Clear Content");
    	var content_node = document.getElementById("fw-sample-content")
    	content_node.innerHTML = '';
    	scope.fw.adjust_frame_size();
    }


    scope.fw.on_add_content = function	() {
    	console.log("FW - Add Content");
    	var content_node = document.getElementById("fw-sample-content")
    	var para = document.createElement("P");               // Create a <p> element
		para.innerText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ullamcorper dignissim cras tincidunt lobortis. Felis donec et odio pellentesque diam. Volutpat lacus laoreet non curabitur gravida. Ipsum dolor sit amet consectetur adipiscing elit. Eu lobortis elementum nibh tellus molestie nunc non. Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi tristique senectus et. Massa id neque aliquam vestibulum morbi blandit cursus risus at. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Nulla facilisi nullam vehicula ipsum a arcu. Eu facilisis sed odio morbi quis commodo odio. Massa tempor nec feugiat nisl pretium. Bibendum at varius vel pharetra vel turpis nunc. ";               // Insert text
    	content_node.appendChild(para);   
    	scope.fw.adjust_frame_size();
    }    


    scope.fw.adjust_frame_size = function(fixed_height=-1) {
    	console.log("FW - Adjusting size");

    	var body = document.body,
	    html = document.documentElement;

		var height = fixed_height !== -1 ? fixed_height : Math.max( body.scrollHeight, body.offsetHeight, 
	                       	   html.clientHeight, html.scrollHeight, html.offsetHeight );
		console.log("FW - New height: " + height + "px")

    	if(Sfdc) {
    		Sfdc.canvas.client.resize(scope.fw.canvasDetails.client, {height : height + "px"});
   			//Sfdc.canvas.client.autogrow(scope.fw.canvasDetails.client, true, 100);

   			setTimeout(scope.fw.print_frame_size, 1000);
   		}
   		else {
   			console.log("FW - Error: Salesforce Canvas App SDK not loaded");
   		}
    }

    scope.fw.print_frame_size = function() {
    	var sizes = Sfdc.canvas.client.size();
		console.log("contentHeight; " + sizes.heights.contentHeight);
		console.log("pageHeight; " + sizes.heights.pageHeight);
		console.log("scrollTop; " + sizes.heights.scrollTop);
		console.log("contentWidth; " + sizes.widths.contentWidth);
		console.log("pageWidth; " + sizes.widths.pageWidth);
		console.log("scrollLeft; " + sizes.widths.scrollLeft);

    }

    document.addEventListener('DOMContentLoaded', function(){ 
    	// requires that the Salesforce Canvas App SDK is loaded globally
    	console.log("FW - Document loaded")
    	scope.fw.adjust_frame_size(1800);
    	
	}, false);

})(window);