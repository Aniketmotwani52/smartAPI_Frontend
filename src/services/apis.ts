import { apiRequest } from "./apiClient";
import type { ApiMethod, ApiRecord } from "../components/apis/apiTypes";

interface GetApiResponseDto {
  apiKey: string;
  targetUrl: string;
  method: ApiMethod;
  userId: string;
}

interface CreateApiRequestDto {
  method: ApiMethod;
  targetUrl: string;
  userId: string;
}

interface CreateApiResponseDto {
  apiKey: string;
  method: ApiMethod;
  targetUrl: string;
}

const mapApiResponseToRecord = (
  api: GetApiResponseDto | CreateApiResponseDto,
): ApiRecord => {
  return {
    id: `${api.method}-${api.targetUrl}-${api.apiKey}`,
    method: api.method,
    targetUrl: api.targetUrl,
    apiKey: api.apiKey,
    createdAt: undefined,
  };
};

export const getApis = async (): Promise<ApiRecord[]> => {
  const response = await apiRequest<GetApiResponseDto[]>("/api");

  return response.map(mapApiResponseToRecord);
};

export const createApi = async (
  request: CreateApiRequestDto,
): Promise<ApiRecord> => {
  const response = await apiRequest<CreateApiResponseDto>("/api", {
    method: "POST",
    data: request,
  });

  return mapApiResponseToRecord(response);
};
