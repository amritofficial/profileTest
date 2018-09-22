// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DB_URL",
    projectId: "_PROJ_ID",
    storageBucket: "BUCKET_URL",
    messagingSenderId: "SENDER_ID"
  },
  parseServer: {
    databaseURI: 'DB_URL',
    appId: 'APP_ID',
    newAppId: 'APP_ID',
    masterKey: 'MASTER_KEY', //Add your master key here. Keep it secret!
    serverURL:'SERVER_URL',  // Don't forget to change to https if needed
    clientKey: 'CLIENT_KEY',
    restAPIKey: 'REST_API_KEY',
    restNewKey: 'REST_API_KEY',
    liveQuery: {
      classNames: ["Posts", "Comments", "chat"] // List of classes to support for query subscriptions
    }
}
};
