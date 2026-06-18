const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error || 'Request failed');
  }

  return res.json();
}

function toParams(params: Record<string, string | number | boolean | undefined | null>) {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== '') {
      search.set(key, String(value));
    }
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

import type { Salon, Service, Category, Review, Booking, User } from '../types';

export interface ServiceWithSalon extends Service {
  salons?: Salon;
}

export interface BookingWithRelations extends Booking {
  salons?: Salon;
  services?: Service;
}

export const api = {
  health: () => request<{ status: string }>('/health'),

  getSalons: (params: Record<string, string | number | boolean | undefined> = {}) =>
    request<Salon[]>(`/salons${toParams(params)}`),

  getSalon: (id: string) => request<Salon>(`/salons/${id}`),

  getServices: (params: Record<string, string | number | boolean | undefined> = {}) =>
    request<ServiceWithSalon[]>(`/services${toParams(params)}`),

  getCategories: () => request<Category[]>('/categories'),

  getReviews: (params: Record<string, string | number | undefined> = {}) =>
    request<Review[]>(`/reviews${toParams(params)}`),

  getBookings: (params: Record<string, string | number | undefined> = {}) =>
    request<BookingWithRelations[]>(`/bookings${toParams(params)}`),

  createBooking: (data: Partial<Booking>) =>
    request<Booking>('/bookings', { method: 'POST', body: JSON.stringify(data) }),

  getUsers: (params: Record<string, string | number | undefined> = {}) =>
    request<User[]>(`/users${toParams(params)}`),

  upsertUser: (data: Partial<User> & { email: string }) =>
    request<User>('/users/upsert', { method: 'POST', body: JSON.stringify(data) }),

  login: (email: string, password: string) =>
    request<User>('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  signup: (data: { email: string; password: string; name: string; phone?: string; is_student?: boolean }) =>
    request<User>('/auth/signup', { method: 'POST', body: JSON.stringify(data) }),

  submitContact: (data: { full_name: string; email: string; subject: string; message: string }) =>
    request<{ success: boolean; message: string }>('/contact', { method: 'POST', body: JSON.stringify(data) }),
};
