import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Clock from "./pages/Clock";
import SignInOut from "./pages/SignInOut";
import Settings from "./pages/Settings";
import Statistics from "./pages/Statistics";
import { PomodoroTrackerProvider } from "./context/PomodoroTrackerProvider";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // staleTime: 60 * 1000,
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <PomodoroTrackerProvider>
          <AuthProvider>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Navigate to="/clock" />} />
                <Route path="/clock" element={<Clock />} />
                <Route path="/statistics" element={<Statistics />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/signinout" element={<SignInOut />} />
              </Route>
            </Routes>
          </AuthProvider>
        </PomodoroTrackerProvider>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
