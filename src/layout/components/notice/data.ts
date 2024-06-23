export interface ListItem {
  avatar: string;
  title: string;
  datetime: string;
  type: string;
  description: string;
  status?: "primary" | "success" | "warning" | "info" | "danger";
  extra?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
}

/**
 * 暂时关闭消息通知
 */
export const noticesData: TabItem[] = [
  // {
  //   key: "1",
  //   name: "消息通知",
  //   list: [
  //     {
  //       avatar: "",
  //       title: "通知一",
  //       description: "介绍",
  //       datetime: "",
  //       extra: "未开始",
  //       status: "info",
  //       type: "3"
  //     },
  //     {
  //       avatar: "",
  //       title: "通知二",
  //       description: "介绍",
  //       datetime: "",
  //       extra: "马上到期",
  //       status: "danger",
  //       type: "3"
  //     },
  //     {
  //       avatar: "",
  //       title: "通知三",
  //       description: "介绍",
  //       datetime: "",
  //       extra: "进行中",
  //       type: "3"
  //     }
  //   ]
  // }
];
