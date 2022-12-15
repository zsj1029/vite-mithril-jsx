import Request, { Api } from "@/utils/request";
import m from "mithril";

export type Role = {
  name: string;
  scope: string;
  name_zh: string;
};

export let RoleList: Array<Role> = [];

export const GetRoles = async () => {
  const resp = await Request("get", Api.Roles);
  RoleList = resp.list;
};
