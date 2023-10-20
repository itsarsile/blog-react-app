import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-providers";

export default function Root() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <div>What's up!</div>
    </ThemeProvider>
  );
}
