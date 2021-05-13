import {get,post} from '../utils/request';
import base from './base';

const api={
    /**
     * 登录 username  password
     */
    getLogin(params){
        return post(base.login,params)
    },
    /**
     * 注册接口
     */
    register(params){
        return post(base.register,params)
    },
    /**
     * 商品列表
     */
     productList(params){
         return get(base.productList,params)
     },
     search(params){
         return get(base.search,params)

     },
     selectItemCategory(params){
        return get(base.selectItemCategory,params)
    },
    insertTbItem(params){
        return get(base.insertTbItem,params)
    },
    deleteItemById(params){
        return get(base.deleteItemById,params)

    },
    updateTbItem(params){
        return get (base.updateTbItem,params)

    },
    batchDelete(params){
        return get (base.batchDelete,params)

    }


}

export default api