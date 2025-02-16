# WebdriverIO Tests

## Setup
1. Install dependencies:
   npm install

## Running tests
2. Run tests:
    # API
    Run API Tests Only: 
        npm run test:api

    # Chrome
    Run UI Tests in Headless Mode (Chrome):
        npm run test:ui:headless
    Run UI Tests in Headed Mode (Chrome):
        npm run test:ui  
        
    # Firefox
    Run UI Tests in Headless Mode (Firefox):
        npm run test:ui:headless:firefox
    Run UI Tests in Headed Mode (Firefox):
        npm run test:ui:firefox 
        
    # API + UI
    Run Both API and UI Tests in Headless Mode:
        npm run test  
    Run Both API and UI Tests in Headed Mode:
        npm run test:headed                 