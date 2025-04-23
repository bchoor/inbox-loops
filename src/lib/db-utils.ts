import { supabase } from './supabase';
import type { Database } from './database.types';

// Type definitions for database tables
export type User = Database['public']['Tables']['users']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];
export type Loop = Database['public']['Tables']['loops']['Row'];
export type LoopEmail = Database['public']['Tables']['loop_emails']['Row'];
export type Template = Database['public']['Tables']['templates']['Row'];
export type Rule = Database['public']['Tables']['rules']['Row'];
export type RuleCategory = Database['public']['Tables']['rule_categories']['Row'];
export type Notification = Database['public']['Tables']['notifications']['Row'];

// User operations
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
    
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }
  
  return data;
}

export async function updateUser(id: string, updates: Partial<User>) {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating user:', error);
    throw error;
  }
  
  return data;
}

// Category operations
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');
    
  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
  
  return data;
}

export async function createCategory(category: Omit<Category, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('categories')
    .insert(category)
    .select()
    .single();
    
  if (error) {
    console.error('Error creating category:', error);
    throw error;
  }
  
  return data;
}

export async function updateCategory(id: string, updates: Partial<Category>) {
  const { data, error } = await supabase
    .from('categories')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating category:', error);
    throw error;
  }
  
  return data;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
  
  return true;
}

// Loop operations
export async function getLoops(filters?: { 
  category_id?: string, 
  status?: string,
  search?: string
}) {
  let query = supabase
    .from('loops')
    .select(`
      *,
      categories(name)
    `)
    .order('updated_at', { ascending: false });
    
  if (filters?.category_id) {
    query = query.eq('category_id', filters.category_id);
  }
  
  if (filters?.status) {
    query = query.eq('status', filters.status);
  }
  
  if (filters?.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }
  
  const { data, error } = await query;
    
  if (error) {
    console.error('Error fetching loops:', error);
    throw error;
  }
  
  return data;
}

export async function getLoopById(id: string) {
  const { data, error } = await supabase
    .from('loops')
    .select(`
      *,
      categories(name),
      loop_emails(*)
    `)
    .eq('id', id)
    .single();
    
  if (error) {
    console.error('Error fetching loop:', error);
    throw error;
  }
  
  return data;
}

export async function createLoop(loop: Omit<Loop, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('loops')
    .insert(loop)
    .select()
    .single();
    
  if (error) {
    console.error('Error creating loop:', error);
    throw error;
  }
  
  return data;
}

export async function updateLoop(id: string, updates: Partial<Loop>) {
  const { data, error } = await supabase
    .from('loops')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating loop:', error);
    throw error;
  }
  
  return data;
}

export async function deleteLoop(id: string) {
  const { error } = await supabase
    .from('loops')
    .delete()
    .eq('id', id);
    
  if (error) {
    console.error('Error deleting loop:', error);
    throw error;
  }
  
  return true;
}

// Loop Email operations
export async function getLoopEmails(loopId: string) {
  const { data, error } = await supabase
    .from('loop_emails')
    .select('*')
    .eq('loop_id', loopId)
    .order('received_at', { ascending: false });
    
  if (error) {
    console.error('Error fetching loop emails:', error);
    throw error;
  }
  
  return data;
}

export async function addEmailToLoop(email: Omit<LoopEmail, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('loop_emails')
    .insert(email)
    .select()
    .single();
    
  if (error) {
    console.error('Error adding email to loop:', error);
    throw error;
  }
  
  return data;
}

// Template operations
export async function getTemplates(categoryId?: string) {
  let query = supabase
    .from('templates')
    .select(`
      *,
      categories(name)
    `)
    .order('title');
    
  if (categoryId) {
    query = query.eq('category_id', categoryId);
  }
  
  const { data, error } = await query;
    
  if (error) {
    console.error('Error fetching templates:', error);
    throw error;
  }
  
  return data;
}

export async function createTemplate(template: Omit<Template, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('templates')
    .insert(template)
    .select()
    .single();
    
  if (error) {
    console.error('Error creating template:', error);
    throw error;
  }
  
  return data;
}

// Rule operations
export async function getRules() {
  const { data, error } = await supabase
    .from('rules')
    .select(`
      *,
      rule_categories(
        categories(id, name)
      )
    `)
    .order('priority', { ascending: false });
    
  if (error) {
    console.error('Error fetching rules:', error);
    throw error;
  }
  
  return data;
}

export async function createRule(
  rule: Omit<Rule, 'id' | 'created_at' | 'updated_at'>, 
  categoryIds: string[]
) {
  // Start a transaction
  const { data: ruleData, error: ruleError } = await supabase
    .from('rules')
    .insert(rule)
    .select()
    .single();
    
  if (ruleError) {
    console.error('Error creating rule:', ruleError);
    throw ruleError;
  }
  
  // Add rule categories
  if (categoryIds.length > 0) {
    const ruleCategoryInserts = categoryIds.map(categoryId => ({
      rule_id: ruleData.id,
      category_id: categoryId
    }));
    
    const { error: categoryError } = await supabase
      .from('rule_categories')
      .insert(ruleCategoryInserts);
      
    if (categoryError) {
      console.error('Error adding rule categories:', categoryError);
      throw categoryError;
    }
  }
  
  return ruleData;
}

// Notification operations
export async function getNotifications(status?: string) {
  let query = supabase
    .from('notifications')
    .select(`
      *,
      loops(id, title)
    `)
    .order('created_at', { ascending: false });
    
  if (status) {
    query = query.eq('status', status);
  }
  
  const { data, error } = await query;
    
  if (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
  
  return data;
}

export async function createNotification(notification: Omit<Notification, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('notifications')
    .insert(notification)
    .select()
    .single();
    
  if (error) {
    console.error('Error creating notification:', error);
    throw error;
  }
  
  return data;
}

export async function updateNotificationStatus(id: string, status: string) {
  const { data, error } = await supabase
    .from('notifications')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    console.error('Error updating notification status:', error);
    throw error;
  }
  
  return data;
}
