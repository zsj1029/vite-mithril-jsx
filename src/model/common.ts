import Request, { Api } from "@/utils/request";
import m from "mithril";

export type Role = {
  name: string;
  scope: string;
  name_zh: string;
};

export type Product = {
  product: string;
  product_classify: string;
  product_code: string;
};
export let RoleList: Array<Role> = [];

export let ProductList: Array<Product> = [];

export const GetRoles = async () => {
  const resp = await Request("get", Api.Roles);
  RoleList = resp.list;
};

export const GetProducts = async () => {
  const resp = await Request("get", Api.Products);
  ProductList = resp.list;
};
