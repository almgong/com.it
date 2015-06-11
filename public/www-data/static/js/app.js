/**
 * Driver file that will initialize and offer any 
 * necessary logic (should refactor soon)
 **/
 define([
 	'text!templates/loadingAnimation.html',
 	'captionjs',
 	'appViews'
 	], function(loadingAnimationHTML, captionjs, appViews) {
 	console.log('hoorah')

 	//code to run after DOM loads
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

 		$('img.captionjs').captionjs({
 			"class_name": 'captionjs',
 			'mode': 'animated',
 			'is_responsive': false
 		});

 		$('.timeline-item.inactive').hover(function() {
 			$(this).toggleClass('inactive');
 			$(this).find('img').toggleClass('inactive');
 		}, 
 		function() {
 			$(this).toggleClass('inactive');
 			$(this).find('img').toggleClass('inactive');
 		});
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
 	};

 	//modular functions

 	return {
 		toggleLoadingAnimation:toggleLoadingAnimation,
 		loadContent:loadContent
 	}
 	
 });