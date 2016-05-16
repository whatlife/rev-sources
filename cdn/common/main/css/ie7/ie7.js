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
		'icon-book': '&#xe600;',
		'icon-home3': '&#xe902;',
		'icon-office': '&#xe903;',
		'icon-newspaper': '&#xe904;',
		'icon-film': '&#xe913;',
		'icon-book2': '&#xe91f;',
		'icon-books': '&#xe920;',
		'icon-profile': '&#xe923;',
		'icon-calendar': '&#xe953;',
		'icon-display': '&#xe956;',
		'icon-users': '&#xe972;',
		'icon-user-check': '&#xe975;',
		'icon-clipboard': '&#xe9b8;',
		'icon-cloud': '&#xe9c1;',
		'icon-cloud-upload': '&#xe9c3;',
		'icon-volume-medium': '&#xea27;',
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
