// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAky_B0vhIrEzDkGBDosWO5evVB_-HHNII",
    authDomain: "devfinder-chat.firebaseapp.com",
    databaseURL: "https://devfinder-chat.firebaseio.com",
    projectId: "devfinder-chat",
    storageBucket: "devfinder-chat.appspot.com",
    messagingSenderId: "1043034343322"
  },
  parseServer: {
    databaseURI: 'mongodb://<dbuser>:<dbpassword>@ds251002.mlab.com:51002/heroku_bpbtr5cw',
    appId: 'angular-parse-chat',
    masterKey: 'AmritSinghOfficialFullStackdeveloper987', //Add your master key here. Keep it secret!
    serverURL:'https://angular-parse-chat.herokuapp.com/parse',  // Don't forget to change to https if needed
    clientKey: 'AmritSinghOfficialFullStackdeveloper',
    restAPIKey: 'DevFinderOfficialAPI',
    liveQuery: {
      classNames: ["Posts", "Comments", "chat"] // List of classes to support for query subscriptions
    }
  }
};
