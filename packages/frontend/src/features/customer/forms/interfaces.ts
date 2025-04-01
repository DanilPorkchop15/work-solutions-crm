export interface CustomerCreateFormValues {
  name: string;
  email: string;
  phone?: string;
  inn?: string;
  website?: string;
}

export type CustomerUpdateFormValues = Partial<CustomerCreateFormValues>;
