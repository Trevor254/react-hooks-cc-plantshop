import React from "react";
import { render, fireEvent, within } from "@testing-library/react";
import App from "../../components/App";
import "@testing-library/jest-dom";

describe("3rd Deliverable", () => {
  test("marks a plant as sold out", async () => {
    global.setFetchResponse(global.basePlants);

    const { findAllByTestId, findByText } = render(<App />);

    // Get all plant items
    const plantItems = await findAllByTestId("plant-item");
    expect(plantItems).toHaveLength(global.basePlants.length); // Use `global.basePlants`

    // Select the first plant item
    const firstPlantItem = plantItems[0];

    // Find and click the "Sold Out" button within the first plant item
    const inStockButton = within(firstPlantItem).getByText("Sold Out"); // Correct case
    fireEvent.click(inStockButton);

    // Wait for the "In Stock" button to appear and verify its presence
    const outOfStockButton = await findByText("In Stock");
    expect(outOfStockButton).toBeInTheDocument();
  });
});