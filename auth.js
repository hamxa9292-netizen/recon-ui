// js/auth.js
// Shared auth guard + fetch wrapper. Load this BEFORE app.js / adjustment*.js
// on every protected page. On login.html it's used only for the login call.
(function () {
  "use strict";

  var TOKEN_KEY = "stelco_token";
  var USER_KEY  = "stelco_user";

  window.Auth = {
    getToken: function () { return localStorage.getItem(TOKEN_KEY); },
    getUsername: function () { return localStorage.getItem(USER_KEY) || ""; },

    setSession: function (token, username) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, username || "");
    },

    clearSession: function () {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_KEY);
    },

    // Redirect to the login page unless a token is present. Call at the top
    // of any protected page. Returns true if the page should keep loading.
    requireAuth: function () {
      if (!window.Auth.getToken()) {
        window.location.replace("login.html");
        return false;
      }
      return true;
    },

    logout: function () {
      window.Auth.clearSession();
      window.location.replace("login.html");
    },

    // Drop-in replacement for fetch() against the recon API: attaches the
    // bearer token and sends the user straight to login.html on a 401
    // (expired/invalid session) instead of surfacing a raw error.
    fetch: async function (url, options) {
      options = options || {};
      var headers = new Headers(options.headers || {});
      var token = window.Auth.getToken();
      if (token) headers.set("Authorization", "Bearer " + token);
      options.headers = headers;
      var res = await fetch(url, options);
      if (res.status === 401) {
        window.Auth.clearSession();
        window.location.replace("login.html");
        // Prevent the caller's normal error handling from also firing.
        throw new Error("Session expired — redirecting to login.");
      }
      return res;
    }
  };
})();
