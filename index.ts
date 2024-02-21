import { createStreamingAPIClient, createRestAPIClient } from "masto";
import * as fs from 'fs';
import * as path from 'path';
import { config } from 'dotenv';

config();

const BaseUrl = process.env.BASE_URL;
const streamingApiUrl = BaseUrl + '/api/v1/streaming';
const accessToken = process.env.ACCESS_TOKEN;

interface SpamSignature {
  check: (status: any) => { isSpam: boolean; reason?: string; };
  signatureName: string;
}

async function loadSignatureFiles(): Promise<SpamSignature[]> {
  const signaturesDir = path.join(__dirname, 'signatures');
  const files = await fs.promises.readdir(signaturesDir);
  return files.map(file => {
    const moduleName = file.split('.').slice(0, -1).join('.');
    const signatureModule = require(path.join(signaturesDir, file));
    return {
      check: signatureModule.default,
      signatureName: moduleName
    };
  });
}

async function main() {
  if (!BaseUrl || !accessToken || !streamingApiUrl) {
    console.error('API URL and Access Token are required.');
    return;
  }

  console.log('Mastodon spam detecter started.');

  const masto = createStreamingAPIClient({
    streamingApiUrl: streamingApiUrl,
    accessToken: accessToken,
  });

  const rest = createRestAPIClient({
    url: BaseUrl,
    accessToken: accessToken,
  });

  const signatures = await loadSignatureFiles();

  for await (const event of masto.public.subscribe()) {
    switch (event.event) {
      case "update": {
        console.log("New post: ", event.payload.content);

        for (const { check, signatureName } of signatures) {
          const { isSpam, reason } = check(event.payload);
          if (isSpam) {
            console.log(`Spam detected🚨: ${signatureName} ${reason} ${event.payload}`);

            rest.v1.reports.create({
              accountId: event.payload.account.id,
              statusIds: [event.payload.id],
              comment: `spam detected by sig-${signatureName} ${reason}`,
              forward: true,
            });

            rest.v1.admin.accounts.$select(event.payload.account.id).action.create(
              { type: 'suspend' }
            );

            break;
          }
        }
      }
      default: {
        break;
      }
    }
  }
}

main();
