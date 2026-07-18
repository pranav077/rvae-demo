import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Venues from "./pages/Venues";
import Artists from "./pages/Artists";
import News from "./pages/News";
import Dashboard from "./pages/Dashboard";
import Cities from "./pages/Cities";
import Checkout from "./pages/Checkout";
import Rewards from "./pages/Rewards";
import RaveFinder from "./pages/RaveFinder";
import Community from "./pages/Community";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/event/:slug" element={<EventDetail />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/news" element={<News />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/checkout/:slug" element={<Checkout />} />
          <Route path="/rewards" element={<Rewards />} />
          <Route path="/rave-finder" element={<RaveFinder />} />
          <Route path="/community" element={<Community />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;