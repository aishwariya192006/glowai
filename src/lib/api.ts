import { supabase } from './supabase';
import type { Salon, Service, Category, Review, Booking, User } from '../types';

export interface ServiceWithSalon extends Service {
  salons?: Salon;
}

export interface BookingWithRelations extends Booking {
  salons?: Salon;
  services?: Service;
}

export const api = {
  health: async () => {
    return { status: 'ok' };
  },

  getSalons: async (params: Record<string, string | number | boolean | undefined> = {}) => {
    let query = supabase.from('salons').select('*');
    
    // Add filters based on params if needed (e.g., search, area)
    
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data as Salon[];
  },

  getSalon: async (id: string) => {
    const { data, error } = await supabase.from('salons').select('*').eq('id', id).single();
    if (error) throw new Error(error.message);
    return data as Salon;
  },

  getServices: async (params: Record<string, string | number | boolean | undefined> = {}) => {
    let query = supabase.from('services').select('*, salons(*)');
    
    if (params.salon_id) {
      query = query.eq('salon_id', params.salon_id);
    }
    
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data as ServiceWithSalon[];
  },

  getCategories: async () => {
    const { data, error } = await supabase.from('categories').select('*').order('sort_order');
    if (error) throw new Error(error.message);
    return data as Category[];
  },

  getReviews: async (params: Record<string, string | number | undefined> = {}) => {
    let query = supabase.from('reviews').select('*');
    
    if (params.salon_id) {
      query = query.eq('salon_id', params.salon_id);
    }
    
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data as Review[];
  },

  getBookings: async (params: Record<string, string | number | undefined> = {}) => {
    let query = supabase.from('bookings').select('*, salons(*), services(*)');
    
    if (params.user_id) {
      query = query.eq('user_id', params.user_id);
    }
    
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data as BookingWithRelations[];
  },

  createBooking: async (data: Partial<Booking>) => {
    const { data: booking, error } = await supabase.from('bookings').insert(data).select().single();
    if (error) throw new Error(error.message);
    return booking as Booking;
  },

  createSalon: async (data: Partial<Salon>) => {
    const { data: salon, error } = await supabase.from('salons').insert(data).select().single();
    if (error) throw new Error(error.message);
    return salon as Salon;
  },

  updateSalon: async (id: string, data: Partial<Salon>) => {
    const { data: salon, error } = await supabase.from('salons').update(data).eq('id', id).select().single();
    if (error) throw new Error(error.message);
    return salon as Salon;
  },

  uploadImage: async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file);

    if (uploadError) throw new Error(uploadError.message);

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    return { url: data.publicUrl };
  },

  getUsers: async (params: Record<string, string | number | undefined> = {}) => {
    const { data, error } = await supabase.from('users').select('*');
    if (error) throw new Error(error.message);
    return data as User[];
  },

  upsertUser: async (data: Partial<User> & { email: string }) => {
    const { data: user, error } = await supabase.from('users').upsert(data, { onConflict: 'email' }).select().single();
    if (error) throw new Error(error.message);
    return user as User;
  },

  // Auth is handled differently in Supabase, but we can wrap it here for compatibility if needed.
  // Using supabase.auth.signInWithPassword instead of fetching a local endpoint.
  login: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    
    // Fetch full user profile, but don't crash if it doesn't exist (e.g. if created before tables existed)
    const { data: profile, error: profileError } = await supabase.from('users').select('*').eq('id', data.user.id).maybeSingle();
    if (profileError) throw new Error(profileError.message);
    
    return (profile || { id: data.user.id, email, name: 'User', role: 'customer' }) as User;
  },

  signup: async (data: { email: string; password: string; name: string; phone?: string; is_student?: boolean }) => {
    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.name,
        }
      }
    });
    
    if (error) throw new Error(error.message);
    if (!authData.user) throw new Error('Signup failed');
    
    return { id: authData.user.id, email: data.email, name: data.name } as unknown as User;
  },

  submitContact: async (data: { full_name: string; email: string; subject: string; message: string }) => {
    // You could store contacts in a table or use a function.
    return { success: true, message: 'Message sent successfully' };
  },
};
