<template>
  <v-app class="contents-out">
    <v-card class="border-radius rounded-lg" elevation="0">
      <v-layout class="contents-in">
        <div class="text-center ma-2">
          <v-snackbar v-model="snackbar">
            {{ text }}
            <template v-slot:actions>
              <v-btn color="pink" variant="text" @click="snackbar = false">
                Close
              </v-btn>
            </template>
          </v-snackbar>
        </div>
        <v-row no-gutters>
          <!-- <v-col align-self="center"> -->
          <!-- <v-col class="mx-auto px-6 py-8"> -->
          <v-col cols="4" offset="4" align-self="center">
            <v-sheet class="pa-2 ma-2">
              <img
                src="../assets/logo.png"
                alt="logo"
                style="width: 100%; text-align: center"
              />
              <br />
              <br />
              <br />
              <v-form v-model="form" @submit.prevent="onSubmit">
                <v-text-field
                  v-model="email"
                  :readonly="loading"
                  :rules="[required]"
                  class="mb-2"
                  clearable
                  label="Email"
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :readonly="loading"
                  :type="'password'"
                  :rules="[required]"
                  clearable
                  label="Password"
                ></v-text-field>

                <br />

                <v-btn
                  :disabled="!form"
                  :loading="loading"
                  block
                  color="success"
                  size="large"
                  type="submit"
                  variant="elevated"
                >
                  Sign In
                </v-btn>
              </v-form>
            </v-sheet>
          </v-col>
        </v-row>
      </v-layout>
    </v-card>
  </v-app>
</template>

<script>
import api from "@/api";
export default {
  data: () => ({
    form: false,
    email: null,
    password: null,
    loading: false,
    snackbar: false,
    text: "계정 정보를 확인해 주세요.",
  }),
  methods: {
    onSubmit() {
      if (!this.form) return;
      this.loading = true;
      setTimeout(() => (this.loading = false), 1000);

      const saveData = {};
      saveData.email = this.email;
      saveData.password = this.password;
      this.$store.dispatch("login", saveData).then(() => {
        setTimeout(() => this.$router.push("/"), 1000);
      });
      // this.$store.dispatch("login", saveData);
      // this.$router.push("/");
    },
    required(v) {
      return !!v || "Field is required";
    },
  },
};
</script>

<style>
body {
  font-family: "S-CoreDream-3Light", "Noto Sans KR", sans-serif;
}

.contents-out {
  padding: 10px;
  border-radius: 10px;
  height: auto;
}

.contents-in {
  margin: 7px;
  border: 5px solid #ced4f5;
  border-radius: 10px;
  box-shadow: none;
  height: 95vh;
}
</style>
