import { Metadata } from 'next';

import Providers from 'app/Providers';

export const metadata: Metadata = {
	title: 'KWEZ.',
	description: 'Unlock knowledge with semantic power',
	viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
	icons: '/assets/logo/kwez-logo.svg',
};

const RootLayout = ({ children }: { children: JSX.Element }): JSX.Element => (
	<html lang="fr">
		<body>
			<Providers>{children}</Providers>
		</body>
	</html>
);

export default RootLayout;
