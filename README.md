# Force.com Canvas NodeJS Base
===========

## Installation info

### Create you own app on a Force.con Developer Edition org

- Setup -> Create -> Apps -> (Connected Apps) New
- Fill **Conntected App Name**, **API Name** and **Contact Email**
- Check the **Enable OAuth Settings** in the *API (Enable OAuth Settings)* section
 - **Callback URL**: put a valid URL (you don't need it for the scope of this example)
 - **Selected OAuth Scopes**: select the scopes you want for the NodeJS app acess token to grant
- In the section *Canvas App Settings* type:
 - **Canvas App URL**: the url of the POST action to be called by Salesforce when injecting the session data (e.g. https://nodejs-canvas-test.herokuapp.com/canvas/callback)
 - **Access Method**: use *Signed Request (POST)*
 - **Locations**: choose *Chatter Tab* (the app will be shown in the Chatter page)

Than you need to enable this app

- Setup -> Manage Apps -> Connected Apps -> *Your App Name*
- In the *OAuth policies* select *Admin approved users are pre-authorized* for the **Permitted Users** field
- In the *Profiles* related list select your profile (all user of that profile are automatically allowed to consume this app)

There are more ways to configure the Canvas App usage, this is the quicker.


### Set the App Secret in the NodeJS environment:
	$ heroku config:set SF_CANVASAPP_CLIENT_SECRET=XXXXXXXXX
	Adding config vars and restarting myapp... done, v12
	SF_CANVASAPP_CLIENT_SECRET: XXXXXXXXX

Go to http://enreeco.blogspot.it/2013/11/salesforce-canvas-nodejs-set-up-minimum.html for a complete description.

# Fineway Setup

To do a first simple test, it is best to start the application on your local machine and use *ngrok* to expose the local applicaton on the internet and configure it in the Salesforce Sandbox environment.

### How to install ngrok


```
# install Homebrew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

# install ngrok
brew cask install ngrok
```

### How to start and expose the Canvas App 

First, start the app and expose it on the internet.

```
# start node app
SF_CANVASAPP_CLIENT_SECRET="XXX-XXX" node app.js
# expose 
ngrok http 5000
```

Second, configure the new domain in Salesforce.