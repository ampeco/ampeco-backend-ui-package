import { Size } from '../Size';
import { Shape } from '../Shape';

export default interface FieldBaseProps {
	/**
	 * Sets disabled state
	 */
	disabled?: boolean;
	/**
	 * Sets readonly state
	 */
	readonly?: boolean;
	/**
	 * Sets error state
	 */
	error?: boolean;
	/**
	 * Sets the border radius of the input
	 */
	shape?: Shape;
	/**
	 * Sets the height of the input
	 */
	size?: Size;
};
