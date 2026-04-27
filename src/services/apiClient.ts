import axios, { AxiosError, type AxiosRequestConfig } from "axios";

class ApiClientError extends Error {
  status: number;
  field?: string | null;

  constructor(message: string, status: number, field?: string | null) {
    super(message);
    this.status = status;
    this.field = field;
  }
}

interface ErrorResponse {
  message?: string;
  field?: string | null;
}

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiRequest = async <T>(
  path: string,
  config: AxiosRequestConfig = {},
): Promise<T> => {
  try {
    const response = await apiClient.request<T>({
      url: path,
      ...config,
    });

    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData = error.response?.data as ErrorResponse | undefined;
      const errorMessage =
        errorData?.message ??
        error.message ??
        "Something went wrong while contacting the backend.";

      throw new ApiClientError(
        errorMessage,
        error.response?.status ?? 500,
        errorData?.field,
      );
    }

    throw error;
  }
};

export { ApiClientError, apiClient };
