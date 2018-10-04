# Use node v8.12.0

FROM node:8.12.0

# Copy source code
COPY . /conference-API

# Change working directory
WORKDIR /conference-API

# Install dependencies
RUN npm install

# Expose API port to the outside
EXPOSE 8080

# Launch application
CMD ["npm","run", "start"]