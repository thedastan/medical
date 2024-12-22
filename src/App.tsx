/* External dependencies */
import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

/* Local dependencies */
import Akte from "./Containers/Akte/Akte";
import Interface from "./Components/Interface/Interface";
import Tabs from "./Components/Ui/Tab/Tabs";
import Notfall from "./Containers/Notfall/Notfall";
import WelcomePage from "./Components/WelcomePage/WelcomePage";
import ResetPassword from "./Containers/reset/Reset";
import NotFound from "./Containers/notFound/NotFound";
import i18n from "./i18n/I18n";

function App() {
  const language = localStorage.getItem("language");

  useEffect(() => {
    if (language) {
      i18n.changeLanguage(language);
    }
  }, []);
  return (
    <Box bg="black" pos="relative">
      <WelcomePage />
      <Routes>
        <Route
          path="/user/:id"
          element={
            <Interface>
              <Tabs akte={<Akte />} notfall={<Notfall />} />
            </Interface>
          }
        />
        <Route path="/reset*" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Box>
  );
}

export default App;
