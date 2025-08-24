import About from "./components/About";
import Hero from "./components/Hero";
import NavBar from "./components/Navbar";
import Features from "./components/Features";
import Story from "./components/Story";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Feedback from "./components/Feedback";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import React from 'react'



const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello world!</div>,
  },
]);
function App() {
  return (
    <main className="relative min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <Hero />
      <About />
      <Features />
      <Story />
      <Feedback/>
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
