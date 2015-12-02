$(document).ready(function() {
  getIdeas();
  createIdea();
  editIdea();
});

function getIdeas() {
  $.getJSON('/api/v1/ideas')
    .then(function(ideas) {
      ideas.forEach(renderIdea);
    })
}

function renderIdea(idea) {
  truncateIdea(idea);
  var newIdea = createElementFromIdea(idea);
  $('#ideas').append(newIdea)
}

function createElementFromIdea(idea) {
  return $('<div class="#idea" data-id="'
    + idea.id + '"><h4>' + idea.title + '</h4>' + '<h5>' + idea.body + '</h5>'
    + ' Quality: ' + idea.quality + '</div><br>'
    + '<button id="edit-idea" class="btn btn-info btn-xs">Edit</button>'
  );
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

function editIdea() {
  $("#ideas").delegate("#edit-idea", "click", function() {
    var $idea = $(this).closest(".idea");

    var ideaParams = {
      idea: {
        title: $("#idea-title").val(),
        body: $("#idea-body").val()
      }
    };

    $.ajax({
      type: "PUT",
      url: "/api/v1/ideas" + $idea.attr('data-id') + ".json",
      data: ideaParams,
      success: function(idea) {
        $idea.replaceWith(idea);
      }
    });
  });
}

function clearForm() {
  $("#idea-title").val('');
  $("#idea-body").val('');
}

// add button to page
// click event ==> "i'm clicked"
// trigger slidedown
  // fetch the text <input />
  // (prepare) create an object with the user input <--- do this when you know how the data should be structured
// submit button --> establish connection --> ajax (PUT)
