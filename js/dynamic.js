﻿function preloadbg(arrayOfImages) {
	$(arrayOfImages).each(function(){
		$('<img>')[0].src = this;
	});
}
preloadbg([
	'./img/header_basket_active.png',
	'./img/header_basket_after.png'
]);
$(document).ready(function() {
	$('.header .menu > li').has('ul').addClass('sub');
	$('.header .menu > li.sub').hover(
		function() {
			$(this).children('ul').slideDown(0);
		},
		function() {
			$(this).children('ul').slideUp(0);
		}
	);
	$('input, textarea').each(function () {
		$(this).data('holder',$(this).attr('placeholder'));
		$(this).focusin(function(){
			$(this).attr('placeholder','');
		});
		$(this).focusout(function(){
			$(this).attr('placeholder',$(this).data('holder'));
		});
	});
	if ( $('.offers').length > 0 ) {
		$('body').css({'background-image': 'none'});
		$('body').append('<div class="bg" style="height:'+$('.wrapper').height()+'px"></div>');
		$('.bg').css({'background-image': 'url("./img/offer0.jpg")'});
		$('.offers').slides({
			generatePagination: true,
			generateNextPrev: false,
			container: 'container',
			effect: 'fade',
			fadeSpeed: 500,
			play: 10000,
			pause: 2500,
			animationStart: function() {
				$('.bg').fadeOut(500);
			},
			animationComplete: function() {
				$('.bg').css({'background-image': 'url("./img/offer'+$('.offers').find('.pagination li.current').index()+'.jpg")'})
				$('.bg').fadeIn(500);
			}
		});
	}
	$('.slider > div > div').slides({
		generatePagination: true,
		generateNextPrev: true,
		container: 'container',
		effect: 'slide',
		slideSpeed: 500,
		slideEasing: 'easeInOutQuad',
		play: 0,
		pause: 2500
	});
	$('.minus').click(function () {
		var $input = $(this).parent().find('input');
		var count = parseInt($input.val()) - 1;
		count = count < 1 ? 1 : count;
		$input.val(count);
		$input.change();
		return false;
	});
	$('.plus').click(function () {
		var $input = $(this).parent().find('input');
		$input.val(parseInt($input.val()) + 1);
		$input.change();
		return false;
	});
	$('.header .basket .more').bind('click', function() {
		$(this).parent().toggleClass('active');
		$(this).hide();
		return false;
	});
	$('html').bind('click', function() {
		if ( $('.header .basket').hasClass('active') ) {
			$('.header .basket').removeClass('active');
			$('.basket .more').show();
		}
	});
	$('.basket > div, .basket .more').click(function(event){
		event.stopPropagation();
	});
	$('.slider .options button').bind('click', function() {
		$('img.moving').remove();
		var target = $(this).parent().parent().find('.picture img');
		$('<img src="'+target.attr('src')+'" style="position:fixed; left:'+target.offset().left+'px; top:'+eval(target.offset().top-$(window).scrollTop())+'px; z-index:1000; width:'+target.attr('width')+'px; height:'+target.attr('height')+'px; border-radius:5px" class="moving">').appendTo('body').animate({
			'left': $('.header .basket').offset().left+74+'px',
			'top': '9px',
			'width': '18px',
			'height': '18px',
			'border-radius': '50%'
		}, 1000, 'easeInBack', function() {$(this).delay(500).fadeOut(500)});
	});
});