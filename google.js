'use strict';

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  '622912655375-rsksv2om89kbkvd9ocq2h40egpjgmmpr.apps.googleusercontent.com',
  'NO9yBqph1gQ-hKZjB9bHV7Lu',
  'http://localhost:3000/callback'
);

var scopes = ['https://www.googleapis.com/auth/calendar'];

module.exports = {
  generateURL: function() {
    var url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',

      // If you only need one scope you can pass it as string
      scope: scopes
    });
    return url;
  }
}