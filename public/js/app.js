$(function(){
  // get and render the phrases
  Phrase.all();
});

//View object
function View() {};
View.render = function(items, parentId, templateId) {
  // render a template
  var template = _.template($("#" + templateId).html());
  // input data into template and append to parent
  $("#" + parentId).html(template({collection: items}));
};

// Phrases object
function Phrase() {};
Phrase.all = function() {
	$.get("/phrases", function(res){
		var x = JSON.parse(res);
		View.render(x, "phrases-ul", "phrases-template");
	});
};
