import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import CharacterList from "./pages/CharacterList";
import CharacterDetails from "./pages/CharacterDetails";
import PageLayout from "./components/PageLayout";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<CharacterList />} />
        </Route>
        <Route path="/character/:id" element={<PageLayout />}>
          <Route index element={<CharacterDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
