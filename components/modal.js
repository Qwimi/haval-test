class AppModal extends HTMLElement {
    connectedCallback() {
        this.render();

        this.querySelector('.modal__overlay')
            .addEventListener('click', () => this.close());

        this.querySelector('app-button')
            .addEventListener('app-click', () => this.close());
    }

    open() {
        this.querySelector('.modal')
            .classList.add('modal--active');
    }

    close() {
        this.querySelector('.modal')
            .classList.remove('modal--active');
    }

    render() {
        const title =
            this.querySelector('[data-modal-title]')?.innerHTML || '';

        const content =
            this.querySelector('[data-modal-content]')?.innerHTML ||
            'Lorem ipsum dolor sit amet consectetur adipiscing elit quisque faucibus ex sapien vitae pellentesque sem.';

        // language=HTML
        this.innerHTML = `
			<div class="modal">
				<div class="modal__overlay"></div>
				
				<div class="modal__content">
					
					<app-button additional-class="modal__close" variant="outline">
						<div data-content>
							✕
						</div>
					</app-button>
					
					<div class="modal__title">
						${title}
					</div>
					
					<div class="modal__body">
						${content}
					</div>
				
				</div>
			</div>
        `;
    }
}

customElements.define('app-modal', AppModal);