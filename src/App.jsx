
import { BrowserRouter, Routes, Route } from "react-router";

import { ThemeProvider } from "./tempContext/ThemeContext.jsx";
import Navbar from "./components/Navbar";
import BlogPostsPage from "./Pages/BlogPostPage";
import IndividualPostPage from "./Pages/IndividualPostPage";
import ContactPage from "./Pages/ContactPage";

import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<BlogPostsPage />} />
            <Route
              path="/post/:id"
              element={<IndividualPostPage />}
            />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
