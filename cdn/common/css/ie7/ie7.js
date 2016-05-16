/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon\'">' + entity + '</span>' + html;
	}
	var icons = {
		'icon-chevron-down': '&#xe624;',
		'icon-chevron-thin-left': '&#xe625;',
		'icon-triangle-down': '&#xe626;',
		'icon-blackboard': '&#xe628;',
		'icon-folder': '&#xe62b;',
		'icon-grid': '&#xe62c;',
		'icon-list': '&#xe62d;',
		'icon-plus': '&#xe627;',
		'icon-cabinet': '&#xe617;',
		'icon-bargraph': '&#xe01a;',
		'icon-map2': '&#xe025;',
		'icon-calendar3': '&#xe618;',
		'icon-camera': '&#xe60d;',
		'icon-camera2': '&#xe619;',
		'icon-film': '&#xe61a;',
		'icon-film2': '&#xe61b;',
		'icon-chronometer': '&#xe629;',
		'icon-alarmclock': '&#xe62a;',
		'icon-checkmark': '&#xe61c;',
		'icon-cancel': '&#xe610;',
		'icon-cloud': '&#xe61d;',
		'icon-chart': '&#xe611;',
		'icon-alarm': '&#xe612;',
		'icon-map': '&#xe613;',
		'icon-archive': '&#xe61e;',
		'icon-chat': '&#xe614;',
		'icon-comments': '&#xe615;',
		'icon-profile': '&#xe622;',
		'icon-profile2': '&#xe623;',
		'icon-bookmark': '&#xe61f;',
		'icon-presentation': '&#xe620;',
		'icon-book': '&#xe621;',
		'icon-clipboard2': '&#xe616;',
		'icon-user': '&#xe600;',
		'icon-search': '&#xe601;',
		'icon-settings': '&#xe602;',
		'icon-lock': '&#xe60e;',
		'icon-pen': '&#xe603;',
		'icon-display': '&#xe604;',
		'icon-bubble': '&#xe605;',
		'icon-paperplane': '&#xe606;',
		'icon-megaphone': '&#xe607;',
		'icon-study': '&#xe608;',
		'icon-lab': '&#xe60a;',
		'icon-shop': '&#xe609;',
		'icon-calendar2': '&#xe60b;',
		'icon-wallet': '&#xe60c;',
		'icon-time': '&#xe60f;',
		'icon-home2': '&#xe901;',
		'icon-home3': '&#xe902;',
		'icon-office': '&#xe903;',
		'icon-pencil': '&#xe905;',
		'icon-location': '&#xe947;',
		'icon-compass2': '&#xe94a;',
		'icon-bell': '&#xe951;',
		'icon-calendar': '&#xe953;',
		'icon-laptop': '&#xe957;',
		'icon-bubble2': '&#xe96b;',
		'icon-bubbles3': '&#xe96f;',
		'icon-users': '&#xe972;',
		'icon-spinner11': '&#xe984;',
		'icon-lock2': '&#xe98f;',
		'icon-cog': '&#xe994;',
		'icon-pie-chart': '&#xe99a;',
		'icon-stats-dots': '&#xe99b;',
		'icon-stats-bars2': '&#xe99d;',
		'icon-bin': '&#xe9ac;',
		'icon-briefcase': '&#xe9ae;',
		'icon-switch': '&#xe9b6;',
		'icon-clipboard': '&#xe9b8;',
		'icon-tree': '&#xe9bc;',
		'icon-cloud-download': '&#xe9c2;',
		'icon-cloud-upload': '&#xe9c3;',
		'icon-question': '&#xea09;',
		'icon-share2': '&#xea82;',
		'icon-uniE008': '&#xe008;',
		'icon-uniE009': '&#xe009;',
		'icon-uniE018': '&#xe018;',
		'icon-uniE019': '&#xe019;',
		'icon-uniE021': '&#xe021;',
		'icon-uniE023': '&#xe023;',
		'icon-uniE056': '&#xe056;',
		'icon-uniE062': '&#xe062;',
		'icon-uniE085': '&#xe085;',
		'icon-uniE111': '&#xe111;',
		'icon-uniE123': '&#xe123;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
