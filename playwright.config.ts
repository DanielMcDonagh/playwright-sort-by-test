import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({

  timeout: 120000, // Set a global timeout of 120 seconds for each test
  
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: true, // Run tests in headless mode
    viewport: {width: 1920, height: 1080}, // Set the viewport size for tests
    baseURL: process.env.BASE_URL || 'https://highlifeshop.com', // Base URL to use in actions like `await page.goto('/')`.
    screenshot: 'on', // Take a screenshot on every test
    video: 'on', // Record video only on test failure
    trace: 'on', // Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer
  },

  testDir: 'tests',
  retries: 1, // Retry on CI only once if a test fails. Set to 0 to disable retries.
  reporter: [
    ['list'], // Use the list reporter to output test results in the console. See https://playwright.dev/docs/test-reporters#list-reporter
    ['html'], // Use HTML reporter to generate a report of the test results. See https://playwright.dev/docs/test-reporters#html-reporter
  ],

  fullyParallel: true, // Run tests in parallel across all projects. Set to false to run tests sequentially.

  // Configure projects for major browsers
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
