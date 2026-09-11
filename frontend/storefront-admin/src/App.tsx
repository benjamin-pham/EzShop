import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShowcaseLayout from "./pages/showcase/ShowcaseLayout";
import ShowcaseHome from "./pages/showcase/Home";
import ComponentView from "./pages/showcase/ComponentView";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowcaseLayout />}>
          <Route index element={<ShowcaseHome />} />
          <Route path="components/:componentId" element={<ComponentView />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
