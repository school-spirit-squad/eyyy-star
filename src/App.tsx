import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import { Toaster } from "sonner";
import Footer from "./components/footer";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster/>
        <Routes>
          <Route path="/" element={<Index />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
