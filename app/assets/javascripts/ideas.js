$(document).ready(function() {
  getIdeas();
  createIdea();
  deleteIdea();
  editIdea();
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
  return $('<div class="idea" data-id="'
    + idea.id + '"><h3>' + idea.title + '</h3>' + '<h4>' + idea.body + '</h4>'
    + '<p> Quality: ' + '<strong>' + idea.quality + '</strong>' + ' - '
    + '<button type="submit" id="upvote" class="btn btn-success btn-xs">Upvote</button>' + ' | '
    + '<button type="submit" id="downvote" class="btn btn-danger btn-xs">Downvote</button>' + '<p>'
    + '<br>' + '<button id="edit-idea" class="btn btn-info btn-xs">Edit</button>'
    + ' | ' + '<button id="delete-idea" class="btn btn-danger btn-xs">Delete</button>'
    + '<div id="edit' + idea.id + '" class="editing">' + '<div class="edit-form form-group">'
    + '<input type="text" class="form-control" id="edit-title" value="' + idea.title + '">'
    + '<input type="textfield" class="form-control" id="edit-body" value="' + idea.body + '">' + '</div>'
    + '<button type="submit" id="create-edit" class="btn btn-success btn-xs">Edit Idea</button>'
    + '</div>' + '<br>' + '</div>'
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
        $idea.find('h3').text(ideaParams.idea.title);
        $idea.find('h4').text(ideaParams.idea.body);
        hideEdit({
          id: ideaId
        });
      }
    });
  });
}

function deleteIdea() {
  $('#ideas').delegate('#delete-idea', 'click', function() {
    var $idea = $(this).closest('.idea');

    $.ajax({
      type: 'DELETE',
      url: 'api/v1/ideas/' + $idea.attr('data-id') + '.json',
      success: function(i) {
        $idea.remove();
      },
      error: function() {
        $idea.remove();
      }
    })
  })
}

function clearForm() {
  $("#idea-title").val('');
  $("#idea-body").val('');
}
