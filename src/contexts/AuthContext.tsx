import { createContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "../lib/supabase";
import { User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  signOut: () => Promise<void>;
  isAuthModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        console.log("Auth event:", _event, session);
        setUser(session?.user ?? null);
        // Redirection vers /application après connexion
        if (session?.user && _event === 'SIGNED_IN') {
          navigate('/application');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    signOut: async () => { await supabase.auth.signOut(); },
    isAuthModalOpen,
    openAuthModal: () => setIsAuthModalOpen(true),
    closeAuthModal: () => setIsAuthModalOpen(false),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
