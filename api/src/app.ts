import express from 'express';

const app = express();

const port = 3000;

app.get('/', (req, res) => {
  res.send('hi');
});

app.listen(port, () => {
  console.log(`Server is operational on port ${port}`);
});

/*

{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@apollo/client": "^3.5.10",
    "@fortawesome/react-fontawesome": "^0.1.18",
    "@reduxjs/toolkit": "^1.8.1",
    "@stripe/react-stripe-js": "^1.7.0",
    "@stripe/stripe-js": "^1.26.0",
    "animejs": "^3.2.1",
    "graphql": "^16.3.0",
    "next": "12.1.4",
    "plyr": "^3.6.12",
    "react": "18.0.0",
    "react-dom": "18.0.0",
    "react-ga": "^3.3.0",
    "react-icons": "^4.3.1",
    "react-redux": "^7.2.8",
    "sass": "^1.49.11",
    "styled-components": "^5.3.5",
    "subscriptions-transport-ws": "^0.9.18",
    "typescript": "^4.6.3"
  },
  "devDependencies": {
    "@types/animejs": "^3.1.4",
    "@types/jest": "^27.4.1",
    "@types/node": "^17.0.23",
    "@types/react": "^17.0.43",
    "@types/react-dom": "^17.0.14",
    "@types/react-redux": "^7.1.23",
    "@types/react-test-renderer": "^17.0.1",
    "@types/styled-components": "^5.1.24",
    "@typescript-eslint/eslint-plugin": "^5.17.0",
    "@typescript-eslint/parser": "^5.17.0",
    "babel-plugin-graphql-tag": "^3.3.0",
    "babel-plugin-styled-components": "^2.0.6",
    "eslint": "8.12.0",
    "eslint-config-prettier": "^8.5.0",
    "eslint-plugin-react": "^7.29.4",
    "eslint-plugin-react-hooks": "^4.4.0",
    "jest": "^27.5.1",
    "jest-styled-components": "^7.0.8",
    "prettier": "2.6.2",
    "react-test-renderer": "^18.0.0",
    "ts-jest": "^27.1.4",
    "ts-node": "^10.7.0",
    "webpack": "^5.71.0"
  }
}


*/
