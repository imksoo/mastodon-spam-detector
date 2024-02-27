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

### Directly with Node.js

To start the spam detector, run:

```bash
npx ts-node index.ts
```

The program will continuously monitor the public timeline for new posts and check each post against the defined spam signatures.

### Using Docker Compose

To run the Mastodon Spam Detector using Docker Compose, ensure Docker and Docker Compose are installed on your system. Then follow these steps:

1. Build the Docker image:

```bash
docker-compose build
```

This command builds a Docker image for the spam detector based on the specifications in the provided `Dockerfile`.

2. Start the detector service:

```bash
docker-compose up -d
```

This command starts the spam detector service in detached mode, allowing it to run in the background. The service will automatically restart if it crashes or if the server is rebooted.

Logs can be viewed with:

```bash
docker-compose logs -f detector
```

This setup uses the `.env` file for environment variables as specified in the `compose.yml`, so ensure your `.env` file is correctly configured before starting the service.

## Reporting Spam

Detected spam results in automatic reporting to administrators and account suspension. Uses the Mastodon API's reporting endpoint.
