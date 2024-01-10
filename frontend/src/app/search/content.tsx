'use client';

import { useState } from 'react';
import {
	Button,
	HStack,
	Icon,
	Image,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useDisclosure,
	VStack,
	Wrap,
	WrapItem,
} from '@chakra-ui/react';
import Link from 'next/link';

import PredefinedLabel from 'components/app/searchPage/PredefinedLabel';
import SimpleFilter from 'components/app/searchPage/SimpleFilter';
import InputFilter from 'components/app/searchPage/InputFilter';

import SearchIcon from 'assets/icons/SearchIcon';

const SearchPageContent = (): JSX.Element => {
	const [searchInput, setSearchInput] = useState('');
	const [languageInput, setLanguageInput] = useState('');
	const [limitInput, setLimitInput] = useState('');
	const { isOpen: isAdvancedResult, onToggle: toggleIsAdvancedResult } = useDisclosure();
	const { isOpen: isLanguageFilter, onToggle: toggleLanguageFilter } = useDisclosure();
	const { isOpen: isLimitFilter, onToggle: toggleLimitFilter } = useDisclosure();
	const predefinedLabels = ['Where', 'Who'];

	const addWordToInput = (word: string) => setSearchInput((prev) => (prev ? `${prev} ${word}` : word));
	const removeLastWordToInput = () => setSearchInput((prev) => prev.split(' ').slice(0, -1).join(' '));

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
								value={searchInput}
								readOnly
								placeholder="Write your question by clicking on the words under"
							/>
							{searchInput && (
								<InputRightElement>
									<Link
										href={`result?${new URLSearchParams({
											q: searchInput,
											lang: isLanguageFilter ? languageInput || 'en' : 'en',
											limit: isLimitFilter ? limitInput || '10' : '10',
											advanced: isAdvancedResult ? 'true' : 'false',
										}).toString()}`}
									>
										<Icon as={SearchIcon} color="#00978A" w="16px" h="16px" cursor="pointer" />
									</Link>
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
					<VStack w="100%" align="start">
						<Button variant="secondary" size="sm" onClick={removeLastWordToInput}>
							Erase last word
						</Button>
						<Wrap spacing="8px" w="100%">
							{predefinedLabels.map((label) => (
								<WrapItem key={label}>
									<PredefinedLabel label={label} onClick={addWordToInput} />
								</WrapItem>
							))}
						</Wrap>
					</VStack>
				</VStack>
			</VStack>
			<Image src="/assets/home-picture.png" alt="home picture" w="300px" h="100%" borderRadius="32px" />
		</HStack>
	);
};

export default SearchPageContent;
