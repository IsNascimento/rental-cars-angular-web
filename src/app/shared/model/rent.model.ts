export interface Rent {
  id: number;
  date: Date;
  model: string;
  km: number;
  client: string;
  phone: string;
  returned: boolean;
  paid: boolean;
  value: number;
}
