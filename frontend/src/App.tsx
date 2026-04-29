import "./App.css";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/layout/Navbar";
import { ThemeProvider } from "./components/theme-provider";

import { Outlet } from "react-router";
import { Footer } from "./components/layout/Footer";

function App() {
  // const { data, isLoading, isError } = useGetAllBooksQuery(undefined);
  // console.log(data);
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Toaster position="top-center" reverseOrder={false} />
      <Navbar />
      {/* <BookListTable />
      <br />
      <BookMutationDialog mode="create" /> */}
      <Outlet />
      <Footer />
    </ThemeProvider>
  );
}

export default App;
