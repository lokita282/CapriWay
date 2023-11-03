import httpcommon from "../httpcommon"

export const login = (data) => {
    return httpcommon.post(`/api/token/`, data)
}
