# Semester Project 2. OnlyPineapples, an auction house place

[![Netlify Status](https://api.netlify.com/api/v1/badges/99c42bd6-3b56-4835-a6dd-4e16ad474fda/deploy-status)](https://app.netlify.com/sites/statuesque-swan-d1d5d8/deploys)
[![Automated E2E Testing](https://github.com/Spookyrumble/Auction/actions/workflows/e2e.yml/badge.svg)](https://github.com/Spookyrumble/Auction/actions/workflows/e2e.yml)

## Description

This project is a front-end development semester project created for my school. It is an auction house application that leverages the Noroff API to manage profiles, listings, credits, and bidding functionalities. This application showcases my skills in design, functionality, and API integration.

Key features of the project include:

- Integration with the Noroff API for handling user profiles, auction listings, and the bidding process.
- Implementation of modern front-end technologies including Vite, HTML, Bootstrap, Sass/SCSS, and JavaScript.
- Adoption of code quality tools such as ESLint, lint-staged, Prettier, Husky, and pre-commit rules to ensure maintainable and high-quality code.

This project demonstrates my ability to create a functional, well-designed web application with a focus on user experience and interaction with external APIs.

For detailed information about the objectives, requirements, and constraints of this project, please refer to the [Project Brief](https://content.noroff.dev/semester-project-2/brief.html). The brief provides context and insight into the development process and goals of this project.

## Usage

The auction house application is designed for ease of use with the following functionalities:

1. **Account Creation**: Users can sign up using their `noroff.no` or `stud.noroff.no` email addresses. Upon successful registration, users are credited with 1,000 credits to start bidding.

2. **Viewing Listings**: All auction listings are viewable by anyone, regardless of whether they are logged in. This allows visitors to browse through the available auctions without needing an account.

3. **Creating Listings**: Registered users can create their auction listings. This feature enables users to add items to the auction pool, enhancing the marketplace's variety.

4. \*\*Deleting Listings: Users can delete their listings, providing control and flexibility over their auction items.

5. **Bidding on Auctions**: Registered users can use their credits to bid on listed auctions. Bidding is a straightforward process, and users can participate in any open auction.

6. **API Limitations**: To maintain relevance and quality, the API fetch has been limited to 500 posts. This ensures that the listings primarily showcase auctions from our class and related items.

7. **Content Filters**: Measures have been put in place to filter out spam posts with generic titles like "test", "example", or "hei", ensuring a more meaningful browsing experience.

Enjoy participating in the auction house, whether you're browsing, bidding, creating, or managing listings!

## Installation

To set up this project locally, follow the steps outlined below:

1. **Prerequisites**:
   Ensure you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from the [Node.js website](https://nodejs.org/).

2. **Clone the Repository**:
   To clone the project repository, run the following command in your terminal:

`git clone https://github.com/Spookyrumble/Auction`

3. **Install Dependencies**:
   After cloning the repository, navigate to the project directory and run `npm i` to install all the necessary dependencies.

4. **Running the Application**:
   Once the dependencies are installed, you can start the application by running: `npm run dev`
   The application will then be accessible at `http://localhost:3000` or the port specified in your project settings.

Follow these instructions to get the project up and running in your local environment.

## Contributing

While this project is primarily a personal, school-based project, you are welcome to explore and play around with it. If you find it interesting or useful for your learning, feel free to fork the repository and experiment with your ideas.

As this is a part of my academic coursework, I am not seeking contributions. However, any insights, suggestions, or feedback are always appreciated. If you have any, please feel free to reach out or open an issue in the repository for discussion.

Thank you for your interest and understanding!

## Credits and Acknowledgements

I would like to extend my gratitude and acknowledge the following resources and support that have been instrumental in the development of this project:

- **Bootstrap Icons**: The icons used in this project are sourced from [Bootstrap Icons](https://icons.getbootstrap.com/), which provided an excellent set of visuals to enhance the user interface.

- **Unsplash Images**: Many thanks to [Unsplash.com](https://unsplash.com/) for providing high-quality, royalty-free images that have been used throughout this project. The placeholder images and background visuals are particularly sourced from here.

- **Self-Created Placeholder**: The placeholder image used is a creation of my own, based on the background image obtained from Unsplash.

- **Noroff Course Content**: Immense gratitude to the Noroff course content for providing the foundational knowledge and guidance throughout this project.

- **Classmates and Discord Server**: A special thanks to my classmates and the members of our Discord server for their continuous support, insights, and valuable discussions.

- **ChatGPT-4**: Appreciation for ChatGPT-4 by OpenAI, which has been a great resource for generating text content and assisting with debugging issues.

This project is not just a reflection of my work but also the collective wisdom and resources provided by these incredible sources. Thank you all!
