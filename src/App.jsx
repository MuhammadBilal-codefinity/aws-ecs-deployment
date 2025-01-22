import { useAuth } from "react-oidc-context";
import { useEffect } from "react";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    auth.removeUser();
    const clientId = "hlgot1g4icru823h0oq0q97i9";
    const logoutUri = "http://localhost:5173?logged_out=true"; // Add a query parameter to identify logout redirect
    const cognitoDomain = "https://eu-north-1j1t8yncd2.auth.eu-north-1.amazoncognito.com";

    // Redirect to Cognito logout endpoint
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  const clearCognitoCookies = () => {
    document.cookie = "CognitoIdentityServiceProvider=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    console.log("Cookies cleared after logout");
  };

  useEffect(() => {
    // Check if the user was redirected after logout
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("logged_out") === "true") {
      clearCognitoCookies();
      // Optionally, remove the query parameter from the URL after handling
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>

        <button onClick={() => signOutRedirect()}>Sign out (Cognito)</button>
      </div>
    );
  }

  return (
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}

export default App;
