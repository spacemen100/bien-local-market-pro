import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Demo from "./pages/Demo";
import Layout from "./components/Layout";
import SubscriptionSuccess from "./pages/SubscriptionSuccess";
import SubscriptionCancel from "./pages/SubscriptionCancel";
import { AuthProvider } from "./contexts/AuthContext";
import AuthModal from "./components/AuthModal";

// Import des composants de l'ancienne sous-application
import { AuthProvider as AppAuthProvider, useAuth } from "./auth";
import { UserProvider } from "./pages/context/UserContext";
import { LoginForm, SignUpForm, UserProfile, TeamManagement } from "./auth";
import { DashboardLayout } from "./components/DashboardLayout";
import AppDashboard from "./pages/AppDashboard";
import NewEtatDesLieux from "./pages/NewEtatDesLieux";
import EtatSortie from "./pages/EtatSortie";
import MonCalendrierPage from "./pages/MonCalendrier";
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const queryClient = new QueryClient();

// Composant pour les routes d'authentification de l'application
const AppAuthRoutes = () => {
  const { user, loading, error } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
          {error && <p className="text-red-500 mt-2">Erreur: {error.message}</p>}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 max-w-md">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Erreur de chargement</h2>
          <p className="text-red-500 mb-4">{error.message}</p>
          <Button onClick={() => window.location.reload()}>Réessayer</Button>
        </div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/app/login" replace />;
  }

  return (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  );
};

const AppLoginPage = () => {
  const handleLoginSuccess = () => {
    // La navigation sera gérée automatiquement
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <LoginForm onSuccess={handleLoginSuccess} />
    </div>
  );
};

const AppSignUpPage = () => {
  const handleSignUpSuccess = () => {
    // Navigation vers login après inscription
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <SignUpForm onSuccess={handleSignUpSuccess} />
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AuthProvider>
          <AppAuthProvider>
            <UserProvider>
              <BrowserRouter>
                <Routes>
                  {/* Routes publiques */}
                  <Route path="/" element={<Layout><Index /></Layout>} />
                  <Route path="/demo" element={<Layout><Demo /></Layout>} />
                  <Route path="/subscription/success" element={<Layout><SubscriptionSuccess /></Layout>} />
                  <Route path="/subscription/cancel" element={<Layout><SubscriptionCancel /></Layout>} />
                  
                  {/* Routes d'authentification de l'application */}
                  <Route path="/app/login" element={<AppLoginPage />} />
                  <Route path="/app/signup" element={<AppSignUpPage />} />
                  
                  {/* Routes protégées de l'application */}
                  <Route path="/app" element={<AppAuthRoutes />}>
                    <Route index element={<AppDashboard />} />
                    <Route path="new-etat-des-lieux" element={<NewEtatDesLieux />} />
                    <Route path="sortie/:id" element={<EtatSortie />} />
                    <Route path="mon-calendrier" element={<MonCalendrierPage />} />
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="team" element={<TeamManagement />} />
                  </Route>
                  
                  {/* Route par défaut */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
              <AuthModal />
            </UserProvider>
          </AppAuthProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
