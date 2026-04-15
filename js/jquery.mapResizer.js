/*
* rwdImageMaps jQuery plugin v1.6
*
* Allows image maps to be used in a responsive design by recalculating the area coordinates to match the actual image size on load and window.resize
*
* Copyright (c) 2016 Matt Stow
* https://github.com/stowball/jQuery-rwdImageMaps
* http://mattstow.com
* Licensed under the MIT license
* 
* correction JJDai : recupe des coordonnées de l'image originale
* version : 2.0 du 2026-04-15a by jjdAi : jjdelalandre@orange.fr 
* merci à l'auteur d'origine
*/

;(function($) {
	$.fn.rwdImageMaps = function() {
		var $img = this;

		var rwdImageMap = function() {
			$img.each(function() {
				if (typeof($(this).attr('usemap')) == 'undefined')
					return;

				var that = this,
					$that = $(that);

				// Since WebKit doesn't know the height until after the image has loaded, perform everything in an onload copy
                // Comme WebKit ne connaît la hauteur qu'une fois l'image chargée, effectuez toutes les opérations dans une copie onload
				$('<img />').on('load', function() {
					var attrW = 'width',
						attrH = 'height',
						w = $that.attr(attrW),
						h = $that.attr(attrH);
/* ce code recupere la taille de l'images redimentionnée dans la page html
ce n'est pas ce que l'on veut, il faut la taille de l'image originle

console.log(`1-image size = ${w} x ${h}`);
					if (!w || !h) {
						var temp = new Image();
						temp.src = $that.attr('src');
						if (!w)
							w = temp.width;
						if (!h)
							h = temp.height;
					}
                    
*/                        
                    //chargement de l'image originale et recuperation pour avoir la taille de la source non redimentionnée 
                    var temp = new Image();
                    temp.src = $that.attr('src');
                    w = temp.width;
                    h = temp.height;
                    temp.remove();
                    
                    
console.log(`2-image size = ${w} x ${h}`);

					var wPercent = $that.width()/100,
						hPercent = $that.height()/100,
						map = $that.attr('usemap').replace('#', ''),
						c = 'coords';

					$('map[name="' + map + '"]').find('area').each(function() {
						var $this = $(this);
						if (!$this.data(c))
							$this.data(c, $this.attr(c));

						var coords = $this.data(c).split(','),
							coordsPercent = new Array(coords.length);

						for (var i = 0; i < coordsPercent.length; ++i) {
							if (i % 2 === 0)
								coordsPercent[i] = parseInt(((coords[i]/w)*100)*wPercent);
							else
								coordsPercent[i] = parseInt(((coords[i]/h)*100)*hPercent);
						}
						$this.attr(c, coordsPercent.toString());
					});
				}).attr('src', $that.attr('src'));
			});
		};
		$(window).resize(rwdImageMap).trigger('resize');

		return this;
	};
})(jQuery);
