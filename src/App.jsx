import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashBoard from "./pages/Dashboard.jsx";
import Bookings from "./pages/Bookings.jsx";
import Booking from "./pages/Booking.jsx";
import Cabins from "./pages/Cabins.jsx";
import Users from "./pages/Users.jsx";
import Settings from "./pages/Settings.jsx";
import Account from "./pages/Account.jsx";
import Login from "./pages/Login.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import GlobalStyles from "./styles/GlobalStyles.js";
import AppLayout from "./ui/AppLayout.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import CheckIn from "./pages/CheckIn.jsx";
import ProcetedRoute from "./ui/ProcetedRoute.jsx";
import { DarkModeProvider } from "./context/DarkModeContext.jsx";
import supabase from "./services/supabase.js";
import { useEffect } from "react";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    },
  },
});


function App() {


 useEffect(() => {
  fetch("https://sqhncdgmluoprdazflcr.supabase.co/auth/v1/health")
  .then(res => res.json())
  .then(console.log)
  .catch(console.error);
    async function checkConnection() {
      // simplest test → try to fetch current session
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("❌ Supabase connection failed:", error.message);
      } else {
        console.log("✅ Supabase connected successfully!");
        console.log("Session data:", data);
      }
    }

    checkConnection();
  }, []);

  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialOpen={false} ></ReactQueryDevtools>
        <GlobalStyles></GlobalStyles>
        <BrowserRouter>
          <Routes>
            <Route element={<ProcetedRoute>
              <AppLayout></AppLayout>
            </ProcetedRoute>}>
              <Route index element={<Navigate replace to="dashboard"></Navigate>}></Route>
              <Route path="dashboard" element={<DashBoard></DashBoard>}></Route>
              <Route path="bookings" element={<Bookings></Bookings>}></Route>
              <Route path="bookings/:bookingId" element={<Booking></Booking>}></Route>
              <Route path="checkin/:bookingId" element={<CheckIn></CheckIn>}></Route>
              <Route path="users" element={<Users></Users>}></Route>
              <Route path="cabins" element={<Cabins></Cabins>}></Route>
              <Route path="settings" element={<Settings></Settings>}></Route>
              <Route path="account" element={<Account></Account>}></Route>
            </Route>
            <Route path="login" element={<Login></Login>}></Route>
            <Route path="*" element={<PageNotFound></PageNotFound>}></Route>

          </Routes>
        </BrowserRouter>
        <Toaster position="top-center" gutter={12} containerStyle={{ margin: '8px' }} toastOptions={{
          success: {
            duration: 3000,
          }, error: {
            duration: 5000
          }
          , style: {
            fontSize: '16px',
            maxWidth: '500px',
            padding: "16px",
            backgroundColor: "var(--color-grey-0)",
            color: "var(--color-grey-700)"
          }
        }}></Toaster>
      </QueryClientProvider>
    </DarkModeProvider>
  )
}

export default App
