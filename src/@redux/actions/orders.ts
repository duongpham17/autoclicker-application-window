import { Dispatch } from 'redux';
import { ACTIONS, TYPES, IOrdersApi } from '@redux/types/orders';
import { api } from '@redux/api';

const endpoint = "/orders"

const find = () => async (dispatch: Dispatch<ACTIONS>) =>  {
    try{
        const res = await api.get(`${endpoint}`);
        dispatch({
            type: TYPES.ORDERS_FIND,
            payload: res.data.data as IOrdersApi[]
        });
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.ORDERS_ERRORS,
            payload: {find: error.response.data.message}
        });
    }
};

const create = () => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.post(`${endpoint}`);
        dispatch({
            type: TYPES.ORDERS_CREATE,
            payload: res.data.data as IOrdersApi
        });
        return res.data.data as IOrdersApi
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.ORDERS_ERRORS,
            payload: {create: error.response.data.message}
        });
    }
};

const update = (data: IOrdersApi) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        const res = await api.patch(`${endpoint}`, data);
        dispatch({
            type: TYPES.ORDERS_UPDATE,
            payload: res.data.data as IOrdersApi
        });
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.ORDERS_ERRORS,
            payload: {update: error.response.data.message}
        });
    }
};

const remove = (id: string) => async (dispatch: Dispatch<ACTIONS>) => {
    try{
        await api.delete(`${endpoint}/${id}`);
        dispatch({
            type: TYPES.ORDERS_REMOVE,
            payload: id
        });
    } catch(error:any){
        console.log(error.response);
        dispatch({
            type: TYPES.ORDERS_ERRORS,
            payload: {remove : error.response.data.message}
        });
    }
};

const Orders = {
    find,
    create,
    update,
    remove
};

export default Orders;