'use strict';

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
  '622912655375-rsksv2om89kbkvd9ocq2h40egpjgmmpr.apps.googleusercontent.com',
  'NO9yBqph1gQ-hKZjB9bHV7Lu',
  'http://localhost:3000/callback'
);

var tokenMap = {};

var scopes = ['https://www.googleapis.com/auth/calendar'];

module.exports = {
  format: function(events) {
    var map = {};

    for(var i=0; i<events.length; i++) {
      var date = new Date(events[i].start.dateTime);
      var index = date.getDate();

      if (map[index]) {
        map[index].push();
      }
    }
  },
  generateURL: function() {
    var url = oauth2Client.generateAuthUrl({
      // 'online' (default) or 'offline' (gets refresh_token)
      access_type: 'offline',

      // If you only need one scope you can pass it as string
      scope: scopes
    });
    return url;
  },
  auth: function(code) {
    return new Promise(function(resolve, reject) {
      oauth2Client.getToken(code, function(err, token) {
        if (err) {
          reject(err);
        }

        console.log('---- token:', token);
        resolve(token);
        // oauth2Client.credentials = token;
        // storeToken(token);
        // callback(oauth2Client);
      });
    });
  },
  listEvents: function(code) {
    var auth = this.auth;
    return new Promise(function(resolve, reject) {
      if (tokenMap[code]) {

          oauth2Client.credentials = tokenMap[code];
          var calendar = google.calendar('v3');
          calendar.events.list({
            auth: oauth2Client,
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
          }, function(err, response) {
            if (err) {

              console.log('The API returned an error: ' + err);
              delete tokenMap[code];
              reject(err);
            }
            var events = response.items;
            console.log(events);

            resolve(events);
          });


      } else {
        auth(code)
        .then(function(token) {

          tokenMap[code] = token;

          oauth2Client.credentials = token;

          var calendar = google.calendar('v3');
          calendar.events.list({
            auth: oauth2Client,
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 10,
            singleEvents: true,
            orderBy: 'startTime'
          }, function(err, response) {
            if (err) {

              console.log('The API returned an error: ' + err);
              reject(err);
            }
            var events = response.items;
            console.log(events);

            resolve(events);
          });


        })
        .catch(function(err) {
          reject(err);
        })
      }
      
    });

  }
}