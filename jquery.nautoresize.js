/*
 * nautoresize - jQuery plugin to autoresize textarea elements based on content
 *
 * Author: Samuel Sanchez <nleco@yahoo.com>
 *
 * Copyright (c) 2011 Samuel Sanchez
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
(function($) {
	var settings = {
			maxHeight: null,
			footPadding: 10
		}, 
		key_map = {
			tab: 9,
			enter:  13,
			up: 38,
			left: 37,
			right: 39,
			down: 40
		};

	//this method takes in a jquery object and sets it's height
	// el : jquery element to be resized
	function resizeFromContent(el) {
		if (el.length == undefined)
			return;
		
		var el0 = el[0],
			adjustedHeight = el0.clientHeight;	
		
		if (!settings.maxHeight || setting.maxHeight > adjustedHeight) {
			adjustedHeight = Math.max(el0.scrollHeight, adjustedHeight);
			
			if (settings.maxHeight) {
				adjustedHeight = Math.min(settings.maxHeight, adjustedHeight);
			}
			
			if (adjustedHeight > el0.clientHeight) {
				el.animate({height: adjustedHeight + settings.footPadding}, 200);
				//el0.style.height = (adjustedHeight + settings.footPadding) + "px";
			}
		}
	}

	var methods = {
		init : function(options) {
			var ret,
				bd = $('body');
			
			if (options) {
				$.extend(settings, options);
			}
			
			ret = this.each(function(index){
				var t = $(this);
				
				if (!settings.maxHeight) {
					t.css({
						overflow: 'hidden'
					});
				}
				
				resizeFromContent(t, settings.maxheight);
			});

			//set click events
			ret.live('keyup.nautoresize', function(e){
				resizeFromContent($(this), settings.maxheight);
			});
			ret.live('focus.nautoresize', function(e){
				resizeFromContent($(this), settings.maxheight);
			});
			
			return ret;
		}
	};

	$.fn.nselects = function(method) {
    	if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slice.call( arguments, 1 ));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		}
	};
})(jQuery);