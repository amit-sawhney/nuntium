import passport from 'passport';

const requireLoginMiddleware = passport.authenticate('login', { session: true });

export default requireLoginMiddleware;
