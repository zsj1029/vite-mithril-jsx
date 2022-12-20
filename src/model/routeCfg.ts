import { Lic, Kanban, Mail, Pwd, User, SYS } from "@/coms/icon";

export type Menu = {
  path: string;
  key?: string;
  name: string;
  hide?: boolean;
  action?: boolean; //topbar功能按钮
  icon?: object;
  children?: Array<Menu>;
};

export const Routes: Array<Menu> = [
  // {
  //   path: "/kanban",
  //   name: "数据看板",
  //   icon: Kanban,
  // },
  {
    path: "/lic",
    name: "许可证",
    key: "authorization",
    icon: Lic,
    children: [
      {
        path: "/list/wait",
        name: "待生成(3)",
      },
      {
        path: "/list/send",
        name: "已生成",
      },
      {
        path: "/list/soon",
        name: "即将到期(1)",
      },
      {
        path: "/list/wait/add",
        name: "录入许可证",
        hide: true,
        action: true,
      },
    ],
  },
  // {
  //   path: "/mail",
  //   name: "邮件记录",
  //   icon: Mail,
  //   children: [
  //     {
  //       path: "/list/all",
  //       name: "全部",
  //     },
  //     {
  //       path: "/list/failed",
  //       name: "发送失败",
  //     },
  //   ],
  // },
  {
    path: "/sys",
    name: "系统管理",
    key: "system",
    icon: SYS,
    children: [
      {
        path: "/account/list",
        name: "用户列表",
      },
      {
        path: "/log/list",
        name: "审计日志",
      },
      {
        path: "/account/list/add",
        name: "创建用户",
        hide: true,
        action: true,
      },
    ],
  },
  {
    path: "/alterpassword",
    key: "password",
    name: "修改密码",
    icon: Pwd,
  },
];
