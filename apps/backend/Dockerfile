FROM node:22-alpine

WORKDIR /app

RUN npm install -g pnpm@10.13.1

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpm build

EXPOSE 3000

CMD ["sh", "-c", "pnpm db:migrate && node dist/main"]
