'use client';

import { useEffect, useState } from 'react';
import {
	HStack,
	Icon,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useDisclosure,
	useToast,
	VStack,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import Link from 'next/link';

import PredefinedLabel from 'components/app/searchPage/PredefinedLabel';
import SimpleFilter from 'components/app/searchPage/SimpleFilter';
import InputFilter from 'components/app/searchPage/InputFilter';

import SearchIcon from 'assets/icons/SearchIcon';
import { useRouter } from 'next/navigation';

const SearchPageContent = (): JSX.Element => {
	const [searchInput, setSearchInput] = useState("I'm searching for:");
	const [typeInput, setTypeInput] = useState('');
	const [specInput, setSpecInput] = useState('');
	const [valueInput, setValueInput] = useState('');
	const [languageInput, setLanguageInput] = useState('');
	const [limitInput, setLimitInput] = useState('');
	const { isOpen: isAdvancedResult, onToggle: toggleIsAdvancedResult } = useDisclosure();
	const { isOpen: isLanguageFilter, onToggle: toggleLanguageFilter } = useDisclosure();
	const { isOpen: isLimitFilter, onToggle: toggleLimitFilter } = useDisclosure();
	const predefinedTypes = ['Artist', 'Album', 'Music'];
	const predefinedSpecs = ['Name', 'Album', 'Music'];

	const toast = useToast({ duration: 3000, isClosable: true });

	const router = useRouter();

	useEffect(() => {
		setSearchInput(
			`I'm looking for: ${typeInput} ${typeInput && 'with the specifications:'} ${specInput} ${
				specInput && 'with the value:'
			} ${valueInput}`,
		);
	}, [typeInput, specInput, valueInput]);

	return (
		<HStack spacing="0px" w="100%" minH="100vh" h="100%" p="32px" bg="#011A1A" align="start" justify="stretch">
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
								value={searchInput}
								readOnly
								placeholder="Write your question by clicking on the words under"
							/>
							{searchInput && (
								<InputRightElement>
									<Icon
										as={SearchIcon}
										color="#00978A"
										w="16px"
										h="16px"
										cursor="pointer"
										onClick={() => {
											if (typeInput && specInput && valueInput)
												router.push(
													`result?${new URLSearchParams({
														type: typeInput.toLowerCase(),
														spec: specInput.toLowerCase(),
														value: valueInput.toLowerCase(),
														lang: isLanguageFilter ? languageInput || 'en' : 'en',
														limit: isLimitFilter ? limitInput || '10' : '10',
														advanced: isAdvancedResult ? 'true' : 'false',
													}).toString()}`,
												);
											else toast({ title: 'Please fill all the fields', status: 'error' });
										}}
									/>
								</InputRightElement>
							)}
						</InputGroup>
						<HStack w="100%">
							<InputFilter
								label="Language"
								placeholder="en"
								inputValue={languageInput}
								setInputValue={setLanguageInput}
								maxLength={2}
								clicked={isLanguageFilter}
								onClick={toggleLanguageFilter}
							/>
							<InputFilter
								label="Number of results"
								placeholder="10"
								inputValue={limitInput}
								setInputValue={setLimitInput}
								maxLength={3}
								clicked={isLimitFilter}
								onClick={toggleLimitFilter}
							/>
							<SimpleFilter
								label="Advanced results"
								clicked={isAdvancedResult}
								onClick={toggleIsAdvancedResult}
							/>
						</HStack>
					</VStack>
					<VStack w="100%" align="start" spacing="24px">
						<VStack align="start">
							<Text size="boldLg">I'm looking for:</Text>
							<Wrap>
								{predefinedTypes.map((label) => (
									<WrapItem key={label}>
										<PredefinedLabel
											label={label}
											selected={label === typeInput}
											onClick={() => setTypeInput(label)}
										/>
									</WrapItem>
								))}
							</Wrap>
						</VStack>
						{typeInput && (
							<VStack align="start">
								<Text size="boldLg">With the specifications:</Text>
								<Wrap>
									{predefinedSpecs
										.filter(
											(spec) =>
												(typeInput === 'Album' && spec === 'Name') ||
												(typeInput === 'Music' && spec !== 'Music') ||
												typeInput === 'Artist',
										)
										.map((label) => (
											<WrapItem key={label}>
												<PredefinedLabel
													label={label}
													selected={label === specInput}
													onClick={() => setSpecInput(label)}
												/>
											</WrapItem>
										))}
								</Wrap>
							</VStack>
						)}
						{specInput && (
							<VStack align="start" maxW="400px" w="100%">
								<Text size="boldLg">With the value:</Text>
								<Input
									placeholder="The value of the specifications"
									w="100%"
									onChange={(e) => setValueInput(e.target.value)}
								/>
							</VStack>
						)}
					</VStack>
				</VStack>
			</VStack>
			<Image src="/assets/home-picture.png" alt="home picture" w="300px" h="100%" borderRadius="32px" />
		</HStack>
	);
};

export default SearchPageContent;
