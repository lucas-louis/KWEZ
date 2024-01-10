import { extendTheme } from '@chakra-ui/react';

// Foundation overrides
import colors from 'theme/foundations/colors';
import fonts from 'theme/foundations/fonts';

import Button from 'theme/components/button';
import Input from 'theme/components/input';
import Link from 'theme/components/link';
import Text from 'theme/components/text';

const breakpoints = {
	xs: '320px',
	ssm: '350px',
	ssm2: '415px',
	sm: '480px',
	sm2: '600px',
	smd: '700px',
	md: '768px',
	lg: '1024px',
	xl: '1280px',
	'2xl': '1440px',
	'3xl': '1600px',
	'4xl': '1920px',
	'5xl': '2560px',
};

const overrides = {
	fonts,
	colors,
	breakpoints,
	components: {
		Button,
		Input,
		Link,
		Text,
	},
};

export default extendTheme(overrides);
