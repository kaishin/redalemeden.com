module.exports = {
	customMedia: {
		'--full-grid-container': '(width >= 60rem)',
		'--narrow-grid-container': '(width < 60rem)',
		'--full-width-image': '(width < 450px)'
	},
	customProperties: {
		'--primary-color': '#4a20ac',
		'--secondary-color': '#ffd080',
		'--light-theme-bg-color': '#fff7e6',
		'--light-theme-fg-color': '#202020',
		'--light-theme-link-color': '#7760c3',
		'--theme-background-color': 'var(--light-theme-bg-color)',
		'--theme-inset-background-color': 'color-mod(var(--theme-background-color) shade(2%))',
		'--theme-foreground-color': 'var(--light-theme-fg-color)',
		'--theme-link-color': 'var(--light-theme-link-color)',
		'--code-number-color': '#f9730f',
		'--code-function-color': 'var(--theme-link-color)',
		'--code-string-color': '#00c8a7',
		'--code-keyword-color': '#3da4ef',
		'--code-variable-color': '#ff6166',
		'--code-comment-color': '#b2b5c3',
		'--code-background-color': 'var(--theme-inset-background-color)',
		'--code-foreground-color': 'color-mod(var(--theme-foreground-color) alpha(80%))',
		'--footer-padding': '2rem',
		'--grid-container-full-width': '60rem',
		'--header-top-spacing': '4rem',
		'--image-vertical-spacing': '2rem',
		'--main-content-max-width': '40rem',
		'--sidebar-max-width': '22.5rem',
		'--spacing-default': '1rem',
		'--main-container-padding': 'calc(var(--header-top-spacing) * 1.4)',
		'--sheet-margin-top': 'var(--main-container-padding)',
		'--font-fira': '\'Fira Mono\'',
		'--font-rubik': '\'Rubik\'',
		'--header-title-size': '1.1rem',
		'--blog-body-size': '1.125rem',
		'--text-font': 'var(--font-rubik), system-ui',
		'--monospaced-font': 'var(--font-fira), monospace',
		'--link-transition': 'all 0.2s linear',
		'--itunes-link-color': '#58a5ff',
		'--itunes-line-color': 'color-mod(var(--itunes-link-color) alpha(60%))',
		'--itunes-image-size': '90px',
		'--itunes-secondary-color': '#6682a9',
		'--itunes-content-left-inset': '2rem',
		'--itunes-container-max-width': '40rem',
		'--syndicate-color': '#e9f2f4',
		'--syndicate-border': '1px solid color-mod(var(--syndicate-color) shade(10%))',
		'--syndicate-cta-color': '#4a8794',
		'--pip-color': '#222222',
		'--pip-border': '1px solid color-mod(var(--pip-color) tint(10%))',
		'--pip-cta-color': '#3bc3a3',
		'--nope-color': '#f95d5e',
		'--nope-border': '1px solid color-mod(var(--nope-color) alpha(25%))',
		'--nope-cta-color': 'color-mod(var(--nope-color) shade(5%))'
	},
	customSelectors: {
		':--heading': 'h1, h2, h3, h4, h5, h6'
	}
};
