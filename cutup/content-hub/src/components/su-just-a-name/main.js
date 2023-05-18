module.exports = async function (input) {
    // Validate input variables
    input.content = typeof input.content === 'string' ? input.content : '';
    input.textColour = typeof input.textColour === 'string' ? input.textColour : '';
    input.bgColour = typeof input.bgColour === 'string' ? input.bgColour : '';
    input.containerId = typeof input.containerId === 'string' ? input.containerId : '';

    // Setup Text color and BG Colour
    input.textColour = 'text-' + input.textColour.toLowerCase();
    input.bgColour = input.bgColour.toLowerCase().replace(/ /g, '-').replace(/\(/g, '').replace(/\)/g, '');
    input.bgColour = 'background-' + input.bgColour.toLowerCase().replace(/ /g, '-');

    if (input.content.length === 0) {
        return '';
    }

    // Build output of the component:
    return `
    <div id="${input.containerId}">
      <div class="row">
        <div class="col-xs-12 col-sm-10 col-sm-offset-1 col-lg-8 col-lg-offset-2">
  
          <div class="acknowledgement ${input.textColour} ${input.bgColour}">
              ${input.content}
          </div>
  
        </div><!--@@ /columns @@-->
      </div> <!--@@ /row @@-->
    </div>`;
};
