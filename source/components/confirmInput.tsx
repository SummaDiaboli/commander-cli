import React, {FC, useCallback} from 'react';
import TextInput, {Props as TextInputProps} from 'ink-text-input';
import yn from 'yn';

interface ConfirmInputProps extends TextInputProps {
	isChecked?: boolean;
	onChange: (value: string) => void;
	onSubmit: (value: string | boolean) => void;
	placeholder?: string;
	value: string;
}

const ConfirmInput: FC<ConfirmInputProps> = ({
	isChecked = false,
	onChange = () => {},
	onSubmit,
	placeholder = '',
	value,
	...props
}) => {
	const handleSubmit = useCallback(
		(newValue: string) => {
			onSubmit(yn(newValue, {default: isChecked}));
		},
		[isChecked, onSubmit],
	);

	return (
		<TextInput
			{...props}
			placeholder={placeholder}
			value={value}
			onChange={onChange}
			onSubmit={handleSubmit}
		/>
	);
};

export default ConfirmInput;
