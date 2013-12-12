;(function( $, window, document, undefined ) {

	'use strict';

	window.cirro = window.cirro || {};

	var $window   = $(window);
	var $document = $(document);

	// The page (singleton object) controller
	var page = {

		init: function() {
			var self = this;

			self.wW, self.wH;
			self.$loader   = $('#loader');
			self.$gif      = $('#gif')
			self.$navBtn   = $('#nav-btn');
			self.$phoneNav = $('nav.phone-nav');
			self.$intro    = $('#intro');
			self.$main     = $('div#main');
			self.$map      = $('#map-canvas');

			// Init click event handlers
			self.$navBtn.on("click", self.closetNav);

			self.hideLoader();
			self.scrollPosition();
			self.googleMaps();
			//self.introCenter();
			//self.workHover();
		},

		calculateWindowDimensions: function() {
			var self = this;

			self.wW = $window.width();
			self.wH = $window.height();
		},

		hideLoader: function() {
			var self = this;

			setTimeout( function(){
				self.$loader.fadeOut('slow');
			}, 1000)

		},

		closetNav: function() {
			var self = page;
			// CALC HEIGHT OF NAV ELEMENTS

			// toggle the open class on the nav
			page.$phoneNav.toggleClass('open');
		},

		closetNavResize: function() {
			var self = this;
			var phoneNav = $('nav.phone-nav');
			var isOpen = ~~phoneNav.hasClass('open');

			// close nav closet if larger than 768px && open
			if (self.wW >= 768 && isOpen) {
				page.closetNav();
			}
		},

		scrollPosition: function() {
			var self = this;
			self.scrollPos = $window.scrollTop();

		},

		introCenter: function() {
			var wH = page.wH;
			var iH = page.$intro.height();
			var $intro = page.$intro;
			var diff = (wH - iH) / 2;

			$intro.css('top', diff);			
		},


		workHover: function() {
			var self = this;
			var i    = 1000;

			self.$work.mouseenter(function(){
				i+= 2;
				$(this).css('z-index', i);
			})
		},

		googleMaps: function() {

				// Lat long of store
				var Latlng = new google.maps.LatLng(39.752612,-104.991241);

				// Google map styles array
				var styles = [
				  {
				    "featureType": "landscape.man_made",
				    "elementType": "geometry",
				    "stylers": [
				      { "visibility": "on" },
				      { "color": "#ffffff" }
				    ]
				  },{
				    "featureType": "road",
				    "elementType": "geometry",
				    "stylers": [
				      { "color": "#000000" },
				      { "weight": 0.8 },
				      { "lightness": 70 },
				      { "gamma": 1.57 }
				    ]
				  },{
				    "featureType": "poi",
				    "elementType": "labels",
				    "stylers": [
				      { "visibility": "off" }
				    ]
				  }
				];

			  // Create a new StyledMapType object, passing it the array of styles,
			  // as well as the name to be displayed on the map type control.
			  var styledMap = new google.maps.StyledMapType(styles);

			  // Create a map object, and include the MapTypeId to add
			  // to the map type control.
			  var mapOptions = {
			    zoom: 15,
			    center: Latlng,
			    scrollwheel: false,
			    mapTypeControl: false,
			    mapTypeId: google.maps.MapTypeId.ROADMAP
			  };

			  var map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);

			  var iconBase = '../img/googlemap.png';

			  // Map marker
			  var marker = new google.maps.Marker({
			      position: Latlng,
			      map: map,
			      icon: iconBase,
			      animation: google.maps.Animation.DROP,
			      title:"Lower 48"
			  });

			  //Associate the styled map with the MapTypeId and set it to display.
			  map.mapTypes.set('map_style', styledMap);
			  map.setMapTypeId('map_style');

     }
	};

	// Attach the page controller to the cirro namespace
	window.cirro.page = page;

	// Window load
	$window.load(function() {
		setTimeout(function() {
			page.init();
		})
		page.calculateWindowDimensions();
	});

	// Window scroll
	$window.scroll(function() {
		page.scrollPosition();
	});

	// Window resize
	$window.resize(function() {
		page.calculateWindowDimensions();
		//page.introCenter();
		page.closetNavResize();
	});

}( jQuery, window, document ));