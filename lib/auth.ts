export const AUTH_EMAIL = process.env.AUTH_EMAIL ?? "";
export const AUTH_PASSWORD = process.env.AUTH_PASSWORD ?? "";
export const AUTH_COOKIE_NAME =
  process.env.AUTH_COOKIE_NAME ?? "tower-tv-session";
export const AUTH_SESSION_TOKEN = process.env.AUTH_SESSION_TOKEN ?? "";

export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

export function isValidCredentials(email: string, password: string): boolean {
  return (
    AUTH_EMAIL.length > 0 &&
    AUTH_PASSWORD.length > 0 &&
    email === AUTH_EMAIL &&
    password === AUTH_PASSWORD
  );
}

export function isAuthenticated(sessionToken: string | undefined): boolean {
  return (
    AUTH_SESSION_TOKEN.length > 0 && sessionToken === AUTH_SESSION_TOKEN
  );
}
