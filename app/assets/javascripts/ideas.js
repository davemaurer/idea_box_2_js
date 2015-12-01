$(document).ready(function() {
  getIdeas();
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
  var newIdea = $('<div class="col-sm-10 col-sm-centered #ideas" data-id="'
    + idea.id
    + '"><h4>' + idea.title + '</h4>'
    + '"><h5>' + idea.body + '</h5>'
    + ' Quality: '
    + idea.quality
  );
  $('#ideas').append(newIdea)
}

function truncateIdea(idea) {
  if(idea.body.length > 100) {
    idea.body = idea.body.slice(0, 100) + '...';
  }
}
