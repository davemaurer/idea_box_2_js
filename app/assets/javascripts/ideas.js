$(document).ready(function() {
  getIdeas();
});

function getIdeas() {
  $.getJSON('/api/v1/ideas')
    .then(function(response) {
      $.each(response, function(i, idea) {
        renderIdea(idea)
      })
    })
}

