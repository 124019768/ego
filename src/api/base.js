const base={
    baseUrl:'http://localhost:5000',
    login:'/api/api/login',//登录接口
    register:'/api/api/register',//注册接口
    productList:"/api/api/projectList",//商品信息 page
    search:"/api/api/search",
    selectItemCategory:"/api/api/backend/itemCategory/selectItemCategoryByParentId",//类目选择 id
    upload:'/api/upload',//上图图片接口
    insertTbItem:'/api/api/backend/item/insertTbItem',
    deleteItemById:"/api/api/backend/item/deleteItemById",
    updateTbItem:'/api/api/backend/item/updateTbItem',
    batchDelete:'/api/api/batchDelete'
}

export default base