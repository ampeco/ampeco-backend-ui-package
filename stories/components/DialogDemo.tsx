import { useState } from "react";
import { Shape } from "../../src/types/Shape";
import { Button, Dialog } from "../../src";
import React from "react";

export const DialogDemo = () => {
	const [dialogConfig, setDialogConfig] = useState({
		isOpen: false,
		shape: Shape.DEFAULT,
	});

	const closeDialog = () => {
		setDialogConfig((prev) => {
			return { ...prev, isOpen: false };
		});
	};

	return (
		<div
			style={{
				height: "400px",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<div style={{ display: "flex", gap: "20px" }}>
				<Button
					onClick={() =>
						setDialogConfig({ isOpen: true, shape: Shape.DEFAULT })
					}
				>
					Open dialog
				</Button>
				<Button
					onClick={() =>
						setDialogConfig({ isOpen: true, shape: Shape.ROUNDED })
					}
				>
					Open rounded dialog
				</Button>
				<Button
					onClick={() => setDialogConfig({ isOpen: true, shape: Shape.SQUARE })}
				>
					Open square dialog
				</Button>
			</div>

			{dialogConfig.isOpen && (
				<Dialog
					header="Confirm cancellation"
					onClose={closeDialog}
					shape={dialogConfig.shape}
				>
					<div
						style={{
							marginTop: "20px",
							display: "flex",
							flexDirection: "column",
							gap: "20px",
						}}
					>
						<p>Are you sure you want to cancel?</p>
						<div
							style={{ justifyContent: "center", display: "flex", gap: "20px" }}
						>
							<Button
								style={{ width: "50%" }}
								variant="filled"
								onClick={closeDialog}
							>
								Yes
							</Button>
							<Button
								style={{ width: "50%" }}
								variant="outline"
								onClick={closeDialog}
							>
								No
							</Button>
						</div>
					</div>
				</Dialog>
			)}
		</div>
	);
};

export const dialogDemoSource = `
export const DialogDemo = () => {
 const [isOpen, setIsOpen] = useState(false);

 return <div>
  <Button onClick={() => setIsOpen(true)}>Open Dialog</Button>

  {isOpen &&
   <Dialog onClose={() => setIsOpen(false)}>
     <Button color="success" onClick={() => setIsOpen(false)}>Yes</Button>
     <Button color="danger" onClick={() => setIsOpen(false)}>No</Button>
   </Dialog>
  }
 </div>
}
`;
