import {modelNames} from '../assets/bata.js';

class AppHeader extends HTMLElement {
    connectedCallback() {
        this.render();

        const burger = this.querySelector('.header__burger');

        burger.addEventListener('click', () => {
            this.querySelector('.header')
                .classList.toggle('header--open');
        });
    }

    render() {
        // language=HTML
        this.innerHTML = `
			<header class="header">
				<div class="container">
					<div class="header__mobile">
						<a href="#" class="header__link">
							<div class="header__logo">
								<p>Официальный дилер</p>
							</div>
						</a>
						
						<button class="header__burger" type="button">
							<span></span>
							<span></span>
							<span></span>
						</button>
					</div>
					
					<div class="header__mobile-menu">
						<div class="header__first-line">
							<a href="#" class="header__link">
								<div class="header__logo">
									<p>Официальный дилер</p>
								</div>
							</a>
							
							<a href="tel:+00000000000" class="header__link">
								<div class="header__phone">
									<img class="header__phone-logo" src="assets/images/phone-logo.png" alt="">
									<p>+0 000 000 00 00</p>
								</div>
							</a>
							
							<a href="#" class="header__link">
								<div class="header__map">
									<img class="header__map-logo" src="assets/images/map-logo.png" alt="">
									<div>
										<p>г. Москва</p>
										<p>Часы работы с 09:00 до 21:00</p>
									</div>
								</div>
							</a>
						</div>
						
						<div class="header__second-line">
							<div class="header__models">
								${modelNames.map(name => `<a href="#${name.replace(/\s/g, '_')}" class="header__link">${name}</a>`).join('')}
							</div>
							
							<div class="header__static-links">
								<a href="#" class="header__link">ПОДОБРАТЬ КОМПЛЕКТАЦИЮ</a>
								<a href="#" class="header__link">ТЕСТ-ДРАЙВ</a>
								<a href="#" class="header__link">КОНТАКТЫ</a>
							</div>
						</div>
					</div>
				
				</div>
			</header>
        `;
    }
}

customElements.define('app-header', AppHeader);