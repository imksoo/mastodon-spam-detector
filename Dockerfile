FROM node:20

WORKDIR /app
COPY . /app/

RUN npm install --omit=dev

CMD ["npx", "ts-node", "index.ts"]
