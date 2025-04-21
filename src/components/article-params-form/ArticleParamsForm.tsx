import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { ChangeEvent, useState } from 'react';
import { Text } from 'components/text';

import styles from './ArticleParamsForm.module.scss';
import { Spacing } from '../spacing';
import { Select } from '../select';
import { backgroundColors, contentWidthArr, defaultArticleState, fontColors, fontFamilyOptions, fontSizeOptions, OptionType } from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group/RadioGroup';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [selectedFont, setSelectedFont] = useState<OptionType | null>(defaultArticleState.fontFamilyOption);
	const [selectedFontSize, setSelectedFontSize] = useState<OptionType>(defaultArticleState.fontSizeOption);
	const [selectedFontColor, setSelectedFontColor] = useState<OptionType | null>(defaultArticleState.fontColor);
	const [selectedBgColor, setSelectedBgColor] = useState<OptionType | null>(defaultArticleState.backgroundColor);
	const [selectedWidth, setSelectedWidth] = useState<OptionType | null>(defaultArticleState.contentWidth);

	const toggleForm = () => {
		setIsOpen(!isOpen);
	};

	const resetValues = () => {
		setSelectedFont(defaultArticleState.fontFamilyOption);
		setSelectedFontSize(defaultArticleState.fontSizeOption);
		setSelectedFontColor(defaultArticleState.fontColor);
		setSelectedBgColor(defaultArticleState.backgroundColor);
		setSelectedWidth(defaultArticleState.contentWidth);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
	}

	return (
		<>
			<ArrowButton onClick={toggleForm} isOpen={isOpen} />
			<aside
				className={`${styles.container} ${isOpen ? styles.container_open : ''}`}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h2' weight={800} size={31} uppercase={true} align='left' >
						Задайте параметры
					</Text>
					<Spacing size={50}/>
					<Select
						title='Шрифт'
						selected={selectedFont}
						options={fontFamilyOptions}
						onChange={setSelectedFont}
					/>
					<Spacing size={50}/>
					<RadioGroup
						title='Размер шрифта'
						name='fonts'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={setSelectedFontSize}
					/>
					<Spacing size={50}/>
					<Select
						title='Цвет шрифта'
						selected={selectedFontColor}
						options={fontColors}
						onChange={setSelectedFontColor}
					/>
					<Spacing size={50}/>
					<Spacing size={50}/>
					<Select
						title='Цвет фона'
						selected={selectedBgColor}
						options={backgroundColors}
						onChange={setSelectedBgColor}
					/>
					<Spacing size={50}/>
					<Select
						title='Ширина контента'
						selected={selectedWidth}
						options={contentWidthArr}
						onChange={setSelectedWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							type='reset'
							onClick={resetValues}
						/>
						<Button
							title='Применить'
							type='submit'
						/>
					</div>
				</form>
			</aside>
		</>
	);
};
