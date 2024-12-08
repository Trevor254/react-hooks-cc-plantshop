import React from 'react';
import { render, act } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

describe('1st Deliverable', () => {
  test('displays all plants on startup', async () => {
    await act(async () => {
      global.setFetchResponse(global.basePlants);
    });

    const { findAllByTestId } = render(<App />);
    const plantItems = await findAllByTestId('plant-item');
    expect(plantItems).toHaveLength(global.basePlants.length);

    const plantNames = plantItems.map((item) => item.querySelector('h4').textContent);
    const basePlantNames = global.basePlants.map((plant) => plant.name);
    expect(plantNames).toEqual(basePlantNames);

    const plantImages = plantItems.map((item) => item.querySelector('img').src.split('/').pop());
    const basePlantImages = global.basePlants.map((plant) => plant.image.split('/').pop());
    expect(plantImages).toEqual(basePlantImages);

    const plantPrices = plantItems.map((item) => item.querySelector('p').textContent);
    const basePlantPrices = global.basePlants.map(
      (plant) => `Price: $${parseFloat(plant.price).toFixed(2)}`
    );
    expect(plantPrices).toEqual(basePlantPrices);
  });

  test("plants aren't hardcoded", async () => {
    await act(async () => {
      global.setFetchResponse(global.alternatePlants);
    });

    const { findAllByTestId } = render(<App />);
    const plantItems = await findAllByTestId('plant-item');
    expect(plantItems).toHaveLength(global.alternatePlants.length);

    const plantNames = plantItems.map((item) => item.querySelector('h4').textContent);
    const basePlantNames = global.alternatePlants.map((plant) => plant.name);
    expect(plantNames).toEqual(basePlantNames);

    const plantImages = plantItems.map((item) => item.querySelector('img').src.split('/').pop());
    const basePlantImages = global.alternatePlants.map((plant) => plant.image.split('/').pop());
    expect(plantImages).toEqual(basePlantImages);

    const plantPrices = plantItems.map((item) => item.querySelector('p').textContent);
    const basePlantPrices = global.alternatePlants.map(
      (plant) => `Price: $${parseFloat(plant.price).toFixed(2)}`
    );
    expect(plantPrices).toEqual(basePlantPrices);
  });
});