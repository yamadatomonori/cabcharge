# cabcharge

## Build

### Backend
```
npm install
```

### Frontend
```
cd my-app
npm install
npm run build
```

## Start server
```
export API_KEY_SENDGRID={Your API key of Sendgrid}
export API_KEY_MAILGUN={Your API key of Mailgun}
export DOMAIN_MAILGUN={Your Domain of Mailgun}

npm start
```

## Test
## Frontend unit test
```
cd my-app
npm test
```

# To do
- Replace client libralies of Sendgrid and Mailgun with curl
- Write unit tests
- Client side validation
