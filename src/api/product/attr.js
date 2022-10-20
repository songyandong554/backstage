// 平台属性管理模块请求文件
import request from "@/utils/request";
// 一级分类
export const reqgetCategory1 = () =>
  request({ url: "/admin/product/getCategory1", method: "get" });
// 二级分类
export const reqgetCategory2 = (category1Id) =>
  request({ url: `/admin/product/getCategory2/${category1Id}`, method: "get" });
// 三级分类
export const reqgetCategory3 = (category2Id) =>
  request({ url: `/admin/product/getCategory3/${category2Id}`, method: "get" });
// 获取平台属性接口 /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqattrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
//   添加属性与属性值的接口 /admin/product/saveAttrInfo post
/* {
  "attrName": "string",
  "attrValueList": [
    {
      "attrId": 0,
      "id": 0,
      "valueName": "string"
    }
  ],
  "categoryId": 0,
  "categoryLevel": 0,
  "id": 0
} */
export const reqAddorUpdataAttr = (data) =>
  request({
    url: "/admin/product/saveAttrInfo",
    method: "post",
    data
  });
  // /admin/product/deleteAttr/{attrId}
  export const reqdeleAttr = (attrId) =>
  request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: "delete",
  });