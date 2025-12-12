export type DataAttributesType = {
	[key: `data-${string}`]: string;
}

interface DataAttributes  {
	dataAttributes?: DataAttributesType;
}

export default DataAttributes;
