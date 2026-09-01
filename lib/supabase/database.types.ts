export type UserRole = "client" | "freelancer" | "admin";

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          role: UserRole;
          first_name: string | null;
          last_name: string | null;
          username: string | null;
          avatar_url: string | null;
          bio: string | null;
          phone: string | null;
          location: string | null;
          country: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          role: UserRole;
          first_name?: string | null;
          last_name?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          phone?: string | null;
          location?: string | null;
          country?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          role?: UserRole;
          first_name?: string | null;
          last_name?: string | null;
          username?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          phone?: string | null;
          location?: string | null;
          country?: string | null;
          status?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          slug: string;
          description?: string | null;
          icon?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          icon?: string | null;
          status?: string;
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
