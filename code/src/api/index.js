import ajax from './ajax';

const BASE = '/api';

export const userLogin = (userData) => ajax(BASE+'/admin/login', userData, 'post');

export const addUser = (userData) => ajax(BASE+'/admin/user/adduser', userData, 'post');

export const getUser = (userdata) => ajax(BASE+'/admin/user/getusermsg', userdata, 'post');

export const alterUser = (alterobj) => ajax(BASE+'/admin/user/altermsg', alterobj, 'post');

export const getShowShop = (category) => ajax(BASE+'/shop/showshop/'+category);

export const getShop = (category) => ajax(BASE+'/shop/'+category);//需要穿一个对象 表示参数

export const getThisShop = (shopid) => ajax(BASE+'/shop/getoneshop/'+shopid);

export const addCart = (obj) => ajax(BASE+'/admin/cart/addtocart', obj, 'post');

export const delCartMsg = (cartid, token) => ajax(BASE+'/admin/cart/delcartmsg/'+cartid, {token: token});

export const getCartList = (userdata) => ajax(BASE+'/admin/cart/getcartlist', userdata, 'post');

export const getBillList = (userdata) => ajax(BASE+'/admin/bill/', userdata);

export const delBillMsg = (billid, token) => ajax(BASE+'/admin/bill/delbill/'+billid, {token: token});

export const buyShop = (obj) => ajax(BASE+'/admin/bill/buyshop', obj, 'post');