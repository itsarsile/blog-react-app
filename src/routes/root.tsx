import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-providers";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Helmet>
        <title>Home - hello-world</title>
      </Helmet>
      <Navbar />
      <div className="container py-10">
      <Outlet />
      </div>
    </ThemeProvider>
  )
}
