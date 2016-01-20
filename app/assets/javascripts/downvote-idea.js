$(document).ready(function() {
  listenForDownvote();
});

function listenForDownvote() {
  $('#ideas').on('click', '#downvote', function() {
    var $idea = $(this).closest('.idea');
    var ideaId = $idea.attr('data-id');

    $.ajax({
      type: 'PATCH',
      url: '/api/v1/ideas/' + ideaId + '/downvote.json',
      success: function(idea) {
        $idea.find('.quality-rating').text(idea.quality);
      }
    });
  });
}
