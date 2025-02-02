import { Checkbox, HStack, Text } from '@chakra-ui/react';

const SimpleFilter = ({
	label,
	clicked,
	onClick,
}: {
	label: string;
	clicked: boolean;
	onClick: () => void;
}): JSX.Element => (
	<HStack
		bg={clicked ? '#003F3A' : 'transparent'}
		p="4px 12px"
		border="2px solid"
		borderColor="#00978A"
		borderRadius="32px"
		transition="all .3s ease-in-out"
	>
		<Text color="#FFFDEB">{label}</Text>
		<Checkbox colorScheme="cyan" onChange={onClick} isChecked={clicked} />
	</HStack>
);

export default SimpleFilter;
