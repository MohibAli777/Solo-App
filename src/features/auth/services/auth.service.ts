import { supabase } from "@/lib/supabase/client";

export const authService = {
    
  async signUp(email: string, password: string) {
    return await supabase.auth.signUp({
      email,
      password,
    });
  },

  async signIn(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
      email,
      password,
    });
  },

  async signOut() {
    return await supabase.auth.signOut();
  },

  async getSession() {
    return await supabase.auth.getSession();
  },

  async getUser() {
    return await supabase.auth.getUser();
  },

  onAuthStateChange(callback: Parameters<
    typeof supabase.auth.onAuthStateChange
  >[0]) {
    return supabase.auth.onAuthStateChange(callback);
  },
};


// onAuthStatechange: Tell me whenever something changes about the user's authentication.
// "Hey Supabase, whenever the authentication state changes, run this function."

// If the user signs up or signs in, the session changes, so onAuthStatechange will be called.
// The callback is a function that will be called whenever the authentication state changes.
// The callback function takes two arguments: session and error.    