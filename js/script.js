'use strict'

window.addEventListener('load', mainwindowLoad);

function mainwindowLoad() {

	new WOW().init();

	let tabsSliders = document.querySelectorAll('.enjoy-show-tab__block')

	$(document).ready(function () {

		/* 	слайдер головного баннера */
		$('.main-slider').slick({
			dots: true,
			infinite: true,
			speed: 500,
			fade: true,
			cssEase: 'linear'
		});
		/* слайдер Discover our collection of residences */
		$('.residences__wrapper').slick({
			dots: true,
			infinite: true,
			speed: 700,
			slidesToShow: 3,
			slidesToScroll: 1,
			arrows: false,
			autoplay: true,
			autoplaySpeed: 7000,
			centerLeft: true,
			centerPadding: '80px',
			responsive: [
				{
					breakpoint: 866,
					settings: {
						slidesToShow: 2,
					}
				},
				{
					breakpoint: 503,
					settings: {
						slidesToShow: 1,
						centerMode: true,
						centerPadding: '80px',
					}
				},
				{
					breakpoint: 439,
					settings: {
						slidesToShow: 1,
						centerMode: true,
						centerPadding: '60px',
					}
				},
				{
					breakpoint: 378,
					settings: {
						slidesToShow: 1,
						centerMode: false,
						centerPadding: '60px',
					}
				}
			]
		});
		/* слайдер для табів (галерея фото) */
		tabsSliders.forEach(item => {
			$(item).slick({
				dots: false,
				infinite: true,
				speed: 500,
				fade: true,
				cssEase: 'linear',
				prevArrow: '<button type="button" class="slick-prev"><</button>',
				nextArrow: '<button type="button" class="slick-next">></button>'
			});
		})

	});


	/* Зміна назви мови  */

	let viewLang = document.querySelector('.lang-block__choise');
	let langs = document.querySelectorAll('.lang-block__drop a')

	langs.forEach((item, i) => {
		item.addEventListener('click', () => {
			viewLang.innerHTML = item.innerHTML
		})
	})





	/* Розрахунок ширини dots для головного слайдера */
	let arrowsSliderBtn = document.querySelectorAll('.main-slider .slick-dots li')
	let countMainSlider = 100 / arrowsSliderBtn.length
	arrowsSliderBtn.forEach(item => {
		item.style.flex = `0 1 ${countMainSlider}%`
	})


	/* Показ лейбла для карток  блока meets */
	let label = document.querySelectorAll('.meets-block__label')
	label.forEach(item => {
		if (!item.innerHTML) {
			item.style.display = 'none'
		}
	})

	/* Номера для карток розділу benefits */
	let num = document.querySelectorAll('.benefits-item__num')
	num.forEach((item, i) => {
		item.innerHTML = i + 1;
	})

	/* Номерація для табів */

	let numTabs = document.querySelectorAll('.enjoy-tabs__num')
	numTabs.forEach((item, i) => {
		item.innerHTML = `${i + 1}/`
	})

	/* Робота табів */
	let tabs = document.querySelectorAll('.enjoy-show-tab__block');
	let tabParent = document.querySelector('.enjoy-tabs');
	let showTabBlockes = document.querySelectorAll('.enjoy-tabs__item');

	function hideTabs() {
		showTabBlockes.forEach(item => {
			item.classList.remove('enjoy-tabs__item_active')
		})

		tabs.forEach(tab => {
			tab.style.display = 'none'
		})
	}

	function showTabs(i = 0) {
		showTabBlockes[i].classList.add('enjoy-tabs__item_active')
		tabs[i].style.display = 'block'

	}

	hideTabs()
	showTabs()

	tabParent.addEventListener('click', function (event) {
		if (event.target.closest('.enjoy-tabs__item')) {
			showTabBlockes.forEach((item, i) => {
				if (event.target.closest('.enjoy-tabs__item') === item) {
					hideTabs();
					showTabs(i);
				}
			});
		}
	});


	/* Відкриття попапа */
	let popupBtn = document.querySelectorAll('[data-popup]');
	let popupClose = document.querySelector('.pop-up__close');
	let mainPopup = document.querySelector('.pop-up')

	popupBtn.forEach((popup, i) => {
		popup.addEventListener('click', function () {
			mainPopup.style.display = 'flex'
		})
	})

	popupClose.addEventListener('click', () => {
		mainPopup.style.display = 'none'
	})

	/* 	меню */

	let btmMenu = document.querySelector('.header__menu-wrapper');
	let blockMenu = document.querySelector('.menu-block');
	let menuItems = document.querySelectorAll('.menu-block__item');
	let menuClose = document.querySelector('.menu-block__title');

	btmMenu.addEventListener('click', () => {
		blockMenu.classList.toggle('menu-block_active')
	})

	menuClose.addEventListener('click', () => {
		blockMenu.classList.remove('menu-block_active')
	})

	menuItems.forEach(item => {
		item.addEventListener('click', (e) => {

			blockMenu.classList.remove('menu-block_active')
		})
	})








}













// =================================================Модуль анімація цифрового лічильника
//Цифри котрі мають анимуватись обгортаємо тегом з атрибутом data-digits-counter
window.addEventListener('load', windowLoad);

function windowLoad() {

	// Функція ініціалізації
	function digitsCountersInit(digitsCountersItems) {
		let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll(".resid-apart-count__coount");
		if (digitsCounters.length) {
			digitsCounters.forEach(digitsCounter => {
				digitsCountersAnimate(digitsCounter);
			});
		}
	}

	// Функція анімації
	function digitsCountersAnimate(digitsCounter) {
		let startTimestamp = null;
		const duration = parseInt(digitsCounter.dataset.digitsCounterSpeed) ? parseInt(digitsCounter.dataset.digitsCounterSpeed) : 1000; //Час анімації
		const startValue = parseInt(digitsCounter.innerHTML);
		const startPosition = 0;
		const step = (timestamp) => {
			if (!startTimestamp) startTimestamp = timestamp;
			const progress = Math.min((timestamp - startTimestamp) / duration, 1);
			digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
			if (progress < 1) {
				window.requestAnimationFrame(step);
			}
		};
		window.requestAnimationFrame(step);
	}

	/* Пуск при завантажені сторінки */
	//digitsCountersInit();

	//--------Пуск при скролі до блока:
	let options = {
		threshold: 0.5
	};

	let observer = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				const targetElement = entry.target;
				const digitsCountersItems = targetElement.querySelectorAll('.resid-apart-count__coount');
				if (digitsCountersItems.length) {
					digitsCountersInit(digitsCountersItems);
				}
				//Вимкнути після спрацювання
				//observer.unobserve(targetElement);
			}
		});
	}, options);

	let sections = document.querySelectorAll('.resid-apart-count__wrapper') //Батьківський єлемент, який з'являється на екрані
	if (sections.length) {
		sections.forEach(section => {
			observer.observe(section);
		});
	}
}
// =====================================================================================