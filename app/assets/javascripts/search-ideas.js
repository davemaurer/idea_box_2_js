$(document).ready(function() {
  listenForSearchIdeas();
});

function listenForSearchIdeas() {
  $('#idea-search').keyup(function() {
    var searchLetters = $('#idea-search').val().toLowerCase();

    $('.idea').each(function(i, idea) {
      var title = $(idea).find('h2').text().toLowerCase();
      var body = $(idea).find('h4').text().toLowerCase();
      var match = (title + body).indexOf(searchLetters) >= 0;
      $(idea).toggle(match)
    })
  })
}
