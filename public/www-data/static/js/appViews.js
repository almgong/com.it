/**
 * Backbone logic for rendering views
 * 
 **/
 define([
 	'bb',
 	'text!templates/sidebar.template.html'
 	], function(Backbone,sidebarHTML) {

 	var SideBar = Backbone.View.extend({
 		el: $('.sidebar'),
 		render:function() {
 			this.$el.html(sidebarHTML);
 			this.$el.css('opacity', 1);
 		}
 	});

 	var sideBar = new SideBar();
 	var loadSidebar = function() {
 		sideBar.render();
 	};


 	return {
 		loadSidebar:loadSidebar
 	}
 	
 });