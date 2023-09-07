interface BuildTokenCookieProps {
  type: 'access' | 'refresh';
  token: string;
  maxAge: string;
}

export const buildTokenCookie = ({ type, token, maxAge }: BuildTokenCookieProps) => {
  const name = type === 'access' ? 'Authentication' : 'Refresh';

  return `${name}=${token}; HttpOnly; Max-Age=${maxAge}; Path=/; SameSite=None; Secure`;
};
