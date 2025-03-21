export interface Strategy {
    id: string;
    name: string;
    description?: string;
    created: string;
    lastModified: string;
    status: 'active' | 'draft' | 'completed';
    type: string;
    configuration: {
      scanner: any;
      buyTrigger: any;
      sellTrigger: any;
      simulation: any;
    };
  }