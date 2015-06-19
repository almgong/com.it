/**
 * Backbone logic for rendering views
 * 
 **/
 define([
 	'bb',
 	'captionjs',
 	'text!templates/sidebar.template.html',
 	'text!templates/main_content.template.html',
 	'text!templates/action_timeline.template.html'
 	], function(Backbone, captionjs, sidebarHTML, mainContentHTML, actionTimelineHTML) {

 	//sidebar
 	var SideBar = Backbone.View.extend({
 		el: $('.sidebar'),
 		render:function() {
 			this.$el.html(sidebarHTML);
 			$('.left-col .loading').remove();
 			this.$el.css('opacity', 1);
 		}
 	});

 	var sideBar = new SideBar();
 	var loadSidebar = function() {
 		sideBar.render();
 	};


 	//main content (including timeline)
 	var MainContent = Backbone.View.extend({
 		el:$('.main-content'),
 		render:function() {
 			this.$el.html(mainContentHTML);
 		}
 	});

 	var ActionTimeline = Backbone.View.extend({
 		el:$('.action-timeline'),
 		render:function() {

 			this.$el.html(actionTimelineHTML).promise().done(function() {
 				//init captionjs
	 			$('img.captionjs').captionjs({
		 			"class_name": 'captionjs',
		 			'mode': 'animated',
		 			'is_responsive': false
		 		});

		 		$('.timeline-item.inactive').hover(
		 			function() {
			 			$(this).toggleClass('inactive');
			 			$(this).find('img').toggleClass('inactive');
		 			}, 
		 			function() {
			 			$(this).toggleClass('inactive');
			 			$(this).find('img').toggleClass('inactive');
		 			}
		 		);
 			});

 		}//end render
 	});

 	var mainCont = new MainContent();
 	var actionTimeline = new ActionTimeline();
 	var loadMain = function() {
 		mainCont.render();
 		actionTimeline.render();
 		$('.main-content-wrapper').css('opacity', 1);
 	};


 	/*********** PROFILE *************/

 	//note that no new views are needed, reusing views

 	/************ LEARN  **************/

 	//note that no new views are needed, reusing views

 	return {
 		loadSidebar:loadSidebar,
 		loadMain:loadMain
 	}
 	
 });