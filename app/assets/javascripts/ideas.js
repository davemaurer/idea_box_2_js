$(document).ready(function() {
  getIdeas();
  createIdea();
});

function getIdeas() {
  $.getJSON('/api/v1/ideas')
    .then(function(ideas) {
      ideas.forEach(function(idea) {
        renderIdea(idea)
      })
    })
}

function renderIdea(idea) {
  truncateIdea(idea);
  var newIdea = $('<div class="#ideas" data-id="'
    + idea.id
    + '"><h4>' + idea.title + '</h4>'
    + '<h5>' + idea.body + '</h5>'
    + ' Quality: '
    + idea.quality
    + '</div>'
    + '<br>'
  );
  $('#ideas').append(newIdea)
}

function truncateIdea(idea) {
  if(idea.body.length > 100) {
    idea.body = idea.body.slice(0, 100) + '...';
  }
}

function createIdea() {
  $('#create-idea').on('click', function() {
    var ideaParams = {
      idea: {
        title: $('#idea-title').val(),
        body:  $('#idea-body').val()
      }
    };

    $.ajax({
      type: 'POST',
      url: '/api/v1/ideas.json',
      data: ideaParams,
      success: function(idea) {
        renderIdea(idea);
        clearForm();
      }
    })
  })
}

function clearForm() {
  $("#idea-title").val('');
  $("#idea-body").val('');
}
