export interface TenderIn {
  external_id: string;
  source_name: string;
  title: string;
  description: string;
  publish_date: string;
  deadline: string;
  budget: {
    amount: number;
    currency: string;
  };
  region: string;
  cpv_okpd: string[];
  attachments: Array<{
    name: string;
    url: string;
  }>;
  raw_url: string;
  hash: string;
}

export interface Decision {
  fits: boolean;
  reasons: string[];
  extracted: {
    budget: {
      amount?: number;
      currency?: string;
    };
    deadline: string;
    region: string;
    buyer: string;
    delivery_address: string;
    positions: Array<{
      name: string;
      quantity: number;
      unit: string;
      price?: number;
    }>;
  };
  score: number;
}

export interface Tender extends TenderIn {
  id: string;
  status: 'new' | 'analyzing' | 'fits' | 'rejected' | 'in_work' | 'completed';
  decision?: Decision;
  created_at: string;
  updated_at: string;
  ai_score?: number;
  tags: string[];
}

export interface PlatformConfig {
  id: string;
  name: string;
  slug: string;
  base_url: string;
  country: string;
  enabled: boolean;
  auth: {
    required: boolean;
    type: 'form' | 'cookie' | 'oauth';
    credential_ref?: string;
  };
  anti_bot: {
    strategy_order: string[];
    proxy_profile_id?: string;
    rate_limit_rps: number;
    retry_policy: {
      max: number;
      backoff: string;
      jitter: boolean;
    };
  };
  schedule: {
    cron: string;
  };
  search_mapping: Record<string, any>;
  request: {
    method: 'GET' | 'POST';
    pagination: {
      param: string;
      start: number;
      step: number;
      max: number;
    };
    headers: Record<string, string>;
    cookies: Record<string, string>;
    timeout_sec: number;
  };
  result_selectors: {
    item: string;
    title: string;
    url: string;
    publish_date: string;
    deadline: string;
    budget_amount: string;
    region: string;
    buyer: string;
    attachments: Array<{
      name: string;
      url: string;
    }>;
  };
  export_support: {
    excel: {
      enabled: boolean;
      download_url: string;
      needs_clicks: boolean;
    };
    rss: {
      enabled: boolean;
    };
  };
  qa: {
    shadow_check: boolean;
  };
  version: number;
  created_at: string;
  updated_at: string;
}

export interface KeywordSet {
  id: string;
  name: string;
  include: string[];
  exclude: string[];
  brands: string[];
  okpd2: string[];
  industry_ids: string[];
  match: {
    mode: 'boolean' | 'fuzzy';
    lemmatize: boolean;
    phrase_support: boolean;
    regex: boolean;
  };
  weights: {
    title: number;
    description: number;
    attachments: number;
  };
  version: number;
  created_at: string;
  updated_at: string;
}

export interface Industry {
  id: string;
  name: string;
  synonyms: string[];
  okpd2: string[];
  default_keyword_set_id?: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface SearchPreset {
  id: string;
  name: string;
  platform_ids: string[];
  keyword_set_id?: string;
  industry_id?: string;
  rules: {
    budget_min?: number;
    budget_max?: number;
    region?: string[];
    deadline_days_max?: number;
    stage?: string[];
    hide_without_price?: boolean;
    only_without_sec_contract?: boolean;
    only_without_sec_bid?: boolean;
  };
  schedule: {
    cron: string;
  };
  enabled: boolean;
  created_at: string;
  updated_at: string;
}