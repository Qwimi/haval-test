class AppModal extends HTMLElement {
    connectedCallback() {
        this.render();

        this.initPhoneMask();

        this.querySelector('.modal__overlay')
            .addEventListener('click', () => this.close());

        this.querySelector('[data-action="close"]')
            .addEventListener('app-click', () => this.close());

        this.querySelector('[data-action="sent-form"]')
            .addEventListener('app-click', () => {

                const isValid = this.validatePhone();

                if (!isValid) return;

                this.close();
            });
    }

    open() {
        this.querySelector('.modal')
            .classList.add('modal--active');
    }

    close() {
        this.querySelector('.modal')
            .classList.remove('modal--active');
        this.resetForm();
    }

    setTitle(title) {
        const titleElement = this.querySelector('.modal__title');

        if (titleElement) {
            titleElement.innerHTML = title;
        }
    }

    validatePhone() {
        const input = this.querySelector('.modal__input');
        const error = this.querySelector('.modal__error');

        const digits = input.value.replace(/\D/g, '');

        const isValid = digits.length === 11;

        if (!isValid) {
            error.textContent = 'Введите корректный номер телефона';
            input.classList.add('modal__input--error');
        } else {
            this.resetForm();
        }

        return isValid;
    }

    resetForm() {
        const input = this.querySelector('.modal__input');
        const error = this.querySelector('.modal__error');

        input.value = '';

        error.textContent = '';

        input.classList.remove('modal__input--error');
    }

    initPhoneMask() {
        const input = this.querySelector('.modal__input');

        if (!input) return;

        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');

            if (!value.length) {
                e.target.value = '';
                return;
            }

            if (value.startsWith('8')) {
                value = '7' + value.slice(1);
            }

            if (value[0] !== '7') {
                value = '7' + value;
            }

            value = value.slice(0, 11);

            let formatted = '+7';

            if (value.length > 1) {
                formatted += ` (${value.slice(1, 4)}`;
            }

            if (value.length >= 5) {
                formatted += `) ${value.slice(4, 7)}`;
            }

            if (value.length >= 8) {
                formatted += `-${value.slice(7, 9)}`;
            }

            if (value.length >= 10) {
                formatted += `-${value.slice(9, 11)}`;
            }

            e.target.value = formatted;
        });
    }

    render() {
        const title =
            this.querySelector('[data-modal-title]')?.innerHTML || '';

        // language=HTML
        this.innerHTML = `
			<div class="modal">
				<div class="modal__overlay"></div>
				
				<div class="modal__content">
					
					<app-button additional-class="modal__close" variant="outline" data-action="close">
						<div data-content>
							✕
						</div>
					</app-button>
					
					<div class="modal__title">
						${title}
					</div>
					
					<div class="modal__body">
                        <p>Оставьте свой номер телефона и наш представитель свяжется с вами, чтобы решить ваш вопрос</p>
                        <div class="modal__input-wrapper">
							<input class="modal__input"
								   type="tel"
								   placeholder="+7 (___) ___-__-__"
							>
							<div class="modal__error"></div>
                            
                        </div>
						<app-button variant="cyan" data-action="sent-form">
							<div data-content>
								Отправить
							</div>
						</app-button>
					</div>
				
				</div>
			</div>
        `;
    }
}

customElements.define('app-modal', AppModal);