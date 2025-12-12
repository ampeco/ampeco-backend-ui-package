import React from "react";
import defaultImageUrl from "../../assets/icons/no-matching-results.svg";
import DataAttributes from "../../types/DataAttributes";
interface MessageProps extends DataAttributes {
	text?: string;
	imgUrl?: string;
	altText?: string;
}

const defaultAltText = "No results image";

export const Message: React.FC<MessageProps> = ({
	text,
	imgUrl = defaultImageUrl,
	altText = defaultAltText,
	dataAttributes,
	...props
}) => {
	return (
		<div {...dataAttributes} {...props}>
			<div className="flex flex-col items-center justify-center">
				<img src={imgUrl} alt={altText} className="mb-4" />
				{text?.length && <p>{text}</p>}
			</div>
		</div>
	);
};
