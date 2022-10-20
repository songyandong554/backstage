// 获取品牌管理的数据模块
// /admin/product/baseTrademark/{page}/{limit}
import request from "@/utils/request";
export const reqTrademark = (page, limit) =>
  request({
    url: `/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });
// 新增品牌请求  /admin/product/baseTrademark/save
// 修改品牌请求 /admin/product/baseTrademark/update
export const reqaddOrTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    // 修改品牌请求
    return request({
      url: "/admin/product/baseTrademark/update",
      method: "put",
      data: tradeMark,
    });
  } else {
    // 新增品牌请求
    return request({
      url: "/admin/product/baseTrademark/save",
      method: "post",
      data: tradeMark,
    });
  }
};
// 删除品牌请求
// /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) =>
  request({
    url: `/admin/product/baseTrademark/remove/${id}`,
    method: "delete",
  });
