<h1 align="center">hc-skelly</h1>
Skeleton application for interating with the Home Connect API. Lets you control your Home Connect compatible oven through a web browser.

<h3 align="center">
  <a href="https://nostalgic-snyder-5dbfc3.netlify.app/">Visit the live app</a> |
  <a href="https://developer.home-connect.com/">Home Connect API documentation</a>
</h3>

## Prerequisites

To be able to fully use the app, the following will be required:

- Have a Home Connect account with a Home Connect compatible oven connected
- Have or create an account on the
  [Home Connect Developer Program](https://developer.home-connect.com/)
- Once you have an account, create your application
  [here](https://developer.home-connect.com/applications)
- Make sure to define your Home Connect user in application settings
- If running hc-skelly locally, set the Redirect URI in the application settings
  to:

```
http://localhost:3000/authorize
```

Otherwise if intending to use the Netlify deployment use:

```
https://nostalgic-snyder-5dbfc3.netlify.app/authorize
```

- Once you run hc-skelly you can use the Client ID and Client Secret of your
  application to authorize with Home Connect API

## Setup

Run the following commands to setup your environment:

```
git clone https://github.com/nirzohu/hc-skelly.git
cd hc-skelly
npm install
```

## Running the app

To get the app up and running, run:

```shell
npm start
```

This should start up your browser. If you're familiar, this is a standard
[react-scripts](https://create-react-app.dev/) application.

You can also open
[the deployment of the app on Netlify](https://nostalgic-snyder-5dbfc3.netlify.app/).
