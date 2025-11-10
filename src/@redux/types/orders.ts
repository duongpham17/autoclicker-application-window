/*TYPES**************************************************************************************************************/

export interface IOrdersApi {
    _id: string,
    user_id: string,
    email: string,
    credit: number,
    createdAt: number,
};

export interface ResponseType {
    [key: string]: any
};

/*STATE**************************************************************************************************************/

export interface INITIALSTATE {
    orders: IOrdersApi[] | null,
    errors: ResponseType
};

/*ACTION**************************************************************************************************************/

export enum TYPES {
    ORDERS_FIND   = "ORDERS_FIND",
    ORDERS_UPDATE = "ORDERS_UPDATE",
    ORDERS_CREATE = "ORDERS_CREATE",
    ORDERS_REMOVE = "ORDERS_REMOVE",
    ORDERS_ERRORS  = "ORDERS_ERROR",
};

interface Find {
    type: TYPES.ORDERS_FIND,
    payload: IOrdersApi[]
};

interface Update {
    type: TYPES.ORDERS_UPDATE,
    payload: IOrdersApi
};

interface Create {
    type: TYPES.ORDERS_CREATE,
    payload: IOrdersApi
};

interface Remove {
    type: TYPES.ORDERS_REMOVE,
    payload: string
};

interface Errors {
    type: TYPES.ORDERS_ERRORS,
    payload: ResponseType
};

export type ACTIONS = Find | Update | Create | Remove | Errors