/**
 * Backbone logic for rendering views
 * 
 **/
 define([
 	'bb',
 	'captionjs',
 	'text!templates/sidebar.template.html',
 	'text!templates/learn_main_content.template.html',
 	'text!templates/action_timeline.template.html',
 	'text!templates/learn_main.template.html'
 	], function(Backbone, captionjs, sidebarHTML, learnMainContentHTML, actionTimelineHTML, learnMainHTML) {

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

 	/************ INDEX **************/

 	//

 	/*********** PROFILE *************/

 	//

 	/************ LEARN  **************/

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

 	//wrapper function for loading all of the learn page
 	var loadLearn = function() {
 		
 		var cb = function() {
 			loadSidebar();
 			loadMainContentLearn();
 		};

 		//main.remove();
 		main = null;
 		//$('.container').append('<div class="main clearfix"></div>');	//add main back
 		main = new Main({baseHTML:learnMainHTML, cb:cb});
 		main.render();


 	};

 	return {
 		loadLearn:loadLearn
 	}
 	
 });