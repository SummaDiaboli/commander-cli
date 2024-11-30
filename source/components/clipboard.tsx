import {useAtomValue} from 'jotai';
import {useEffect, useState} from 'react';
import {aiResponseAtom} from '../atoms/aiResponseAtom.js';
import React from 'react';
import {Box, Text, useApp} from 'ink';
import clipboard from 'clipboardy';
import Spinner from 'ink-spinner';

const Clipboard = () => {
	const {exit} = useApp();
	const [error, setError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(false);
	const command = useAtomValue(aiResponseAtom);

	const copyToClipboard = () => {
		try {
			clipboard.writeSync(command);
			setIsSuccess(true);
		} catch (e) {
			setError(e);
			exit();
		}
	};

	useEffect(() => {
		copyToClipboard();
	}, []);

	if (error) {
		return <Text>{`Failed to copy to clipboard: ${error}`}</Text>;
	}

	return (
		<Box flexDirection="column">
			<Box gap={1}>
				{!isSuccess && <Spinner />}
				<Text color={'yellow'}>Preparing to copy to clipboard...</Text>
			</Box>
			{isSuccess && (
				<Text color={'green'}>Successfully copied to clipboard</Text>
			)}
		</Box>
	);
};

export default Clipboard;
