$(document).ready(function() {
  listenForUpvote();
});

function listenForUpvote() {
  $('#ideas').on('click', '#upvote', function() {
    var $idea = $(this).closest('.idea');
    var ideaId = $idea.attr('data-id');

    $.ajax({
      type: 'PATCH',
      url: '/api/v1/ideas/' + ideaId + '/upvote.json',
      success: function(idea) {
        $idea.find('.quality-rating').text(idea.quality);
      }
    });
  });
}
