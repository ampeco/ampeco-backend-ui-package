import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Tabs, Tab } from "./Tabs";
import "@testing-library/jest-dom";

describe("Tabs", () => {
	it("renders the tab list", () => {
		render(
			<Tabs defaultSelected="tab1">
				<Tab id="tab1" title="Tab 1" />
				<Tab id="tab2" title="Tab 2" />
			</Tabs>
		);

		const tabs = screen.getAllByRole("listitem");
		expect(tabs).toHaveLength(2);
		expect(tabs[0]).toHaveTextContent("Tab 1");
		expect(tabs[1]).toHaveTextContent("Tab 2");
	});

	it("assigns active class to the selected tab", () => {
		render(
			<Tabs defaultSelected="tab1">
				<Tab id="tab1" title="Tab 1" />
				<Tab id="tab2" title="Tab 2" />
			</Tabs>
		);

		const selectedTab = screen.getByText("Tab 1").closest("li");
		expect(selectedTab).toHaveClass("text-primary-600", "border-b-primary-600");
	});

	it("changes selected tab on click", () => {
		render(
			<Tabs defaultSelected="tab1">
				<Tab id="tab1" title="Tab 1" />
				<Tab id="tab2" title="Tab 2" />
			</Tabs>
		);

		const tab2 = screen.getByText("Tab 2").closest("li") as any;
		fireEvent.click(tab2);

		expect(tab2).toHaveClass("text-primary-600", "border-b-primary-600");
	});

	it("uses the shouldChange prop to control tab change", () => {
		const shouldChange = vi.fn(() => false);
		render(
			<Tabs defaultSelected="tab1" shouldChange={shouldChange}>
				<Tab id="tab1" title="Tab 1" />
				<Tab id="tab2" title="Tab 2" />
			</Tabs>
		);

		const tab1 = screen.getByText("Tab 1").closest("li") as any;
		const tab2 = screen.getByText("Tab 2").closest("li") as any;
		fireEvent.click(tab2);

		expect(shouldChange).toHaveBeenCalledWith("tab2", "tab1");
		expect(tab1).toHaveClass("text-primary-600", "border-b-primary-600");
		expect(tab2).not.toHaveClass("text-primary-600");
	});

	it("renders data attributes passed to the component", () => {
		const dataTestAttributes = { "data-test-attr": "test" };
		render(
			<Tabs defaultSelected="tab1" dataAttributes={dataTestAttributes}>
				<Tab id="tab1" title="Tab 1" />
				<Tab id="tab2" title="Tab 2" />
			</Tabs>
		);

		const tabComponent = screen.getByRole("list");
		expect(tabComponent).toHaveAttribute("data-test-attr", "test");
	});
});

describe("Tab", () => {
	it("renders the tab content when selected", () => {
		render(
			<Tabs defaultSelected="tab1">
				<Tab id="tab1" dataTestId="tab1-content">
					Tab Content 1
				</Tab>
				<Tab id="tab2" dataTestId="tab2-content">
					Tab Content 2
				</Tab>
			</Tabs>
		);

		expect(screen.getByTestId("tab1-content")).toBeVisible();
		expect(screen.queryByTestId("tab2-content")).not.toBeInTheDocument();
	});

	it("does not render the tab content when not selected", () => {
		render(
			<Tabs defaultSelected="tab2">
				<Tab id="tab1" dataTestId="tab1-content">
					Tab Content 1
				</Tab>
				<Tab id="tab2" dataTestId="tab2-content">
					Tab Content 2
				</Tab>
			</Tabs>
		);

		expect(screen.getByTestId("tab2-content")).toBeVisible();
		expect(screen.queryByTestId("tab1-content")).not.toBeInTheDocument();
	});

	it("renders data attributes passed to the component", () => {
		const dataTestAttributes = { "data-test-attr": "test" };
		render(
			<Tabs defaultSelected="tab1">
				<Tab
					id="tab1"
					dataAttributes={dataTestAttributes}
					dataTestId="tab1-content"
				>
					Tab Content 1
				</Tab>
				<Tab id="tab2">Tab Content 2</Tab>
			</Tabs>
		);

		const tabContent = screen.getByTestId("tab1-content");
		expect(tabContent).toHaveAttribute("data-test-attr", "test");
	});
});
