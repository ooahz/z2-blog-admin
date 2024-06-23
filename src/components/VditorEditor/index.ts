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
      // cdn: "",
      // 工具栏
      toolbar: [
        "headings",
        "bold",
        "italic",
        "strike",
        "|",
        "table",
        "list",
        "ordered-list",
        "check",
        "outdent",
        "indent",
        "|",
        "link",
        "quote",
        "line",
        "code",
        "inline-code",
        "insert-before",
        "insert-after",
        "|",
        "undo",
        "redo",
        "|",
        "edit-mode",
        {
          name: "more",
          toolbar: [
            "both",
            "code-theme",
            "content-theme",
            "export",
            "outline",
            "preview",
          ],
        },
      ],
      preview: {
        hljs: {
          enable: true,
          style: "base16-snazzy",
          langs: ["java", "html", "javascript", "shell"]
        },
      },
      upload: {
        accept: "image/*",
        token: "ahzoo",
        // 图片上传地址
        url: "",
        // 对剪切板中的第三方图片链接重新上传
        linkToImgUrl: "",
        // 最大上传文件大小 10M
        max: 10 * 1024 * 1024,
        // 文件名处理
        filename(name) {
          return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, "").replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, "").replace("/\\s/g", "")
        },
        // 上传成功回调
        success(editor: HTMLPreElement, msg: string) {
          // vditor.value!.insertValue("value: string")
        },
        // 上传失败回调
        error(msg: string) {
        }
      },
    })
  )
}
