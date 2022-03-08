import qs from "qs";
const url = process.env.REACT_APP_API_URL;

export const http = <T>(
  api: string,
  method: "GET" | "POST" | "DELETE" | "PATCH",
  data: any,
  config: any = {}
) => {
  return new Promise<T>((resolve, reject) => {
    (() => {
      if (method === "GET") {
        const query = qs.stringify(data);
        return fetch(`${url}${api}?${query}`, {
          method: method,
          headers: {
            Authorization: config.token ? `Bearer ${config?.token}` : "token",
            "Content-Type": "application/json",
          },
          ...config,
        });
      } else if (method === "POST" || method === "PATCH") {
        return fetch(`${url}${api}`, {
          method: method,
          headers: {
            Authorization: config.token ? `Bearer ${config?.token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } else {
        return fetch(`${url}${api}`, {
          method: method,
          headers: {
            Authorization: config.token ? `Bearer ${config?.token}` : "",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      }
    })()
      .then(async (res) => {
        resolve(await res.json());
      })
      .catch((e) => console.warn(e));
  });
};
