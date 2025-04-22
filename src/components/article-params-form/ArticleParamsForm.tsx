import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useEffect, useRef, useState } from 'react';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import { Spacing } from '../spacing';
import { Select } from '../select';
import { ArticleStateType, backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group/RadioGroup';
import clsx from 'clsx';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsFormProps = {
	initialValues: ArticleStateType;
	onApply: (values: ArticleStateType) => void;
	onReset: () => void;
}

export const ArticleParamsForm = ({
	initialValues,
	onApply,
	onReset
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [formState, setFormState] = useState(initialValues);

	const rootRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		setFormState(initialValues);
	}, [initialValues]);

	useOutsideClickClose({
		isOpen,
		rootRef,
		onChange: setIsOpen
	});

	const toggleForm = () => {
		setIsOpen(!isOpen);
	};

	const resetValues = () => {
		setFormState(defaultArticleState);
		onReset() //при сбросе по заданию стили страницы сразу меняются
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply(formState);
	}

	return (
		<>
			<div ref={rootRef}>
				<ArrowButton onClick={toggleForm} isOpen={isOpen} />
				<aside
					className={clsx(styles.container, isOpen && styles.container_open)}
				>
					<form className={styles.form} onSubmit={handleSubmit}>
						<Text as='h2' weight={800} size={31} uppercase={true} align='left' >
							Задайте параметры
						</Text>
						<Spacing size={50}/>
						<Select
							title='Шрифт'
							selected={formState.fontFamilyOption}
							options={fontFamilyOptions}
							onChange={(option) => {
								setFormState(prev => (
									{...prev, fontFamilyOption: option}
								))
							}}
						/>
						<Spacing size={50}/>
						<RadioGroup
							title='Размер шрифта'
							name='fonts'
							options={fontSizeOptions}
							selected={formState.fontSizeOption}
							onChange={(option) => {
								setFormState(prev => (
									{...prev, fontSizeOption: option}
								))
							}}
						/>
						<Spacing size={50}/>
						<Select
							title='Цвет шрифта'
							selected={formState.fontColor}
							options={fontColors}
							onChange={(option) => {
								setFormState(prev => (
									{...prev, fontColor: option}
								))
							}}
						/>
						<Spacing size={50}/>
						<Spacing size={50}/>
						<Select
							title='Цвет фона'
							selected={formState.backgroundColor}
							options={backgroundColors}
							onChange={(option) => {
								setFormState(prev => (
									{...prev, backgroundColor: option}
								))
							}}
						/>
						<Spacing size={50}/>
						<Select
							title='Ширина контента'
							selected={formState.contentWidth}
							options={contentWidthArr}
							onChange={(option) => {
								setFormState(prev => (
									{...prev, contentWidth: option}
								))
							}}
						/>
						<div className={styles.bottomContainer}>
							<Button
								title='Сбросить'
								type='reset'
								onClick={resetValues}
								variant='reset'
							/>
							<Button
								title='Применить'
								type='submit'
								variant='apply'
							/>
						</div>
					</form>
				</aside>
			</div>
		</>
	);
};
