import React, {Component} from 'react';
import {
    Button,
    Toast
} from 'antd-mobile';
import {withRouter} from 'react-router-dom';

import store from '../../../stores/stores';
import {addCart} from '../../../api/index';

import './detailbar.less';
import { getToken } from '../../../utils/tokenutil';

class DetailBar extends Component{
    toBuy(){
        let shopid = this.props.shopmsg.shopid;
        console.log(this.props);
        this.props.history.push("/buy/" + shopid);
    };

    async addToCart(shopmsg){
        let {login} = store.getState().reducers.userInfo;
        if(!login){
            this.props.history.push("/login");
        }else{
            let addObj = {
                username: 'qwe',
                shopid: shopmsg.shopid,
                shopname: shopmsg.shopname,
                price: shopmsg.price,
                imgurl: shopmsg.imgurl,
                category: shopmsg.category,
                token: getToken()
            };
            let result = await addCart(addObj);
            Toast.success(result.msg, 1);
        }
    }

    render(){
        return (
            <div className="detailbar">
                <Button className="buybtn" onClick={()=>this.toBuy()}>立即购买</Button>
                <Button className="addcart" onClick={()=>this.addToCart(this.props.shopmsg)}>加入购物车</Button>
            </div>
        )
    }
}

export default withRouter(DetailBar);