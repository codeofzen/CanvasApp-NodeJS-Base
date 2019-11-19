(function(scope) {

   scope.fw = window.fw || {};


   scope.fw.on_clear_content = function() {
      console.log("FW - Clear Content");
      var content_node = document.getElementById("fw-sample-content")
      while (content_node.hasChildNodes()) {
         content_node.removeChild(content_node.lastChild);
      }
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

      // the offset is required to prevent scrollbars to show up. This needs to be adapted for smaller screen width.
      var FIXED_OFFSET = 50;
      var height = fixed_height !== -1 ? fixed_height : document.getElementById('main-container').offsetHeight + FIXED_OFFSET;
      console.log("FW - New height: " + height + "px")

      if(Sfdc) {
         
         Sfdc.canvas.client.resize(scope.fw.canvasDetails.client, {height : height + "px"});
   		setTimeout(scope.fw.print_inner_frame_size, 50);
         setTimeout(scope.fw.print_outer_frame_size, 100);
      }
      else {
        console.log("FW - Error: Salesforce Canvas App SDK not loaded");
      }
   }


   scope.fw.print_inner_frame_size = function() {
      if(fw.debug) {
         var body = document.body,
         html = document.documentElement;
         console.log("FW - Sample App Size:")
         console.log("    body.scrollHeight: " + body.scrollHeight);
         console.log("    body.offsetHeight: " + body.offsetHeight);
         console.log("    html.clientHeight: " + html.clientHeight);
         console.log("    html.scrollHeight: " + html.scrollHeight);
         console.log("    html.offsetHeight: " + html.offsetHeight);
      }
   }


   scope.fw.print_outer_frame_size = function() {
      if(fw.debug) {
         var sizes = Sfdc.canvas.client.size();
         console.log("FW - Salesforce Canvas App Size:")
         console.log("    contentHeight: " + sizes.heights.contentHeight);
         console.log("    pageHeight: " + sizes.heights.pageHeight);
         console.log("    scrollTop: " + sizes.heights.scrollTop);
         console.log("    contentWidth: " + sizes.widths.contentWidth);
         console.log("    pageWidth: " + sizes.widths.pageWidth);
         console.log("    scrollLeft: " + sizes.widths.scrollLeft);
      }
   }

   document.addEventListener('DOMContentLoaded', function() { 
   	// requires that the Salesforce Canvas App SDK is loaded globally
   	console.log("FW - Document loaded")
   	scope.fw.adjust_frame_size(1800);
   });

})(window);
