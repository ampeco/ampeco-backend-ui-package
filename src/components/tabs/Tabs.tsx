import classNames from "classnames";
import { createContext, useContext } from "react";
import { useDefaultValueState } from "../../hooks/internal/useDefaultValueState";
import { TabsProps, TabProps, TabContext } from "../../types/Tabs";

const Context = createContext<TabContext>({ selected: null });
export const Tabs = ({
	defaultSelected,
	selected: selectedProp,
	children,
	onSelectedChange,
	shouldChange = (selected, previous) => true,
	dataAttributes,
}: TabsProps) => {
	const [selected, setSelected] = useDefaultValueState(
		defaultSelected,
		selectedProp,
		onSelectedChange
	);

	return (
		<>
			<ul
				className="flex items-center border-b-2 border-gray-200 mb-2"
				{...dataAttributes}
			>
				{children &&
					children.map(
						(child) =>
							child && (
								<li
									key={child.props.id}
									className={classNames(
										"text-sm font-bold cursor-pointer border-b-2 border-transparent px-2 py-1 -mb-[2px] hover:text-primary-400",
										{
											"text-primary-600 border-b-primary-600 hover:text-primary-600":
												child.props.id === selected,
										}
									)}
									onClick={() =>
										shouldChange(child?.props.id, selected) &&
										setSelected(child.props.id)
									}
								>
									<span>{child.props.title}</span>
								</li>
							)
					)}
			</ul>
			<Context.Provider value={{ selected }}>{children}</Context.Provider>
		</>
	);
};

export const Tab = ({ id, children, dataTestId, dataAttributes }: TabProps) => {
	const context = useContext(Context);

	if (context.selected !== id) {
		return null;
	}

	return (
		<div className={id} data-testid={dataTestId} {...dataAttributes}>
			{children}
		</div>
	);
};
