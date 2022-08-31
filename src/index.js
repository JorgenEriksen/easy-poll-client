import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import LandingPage from "./pages/LandingPage";
import CreatePollPage from "./pages/CreatePollPage";
import {
  BrowserRouter,
  Route,
  Switch,
  Routes,
  Navigate,
} from "react-router-dom";
import ColorChangingBackground from "./components/ColorChangingBackground";
import { AuthProvider } from "./hooks/auth";
import { useAuth } from "./hooks/auth";
import PollGamePage from "./pages/PollGamePage";

const PollNavigator = ({ children }) => {
  const auth = useAuth();
  if (Boolean(auth.validAccessToken)) {
    return <PollGamePage />;
  }
  return <>{children}</>;
};

const App = () => {
  return (
    <React.StrictMode>
      <AuthProvider>
        <PollNavigator>
          <BrowserRouter>
            <ColorChangingBackground>
              <Routes>
                <Route path="/create-poll" element={<CreatePollPage />} />
                <Route path="/" element={<LandingPage />} />
              </Routes>
            </ColorChangingBackground>
          </BrowserRouter>
        </PollNavigator>
      </AuthProvider>
    </React.StrictMode>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
