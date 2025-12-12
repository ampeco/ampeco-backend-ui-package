import { useState } from "react";
import { Button, Drawer, Select, DatePicker } from "../../src";
import React from "react";

export const DrawerDemo = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [optionSelected, setOptionSelected] = useState<any>(1);
	const [date, setDate] = useState<any>(null);
	return (
		<div
			style={{
				height: "400px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

			{isOpen && (
				<Drawer
					minWidth={600}
					onClose={() => setIsOpen(false)}
					header={<h1>Header</h1>}
					footer={
						<div
							style={{
								display: "flex",
								justifyContent: "space-around",
								gap: "10px",
							}}
						>
							<Button
								style={{ flexGrow: 1 }}
								color="success"
								onClick={() => setIsOpen(false)}
							>
								Yes
							</Button>
							<Button
								style={{ flexGrow: 1 }}
								color="danger"
								onClick={() => setIsOpen(false)}
							>
								No
							</Button>
						</div>
					}
				>
					<Button onClick={() => setDate({ date: 10, month: 10, year: 2023 })}>
						TEST
					</Button>
					<p>Are you sure you want to continue?</p>
					<div style={{ marginTop: 12 }}>
						<Select
							value={optionSelected}
							onChange={(value) => setOptionSelected(value)}
							options={[
								{ label: "First item", value: 1 },
								{ label: "Second item", value: 2 },
							]}
						></Select>
						<span>Option selected: {optionSelected}</span>
					</div>
					<div style={{ marginTop: 12 }}>
						<DatePicker value={date} onChange={(value) => setDate(value)} />
						<span>Selected date: {JSON.stringify(date)}</span>
					</div>
				</Drawer>
			)}
		</div>
	);
};

export const drawerDemoSource = `
export const DialogDemo = () => {
 const [isOpen, setIsOpen] = useState(false);

 return <div>
  <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>

  {isOpen &&
   <Drawer
   	onClose={() => setIsOpen(false)}
   	footer={<>
		 <Button color="success" onClick={() => setIsOpen(false)}>Yes</Button>
		 <Button color="danger" onClick={() => setIsOpen(false)}>No</Button>
		</>}
   >
    <p>Are you sure you want to continue?</p>
   </Drawer>
  }
 </div>
}
`;
