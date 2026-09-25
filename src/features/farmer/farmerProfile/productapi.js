import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/", // Root base URL so relative endpoint paths append correctly
});

// ── REQUEST INTERCEPTOR ────────────────────────────────────────────
// The login page stores the token in localStorage when "Remember me"
// is checked, and in sessionStorage otherwise (see LoginPage.jsx:
// `const storage = form.remember ? localStorage : sessionStorage`).
// This interceptor must check BOTH, in the same order the app writes
// to them, or a perfectly valid session silently sends no Authorization
// header and every protected endpoint returns
// {"detail": "Authentication credentials were not provided."}.
api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    sessionStorage.getItem("access_token") ||
    sessionStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ── RESPONSE INTERCEPTOR ───────────────────────────────────────────
// If the access token is missing/expired, surface a clear signal
// instead of forcing every screen to separately guess why a 401
// happened. Adjust the redirect path to match your actual login route.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Session expired or not authenticated.");
      // Optional: clear stale tokens so the next request doesn't retry
      // with a dead token, and send the user back to login.
      // localStorage.removeItem("access_token");
      // sessionStorage.removeItem("access_token");
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;