/**
 * Backbone logic for rendering views
 * 
 **/
 define([
 	'bb',
 	'captionjs',
 	'text!templates/sidebar.template.html',
 	'text!templates/learn_landing.template.html',
 	'text!templates/learn_main_content.template.html',
 	'text!templates/action_timeline.template.html',
 	'text!templates/learn_main.template.html',
 	'text!templates/home.template.html'
 	], function(Backbone, captionjs, sidebarHTML, learnLandingHTML, learnMainContentHTML, actionTimelineHTML,
 	 learnMainHTML, homeHTML) {

 	//main div, USED AS A WRAPPER VIEW FOR EACH PAGE
 	var Main = Backbone.View.extend({
 		el:$('.main.clearfix'),
 		baseHTML:null,		//defaults
 		cb:function(){},	//^
 		initialize:function(options) {
 			//options must have a baseHTML and callback function called cb
 			this.baseHTML = options.baseHTML;	//defines the initial structure needed by other views
 			this.cb = options.cb;				//callback for rendering the subviews
 		},
 		render:function() {
 			self = this;
 			self.$el.html(self.baseHTML).promise().done(function() {
 				self.cb();
 			});
 		}
 	});

 	var main = new Main({baseHTML:'', cb:null});	//preset default, should overrride in other view functions

 	/************ INDEX/HOME **************/

 	//since the homepage is static, really just need to load html from template (no ajax, etc.)
 	var loadHome = function() {

 		//where the subviews get loaded (none for home)
 		var cb = function() {
 			//set scroll listener
 			if (!window.setLandingScroll) {	//if not already in place

 				window.setLandingScroll = true;

 				var options = {
 					start_distance_from_top: 55,	//px distance of first ele from top (excludes top nav, etc.)
 					element_size: 500
 				};

 				$(window).on('scroll', function() {
 					setTimeout(function() {
	 					if($(window).scrollTop() >= (options.element_size)/2 - options.start_distance_from_top) {
	 						//principles
	 						if (!$('.principles').hasClass('loaded')) {
	 							$('.principles').css('opacity', 1).addClass('loaded');
	 						}
	 					}
	 					if($(window).scrollTop() >= options.start_distance_from_top + (options.element_size)) {
	 						//features
	 						if (!$('.features-single').hasClass('loaded')) {
	 							$('.features-single').css('opacity', 1).addClass('loaded');
	 						}
	 					}
	 					if($(window).scrollTop() >= options.start_distance_from_top + (options.element_size*2.2)) {
	 						//features part 2
	 						if (!$('.features-double').hasClass('loaded')) {
	 							console.log('feats 2')
	 							$('.features-double').css('opacity', 1).addClass('loaded');
	 						}
	 					}
	 					if($(window).scrollTop() >= options.start_distance_from_top*2 + (options.element_size*3.2)) {
	 						//closer
	 						if(!$('.closer').hasClass('loaded')) {
	 							$('.closer').css('opacity', 1).addClass('loaded');
	 						}
	 					}
 					}, 25);
 				});
 			}	
 		};

 		//main.remove();
 		main = null;
 		//$('.container').append('<div class="main clearfix"></div>');	//add main back
 		main = new Main({baseHTML:homeHTML, cb:cb});
 		main.render();
 	};


 	/*********** PROFILE *************/

 	//

 	/************ LEARN  **************/

 	//LEARN LANDING/SELECTION PAGE

 	//like in landing page, really just inserting html straight in since it's mostly static
 	//will need some db work, but it should be very simple, so no additional view needed
 	var loadLearnLanding = function() {

 		//cb for subviews
 		var cb = function() {
 			//bind events after rendering
 			$('.learn-card img.captionjs').captionjs({
	 			"class_name": 'captionjs',
	 			'mode': 'animated',
	 			'is_responsive': false
	 		});

	 		$('.learn-body').not('.inactive').hover(function() {
	 			$(this).toggleClass('animated pulse infinite');
	 		},
	 		function() {
	 			$(this).toggleClass('animated pulse infinite');
	 		});

	 		$('.learn-body').not('.inactive').on('click', function() {
	 			loadLearnIndividual();
	 		});
 		};

 		main = null;
 		main = new Main({baseHTML:learnLandingHTML, cb:cb});
 		main.render();
 	};

 	//	INDIVIDUAL

 	//sidebar
 	var SideBar = Backbone.View.extend({
 	
 		render:function() {
 			this.$el.html(sidebarHTML);
 			$('.left-col .loading').remove();
 			this.$el.css('opacity', 1);
 		}
 	});

 	var loadSidebar = function() {
 		var sideBar = new SideBar({el: $('.sidebar')});
 		sideBar.render();
 	};


 	//main content (including timeline)
 	var LearnMainContent = Backbone.View.extend({
 		
 		render:function() {
 			this.$el.html(learnMainContentHTML);
 		}
 	});

 	var ActionTimeline = Backbone.View.extend({
 	
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

 	var loadMainContentLearn = function() {
 		var mainCont = new LearnMainContent({el:$('.main-content')});
 		var actionTimeline = new ActionTimeline({el:$('.action-timeline')});
 		mainCont.render();
 		actionTimeline.render();
 		$('.main-content-wrapper').css('opacity', 1);
 	};

 	//wrapper function for loading an individual learn page
 	var loadLearnIndividual = function() {
 		
 		//where the subviews get loaded
 		var cb = function() {

 			//individual content
 			loadSidebar();
 			loadMainContentLearn();
 		};

 		//main.remove();
 		main = null;
 		main = new Main({baseHTML:learnMainHTML, cb:cb});
 		main.render();


 	};

 	return {
 		loadLearnLanding:loadLearnLanding,
 		loadLearnIndividual:loadLearnIndividual,
 		loadHome:loadHome
 	}
 	
 });