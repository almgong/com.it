/**
 * Driver file that will initialize and offer any 
 * necessary logic (should refactor soon)
 **/
 define([
 	'bb',
 	'text!templates/loadingAnimation.html',
 	'appViews'
 	], function(Backbone, loadingAnimationHTML, appViews) {

 	//code to run immediately after DOM loads (NO BB views, only routing)
 	$(function() {
 		var nav_ele = $('.top-navigation li a');	

 		nav_ele.hover(function() {
 			if(!$(this).parent().hasClass('active')) {
 				$(this).append('<br/><i class="fa fa-circle light-purple"></i>');
 			}
 		},
 		function() {
 			if(!$(this).parent().hasClass('active')) {
 				$(this).find('i, br').remove();
 			}
 		});

 		var AppRouter = Backbone.Router.extend({

 			routes: {
 				'/':   		'main',
 				'profile': 	'profile',
 				'learn':    'learn'
 			},

 			main: function() {
 				console.log('loaded main')
 			},
 			profile:function() {
 				console.log('in profile')
 			},
 			learn:function() {
 				console.log('in learn')
 			}

 		});

 		Backbone.history.start();	//start history + routing

 		var router = new AppRouter();
 	});	

 	//function to toggle animation - may not end up needing
 	var toggleLoadingAnimation = function() {

 		//loading anymation IS present on page
 		if ($('.loading').length) {
 			$('.loading').remove();
 			$('body').css('opacity', 1)
 		}
 		else {
 			$('.main').prepend(loadingAnimationHTML);
 			$('body').css('opacity', .5);
 		}
 	};

 	//main driver that loads content via bb views
 	var loadContent = function() {
 		appViews.loadSidebar();
 		appViews.loadMain();
 	};

 	//modular functions

 	return {
 		toggleLoadingAnimation:toggleLoadingAnimation,
 		loadContent:loadContent
 	}
 	
 });