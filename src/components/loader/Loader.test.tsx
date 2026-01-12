import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Loader } from "./Loader";

describe("Loader component", () => {
	it("renders Loader component with default props", () => {
		render(<Loader dataAttributes={{ "data-testid": "loader" }} />);
		const loader = screen.getByTestId("loader");
		expect(loader).toBeInTheDocument();
		expect(loader).toHaveClass("loader");
		// Default size is MEDIUM
		expect(loader).toHaveClass("w-[98px]");
		expect(loader).toHaveClass("h-[98px]");
		expect(loader).toHaveClass("border-16");
		// Default color is PRIMARY
		expect(loader).toHaveClass("border-primary-500");
	});

	it("renders Loader component with size xs", () => {
		render(<Loader size="xs" dataAttributes={{ "data-testid": "loader" }} />);
		const loader = screen.getByTestId("loader");
		expect(loader).toHaveClass("w-[22px]");
		expect(loader).toHaveClass("h-[22px]");
		expect(loader).toHaveClass("border-4");
	});

	it("renders Loader component with size sm", () => {
		render(<Loader size="sm" dataAttributes={{ "data-testid": "loader" }} />);
		const loader = screen.getByTestId("loader");
		expect(loader).toHaveClass("w-[42px]");
		expect(loader).toHaveClass("h-[42px]");
		expect(loader).toHaveClass("border-8");
	});

	it("renders Loader component with size lg", () => {
		render(<Loader size="lg" dataAttributes={{ "data-testid": "loader" }} />);
		const loader = screen.getByTestId("loader");
		expect(loader).toHaveClass("w-[140px]");
		expect(loader).toHaveClass("h-[140px]");
		expect(loader).toHaveClass("border-22");
	});

	it("renders Loader component with color success", () => {
		render(
			<Loader color="success" dataAttributes={{ "data-testid": "loader" }} />
		);
		const loader = screen.getByTestId("loader");
		expect(loader).toHaveClass("border-success-500");
	});

	it("renders Loader component with color danger", () => {
		render(
			<Loader color="danger" dataAttributes={{ "data-testid": "loader" }} />
		);
		const loader = screen.getByTestId("loader");
		expect(loader).toHaveClass("border-danger-500");
	});

	it("applies custom data attributes correctly", () => {
		render(<Loader dataAttributes={{ "data-testid": "loader" }} />);
		const loader = screen.getByTestId("loader");
		expect(loader).toHaveAttribute("data-testid", "loader");
	});
});
