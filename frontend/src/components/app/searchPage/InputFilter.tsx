import { Checkbox, HStack, Input, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

const InputFilter = ({
	label,
	placeholder,
	inputValue,
	setInputValue,
	maxLength,
	clicked,
	onClick,
}: {
	label: string;
	placeholder: string;
	inputValue: string;
	setInputValue: Dispatch<SetStateAction<string>>;
	maxLength: number;
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
		<Input
			value={inputValue}
			placeholder={placeholder}
			maxLength={maxLength}
			p="0px 4px"
			h="auto"
			w="35px"
			border="0px"
			borderBottom="2px solid"
			borderColor="#00776F"
			borderRadius="0px"
			fontSize="14px"
			onFocus={onClick}
			onChange={(e) => setInputValue(e.target.value)}
		/>
		<Checkbox colorScheme="cyan" onChange={onClick} isChecked={clicked} />
	</HStack>
);

export default InputFilter;
