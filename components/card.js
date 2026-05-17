class CarCard extends HTMLElement {
    connectedCallback() {
        const dataAttr = this.getAttribute('card-data');

        if (dataAttr) {
            this.cardData = JSON.parse(dataAttr);
            this.removeAttribute('card-data');

            this.instanceId = `car-${this.cardData.id}`;

            this.render();
            this.initSwiper();

            const modal = this.querySelector('app-modal');

            this.addEventListener('app-click', (e) => {
                const trigger = e.target.closest('[data-action="open-modal"]');

                if (!trigger) return;

                const buttonText = trigger.textContent.trim().replace(/\s+/g, ' ');

                const carName = this.cardData.name;

                modal.setTitle(`${buttonText} ${carName}`);

                modal?.open();
            });
        }
    }

    render() {
        if (!this.cardData) return;

        const {id, name, images, inStock, stockCount, benefitAmount, features} = this.cardData;

        // language=HTML
        const stockStatus = inStock
            ? `
					<div class="stock-badge">
						В наличии
						${stockCount ? `<p class="stock-badge__count">${stockCount} машин</p>` : ''}
					</div>
            `
            : `
					<div class="stock-badge stock-badge--out-of-stock">
						Нет в наличии
					</div>
            `;

        // language=HTML
        const featuresHtml = features.map(feature => `
			<li class="feature-item">
				<div class="feature-item__icon">
					<svg class="icon" width="18" height="18">
						<use xlink:href="assets/sprite.svg#${feature.iconId}"></use>
					</svg>
				</div>
				<span>${feature.label}</span>
			</li>
        `).join('');

        // language=HTML
        const slidesHtml = images.map((image, index) => `
			<div class="swiper-slide">
				<a
						href="${image.url}"
						data-fancybox="gallery-${this.instanceId}"
						data-caption="${image.colorName}"
						class="card__image-link"
				>
					<img
							src="${image.url}"
							alt="${name} ${image.colorName}"
							class="card__image"
					/>
				</a>
			</div>
        `).join('');

        // language=HTML
        const signLabel = inStock ? `
			<app-button additional-class="card__sign" data-action="open-modal" variant="reset">
                <span data-content>
                    <div class="card__sign-icon">
                        <svg class="icon" width="18" height="18">
                            <use xlink:href="assets/sprite.svg#pencil"></use>
                        </svg>
                    </div>
                    <p class="card__sign-label">Записаться</br> на тест-драйв</p>
                </span>
			</app-button>
        ` : ''

        // language=HTML
        this.innerHTML = `
			<article class="card" id="${id}">
				
				${stockStatus}
				
				<div class="card__slider">
					<div class="swiper swiper-${this.instanceId}">
						<img src="assets/images/card-bg.png" class="card__slider-bg" alt="${name}">
						<div class="swiper-wrapper">
							${slidesHtml}
						</div>
					</div>
					<div class="swiper-pagination swiper-pagination-${this.instanceId}"></div>
					
					<div class="card__info">
						<h3 class="card__title">${name}</h3>
						
						<div class="card__benefit">
							<span>Выгода:</span>
							<span class="card__benefit-amount">${benefitAmount}</span>
						</div>
					</div>
					
					${signLabel}
				</div>
				
				<ul class="card__features">
					${featuresHtml}
				</ul>
				
				<div class="card__buttons">
					<app-button variant="cyan" additional-class="card__button" data-action="open-modal">
						<span data-content>Узнать стоимость</span>
					</app-button>
					
					<app-button variant="black" additional-class="card__button" data-action="open-modal">
						<span data-content>Рассчитать кредит</span>
					</app-button>
					
					<app-button variant="outline" additional-class="card__button" data-action="open-modal">
						<span data-content>Подобрать комплектацию</span>
					</app-button>
				</div>
			</article>
			
			
			<app-modal>
			</app-modal>
        `;
    }

    initSwiper() {
        const images = this.cardData.images;

        new Swiper(`.swiper-${this.instanceId}`, {
            slidesPerView: 1,
            speed: 600,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },

            pagination: {
                el: `.swiper-pagination-${this.instanceId}`,
                clickable: true,

                bulletActiveClass: "card__bullet--active",

                renderBullet(index, className) {
                    return `
                        <span
                            class="${className} card__bullet"
                            style="background-color: ${images[index].colorCode}"
                            title="${images[index].colorName}"
                        ></span>
                    `;
                },
            },
        });

        Fancybox.bind(
            `[data-fancybox="gallery-${this.instanceId}"]`,
            {}
        );
    }
}

customElements.define('car-card', CarCard);