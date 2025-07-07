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
      proposals: {
        Row: {
          id: string
          created_at: string
          user_id: string
          name: string
          status: 'Draft' | 'Submitted' | 'Awarded' | 'Rejected'
          last_modified: string
          content: Json
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          name: string
          status?: 'Draft' | 'Submitted' | 'Awarded' | 'Rejected'
          last_modified?: string
          content?: Json
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          name?: string
          status?: 'Draft' | 'Submitted' | 'Awarded' | 'Rejected'
          last_modified?: string
          content?: Json
        }
      }
      grants: {
        Row: {
            id: string
            title: string
            funder: string
            description: string
            amount: number
            deadline: string
            categories: string[]
        }
        Insert: {
            id?: string
            title: string
            funder: string
            description: string
            amount: number
            deadline: string
            categories: string[]
        }
        Update: {
            id?: string
            title?: string
            funder?: string
            description?: string
            amount?: number
            deadline?: string
            categories?: string[]
        }
      }
      comments: {
        Row: {
          id: string
          created_at: string
          user_id: string
          proposal_id: string
          content: string
          user_full_name: string | null
          user_avatar_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          proposal_id: string
          content: string
          user_full_name?: string | null
          user_avatar_url?: string | null
        }
        Update: {
          id?: string
          content?: string
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
