# My Playwright Training

My personal project for learning and practicing test automation with [Playwright](https://playwright.dev).

## Setup

Install dependencies:

```bash
npm install
npx playwright install
```

## Run tests

```bash
npm test            # run all tests (headless)
npm run test:headed # run tests in a visible browser
npm run test:ui     # open the interactive UI mode
npm run report      # open the last HTML report
```

## Project structure

```
my-playwright-training/
├── tests/
│   └── example.spec.ts   # sample tests
├── playwright.config.ts  # Playwright configuration
├── package.json
└── README.md
```

## Notes

This is my personal learning repo. 🎓
