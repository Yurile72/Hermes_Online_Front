// import router from "@/router";
import api from "@/api";
const loginStore = {
  state: {
    userInfo: null,
    isLogin: false,
  },
  mutations: {
    loginSuccess: function (state, payload) {
      state.userInfo = payload;
      state.isLogin = true;
    },
    logoutTest: function (state) {
      state.userInfo = null;
      state.isLogin = false;
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("vuex");
    },
  },
  actions: {
    login(dispatch, loginObj) {
      api.post("/auth/login", loginObj).then((res) => {
        const token = res.data.access_token;
        localStorage.setItem("access_token", token);
        const refretoken = res.data.refresh_token;
        localStorage.setItem("refresh_token", refretoken);
        api.defaults.headers.common.Authorization = `Bearer ${token}`;
        this.dispatch("getMemberInfo");
      });
    },
    logouttest_act({ commit }) {
      commit("logoutTest");
      window.location.href = "/Login";
    },
    getMemberInfo({ commit }) {
      // 토큰으로 유저 정보를 받아오는 코드
      const token = localStorage.getItem("access_token"); // 저장된 access 토큰을 가져옴
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      api
        .get("/user/info", config) // 가져온 토큰을 헤더에 Authorization 로 담아서 요청을 보냄
        .then((response) => {
          const userInfo = response.user;
          commit("loginSuccess", userInfo); // mutations 호출
        })
        .catch((err) => {
          alert("이메일과 비밀번호를 확인하세요.");
          // return false;
        });
    },
  },
};

export default loginStore;
