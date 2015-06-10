require.config({
	baseUrl: 'static/js/',
	paths: {
		'jquery': 'lib/jquery-2.1.4.min',
		'bootstrap': 'lib/bootstrap.min',
		'bb': 'lib/backbone-min',
		'underscore': 'lib/underscore-min',
		'appViews': 'appViews',
		'app': 'app',
		'text': 'lib/text',
		'captionjs': 'lib/jquery.caption.min'
	}
});


require(['jquery', 'underscore', 'text'], function($, _, t) {
	require(['app', 'bootstrap'], function(app, bt) {

		app.smoothLoadContent(); 

	});
});