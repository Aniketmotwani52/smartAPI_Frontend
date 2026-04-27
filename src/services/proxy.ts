
  type ProxyRequest = {
    httpMethod: string;
    apiKey: string;
    targetUrl: string;
    pathSuffix: string;
    queryParams: string;
    headers: string;
    requestBody: string;
  };

export const fetchApisByUserId = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}/apis`);
  const data = await response.json();
  // console.log(data.api)
  return data;
};

export const proxyRequestCall = async (formData: ProxyRequest) => {
  const url = `/api/proxy/${formData.apiKey}${formData.pathSuffix}${
    formData.queryParams ? `?${formData.queryParams}` : ""
  }`;

  let headers = {};

  try {
    headers = formData.headers ? JSON.parse(formData.headers) : {};
  } catch {
    console.error("Invalid headers JSON");
  }

  const response = await fetch(url, {
    method: formData.httpMethod,
    headers,
    body:
      formData.httpMethod !== "GET" && formData.requestBody
        ? formData.requestBody
        : undefined,
  });

  const text = await response.text();

  // Try parsing JSON
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};
