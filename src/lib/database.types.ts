export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
          full_name: string | null
          avatar_url: string | null
          gmail_token: string | null
          gmail_refresh_token: string | null
          gmail_token_expiry: string | null
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          gmail_token?: string | null
          gmail_refresh_token?: string | null
          gmail_token_expiry?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
          full_name?: string | null
          avatar_url?: string | null
          gmail_token?: string | null
          gmail_refresh_token?: string | null
          gmail_token_expiry?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      loops: {
        Row: {
          id: string
          title: string
          description: string | null
          status: string
          created_at: string
          updated_at: string
          user_id: string
          category_id: string | null
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: string
          created_at?: string
          updated_at?: string
          user_id: string
          category_id?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          category_id?: string | null
        }
      }
      loop_emails: {
        Row: {
          id: string
          loop_id: string
          email_id: string
          subject: string
          sender: string
          received_at: string
          content: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          loop_id: string
          email_id: string
          subject: string
          sender: string
          received_at: string
          content?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          loop_id?: string
          email_id?: string
          subject?: string
          sender?: string
          received_at?: string
          content?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      templates: {
        Row: {
          id: string
          title: string
          content: string
          category_id: string
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          category_id: string
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          category_id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      rules: {
        Row: {
          id: string
          condition: string
          action: string
          priority: number
          created_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          id?: string
          condition: string
          action: string
          priority?: number
          created_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          id?: string
          condition?: string
          action?: string
          priority?: number
          created_at?: string
          updated_at?: string
          user_id?: string
        }
      }
      rule_categories: {
        Row: {
          id: string
          rule_id: string
          category_id: string
          created_at: string
        }
        Insert: {
          id?: string
          rule_id: string
          category_id: string
          created_at?: string
        }
        Update: {
          id?: string
          rule_id?: string
          category_id?: string
          created_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          message: string
          status: string
          created_at: string
          updated_at: string
          loop_id: string | null
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          status?: string
          created_at?: string
          updated_at?: string
          loop_id?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          status?: string
          created_at?: string
          updated_at?: string
          loop_id?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
