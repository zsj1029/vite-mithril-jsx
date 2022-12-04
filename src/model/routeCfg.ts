import { Lic, Kanban, Mail, Pwd, User } from "@/coms/icon";

export type Menu = {
  path: string;
  name: string;
  icon?: object;
  children?: Array<Menu>;
};

export const Routes: Array<Menu> = [
  {
    path: "/kanban",
    name: "数据看板",
    icon: Kanban,
  },
  {
    path: "/lic",
    name: "许可证",
    icon: Lic,
    children: [
      {
        path: "/list/wait",
        name: "待发送(3)",
      },
      {
        path: "/list/send",
        name: "已发送",
      },
      {
        path: "/list/soon",
        name: "即将到期(1)",
      },
      {
        path: "/report",
        name: "统计(1)",
      },
    ],
  },
  {
    path: "/mail",
    name: "邮件记录",
    icon: Mail,
    children: [
      {
        path: "/list/all",
        name: "全部",
      },
      {
        path: "/list/failed",
        name: "发送失败",
      },
    ],
  },
  {
    path: "/account",
    name: "用户管理",
    icon: User,
    children: [
      {
        path: "/list",
        name: "用户列表",
      },
      {
        path: "/create",
        name: "创建用户",
      },
    ],
  },
  {
    path: "/alterpassword",
    name: "修改密码",
    icon: Pwd,
  },
];
