const TIMER_CONFIG = {
    type: 'fixed-end',
    preset: 'rings-soft',

    schedule: {
        endAt: '2026-06-01T00:00:00',
    },

    style: {
        digitsFont: "Open Sans, sans-serif",
        digitGap: 21,
        digitColor: '#000000',

        labelsFont: "Open Sans, sans-serif",
        labelSize: 18,
        labelGap: 0,
        labelColor: '#000000',

        cardBackgroundColor: '#f3f3f3',

        ringCurrentColor: '#00c2cb',
        ringRemainingColor: '#d6d6d6',
        ringThickness: 9,
    },
};

class TimerSection extends HTMLElement {
    connectedCallback() {
        this.render();
        this.loadScript();

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
			<section class="timer-section">
                <div class="container">
					<h2 class="timer-section__title">
						Оставьте заявку и зафиксируйте условия
					</h2>
                    <div class="timer-section__content">
						<div
                            class="sinoby-timer sinoby-timer-wrapper timer-section__timer"
                            data-config='${JSON.stringify(TIMER_CONFIG)}'
                            data-lazy="true"
						></div>
						<app-button data-action="open-modal" additional-class="timer-section__cta" variant="cyan">
							<div data-content>
								Зафиксировать условия
							</div>
						</app-button>
                    </div>
                </div>
			</section>
            
			<app-modal>
				<div data-modal-title>
					Заголовок модалки
				</div>
			</app-modal>
        `;
    }

    loadScript() {
        if (document.querySelector('[data-sinoby-script]')) {
            return;
        }

        const script = document.createElement('script');

        script.src =
            '//timer.sinoby.ru/public/assets/embed/timer-core.min.js?v=20260514a';

        script.dataset.sinobyScript = 'true';

        document.body.appendChild(script);
    }
}


customElements.define('timer-section', TimerSection);