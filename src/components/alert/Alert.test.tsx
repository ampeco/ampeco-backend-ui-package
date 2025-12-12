import { render, screen, fireEvent } from "@testing-library/react";
import { describe, vi, it, expect } from "vitest";

import { Alert } from "./Alert";

describe("Alert component", () => {
	it("renders children correctly", () => {
		render(
			<Alert>
				<span>Alert message</span>
			</Alert>
		);

		const alertMessage = screen.getByRole("alert");
		expect(alertMessage).toBeInTheDocument();
	});

	it("calls onClose when close button is clicked", () => {
		const onCloseMock = vi.fn();
		render(
			<Alert closeable onClose={onCloseMock}>
				<span>Alert message</span>
			</Alert>
		);

		const closeButton = screen.getByLabelText("Close");
		fireEvent.click(closeButton);

		expect(onCloseMock).toHaveBeenCalled();
	});

	it("applies custom className", () => {
		render(
			<Alert className="custom-class">
				<span>Alert message</span>
			</Alert>
		);

		const alert = screen.getByRole("alert");
		expect(alert).toHaveClass("custom-class");
	});

	it("renders primary alert", () => {
		render(<Alert type="primary">Primary alert</Alert>);
		const alert = screen.getByRole("alert");
		expect(alert).toHaveClass("border-primary-500");
		expect(alert).toHaveClass("bg-primary-50");
	});

	it("renders success alert", () => {
		render(<Alert type="success">Success alert</Alert>);
		const alert = screen.getByRole("alert");
		expect(alert).toHaveClass("border-success-500");
		expect(alert).toHaveClass("bg-success-50");
	});

	it("renders danger alert", () => {
		render(<Alert type="danger">Danger alert</Alert>);
		const alert = screen.getByRole("alert");
		expect(alert).toHaveClass("border-danger-500");
		expect(alert).toHaveClass("bg-danger-50");
	});

	it("renders warning alert", () => {
		render(<Alert type="warning">Warning alert</Alert>);
		const alert = screen.getByRole("alert");
		expect(alert).toHaveClass("border-warning-500");
		expect(alert).toHaveClass("bg-warning-50");
	});
});
