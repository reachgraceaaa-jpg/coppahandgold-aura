import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Events from "./pages/Events.tsx";
import Circle from "./pages/Circle.tsx";
import Psychle from "./pages/Psychle.tsx";
import NotFound from "./pages/NotFound.tsx";
import CustomCursor from "./components/CustomCursor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="grain-overlay" aria-hidden="true" />
      <CustomCursor />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/events" element={<Events />} />
          <Route path="/cones-and-code-welcome" element={<ConesAndCode />} />
          <Route path="/cones-and-code" element={<BuildTonight />} />
          <Route path="/build" element={<BuildTonight />} />
          <Route path="/psychle" element={<Psychle />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
