const user = () => ({ name: "", email: "", token: "", role: "" });

const userSlice = {
  state: () => JSON.parse(localStorage.getItem("user")) || user(),
  mutations: {
    setUser(state, user) {
      state.name = user.name;
      state.email = user.email;
      state.token = user.token;
      state.role = user.role;
    },
    resetUser(state) {
      state.name = user().name;
      state.email = user().email;
      state.token = user().token;
      state.role = user().role;
    },
  },
  actions: {
    setUser({ commit }, user) {
      user = {
        name: user.name,
        email: user.email,
        token: user.token,
        role: user.role,
      };
      localStorage.setItem("user", JSON.stringify(user));
      commit("setUser", user);
    },
    resetUser({ commit }) {
      localStorage.removeItem("user");
      commit("resetUser");
    },
  },
  getter: {
    User(state) {
      return state;
    },
  },
};
export default userSlice;
