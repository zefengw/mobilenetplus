export interface BasePlan {
  id: number;
  name: string;
  price: number;
  location: string;
  details: string;
  isDeal?: boolean;
}

export interface MobilePlan extends BasePlan {
  data: string;
}

export interface InternetPlan extends BasePlan {
  speed: string;
}

export interface TVPlan extends BasePlan {
  channels: string;
}

export interface SecurityPlan extends BasePlan {
  features: string;
}

