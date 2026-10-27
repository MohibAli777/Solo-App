import { supabase } from "@/lib/supabase/client";

export const captureService = {
  async create(content: string) {
    const value = content.trim();

    if (!value) {
      throw new Error("Capture content cannot be empty.");
    }

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;
    if (!user) throw new Error("You must be signed in.");

    const { data, error } = await supabase
      .from("captures")
      .insert({
        user_id: user.id,
        content: value,
        status: "inbox",
      })
      .select()
      .single();

    if (error) throw error;

    return data;
  },
};
