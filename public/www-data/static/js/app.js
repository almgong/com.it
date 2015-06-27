/**
 * Driver file that will initialize and offer any 
 * necessary logic (should refactor soon). This should only run ONCE
 * for session.
 **/
 define([
 	'bb',
 	'text!templates/loadingAnimation.html',
 	'appViews',
 	'appRouter'
 	], function(Backbone, loadingAnimationHTML, appViews, router) {

 	//code to run immediately after DOM loads (NO BB views, only routing)
 	$(function() {

 		//router = router.router;	//because appRouter module returns 

 		Backbone.history.start({pushState:true});	//start history + routing, pushstate enabled to avoid #

 		//code for navigation
 		$('a.learn').on('click', function() {
 			//styling
 			$(this).parent().addClass('active');
 			$('a.home').parent().removeClass('active');
 			$('a.profile').parent().removeClass('active');

 			//actual navigation
 			router.navigate('learn', {trigger: true});
 			appViews.loadLearnLanding();
 		});
 		$('a.home').on('click', function() {
 			$(this).parent().addClass('active');
 			$('a.learn').parent().removeClass('active');
 			$('a.profile').parent().removeClass('active');

 			//actual navigation
 			router.navigate('', {trigger: true});
 			appViews.loadHome();

 		});
 		$('a.profile').on('click', function() {
 			$(this).parent().addClass('active');
 			$('a.home').parent().removeClass('active');
 			$('a.learn').parent().removeClass('active');

 			//actual navigation
 			router.navigate('profile', {trigger:true});

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
 		var location = window.location.href.split('/')
 		location = location[location.length - 1]		//gets the last ele

 		//index
 		if(location == '') {
 			//load landing page
 			appViews.loadHome();
 			console.log('loading index')
 		}
 		else if(location == 'profile') {
 			//load profile views
 			console.log('loading profile')
 		}
 		else if(location == 'learn') {
 			//load learn views
 			appViews.loadLearnLanding();
 			console.log('loading learn landing')
 		}
 		else {
 			appViews.loadLearnIndividual();
 		}
 		
 	};

 	//modular functions

 	return {
 		toggleLoadingAnimation:toggleLoadingAnimation,
 		loadContent:loadContent
 	}
 	
 });