$(document).ready(function() {
  getIdeas();
  listenForCreateIdea();
  listenForDeleteIdea();
  listenForEditIdea();
});

function getIdeas() {
  $.getJSON('/api/v1/ideas')
    .then(function(ideas) {
      ideas.forEach(renderIdea);
    });
}

function renderIdea(idea) {
  truncateIdea(idea);
  var newIdea = createElementFromIdea(idea);
  $('#ideas').prepend(newIdea);
  setupEdit(idea);
}

function setupEdit(idea) {
  $('#edit' + idea.id).hide();
  $('#edit-idea').click(function() {
    hideEdit(idea);
  });
}

function hideEdit(idea) {
  $('#edit' + idea.id).slideToggle('fast')
}

function createElementFromIdea(idea) {
  return $('<div class="idea" data-id="' + idea.id + '"><h2>' + idea.title
    + '</h2><h4>' + idea.body + '</h4>' + '<p><strong>Quality:</strong> '
    + '<strong class="quality-rating">' + idea.quality + '</strong>' + '</p>'
    + '<button type="submit" id="upvote" class="btn btn-success btn-sm">Upvote</button>' + ' | '
    + '<button type="submit" id="downvote" class="btn btn-danger btn-sm">Downvote</button>' + ' -- '
    + '<button id="edit-idea" class="btn btn-info btn-sm">Edit</button>'
    + ' | ' + '<button id="delete-idea" class="btn btn-warning btn-sm">Delete</button>' + '<br>'
    + '<div id="edit' + idea.id + '" class="editing">' + 'Edit This Idea<div class="edit-form form-group">'
    + '<input type="text" class="form-control" id="edit-title" value="' + idea.title + '">'
    + '<input type="textfield" class="form-control" id="edit-body" value="' + idea.body + '">' + '</div>'
    + '<button type="submit" id="create-edit" class="btn btn-info btn-sm">Edit Idea</button>' + '</div>'
    + '<br>' + '</div>'
  );
}

function truncateIdea(idea) {
  if(idea.body.length > 100) {
    idea.body = idea.body.slice(0, 100) + '...';
  }
}

function listenForCreateIdea() {
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

function listenForEditIdea() {
  $('#ideas').delegate('#create-edit', 'click', function() {
    var $idea = $(this).closest('.idea');

    var ideaParams = {
      idea: {
        title: $idea.find('#edit-title').val(),
        body: $idea.find('#edit-body').val()
      }
    };

    var ideaId = $idea.attr('data-id');

    $.ajax({
      type: 'PATCH',
      url: '/api/v1/ideas/' + ideaId + '.json',
      data: ideaParams,
      success: function() {
        $idea.find('h2').text(ideaParams.idea.title);
        $idea.find('h4').text(ideaParams.idea.body);
        hideEdit({
          id: ideaId
        });
      }
    });
  });
}

function clearForm() {
  $("#idea-title").val('');
  $("#idea-body").val('');
}
