FROM node:slim

RUN npm install whatsapp-web.js

# Copy the rest of your application code
COPY . .

EXPOSE 1234

# Start your application
CMD ["node", "selina.js"]
