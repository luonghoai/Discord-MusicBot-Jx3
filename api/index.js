const { static, Router } = require("express");
const api = Router();
const fs = require("fs");
const { join } = require("path");

const RoutesPath = join(__dirname, "Routes");

fs.readdir(RoutesPath, (err, files) => {
  if (err) return console.log(err);
  files.forEach((file) => {
    api.use("/api/" + file.split(".")[0], require(RoutesPath + "/" + file));
  });
});

api.use("/", static(join(__dirname, "..", "assets")));

//Handle Login and other stuff

const session = require("express-session");
const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const scopes = ["identify", "email", "guilds", "guilds.join"];

let config;
try {
  //Config for testing
  config = require("../dev-config");
} catch {
  //Config for production
  config = require("../botconfig");
}

const Strategy = new DiscordStrategy(
  {
    clientID: config.ClientID, // your client id here
    clientSecret: config.ClientSecret, // your client secret here
    callbackURL: config.Website + config.CallbackURL, // your callback url here
    scope: scopes, // your scopes here
  },
  async (accessToken, refreshToken, profile, cb) => {
    await process.nextTick(async () => {
      if (profile.guilds == undefined) return cb(null, false); // When there is an error fetching the user's guilds, the .guilds property returns undefined, so we must point out in the callback that all the information hasn't arrived with cb(null, false)

      return cb(null, profile);
    });
  }
);

passport.use(Strategy);
passport.serializeUser((user, done) => {
  if (!user) return; // In serialization, if the value received is false, as we saw above, it means that the information did not arrive in its entirety, that is, it is a repeated request and therefore it did not get all the information, so we must return to avoid serialization errors
  return done(null, user);
});
passport.deserializeUser((obj, done) => done(null, obj));

// passport.use(
//   new DiscordStrategy(
//     {
//       clientID: config.ClientID,
//       clientSecret: config.ClientSecret,
//       callbackURL: config.Website + config.CallbackURL,
//       scope: scopes,
//     },
//     async function (accessToken, refreshToken, profile, done) {
//       //User logged in yay!
//       await process.nextTick(async function () {
//         if (profile.guilds == undefined) return cb(null, false); // When there is an error fetching the user's guilds, the .guilds property returns undefined, so we must point out in the callback that all the information hasn't arrived with cb(null, false)
//         return cb(null, profile);
//       });
//     }
//   )
// );

api.use(
  session({
    secret: config.CookieSecret,
    resave: false,
    saveUninitialized: false,
  })
);

api.use(passport.initialize());
api.use(passport.session());
api.get(
  config.CallbackURL,
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  function (req, res, next) {
    return passport.authenticate(
      "discord",
      { failureRedirect: "/" },
      async function (err, user, info) {
        if (err) {
          console.error(err); // In case of an error, it must always be registered the choice is yours
          return res.redirect("/"); // This part is very important, even if it gives an error, unless it is a 429 (rate limit), the client will have all the information requested from the user, so here you must put the url you want it to be sent to (you can use the req.session.backURL, for example)
        }

        await req.login(user, function (e) {
          if (e) return next(e); // As we are careful with user serialization here it will not return anything so this part is not really necessary
          return next();
        });
      }
    )(req, res, next);
  },
  async function (req, res) {
    return res.redirect("/dashboard"); // Then we must redirect the user to wherever you want
  }
);

// api.get(
//   config.CallbackURL,
//   passport.authenticate("discord", {
//     failureRedirect: "/",
//   }),
//   function (req, res) {
//     res.redirect("/dashboard");
//   }
// );

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function (obj, done) {
//   done(null, obj);
// });

api.use("/", require("./routes"));

module.exports = api;
