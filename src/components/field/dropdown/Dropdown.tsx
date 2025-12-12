import {FocusEvent as FocusEventReact, HTMLProps, ReactNode, useEffect, useRef} from 'react';
import classNames from 'classnames';
import DataAttributes from '../../../types/DataAttributes';


interface DropdownProps extends Omit<HTMLProps<HTMLDivElement>, 'className' | 'onMouseDown' | 'onBlur'>, DataAttributes {
	isOpen: boolean;
	className?: classNames.Value;
	onRequestOpenChange: (isOpen: boolean, source: 'click' | 'focus' | 'blur' | 'key') => void;
	handle: ReactNode;
	children?: ReactNode;
}

export const Dropdown = (
	{
		isOpen,
		onRequestOpenChange,
		className,
		handle,
		children,
		dataAttributes,
		...props
	}: DropdownProps
) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const wasWindowJustBlurred = useRef(false);

	useEffect(() => {
		const handler = (event: MouseEvent) => {
			const contains = containerRef.current?.contains(event.target as Node);
			if (!contains) {
				const target = event.target as Element;
				const isDirectBackdropClick = target.classList.contains('dialog-backdrop') || target.classList.contains('drawer-backdrop');

				if (isDirectBackdropClick) {
					return;
				}

				onRequestOpenChange(false, 'click');
			}
		};
		if (isOpen) {
			document.addEventListener('mousedown', handler);
		}
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	}, [isOpen, onRequestOpenChange]);

	useEffect(() => {
		const handler = () => {
			if(containerRef.current?.contains(document.activeElement)) {
				wasWindowJustBlurred.current = true;
			}
		};
		window.addEventListener('blur', handler);
		return () => {
			window.removeEventListener('blur', handler);
		};
	}, []);

	const handleFieldFocus = () => {
		// Prevents the dropdown from opening right after the window gets refocused, because the browser automatically
		// focuses the last focused element
		if(!wasWindowJustBlurred.current) {
			onRequestOpenChange(true, 'focus');
		}
		wasWindowJustBlurred.current = false;
	};

	const handleContainerBlur = (event: FocusEventReact) => {
		const isVoidElement = !event.relatedTarget || event.relatedTarget.tagName === 'DIALOG';
		if(isVoidElement) {
			return;
		}

		const containsTarget = containerRef.current?.contains(event.relatedTarget as Node | null);
		if(containsTarget) {
			return;
		}

		onRequestOpenChange(false, 'blur');
	};


	const classes = classNames('dropdown', className, {
		'open': isOpen
	});

	return <div
		ref={containerRef}
		className={classes}
		onBlur={handleContainerBlur}
		onFocus={handleFieldFocus} // Move as an outside prop?
		{...dataAttributes}
		{...props}
	>
		{handle}
		{isOpen && children}
	</div>;
};
