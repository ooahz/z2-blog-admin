import {defineStore} from "pinia";
import type {Article} from "@/types/article";

export const useArticleStore = defineStore({
  id: "article-id",
  state: () => ({
    article: {} as Article
  }),
  actions: {
    setArticle(article: Article) {
      this.article = article;
    },
    setContent(content: string, htmlContent: string) {
      this.article.content = content;
      this.article.htmlContent = htmlContent;
    },
    setIsDraft(isDraft: boolean) {
      this.article.isDraft = isDraft;
      this.article.id = null;
    },
    updateDate(){
      this.article.updatedDate = new Date();
    },
    initArticle() {
      this.article = {
        content: "",
        weight: 1,
        type: 1,
        createdDate: new Date(),
        updatedDate: new Date()
      }
    },
  }
})
