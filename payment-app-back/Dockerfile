FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./

RUN npm install

COPY . .

RUN npx prisma generate

# RUN npm run build

# FROM node:18-alpine

# WORKDIR /app

# COPY --from=build /app/dist ./dist
# COPY --from=build /app/node_modules ./node_modules
# COPY --from=build /app/package*.json ./
 
EXPOSE 3000

CMD ["npm", "run", "start"]
