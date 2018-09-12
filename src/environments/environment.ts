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
  }
};
