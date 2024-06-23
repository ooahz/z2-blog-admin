import {defineStore} from "pinia";
import Vditor from "vditor";

export const useVditorStore = defineStore({
  id: "vditor-id",
  state: () => ({
    vditor: {} as Vditor
  }),
  actions: {
    setValue(value: string) {
      this.vditor.setValue(value);
    },
    updateContent(value: string) {
      if (!!this.vditor.vditor) {
        this.vditor.setValue(value);
      }
    },
    setVditor(vditor: Vditor) {
      this.vditor = vditor;
    }
  }
})
