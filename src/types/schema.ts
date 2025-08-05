// HappyFox Product Analytics Schema Types

export interface Organization {
  id: string;
  name: string;
  domain: string;
  plan_type: 'starter' | 'pro' | 'enterprise';
  status: 'active' | 'cancelled';
  created_at: string;
}

export interface Customer {
  id: string;
  organization_id: string;
  email: string;
  name: string;
  role: 'admin' | 'agent' | 'user';
  status: 'active' | 'suspended';
  created_at: string;
}

export interface Service {
  id: string;
  name: string; // Code name (e.g., 'ai', 'helpdesk')
  display_name: string; // Human readable name
  type: 'ai' | 'helpdesk' | 'chat' | 'knowledge_base' | 'automation';
  is_active: boolean;
}

export interface Feature {
  id: string;
  service_id: string;
  name: string; // Feature code (e.g., 'ai_chat')
  display_name: string; // Human readable name
  feature_type: 'core' | 'premium' | 'addon';
  min_plan: 'starter' | 'pro' | 'enterprise';
}

export interface CustomerServiceAccess {
  id: string;
  customer_id: string;
  organization_id: string;
  service_id: string;
  access_level: 'user' | 'admin';
  status: 'active' | 'revoked';
  last_used_at: string;
}

export interface Event {
  id: string;
  timestamp: string;
  customer_id: string;
  organization_id: string;
  service_id: string;
  feature_id: string;
  event_name: string;
  session_id: string;
  properties?: Record<string, any>;
}

export interface Session {
  session_id: string;
  customer_id: string;
  service_id: string;
  start_time: string;
  end_time?: string;
  duration?: number; // in seconds
  events_count: number;
}

export interface InternalUser {
  id: string;
  email: string;
  name: string;
  department: 'product' | 'engineering' | 'support' | 'sales' | 'marketing';
  role: 'admin' | 'analyst' | 'manager' | 'viewer';
  status: 'active' | 'inactive';
}

export interface Role {
  role: string;
  description: string;
  permissions: string[];
}

export interface UserAccessControl {
  user_id: string;
  organization_id?: string; // Optional - if null, user has access to all orgs
  service_id?: string; // Optional - if null, user has access to all services
  access_level: 'readonly' | 'full';
}

// Analytics aggregation types
export interface OrganizationMetrics {
  organization: Organization;
  total_customers: number;
  active_customers: number;
  total_events: number;
  services_used: number;
  avg_session_duration: number;
}

export interface ServiceMetrics {
  service: Service;
  total_users: number;
  active_users: number;
  total_events: number;
  features_used: number;
  avg_events_per_session: number;
}

export interface FeatureMetrics {
  feature: Feature;
  total_users: number;
  total_events: number;
  adoption_rate: number; // percentage of service users who use this feature
}

export interface DashboardFilters {
  date_range: {
    start: string;
    end: string;
  };
  organizations?: string[];
  services?: string[];
  features?: string[];
  plan_types?: string[];
}
