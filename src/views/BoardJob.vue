<template>
  <v-card class="contents" elevation="0">
    <SearchBar />
    <v-table class="table-contents">
      <colgroup>
        <col style="width: 5%" />
        <col style="width: 65%" />
        <col style="width: 13%" />
        <col style="width: 17%" />
      </colgroup>
      <thead>
        <tr>
          <th>No.</th>
          <th>제목</th>
          <th>작성일</th>
          <th>작성자</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" :key="item.number" :href="item.link">
          <td>{{ item.number }}</td>
          <td v-if="item.title.length < 60">{{ item.title }}</td>
          <td v-else>{{ item.title.substring(0, 60) + " ..." }}</td>
          <!-- <td>{{ item.content }}</td> -->
          <td>{{ item.dateCreated }}</td>
          <td v-if="item.writer.length < 5">{{ item.writer }}</td>
          <td v-else>{{ item.writer.substring(0, 5) + " ..." }}</td>
        </tr>
      </tbody>
    </v-table>
  </v-card>
</template>

<!-- Json Data
{
  postNum: int           (게시글 번호)
  dateCreated: DATETIME  (등록일)
  title: String              (게시글 제목)
  writer: String           (게시글 작성자)
  link: String               (게시글 링크)
} -->
<script>
import api from "@/api";
import SearchBar from "../components/SearchBar";
export default {
  name: "App",
  components: { SearchBar },
  data: () => ({
    data: [
      {
        number: 1,
        title: "[중앙도서관] 북챌린지 참여하여 독서장학금 받아요!",
        content:
          "겨울방학동안 독서토론 선정도서를 리마인드하고, 목표점수를 획득하면 독서장학금을...",
        dateCreated: "2022-12-30 16:03",
        writer: "작성자",
        link: "https://hannam.ac.kr/kor/community/community_01_1.html?pPostNo=177052",
      },
    ],
  }),
  created() {
    api.get("main/job").then((res) => {
      this.data = res.data;
    });
  },
};
</script>

<style>
.contents {
  padding: 20px;
  margin: 20px;
}

.table-contents {
  padding: 10px;
}

th td {
  border-color: #daf5e0;
}
</style>
