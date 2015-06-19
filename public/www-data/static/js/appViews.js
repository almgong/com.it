/**
 * Backbone logic for rendering views
 * 
 **/
 define([
 	'bb',
 	'text!templates/sidebar.template.html',
 	'text!templates/main_content.template.html',
 	'text!templates/action_timeline.template.html'
 	], function(Backbone,sidebarHTML, mainContentHTML, actionTimelineHTML) {

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
 			this.$el.html(actionTimelineHTML);
 		}
 	});

 	var mainCont = new MainContent();
 	var actionTimeline = new ActionTimeline();
 	var loadMain = function() {
 		mainCont.render();
 		actionTimeline.render();
 		$('.middle-col .loading').remove();
 		$('.main-content-wrapper').css('opacity', 1);
 	};

 	return {
 		loadSidebar:loadSidebar,
 		loadMain:loadMain
 	}
 	
 });