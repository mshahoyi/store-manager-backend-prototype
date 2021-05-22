FROM node:alpine

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package*.json ./

COPY src src
COPY tsconfig.json ./
COPY @types ./@types
COPY prisma ./prisma

RUN npm ci

RUN mkdir -p public/uploads

RUN npm run build


ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S myuser -u 1001

USER myuser

EXPOSE 3000

CMD ["npm", "start"]