import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import App from '../../components/App';
import '@testing-library/jest-dom';

describe('2nd Deliverable', () => {
    test('adds a new plant when the form is submitted', async () => {
        global.setFetchResponse(global.basePlants);
        const { getByPlaceholderText, findByText, getByText } = render(<App />);

        const firstPlant = { name: 'foo', image: 'foo_plant_image_url', price: '10' };

        global.setFetchResponse(firstPlant);

        // Wrap each fireEvent in act
        await act(async () => {
            fireEvent.change(getByPlaceholderText('Plant name'), { target: { value: firstPlant.name } });
        });
        await act(async () => {
            fireEvent.change(getByPlaceholderText('Image URL'), { target: { value: firstPlant.image } });
        });
        await act(async () => {
            fireEvent.change(getByPlaceholderText('Price'), { target: { value: firstPlant.price } });
        });
        await act(async () => {
            fireEvent.click(getByText('Add Plant'));
        });

        expect(fetch).toHaveBeenCalledWith("http://localhost:6001/plants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(firstPlant),
        });

        const newPlant = await findByText('foo');
        expect(newPlant).toBeInTheDocument();

        const secondPlant = { name: 'bar', image: 'bar_plant_image_url', price: '5' };

        global.setFetchResponse(secondPlant);

        // Repeat wrapping for the second plant
        await act(async () => {
            fireEvent.change(getByPlaceholderText('Plant name'), { target: { value: secondPlant.name } });
        });
        await act(async () => {
            fireEvent.change(getByPlaceholderText('Image URL'), { target: { value: secondPlant.image } });
        });
        await act(async () => {
            fireEvent.change(getByPlaceholderText('Price'), { target: { value: secondPlant.price } });
        });
        await act(async () => {
            fireEvent.click(getByText('Add Plant'));
        });

        expect(fetch).toHaveBeenCalledWith("http://localhost:6001/plants", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(secondPlant),
        });

        const nextPlant = await findByText('bar');
        expect(nextPlant).toBeInTheDocument();
    });
});