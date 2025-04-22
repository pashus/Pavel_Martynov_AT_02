import { Text } from 'components/text';

import styles from './Button.module.scss';
import clsx from 'clsx';

export const Button = ({
	title,
	onClick,
	type,
	variant
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
	variant?: 'default' | 'apply' | 'reset';
}) => {
	return (
		<button className={clsx(styles.button, variant && styles[variant])} type={type} onClick={onClick}>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
