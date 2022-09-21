import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./pages/LandingPage";
import CreatePollPage from "./pages/CreatePollPage";
import { BrowserRouter, Route, Routes, Router } from "react-router-dom";
import ColorChangingBackground from "./components/ColorChangingBackground";
import { AuthProvider } from "./hooks/useAuth";
import { useAuth } from "./hooks/useAuth";
import PollGamePage from "./pages/PollGamePage";
import { SnackbarProvider } from "./hooks/useSnackbar";

const PollNavigator = ({ children }) => {
  const { validAccessToken } = useAuth();
  if (Boolean(validAccessToken)) {
    return <PollGamePage />;
  }
  return <>{children}</>;
};

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <ColorChangingBackground>
          <AuthProvider>
            <SnackbarProvider>
              <PollNavigator>
                <Routes>
                  <Route path="/create-poll" element={<CreatePollPage />} />
                  <Route path="/" element={<LandingPage />} />
                </Routes>
              </PollNavigator>
            </SnackbarProvider>
          </AuthProvider>
        </ColorChangingBackground>
      </BrowserRouter>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
