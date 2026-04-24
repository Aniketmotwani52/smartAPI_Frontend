export type ApiMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

export interface ApiRecord {
  id: string;
  method: ApiMethod;
  targetUrl: string;
  apiKey: string;
  createdAt?: string;
}
