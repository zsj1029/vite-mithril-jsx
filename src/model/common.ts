import Request, {Api} from "@/utils/request";

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
    const module = await Request("get", Api.Modules);
    if (module.permission.includes("role_item")) {
        const resp = await Request("get", Api.Roles);
        RoleList = resp.list;
    }
};

export const GetProducts = async () => {
    const resp = await Request("get", Api.Products);
    ProductList = resp.list;
};

export let WaitNum = 0;

export let SoonNum = 0;

export const GetPrevNum = async () => {
    let resp = await Request("get", Api.LicenseList, {
        page: 0,
        size: 1,
        sort: "[]",
        filters: JSON.stringify({status: 0}),
    });
    WaitNum = resp.total;
    resp = await Request("get", Api.LicenseList, {
        page: 0,
        size: 1,
        sort: "[]",
        filters: JSON.stringify({status: 1, countdown: 120, license_status: 1}),
    });
    SoonNum = resp.total;
};

export const GetPrev = {
    timer: false,
    startTimer() {
        if (!this.timer) {
            GetPrevNum();
            this.timer = setInterval(GetPrevNum, 60 * 1000);
        }
    },
    clearTimer() {
        clearInterval(this.timer);
        this.timer = false;
    },
};
