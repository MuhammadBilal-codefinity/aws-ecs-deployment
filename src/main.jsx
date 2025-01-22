import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://cognito-idp.eu-north-1.amazonaws.com/eu-north-1_J1T8YNCD2",
  client_id: "hlgot1g4icru823h0oq0q97i9",
  redirect_uri: "http://localhost:5173/todolist",
  response_type: "code",
  scope: "phone openid email",
};


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <App />
    </AuthProvider>
  </StrictMode>,
)
