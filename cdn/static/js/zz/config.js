/* ---------------------------------------------------------------------- */
/*	Theme Settings														  */
/* ---------------------------------------------------------------------- */

	var CONFIG = (function ($, window) {
		
		var touch = Modernizr.touch,
			windowHeight = !touch ? $(window).height() : $(window).height();
			
		return {

			/* ---------------------------------------------------- */
			/*	Main Settings										*/
			/* ---------------------------------------------------- */

			objOnePage : {
				easing: 'easeInOutExpo',			// Refer to the link below  http://easings.net/
				animatedElem: true,
				duration: 1200						// ms
			},

			/* ---------------------------------------------------- */
			/*	Layer Slider										*/
			/* ---------------------------------------------------- */

			objLayerSlider : {
				width : '100%',						
				height : windowHeight,				// String: 
				responsive : true,					// Boolean:  (true/false)
				responsiveUnder : 1130,
				sublayerContainer : 1130,
				autoStart : true,					// Boolean:  If true, slideshow will automatically start after loading the page. (true/false)
				pauseOnHover : false,				// Boolean: If ture, SlideShow will pause when you move the mouse pointer over the LayerSlider container. (true/false)
				firstLayer : 1,						// Integer:  LayerSlider will begin with this layer. (Positive Integer)
				animateFirstLayer : true,			// Boolean:  (true/false)
				randomSlideshow : false,			// Boolean:  (true/false)
				twoWaySlideshow : true,				// Boolean: If true, slideshow will go backwards if you click the prev button. (true/false)
				loops : 0,
				forceLoopNum : true,				// Boolean:  (true/false)
				autoPlayVideos : false,				// Boolean:  (true/false)
				autoPauseSlideshow : 'auto',
				keybNav : true,						 // Boolean: Keyboard navigation. You can navigate with the left and right arrow keys. (true/false)
				touchNav : true,					 // Boolean:  (true/false)
				skin : 'accio',						 // String: You can change the skin of the Slider. (name_of_the_skin) 
				skinsPath : 'css/style/', // String: You can change the default path of the skins folder. Note, that you must use the slash at the end of the path. (path_of_the_skins_folder/)
				showBarTimer : false,				 // Boolean:  (true/false)
				showCircleTimer : false,			 // Boolean:  (true/false)
				globalBGColor : 'transparent',			 // CSS Color Methods. Background color of LayerSlider. You can use all CSS methods, like hexa colors, rgb(r,g,b) method, color names, etc. Note, that background sublayers are covering the background. 
				navPrevNext : true,					 // Boolean: If false, Prev and Next buttons will be invisible. (true/false)
				navStartStop : false,				 // Boolean: If false, Start and Stop buttons will be invisible. (true/false)
				navButtons : false,					 // Boolean: If false, slide buttons will be invisible. (true/false)
				hoverPrevNext : true,				 // Boolean:  (true/false)
				hoverBottomNav : false,				 // Boolean:  (true/false)
				thumbnailNavigation : 'disabled',
				tnWidth : 100,
				tnHeight : 60,
				tnContainerWidth : '60%',
				tnActiveOpacity : 350,
				tnInactiveOpacity : 100		
			},





			objTooltipster : {
				'animation': 'grow'							// Choose fade, grow, swing, slide, fall
			}

		}

	}(jQuery, window));
		
/* ---------------------------------------------------------------------- */
/*	end Theme Settings													  */
/* ---------------------------------------------------------------------- */			
		