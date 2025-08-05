import { 
  Organization, 
  Customer, 
  Service, 
  Feature, 
  CustomerServiceAccess, 
  Event, 
  Session,
  InternalUser,
  UserAccessControl,
  OrganizationMetrics,
  ServiceMetrics,
  FeatureMetrics
} from '@/types/schema';

// Organizations (Customer Companies)
export const organizations: Organization[] = [
  {
    id: '01234567-89ab-cdef-0123-456789abcdef',
    name: 'TechCorp Solutions',
    domain: 'techcorp.com',
    plan_type: 'enterprise',
    status: 'active',
    created_at: '2023-01-15T10:30:00Z'
  },
  {
    id: '11234567-89ab-cdef-0123-456789abcdef',
    name: 'StartupXYZ',
    domain: 'startupxyz.io',
    plan_type: 'pro',
    status: 'active',
    created_at: '2023-03-22T14:15:00Z'
  },
  {
    id: '21234567-89ab-cdef-0123-456789abcdef',
    name: 'GlobalEnterprises Ltd',
    domain: 'globalent.co.uk',
    plan_type: 'enterprise',
    status: 'active',
    created_at: '2022-11-08T09:45:00Z'
  },
  {
    id: '31234567-89ab-cdef-0123-456789abcdef',
    name: 'SmallBiz Inc',
    domain: 'smallbiz.com',
    plan_type: 'starter',
    status: 'active',
    created_at: '2023-06-10T16:20:00Z'
  }
];

// HappyFox Services
export const services: Service[] = [
  {
    id: 'svc-ai-001',
    name: 'ai',
    display_name: 'HappyFox AI Assistant',
    type: 'ai',
    is_active: true
  },
  {
    id: 'svc-hd-001',
    name: 'helpdesk',
    display_name: 'HappyFox Helpdesk',
    type: 'helpdesk',
    is_active: true
  },
  {
    id: 'svc-chat-001',
    name: 'chat',
    display_name: 'HappyFox Chat',
    type: 'chat',
    is_active: true
  },
  {
    id: 'svc-kb-001',
    name: 'knowledge_base',
    display_name: 'HappyFox Knowledge Base',
    type: 'knowledge_base',
    is_active: true
  }
];

// Features within each service
export const features: Feature[] = [
  // AI Service Features
  {
    id: 'feat-ai-chat',
    service_id: 'svc-ai-001',
    name: 'ai_chat',
    display_name: 'AI Chat Assistant',
    feature_type: 'core',
    min_plan: 'pro'
  },
  {
    id: 'feat-ai-sentiment',
    service_id: 'svc-ai-001',
    name: 'sentiment_analysis',
    display_name: 'Sentiment Analysis',
    feature_type: 'premium',
    min_plan: 'enterprise'
  },
  {
    id: 'feat-ai-autorespond',
    service_id: 'svc-ai-001',
    name: 'auto_response',
    display_name: 'Auto Response Generator',
    feature_type: 'premium',
    min_plan: 'pro'
  },

  // Helpdesk Features
  {
    id: 'feat-hd-tickets',
    service_id: 'svc-hd-001',
    name: 'ticket_management',
    display_name: 'Ticket Management',
    feature_type: 'core',
    min_plan: 'starter'
  },
  {
    id: 'feat-hd-automation',
    service_id: 'svc-hd-001',
    name: 'workflow_automation',
    display_name: 'Workflow Automation',
    feature_type: 'premium',
    min_plan: 'pro'
  },
  {
    id: 'feat-hd-reports',
    service_id: 'svc-hd-001',
    name: 'advanced_reporting',
    display_name: 'Advanced Reporting',
    feature_type: 'premium',
    min_plan: 'pro'
  },

  // Chat Features
  {
    id: 'feat-chat-live',
    service_id: 'svc-chat-001',
    name: 'live_chat',
    display_name: 'Live Chat',
    feature_type: 'core',
    min_plan: 'starter'
  },
  {
    id: 'feat-chat-proactive',
    service_id: 'svc-chat-001',
    name: 'proactive_chat',
    display_name: 'Proactive Chat Triggers',
    feature_type: 'premium',
    min_plan: 'pro'
  }
];

// Customers from client organizations
export const customers: Customer[] = [
  {
    id: 'cust-001',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    email: 'admin@techcorp.com',
    name: 'Sarah Johnson',
    role: 'admin',
    status: 'active',
    created_at: '2023-01-16T10:30:00Z'
  },
  {
    id: 'cust-002',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    email: 'agent1@techcorp.com',
    name: 'Mike Chen',
    role: 'agent',
    status: 'active',
    created_at: '2023-01-20T14:15:00Z'
  },
  {
    id: 'cust-003',
    organization_id: '11234567-89ab-cdef-0123-456789abcdef',
    email: 'founder@startupxyz.io',
    name: 'Alex Rivera',
    role: 'admin',
    status: 'active',
    created_at: '2023-03-22T15:00:00Z'
  },
  {
    id: 'cust-004',
    organization_id: '21234567-89ab-cdef-0123-456789abcdef',
    email: 'support.lead@globalent.co.uk',
    name: 'Emma Thompson',
    role: 'admin',
    status: 'active',
    created_at: '2022-11-10T11:30:00Z'
  }
];

// Customer Service Access (handles overlap)
export const customerServiceAccess: CustomerServiceAccess[] = [
  {
    id: 'access-001',
    customer_id: 'cust-001',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    service_id: 'svc-ai-001',
    access_level: 'admin',
    status: 'active',
    last_used_at: '2024-08-04T10:15:00Z'
  },
  {
    id: 'access-002',
    customer_id: 'cust-001',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    service_id: 'svc-hd-001',
    access_level: 'admin',
    status: 'active',
    last_used_at: '2024-08-04T09:30:00Z'
  },
  {
    id: 'access-003',
    customer_id: 'cust-002',
    organization_id: '01234567-89ab-cdef-0123-456789abcdef',
    service_id: 'svc-hd-001',
    access_level: 'user',
    status: 'active',
    last_used_at: '2024-08-04T11:45:00Z'
  },
  {
    id: 'access-004',
    customer_id: 'cust-003',
    organization_id: '11234567-89ab-cdef-0123-456789abcdef',
    service_id: 'svc-chat-001',
    access_level: 'admin',
    status: 'active',
    last_used_at: '2024-08-04T08:20:00Z'
  }
];

// Sample Events
export const events: Event[] = Array.from({ length: 100 }, (_, i) => {
  const now = new Date();
  const timestamp = new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000); // Last 7 days
  
  const randomCustomer = customers[Math.floor(Math.random() * customers.length)];
  const randomService = services[Math.floor(Math.random() * services.length)];
  const randomFeature = features.filter(f => f.service_id === randomService.id)[0];
  
  const eventNames = [
    'login', 'logout', 'feature_used', 'ticket_created', 'chat_started', 
    'ai_query_submitted', 'report_generated', 'settings_updated'
  ];
  
  return {
    id: `evt-${String(i).padStart(3, '0')}`,
    timestamp: timestamp.toISOString(),
    customer_id: randomCustomer.id,
    organization_id: randomCustomer.organization_id,
    service_id: randomService.id,
    feature_id: randomFeature?.id || 'feat-unknown',
    event_name: eventNames[Math.floor(Math.random() * eventNames.length)],
    session_id: `sess-${Math.floor(Math.random() * 50)}`,
    properties: {
      user_agent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ip_address: `192.168.1.${Math.floor(Math.random() * 255)}`,
      duration_ms: Math.floor(Math.random() * 30000)
    }
  };
});

// Internal HappyFox Users
export const internalUsers: InternalUser[] = [
  {
    id: 'int-001',
    email: 'sarah.analytics@happyfox.com',
    name: 'Sarah Analytics',
    department: 'product',
    role: 'admin',
    status: 'active'
  },
  {
    id: 'int-002',
    email: 'mike.support@happyfox.com',
    name: 'Mike Support',
    department: 'support',
    role: 'analyst',
    status: 'active'
  },
  {
    id: 'int-003',
    email: 'emma.sales@happyfox.com',
    name: 'Emma Sales',
    department: 'sales',
    role: 'viewer',
    status: 'active'
  }
];

// Aggregated metrics for dashboard
export const organizationMetrics: OrganizationMetrics[] = organizations.map(org => {
  const orgCustomers = customers.filter(c => c.organization_id === org.id);
  const orgEvents = events.filter(e => e.organization_id === org.id);
  
  return {
    organization: org,
    total_customers: orgCustomers.length,
    active_customers: orgCustomers.filter(c => c.status === 'active').length,
    total_events: orgEvents.length,
    services_used: new Set(customerServiceAccess.filter(a => a.organization_id === org.id).map(a => a.service_id)).size,
    avg_session_duration: 285 // Mock data in seconds
  };
});

export const serviceMetrics: ServiceMetrics[] = services.map(service => {
  const serviceAccess = customerServiceAccess.filter(a => a.service_id === service.id);
  const serviceEvents = events.filter(e => e.service_id === service.id);
  
  return {
    service,
    total_users: serviceAccess.length,
    active_users: serviceAccess.filter(a => a.status === 'active').length,
    total_events: serviceEvents.length,
    features_used: features.filter(f => f.service_id === service.id).length,
    avg_events_per_session: serviceEvents.length > 0 ? Math.round(serviceEvents.length / Math.max(1, new Set(serviceEvents.map(e => e.session_id)).size)) : 0
  };
});

export const featureMetrics: FeatureMetrics[] = features.map(feature => {
  const featureEvents = events.filter(e => e.feature_id === feature.id);
  const serviceUsers = customerServiceAccess.filter(a => a.service_id === feature.service_id && a.status === 'active').length;
  
  return {
    feature,
    total_users: new Set(featureEvents.map(e => e.customer_id)).size,
    total_events: featureEvents.length,
    adoption_rate: serviceUsers > 0 ? Math.round((new Set(featureEvents.map(e => e.customer_id)).size / serviceUsers) * 100) : 0
  };
});
