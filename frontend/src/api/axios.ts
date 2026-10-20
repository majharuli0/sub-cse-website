import axios from "axios"

/** Error shape every request rejects with (matches Laravel's error JSON). */
export type ApiError = {
  status: number
  message: string
  errors?: Record<string, string[]> // Laravel 422 validation errors
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 15_000,
  headers: { Accept: "application/json" },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      status: error.response?.status ?? 0,
      message: error.response?.data?.message ?? "Something went wrong. Please try again.",
      errors: error.response?.data?.errors,
    }
    return Promise.reject(apiError)
  }
)

export default api
