class HeroSection extends HTMLElement {
    connectedCallback() {
        this.render();

        const modal = this.querySelector('app-modal');

        this.addEventListener('app-click', (e) => {
            const trigger = e.target.closest('[data-action="open-modal"]');

            if (!trigger) return;

            modal?.open();
        });
    }

    render() {
        // language=HTML
        this.innerHTML = `
			<section class="hero">
				<img class="hero__bg" src="assets/images/hero-bg.png" alt="hero-bg">
                <div class="hero__cta">
                    <div class="container">
						<div class="hero__title ">
							<h1>Увеличиваем выгоды на HAVAL</h1>
							<h1 class="hero__text-cyan">в Химках к Чёрной пятнице!</h1>
						</div>
                        
                    </div>
					<app-button data-action="open-modal" variant="cyan">
						<div data-content>
							Зафиксировать условия
						</div>
					</app-button>
                </div>
			</section>
            
			<app-modal>
				<div data-modal-title>
					Зафиксировать условия
				</div>
			</app-modal>
			
        `;
    }
}

customElements.define('hero-section', HeroSection);