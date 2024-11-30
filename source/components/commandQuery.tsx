import {Box, Text} from 'ink';
import TextInput from 'ink-text-input';
import React, {useState} from 'react';
import {GoogleGenerativeAI} from '@google/generative-ai';
import {useSetAtom} from 'jotai';
import {aiResponseAtom} from '../atoms/aiResponseAtom.js';
import Loader from './loader.js';

const CommandQuery = () => {
	const [query, setQuery] = useState('');
	const [isFocused, setIsFocused] = useState(true);
	const [isLoading, setIsLoading] = useState(false);
	const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
	const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
	const setResponse = useSetAtom(aiResponseAtom);

	const onSubmit = async () => {
		setIsLoading(true);
		const prompt = `
			Prompt:

I'm trying to do this:
${query}

What's the command I need to use in my terminal? Please just give me the command itself, without any extra formatting. Do not return a new line charater at the end.

Example Usage:

User Input:

I'm trying to see a list of all the files and folders in the current directory, including hidden ones. What's the command I need to use in my terminal? Please just give me the command itself, without any extra formatting.

Gemini API Response:

ls -a`;

		const result = await model.generateContent(prompt);
		setResponse(result.response.text());
		setIsFocused(false);
		setIsLoading(false);
	};

	return (
		<Box flexDirection="column">
			<Box>
				<Box marginRight={1}>
					<Text color={'yellow'}>Enter query:</Text>
				</Box>

				<TextInput
					value={query}
					onSubmit={onSubmit}
					onChange={setQuery}
					focus={isFocused}
					placeholder="New next.js app"
				/>
			</Box>

			{isLoading && <Loader />}
		</Box>
	);
};

export default CommandQuery;
