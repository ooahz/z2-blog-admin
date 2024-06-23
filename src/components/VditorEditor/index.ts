import {useVditorStore} from "@/store/vditor";
import {useArticleStore} from "@/store/article";
import Vditor from "vditor";

const vditorStore = useVditorStore()
const articleStore = useArticleStore();

export function vditorInit() {
  vditorStore.setVditor(new Vditor("ahzoo-editor", {
      after: () => {
        vditorStore.setValue(articleStore.article?.content)
      },
      theme: "classic",
      // 使用localStorage缓存
      cache: {
        enable: true,
      },
      icon: "material",
      // cdn: "https://s.ahzoo.cn/comment/plugin",
      // 工具栏
      // toolbar: ["emoji", "link", "code", "inline-code"],
      preview: {
        hljs: {
          enable: true,
          style: "base16-snazzy",
          langs: ["java", "html", "javascript"]
        },
      },
      upload: {
        accept: "image/*",
        token: "ahzoo",
        // 图片上传地址
        url: "/v1/comment/upload",
        // 对剪切板中的第三方图片链接重新上传
        linkToImgUrl: "/v1/comment/upload",
        max: 1 * 1024 * 1024,
        // 文件名处理
        filename(name) {
          return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "").replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "").replace("/\\s/g", "")
        },
        // 上传成功回调
        success(editor: HTMLPreElement, msg: string) {
          // tipsMsg.value = "图片上传功能未开启！"
          // vditor.value!.insertValue("value: string")
        },
        error(msg: string) {
          // tipsMsg.value = "图片上传功能未开启！"
        }
      },
    })
  )
}
