<template>
  <v-container fluid grid-list-md>
    <h1>Setting</h1>
    <div class="divider"></div>
    <v-container fluid>
      <v-row dense>
        <!-- 새 키워드 -->
        <v-col cols="5" class="ma-2">
          <v-sheet class="keyword" height="120">
            <v-row no-gutters style="margin: 10px">
              <v-col>
                <v-row class="pa-2 ma-2">
                  <v-avatar color="#DAF5E0" size="60">
                    <span class="text-h4">
                      {{ newKeyword[0] }}
                    </span>
                  </v-avatar>
                  <v-text-field
                    label="새 키워드"
                    v-model="newKeyword"
                    variant="underlined"
                    class="ma-2"
                  ></v-text-field>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-switch
                  :value="newKeyword"
                  color="#95CE9F"
                  hide-details
                  inset
                  @click="newKeywordAdd"
                ></v-switch>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
        <!-- 기존 키워드 -->
        <v-col v-for="item in keywords" :key="item" cols="5" class="ma-2">
          <v-sheet class="keywordActive" height="120">
            <v-row no-gutters style="margin: 10px">
              <v-col>
                <v-row class="pa-2 ma-2">
                  <v-avatar color="#DAF5E0" size="60">
                    <span class="text-h4">
                      {{ item[0] }}
                    </span>
                  </v-avatar>
                  <strong>
                    <p>{{ item }}</p>
                  </strong>
                </v-row>
              </v-col>
              <v-col cols="2">
                <v-switch
                  v-model="keywords"
                  color="#95CE9F"
                  :value="item"
                  hide-details
                  inset
                  @click="keywordDel(item)"
                ></v-switch>
              </v-col>
            </v-row>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
import api from "@/api";
export default {
  data: () => ({
    newKeyword: "",
    keywords: ["근로", "장학"],
  }),
  methods: {
    keywordDel(item) {
      console.log(item);
      this.keywords.filter((element) => element !== item);
      const kw = this.keywords.join(" ");
      api.get("/user/update/keywords=" + kw);
      // this.newKeyword = "";
    },
    newKeywordAdd() {
      this.keywords.push(this.newKeyword);
      console.log(this.keywords);
      const kw = this.keywords.join(" ");
      api.get("/user/update/keywords=" + kw);
      this.newKeyword = "";
    },
  },
  created() {
    api.get("/user/read/keywords").then((res) => {
      this.keywords = res.data.user.keywords.split(" ");
    });
    // console.log(this.keywords);
  },
};
</script>

<style scoped>
.divider {
  border: 2px solid #daf5e0;
}

.keywordActive {
  border: 2px solid #e8cfbe;
  border-radius: 10px;
  box-shadow: 5px 5px #f3ebd1;
  background-color: #fcf5f6;
}

.keywordActive p {
  font-size: 28px;
  margin: 15px;
}

.keyword {
  border: 2px solid #e8cfbe;
  border-radius: 10px;
  box-shadow: 5px 5px #f3ebd1;
  background-color: #ffffff;
}
</style>
