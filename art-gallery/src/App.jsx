import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Reviews from "./pages/page4.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/page4" element={<Reviews />} />
      </Routes>
    </Router>
  );
}

export default App;
