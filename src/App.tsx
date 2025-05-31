import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import MainLayout from "./layouts/MainLayout";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import VoicebankPage from "./pages/VoicebankPage";
import WorksPage from "./pages/WorksPage";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="works" element={<WorksPage />} />
          <Route path="voicebank" element={<VoicebankPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
