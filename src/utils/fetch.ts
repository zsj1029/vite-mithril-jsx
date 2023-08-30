const httpErrors = {
  401: () => {
    // 用户未登录，跳转到登录页
    window.location.href = "/login";
  },
  404: () => {
    // 显示 404 页面
    alert(404);
    //   show404Page();
  },
  500: (response) => {
    // 显示服务器错误页面，并记录错误日志
    alert(JSON.stringify(response));
    //   logServerError(response);
    //   showServerErrorPage();
  },
};

export default async (url, options: RequestInit) => {
  const { timeout = 10000 } = options;

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    console.log(response);
    if (!response.ok) {
      const error = new Error(
        `HTTP Error: ${response.status} - ${response.statusText}`
      );
      error.response = response;

      const handleHttpError = httpErrors[status];

      if (handleHttpError) {
        handleHttpError(response);
      } else {
        throw error;
      }
    }

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    try {
      const data = isJson ? await response.json() : await response.text();
      return data;
    } catch (error) {
      throw new Error("Unable to parse response.");
    }
  } catch (error) {
    clearTimeout(id);

    if (error.name === "AbortError") {
      throw new Error("Request timed out.");
    }

    console.error(error);
    throw error;
  }
};
