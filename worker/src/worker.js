// Password to access the site - change this!
const PASSWORD = "dottie2026";

export default {
  async fetch(request, env) {
    // Use env variable if set, otherwise fallback to hardcoded
    const password = env.SITE_PASSWORD || PASSWORD;

    const auth = request.headers.get("Authorization");

    if (auth) {
      const [scheme, encoded] = auth.split(" ");
      if (scheme === "Basic") {
        try {
          const decoded = atob(encoded);
          const [user, pass] = decoded.split(":");
          if (pass === password) {
            // Authenticated - pass through to origin
            return fetch(request);
          }
        } catch (e) {
          // Invalid base64, fall through to 401
        }
      }
    }

    // Not authenticated - prompt for password
    return new Response("Family access only", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Welcome to Dorothy\'s Page"',
        "Content-Type": "text/plain",
      },
    });
  },
};
