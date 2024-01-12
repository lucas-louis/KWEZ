'use client';

import { useEffect, useState } from 'react';
import {
	Box,
	Button,
	HStack,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Spinner,
	Text,
	useDisclosure,
	useToast,
	VStack,
} from '@chakra-ui/react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

import SimpleFilter from 'components/app/searchPage/SimpleFilter';
import ResultCard from 'components/app/resultPage/ResultCard';

import { API_URL } from 'config/constants';

import { ResponseType } from 'types/ResponseType';

const ResultPageContent = (): JSX.Element => {
	const [isLoading, setIsLoading] = useState(false);
	const [results, setResults] = useState<ResponseType[]>([]);
	const {
		isOpen: isAdvancedResult,
		onOpen: setIsAdvancedResultOn,
		onClose: setIsAdvancedResultOff,
		onToggle: toggleIsAdvancedResult,
	} = useDisclosure();

	const searchParams = useSearchParams();

	const toast = useToast({ duration: 3000, isClosable: true });

	useEffect(() => {
		if (searchParams.get('advanced') === 'true') setIsAdvancedResultOn();
		else setIsAdvancedResultOff();
		setIsLoading(true);
		fetch(
			`${API_URL}/${searchParams.get('type')}/${searchParams.get('spec')}/${searchParams.get(
				'value',
			)}?lang=${searchParams.get('lang')}&limit=${searchParams.get('limit')}`,
		)
			.then((res) => {
				setIsLoading(false);
				if (res.status === 200) res.json().then((data) => setResults(data.results));
				else throw new Error();
			})
			.catch(() => {
				setIsLoading(false);
				toast({
					title: 'An error occurred',
					status: 'error',
				});
			});
	}, [searchParams]);

	return (
		<HStack spacing="0px" w="100%" minH="100vh" h="100%" p="32px" bg="#011A1A" align="stretch" justify="start">
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
								value={
									`I'm searching for: ${searchParams.get(
										'type',
									)} with the specifications: ${searchParams.get(
										'spec',
									)} with the value: ${searchParams.get('value')}` || 'No query founded'
								}
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
					{isLoading ? (
						<VStack>
							<Spinner color="white" w="32px" h="32px" />
						</VStack>
					) : (
						<VStack w="100%" align="start" spacing="16px">
							<VStack>
								<Text color="#00978A">
									{results.length} result
									{results.length === 1 ? '' : 's'} in the language: {searchParams.get('lang')}
								</Text>
							</VStack>
							<VStack w="100%">
								{results.map((result) => (
									<Box as="span" w="100%" id={result.uri}>
										<Link href={result.uri} target="_blank">
											<ResultCard result={result} isAdvanced={isAdvancedResult} />
										</Link>
									</Box>
								))}
							</VStack>
						</VStack>
					)}
				</VStack>
			</VStack>
			<Image src="/assets/home-picture.png" alt="home picture" w="300px" borderRadius="32px" />
		</HStack>
	);
};

export default ResultPageContent;
