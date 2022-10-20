import request from "@/utils/request";
//  获取图片接口 /admin/product/spuImageList/{spuId} get
export const reqspuimgList = (spuId) =>
  request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
// /admin/product/spuSaleAttrList/{spuId} get 获取销售属性
export const reqSpuSaleAttrList = (spuId) =>
  request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get",
  });
// 获取商品基础属性  /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = (category1Id, category2Id, category3Id) =>
  request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
// /admin/product/saveSkuInfo 添加SKU
export const reqAddSku = (skuInfo) =>
  request({
    url: "/admin/product/saveSkuInfo",
    method: "post",
    data: skuInfo,
  });
// 获取spu下的sku列表数据 /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) =>
  request({
    url: `/admin/product/findBySpuId/${spuId}`,
    method: "get",
  });
// /admin/product/list/{page}/{limit} sku列表数据
export const reqSkuInfo = (page, limit) =>
  request({
    url: `/admin/product/list/${page}/${limit}`,
    method: "get",
  });
// 上架 /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) =>
  request({
    url: `/admin/product/onSale/${skuId}`,
    method: "get",
  });
// 下架 /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) =>
  request({
    url: `/admin/product/cancelSale/${skuId}`,
    method: "get",
  });
// 获取sku详情
export const reqskudata = (skuId) =>
  request({
    url: `/admin/product/getSkuById/${skuId}`,
    method: "get",
  });
