'use client';

import { useEffect } from 'react';
import {
	Box,
	Button,
	HStack,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useDisclosure,
	VStack,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import SimpleFilter from 'components/app/searchPage/SimpleFilter';
import ResultCard from 'components/app/resultPage/ResultCard';

const ResultPageContent = (): JSX.Element => {
	const results = [
		{
			response: 'RESULT',
			type: 'Television Show',
			abstract:
				'Spider-Man is a superhero appearing in American comic books published by Marvel Comics. Created by writer-editor Stan Lee and artist Steve Ditko, he...',
			date: '01-10-2024',
			link: 'https://dbpedia.org/page/Spider-man',
		},
		{
			response: 'RESULT',
			type: 'Television Show',
			abstract:
				'Spider-Man is a superhero appearing in American comic books published by Marvel Comics. Created by writer-editor Stan Lee and artist Steve Ditko, he...',
			date: '01-10-2024',
			link: 'https://dbpedia.org/page/Spider-man',
		},
		{
			response: 'RESULT',
			type: 'Television Show',
			abstract:
				'Spider-Man is a superhero appearing in American comic books published by Marvel Comics. Created by writer-editor Stan Lee and artist Steve Ditko, he...',
			date: '01-10-2024',
			link: 'https://dbpedia.org/page/Spider-man',
		},
	];
	const {
		isOpen: isAdvancedResult,
		onOpen: setIsAdvancedResultOn,
		onClose: setIsAdvancedResultOff,
		onToggle: toggleIsAdvancedResult,
	} = useDisclosure();

	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.get('advanced') === 'true') setIsAdvancedResultOn();
		else setIsAdvancedResultOff();
		// TODO: call back
	}, [searchParams]);

	return (
		<HStack spacing="0px" w="100%" h="100%" p="32px" bg="#011A1A" align="start" justify="stretch">
			<VStack w="100%" spacing="64px" px="16px" align="start">
				<Link href="/">
					<Text size="6xl" color="white" fontFamily="Outfit">
						KWEZ.
					</Text>
				</Link>
				<VStack w="100%" spacing="32px" px="32px">
					<VStack w="100%">
						<InputGroup>
							<Input
								value={searchParams.get('q') || 'No query founded'}
								readOnly
								placeholder="Write your question by clicking on the words under"
							/>
							<InputRightElement w="auto" pr="8px">
								<Box as="span" w="100%">
									<Link href="search">
										<Button variant="secondary" size="customSm" w="100%" py="4px" px="12px">
											START A NEW RESEARCH
										</Button>
									</Link>
								</Box>
							</InputRightElement>
						</InputGroup>
						<HStack w="100%">
							<SimpleFilter
								label="Advanced results"
								clicked={isAdvancedResult}
								onClick={toggleIsAdvancedResult}
							/>
						</HStack>
					</VStack>
					<VStack w="100%" align="start" spacing="16px">
						<VStack>
							<Text color="#00978A">
								{results.length} result
								{results.length === 1 ? '' : 's'} in the language: {searchParams.get('lang')}
							</Text>
						</VStack>
						<VStack w="100%">
							{results.map((result) => (
								<Box as="span" w="100%" id={result.link}>
									<Link href={result.link} target="_blank">
										<ResultCard result={result} isAdvanced={isAdvancedResult} />
									</Link>
								</Box>
							))}
						</VStack>
					</VStack>
				</VStack>
			</VStack>
			<Image src="/assets/home-picture.png" alt="home picture" w="300px" h="100%" borderRadius="32px" />
		</HStack>
	);
};

export default ResultPageContent;
