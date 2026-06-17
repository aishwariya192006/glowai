import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User from '../models/User.js';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || 'mock_client_id',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'mock_client_secret',
      callbackURL: `${BACKEND_URL}/api/auth/google/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const name = profile.displayName;
        const avatar_url = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '';

        const user = await User.findOneAndUpdate(
          { email: email.toLowerCase() },
          { 
            $setOnInsert: {
              name,
              avatar_url,
              glow_score: Math.floor(Math.random() * 30) + 60,
              hair_score: Math.floor(Math.random() * 30) + 60,
              skin_score: Math.floor(Math.random() * 30) + 60,
              confidence_score: Math.floor(Math.random() * 30) + 60,
            }
          },
          { upsert: true, new: true }
        );
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID || 'mock_client_id',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || 'mock_client_secret',
      callbackURL: `${BACKEND_URL}/api/auth/github/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails && profile.emails.length > 0 
          ? profile.emails[0].value 
          : `${profile.username}@github.com`;
        const name = profile.displayName || profile.username;
        const avatar_url = profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '';

        const user = await User.findOneAndUpdate(
          { email: email.toLowerCase() },
          { 
            $setOnInsert: {
              name,
              avatar_url,
              glow_score: Math.floor(Math.random() * 30) + 60,
              hair_score: Math.floor(Math.random() * 30) + 60,
              skin_score: Math.floor(Math.random() * 30) + 60,
              confidence_score: Math.floor(Math.random() * 30) + 60,
            }
          },
          { upsert: true, new: true }
        );
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

export default passport;
