// 引入request
import request from "@/utils/request";
//获取spulist的接口
export const reqSpuList = (page, limit, category3Id) =>
  request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });
//  获取SPU信息  /admin/product/getSpuById/{spuId} get
export const reqSpuData = (spuId) =>
  request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: "get",
  });
// 获取品牌信息 /admin/product/baseTrademark/getTrademarkList
export const reqbaseTrademark = () =>
  request({
    url: "/admin/product/baseTrademark/getTrademarkList",
    method: "get",
  });
// 获取spu图片 /admin/product/spuImageList/{spuId}
export const reqSpuimg = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
// 获取销售属性 /admin/product/baseSaleAttrList
export const reqbaseSaleAttrList = () =>
  request({
    url: "/admin/product/baseSaleAttrList",
    method: "get",
  });
// 修改或者添加spu /admin/product/updateSkuInfo
export const reqAddOrUpdataSpu = (spuInfo) => {
  // 是否携带ID  是-修改 否-新增
  if (spuInfo.id) {
    return request({
      url: "/admin/product/updateSpuInfo",
      method: "post",
      data: spuInfo,
    });
  } else {
    return request({
      url: "/admin/product/saveSpuInfo",
      method: "post",
      data: spuInfo,
    });
  }
};
// 删除SPU /admin/product/deleteSpu/{spuId}
export const reqdeleteSpu = (spuId) =>
  request({
    url: `/admin/product/deleteSpu/${spuId}`,
    method: "delete",
  });
