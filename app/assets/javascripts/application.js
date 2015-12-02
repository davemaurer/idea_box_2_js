// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require_tree .

// //= is meaningless to js but important to the asset pipeline. Rails takes
// all of the things required above and jams them into one minified file. This
// goes into application.html.erb via <%= javascript_include_tag 'application' %>,
// making all of your javascript available everywhere. Moving the insertion below the
// yield will load all JS after the views are loaded
