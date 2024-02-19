# Mastodon Spam Detector

This program monitors the public timeline of a Mastodon instance in real-time using the Mastodon API. It checks new posts against a set of predefined spam signatures and reports any detected spam to the instance administrators.

## Features

- Real-time monitoring of Mastodon's public timeline.
- Spam detection based on customizable signature files.
- Automatic reporting of detected spam posts to administrators.

## Requirements

- Node.js
- Access to a Mastodon instance's API.
- An access token with permission to read the public timeline and report statuses.

## Setup

### Install Dependencies

First, make sure you have Node.js installed. Then run the following command in the project directory to install the required dependencies:

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root of the project directory with the following content:

```env
BASE_URL=https://your.mastodon.instance
ACCESS_TOKEN=your_access_token
```

Replace `https://your.mastodon.instance` with the base URL of your Mastodon instance and `your_access_token` with a valid access token.

### Define Spam Signatures

Place your spam detection signature files in the `signatures` directory. Each file should export a default function that checks a post and returns an object with `isSpam` (boolean) and `reason` (string, optional) properties.

Example signature file (`signatures/example.js`):

```typescript
export default function (status) {
  const isSpam = /* your spam detection logic */;
  return {
    isSpam,
    reason: isSpam ? "Reason for spam detection" : undefined,
  };
}
```

## Running the Program

To start the spam detector, run:

```bash
npx ts-node index.ts
```

The program will continuously monitor the public timeline for new posts and check each post against the defined spam signatures.

## Reporting Spam

When spam is detected, the program automatically reports the post to the Mastodon instance's administrators with an optional comment. The reporting mechanism uses the Mastodon API's report creation endpoint.
