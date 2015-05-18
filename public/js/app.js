$(function(){
  // get and render the phrases
  Phrase.all();
  View.init();  
});

//View object
function View() {};

View.init = function(){
  $('#new-phrase').on('submit', function(e){
    e.preventDefault();
    var phraseParams = $(this).serialize();
    Phrase.create(phraseParams);
  });
};

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
		View.render(res, "phrases-ul", "phrases-template");
	});
};

Phrase.create = function(phraseParams) {
  $.post("/phrases", phraseParams).done(function(res){
    Phrase.all();
  }).done(function(res){
    $('#new-phrase')[0].reset();
  });
};

Phrase.delete = function(phrase){
  var $phrase = $(phrase).data('id');
  $.ajax({
    url: '/phrases/' + $phrase,
    type: 'DELETE',
    success: function(res){
      Phrase.all()
    }
  });
};