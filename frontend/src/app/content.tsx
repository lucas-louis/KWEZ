'use client';

import { Button, HStack, Icon, Image, Text, VStack } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';

import UpRightArrowIcon from 'assets/icons/Arrow/UpRightArrowIcon';

const RootContent = (): JSX.Element => {
	const MotionHStack = motion(HStack);

	return (
		<MotionHStack
			spacing="0px"
			w="100%"
			h="100%"
			bg="#011111"
			align="start"
			justify="stretch"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ ease: 'easeOut', duration: 0.5 }}
		>
			<HStack p="24px 48px">
				<Text size="7xl" color="white" fontFamily="Outfit">
					KWEZ.
				</Text>
			</HStack>
			<HStack
				w="100%"
				h="100%"
				justify="space-between"
				p="32px"
				borderRadius="64px 0px 0px 64px"
				bg="#011A1A"
				outline="3px solid #00776F"
				boxShadow="-5px 0px 50px 0px #00978A"
			>
				<VStack spacing="64px" w="100%" h="100%" p="64px" justify="start" align="start">
					<Text size="7xl" maxW="650px" fontFamily="Outfit">
						UNLOCK KNOWLEDGE WITH SEMANTIC POWER
					</Text>
					<Text size="3xl" maxW="650px">
						Experience the future of music discovery, by starting your journey into the world of music with
						the power of the semantic web
					</Text>
					<Link href="search">
						<Button size="xl" gap="16px">
							SEARCH NOW
							<Icon as={UpRightArrowIcon} w="24px" h="24px" color="white" />
						</Button>
					</Link>
				</VStack>
				<Image src="/assets/home-picture.png" alt="home picture" w="auto" h="100%" borderRadius="32px" />
			</HStack>
		</MotionHStack>
	);
};

export default RootContent;
