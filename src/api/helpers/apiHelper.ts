import axios, { AxiosResponse } from 'axios';
import config from '../../../tests/config/config.js';

interface Token {
  name: string | null;
  symbol: string | null;
  decimals: number;
  mint: string;
  imageUri: string;
  accounts: any[]; // Replace `any` with a more specific type
  coingeckoId: string | null;
  verified: boolean;
  totalUiAmount: number;
  standard: string;
  price?: any; // Replace `any` with a more specific type
  solPrice?: any; // Replace `any` with a more specific type 
  swappable?: boolean;
  isLimitOrderable?: boolean;
  onrampTokenId?: string;
  offrampTokenId?: string;
  actions: any[]; // Replace `any` with a more specific type
}

export default class ApiHelper {
  static async getTokens(network?: string): Promise<AxiosResponse<{ tokens: Token[] }>> {
    const url = network ? 
      `${config.BASE_URL}/${config.ADDRESS}?network=${network}` : 
      `${config.BASE_URL}/${config.ADDRESS}`;
    return axios.get<{ tokens: Token[] }>(url, { headers: { Authorization: config.AUTH_TOKEN } });
  }

  static async getTokensWithInvalidAddress(): Promise<AxiosResponse> {
    return axios.get(`${config.BASE_URL}/invalid-address`, {
      headers: { Authorization: config.AUTH_TOKEN }
    });
  }
}