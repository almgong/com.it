/**
 * Module that defines the main Router for the app.
 * All navigation should be done via calling
 * the defined functions here.
 **/
define([
	'bb'
	], function(Backbone) {

	var AppRouter = Backbone.Router.extend({

		routes: {
			'':   		'main',
			'profile': 'profile',
			'learn':   'learn',
			'learn/:topic/:exercise': 'learnExercise'
		},

		main: function() {
			console.log('Navigated to main');
		},
		profile:function() {
			console.log('navigated to profile')
		},
		learn:function() {
			//appViews.loadLearnLanding();
			console.log('navigated to learn')
		},
		learnIndividual:function(topic, ex) {
			console.log('navigated to individual exercise');
			//appViews.loadLearnIndividual();
		}

	});


 	var router = new AppRouter();
 	
 	return router;	//return instance of appRouter

 });