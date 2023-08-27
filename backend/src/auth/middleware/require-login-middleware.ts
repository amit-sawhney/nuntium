import passport from 'passport';

const requireLoginMiddleware = passport.authenticate('login', { session: false });

export default requireLoginMiddleware;
