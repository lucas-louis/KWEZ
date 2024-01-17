import { ResponseType } from 'types/ResponseType';
import { HStack, Icon, Text, VStack } from '@chakra-ui/react';
import { ChevronRightIcon } from '@chakra-ui/icons';

const ResultCard = ({ result, isAdvanced }: { result: ResponseType; isAdvanced: boolean }): JSX.Element => (
	<HStack
		w="100%"
		justify="space-between"
		spacing="16px"
		p="16px 24px 16px 16px"
		border="2px solid"
		borderColor="#00978A"
		borderRadius="16px"
		_hover={{
			p: '16px',
			bg: '#003F3A',
		}}
		transition="all .3s ease-in-out"
	>
		<VStack spacing="4px" align="start">
			<Text size="boldLg">{result.name}</Text>
			{isAdvanced && (
				<>
					<VStack spacing="0px" align="start">
						<Text>An entity of type: {result.type}</Text>
						<Text maxW="1000px">{result.abstract.slice(0, 500)}</Text>
					</VStack>
					<Text>{result.date}</Text>
					{result.type !== 'dbo:MusicalArtist' && (
						<Text>
							Length: {Math.floor(result.musicLength / 60000)}:
							{((result.musicLength % 60000) / 1000).toFixed(0).padStart(2, '0')}
						</Text>
					)}
					<Text color="#00978A" size="sm">
						{result.uri}
					</Text>
				</>
			)}
		</VStack>
		<Icon as={ChevronRightIcon} w="32px" h="32px" color="white" />
	</HStack>
);

export default ResultCard;
