const Button = {
	baseStyle: {
		padding: '8px 32px',
		fontSize: '16px',
		fontFamily: 'Outfit',
		height: 'auto',
		fontWeight: 600,
		borderRadius: '32px',
		whiteSpace: 'normal',
	},
	sizes: {
		customSm: {
			padding: '8px 32px',
			fontSize: '12px',
			fontWeight: 600,
			borderRadius: '16px',
		},
		customMd: {
			padding: '8px 32px',
			fontSize: '16px',
			fontWeight: 600,
			borderRadius: '32px',
		},
		customLg: {
			padding: '12px 48px',
			fontSize: '20px',
			fontWeight: 600,
			borderRadius: '32px',
		},
		xl: {
			padding: '16px 64px',
			fontSize: '24px',
			fontWeight: 600,
			borderRadius: '32px',
		},
		'2xl': {
			padding: '16px 64px',
			fontSize: '28px',
			fontWeight: 600,
			borderRadius: '48px',
		},
		'3xl': {
			padding: '16px 64px',
			fontSize: '32px',
			fontWeight: 600,
			borderRadius: '48px',
		},
	},
	variants: {
		primary: {
			bg: 'transparent',
			color: 'white',
			border: '3px solid',
			borderColor: '#00776F',

			mozTransition: 'all .3s ease-in-out',
			oTransition: 'all .3s ease-in-out',
			webkitTransition: 'all .3s ease-in-out',
			transition: 'all .3s ease-in-out',
			_hover: {
				_disabled: {
					bg: '#00776F',
					color: 'white',
					border: '3px solid',
					borderColor: '#00776F',
				},
				bg: '#00776F',
				color: 'white',
				border: '3px solid',
				borderColor: '#00776F',
				boxShadow: '-5px 0px 25px 0px #00978A',

				mozTransition: 'all .3s ease-in-out',
				oTransition: 'all .3s ease-in-out',
				webkitTransition: 'all .3s ease-in-out',
				transition: 'all .3s ease-in-out',
			},
		},
		secondary: {
			bg: '#00776F',
			color: 'white',
			borderRadius: '8px',

			mozTransition: 'all .3s ease-in-out',
			oTransition: 'all .3s ease-in-out',
			webkitTransition: 'all .3s ease-in-out',
			transition: 'all .3s ease-in-out',
			_hover: {
				_disabled: {
					bg: '#003F3A',
					color: 'white',
					borderRadius: '8px',
				},
				bg: '#003F3A',
				color: 'white',
				borderRadius: '8px',

				mozTransition: 'all .3s ease-in-out',
				oTransition: 'all .3s ease-in-out',
				webkitTransition: 'all .3s ease-in-out',
				transition: 'all .3s ease-in-out',
			},
		},
	},
	defaultProps: {
		size: 'customMd',
		variant: 'primary',
	},
};

export default Button;
