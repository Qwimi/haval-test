class AppButton extends HTMLElement {
    connectedCallback() {
        this.render();

        const btn = this.querySelector('button');

        btn.addEventListener('click', (e) => {
            this.dispatchEvent(
                new CustomEvent('app-click', {
                    detail: { originalEvent: e },
                    bubbles: true,
                    composed: true
                })
            );
        });
    }

    render() {
        const variant = this.getAttribute('variant') || '';
        const extraClass = this.getAttribute('additional-class') || '';

        const content =
            this.querySelector('[data-content]')?.innerHTML ||
            '';

        const classes = [
            'btn',
            variant ? `btn--${variant}` : '',
            extraClass
        ]
            .filter(Boolean)
            .join(' ');

        // language=HTML
        this.innerHTML = `
			<button class="${classes}">
				${content}
			</button>
        `;
    }
}

customElements.define('app-button', AppButton);