# QAExperiential
# README #

# QAExperiential APP Tests
This project contains automated tests for QA Experiential test assessment using [Cypress](https://www.cypress.io/).

### Prerequisites

Before running the tests, ensure that you have the following software installed:

- Node.js
- Cypress

### Getting Started

1. Clone the repository:

   ```
   git clone <repository_url>
   ```

2. Install the dependencies:

   ```
   cd <project_directory> 
   Make sure Node.js is installed
   npm init -y
   npm install --save-dev cypress
   npx cypress open
   ```

3. Running the Tests:

   To run the tests, use the following command:

   ```
   npm test
   ```

   The tests will execute and display the test results in the command line.

## Project Structure

The project follows the following structure:

```
├── cypress
│   ├── e2e
│   |    ├── AgeDaysCalculator.cy.js
├── .gitignore
├── cypress.config.js
├── package-lock.json
└── package.json
```

- `cypress/e2e`: Contains the test scripts organized by test suites.
- `.gitignore`: Specifies intentionally untracked files to be ignored by Git.
- `cypress.config.js`: Cypress configuration file.
- `yarn.lock` and `package.json`: Dependencies and scripts.

Happy testing!
