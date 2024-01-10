import { Button, Text } from '@chakra-ui/react';

const PredefinedLabel = ({ label, onClick }: { label: string; onClick: (word: string) => void }): JSX.Element => (
	<Button
		p="8px 16px"
		border="2px solid"
		borderColor="#00978A"
		borderRadius="12px"
		transition="all .3s ease-in-out"
		cursor="pointer"
		_hover={{
			bg: '#00776F',
		}}
		onClick={() => onClick(label)}
	>
		<Text color="#FFFDEB">{label}</Text>
	</Button>
);

export default PredefinedLabel;
