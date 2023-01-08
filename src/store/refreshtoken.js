import api from "@/api";
// const axiosRefresh = axios.create();
const refreshtoken = {
  state: {},
  mutations: {},
  actions: {
    async refreshtt(dispatch, ReToken) {
      await api.post("/auth/refresh", ReToken).then((response) => {
        const newToken = response.data.access;
        localStorage.setItem("access_token", newToken);
      });
    },
  },
};
export default refreshtoken;
