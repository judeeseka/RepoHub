import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import AllRepo from "./pages/AllRepo";
import SingleRepoData from "./pages/SingleRepoData";

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repositories" element={<AllRepo />} />
        <Route path="/repositories/:name" element={<SingleRepoData />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
