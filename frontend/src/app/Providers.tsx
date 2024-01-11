'use client';

import { ChakraProvider, VStack } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

import theme from 'theme';
import 'theme/index.css';

const Providers = ({ children }: { children: JSX.Element }): JSX.Element => (
	<CacheProvider>
		<ChakraProvider theme={theme} resetCSS>
			<VStack height="100vh">{children}</VStack>
		</ChakraProvider>
	</CacheProvider>
);

export default Providers;
