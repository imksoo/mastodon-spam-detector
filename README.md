# Mastodon Spam Detector

This program monitors the public timeline of a Mastodon instance in real-time using the Mastodon API. It checks new posts against a set of predefined spam signatures, reports any detected spam to the instance administrators, and automatically suspends accounts associated with spam posts.

## Features

- Real-time monitoring of Mastodon's public timeline.
- Spam detection based on customizable signature files.
- Automatic reporting of detected spam posts to administrators, with the option to automatically suspend spam accounts.
- Interactive feedback with system bell and emojis for detected spam.
- Immediate start-up confirmation with a console log message.

## Requirements

- Node.js
- Access to a Mastodon instance's API.
- An access token with permission to read the public timeline, report statuses, and suspend accounts.

## Setup

### Install Dependencies

Ensure Node.js is installed. Run the following command in the project directory to install dependencies:

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the project root with:

```env
BASE_URL=https://your.mastodon.instance
ACCESS_TOKEN=your_access_token
```

Replace the placeholders with your Mastodon instance's base URL and a valid access token.

### Define Spam Signatures

Place spam detection signature files in the `signatures` directory. Each should export a default function to check posts and return `{ isSpam: boolean; reason?: string; }`.

Example (`signatures/example.js`):

```typescript
export default function (status) {
  const isSpam = /* spam detection logic */;
  return { isSpam, reason: isSpam ? "Reason for spam detection" : undefined };
}
```

## Running the Program

Run the spam detector with:

```bash
npx ts-node index.ts
```

The program will monitor the public timeline for new posts and apply spam signatures.

## Reporting Spam

Detected spam results in automatic reporting to administrators and account suspension. Uses the Mastodon API's reporting endpoint.
