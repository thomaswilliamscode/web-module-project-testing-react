// 👇 YOUR WORK STARTS ON LINE 19
import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import server from '../../../backend/mock-server'
import App from '../App'

describe('Stranger Things App', () => {
  let user
  afterEach(() => { server.resetHandlers() })
  beforeAll(() => { server.listen() })
  afterAll(() => { server.close() })
  beforeEach(() => {
    render(<App />)
    user = userEvent.setup()
  })
  test('App mounts without crashing', () => {
    // 👉 TASK: print the simulated DOM using screen.debug
    screen.debug()
  })
  test('App renders the correct texts', async () => {
		// 👉 TASK: click on the button that displays "Press to Get Show Data"
		const button = screen.getByRole('button');
		fireEvent.click(button);

		// 👉 TASK: create a waitFor and await for the following to be true:
		await waitFor(async () => {
			//    - The text "Press to Get Show Data" is no longer in the DOM
			const text1 = screen.queryByText('Press to Get Show Data');

			//    - The text "Stranger Things" exists in the DOM
			const text2 = screen.queryByText('Stranger Things');

			//    - The text "A love letter to the '80s classics that captivated a generation" exists in the DOM
			const text3 = screen.queryByText(
				"A love letter to the '80s classics that captivated a generation",
				{ exact: false }
			);

			//    - The text "Select A Season" exists in the DOM
			const text4 = screen.queryByText('Select A Season');

			// ❗ You will need { exact: false } to select the longer text

			expect(text1).toBeNull();
			expect(text2).not.toBeNull();
			expect(text3).not.toBeNull();
			expect(text4).not.toBeNull();
		});

		// 👉 TASK: select Season 2 from the dropdown
		// ❗ Don't forget user actions need the await keyword
		// ❗ Use the selectOptions user action
		// ❗ Grab the select element using querySelector

		const dropdown = document.querySelector('#seasons');
		await user.selectOptions(dropdown, '1');

		expect(dropdown.value).toBe('1');

		// 👉 TASK: create the following assertions:
		//    - The text "Season 2, Episode 1" exists in the DOM
		const text1 = screen.queryByText('Season 2, Episode 1');

		//    - The text "Chapter One: MADMAX" exists in the DOM
    const text2 = screen.queryByText('Chapter One: MADMAX');

		//    - The text "One year after the events with the Upside Down and the Demogorgon" exists in the DOM
    const text3 = screen.queryByText(
			'One year after the events with the Upside Down and the Demogorgon', {exact:false}
		);

    expect(text1).not.toBeNull()
    expect(text2).not.toBeNull();
    expect(text3).not.toBeNull();

		// ❗ You will need { exact: false } to select the longer text
	})
})
