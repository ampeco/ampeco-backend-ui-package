import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi, it, beforeEach } from "vitest";
import { Notification } from "./Notification";
import { NotificationType } from "../../types/Notification";
import { Shape } from "../../types/Shape";

describe("Notification component", () => {
	const mockOnClose = vi.fn();

	const defaultProps = {
		type: "default" as NotificationType, // Default type
		closable: true,
		onClose: mockOnClose,
		children: "This is a notification message",
		dataAttributes: { "data-testid": "notification" },
	};

	beforeEach(() => {
		vi.clearAllMocks();
	});

	it("renders Notification component correctly", () => {
		render(<Notification {...defaultProps} />);
		expect(screen.getByTestId("notification")).toBeInTheDocument();
		expect(
			screen.getByText("This is a notification message")
		).toBeInTheDocument();
	});

	it("applies correct class names based on type", () => {
		render(
			<Notification {...defaultProps} type={"success" as NotificationType} />
		);
		const notificationDiv = screen.getByTestId("notification");
		expect(notificationDiv).toHaveClass("bg-success-100");
		expect(notificationDiv).toHaveClass("text-success-600");
	});

	it("applies correct class names for default type", () => {
		render(
			<Notification {...defaultProps} type={"default" as NotificationType} />
		);
		const notificationDiv = screen.getByTestId("notification");
		expect(notificationDiv).toHaveClass("bg-gray-200");
		expect(notificationDiv).toHaveClass("text-gray-600");
	});

	it("applies correct class names for warning type", () => {
		render(
			<Notification {...defaultProps} type={"warning" as NotificationType} />
		);
		const notificationDiv = screen.getByTestId("notification");
		expect(notificationDiv).toHaveClass("bg-warning-100");
		expect(notificationDiv).toHaveClass("text-warning-600");
	});

	it("applies correct class names for danger type", () => {
		render(
			<Notification {...defaultProps} type={"danger" as NotificationType} />
		);
		const notificationDiv = screen.getByTestId("notification");
		expect(notificationDiv).toHaveClass("bg-danger-100");
		expect(notificationDiv).toHaveClass("text-danger-600");
	});

	it("renders close button when closable is true", () => {
		render(<Notification {...defaultProps} />);
		const closeButton = screen.getByTestId("close-button");
		expect(closeButton).toBeInTheDocument();
	});

	it("does not render close button when closable is false", () => {
		render(<Notification {...defaultProps} closable={false} />);
		expect(screen.queryByTestId("close-button")).not.toBeInTheDocument();
	});

	it("calls onClose function when close button is clicked", () => {
		render(<Notification {...defaultProps} />);
		const closeButton = screen.getByTestId("close-button");
		fireEvent.click(closeButton);
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});

	it("applies correct class names for default shape", () => {
		render(<Notification {...defaultProps} shape={Shape.DEFAULT} />);
		const notificationDiv = screen.getByTestId("notification");
		expect(notificationDiv).toHaveClass("rounded-lg");
	});

	it("applies correct class names for rounded shape", () => {
		render(<Notification {...defaultProps} shape={Shape.ROUNDED} />);
		const notificationDiv = screen.getByTestId("notification");
		expect(notificationDiv).toHaveClass("rounded-full");
	});

	it("applies correct class names for square shape", () => {
		render(<Notification {...defaultProps} shape={Shape.SQUARE} />);
		const notificationDiv = screen.getByTestId("notification");
		expect(notificationDiv).toHaveClass("rounded-none");
	});
});
