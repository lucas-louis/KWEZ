'use client';

import { ChakraProvider, VStack } from '@chakra-ui/react';
import { CacheProvider } from '@chakra-ui/next-js';

import theme from 'theme';
import 'theme/index.css';

const Providers = ({ children }: { children: JSX.Element }): JSX.Element => (
	<CacheProvider>
		<ChakraProvider theme={theme} resetCSS>
			<VStack minH="100vh" h="100%">
				{children}
			</VStack>
		</ChakraProvider>
	</CacheProvider>
);

export default Providers;
