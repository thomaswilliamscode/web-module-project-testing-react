// 👇 YOUR WORK STARTS ON LINE 28
import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Episode from "../Episode"

// ❗ EXAMPLE EPISODE TEST OBJECT ❗
const exampleEpisodeData = {
  airdate: "2016-07-15",
  airstamp: "2016-07-15T12:00:00+00:00",
  airtime: "",
  id: 553946,
  image: "https://static.tvmaze.com/uploads/images/medium_landscape/342/855786.jpg",
  name: "Chapter One: The Vanishing of Will Byers",
  number: 1,
  rating: { average: 8.2 },
  runtime: 49,
  season: 1,
  summary: "A young boy mysteriously disappears, and his panicked mother \
demands that the police find him. Meanwhile, the boy's friends conduct \
their own search, and meet a mysterious girl in the forest.",
  type: "regular",
  url: "https://www.tvmaze.com/episodes/553946/stranger-things-1x01-chapter-one-the-vanishing-of-will-byers",
}

describe('Episode component', () => {
  test("renders without error", () => {
    // 👉 TASK: render the component passing episode data
    render(<Episode episode={exampleEpisodeData} />);

    // 👉 TASK: print the simulated DOM using screen.debug
    screen.debug()

  })
  test("renders texts and alt texts correctly", () => {
		// 👉 TASK: render the component passing episode data and getting the rerender utility
		const { rerender } = render(<Episode episode={exampleEpisodeData} />);

		// 👉 TASK: check that the summary renders to the DOM
		const episodeInfo = screen.getByTestId('summary');
		expect(episodeInfo).toBeInTheDocument();

		// 👉 TASK: check that the alt text "episode image" is present
		const altText = screen.getByAltText('episode image');
		expect(altText).toBeInTheDocument();

		// 👉 TASK: rerender the component passing episode data lacking an image
		let mockData = {
			...exampleEpisodeData,
			image: '',
		};

		rerender(<Episode episode={mockData} />);

		// ❗ Study the Episode component to understand what happens in this case

		// 👉 TASK: check that the default image appears in the DOM
		// ❗ Use querySelector to select the image by its src attribute
		const img = screen.getByRole('img');
		expect(img).toBeInTheDocument();

		// 👉 TASK: check that the "generic episode image" alt text is present
		expect(img.alt).toBe('generic episode image');

		// 👉 TASK: rerender the component passing an undefined episode
    rerender(<Episode episode={undefined} />);
		// ❗ Study the Episode component to understand what happens in this case

		// 👉 TASK: check that the "Loading episode..." text is present
    const undefinedText = screen.getByText('Loading episode...');
    expect(undefinedText).toBeInTheDocument()
	})
})
