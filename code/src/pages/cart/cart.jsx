import React, {Component} from 'react';

import store from '../../stores/stores';
import {
    delCartMsg,
    getCartList    
} from '../../api/index';
import {getToken} from '../../utils/tokenutil';
import './cart.less';

class Cart extends Component{
    state = {
        cartMsgList: []
    }

    toBuy(shopid){
        this.props.history.push("/buy/" + shopid);
    }

    async delFromCart(cardid){
        let result = await delCartMsg(cardid, getToken());
        // console.log(result);
        this.getAllMsg()
    }

    async getAllMsg(){
        let result = await getCartList({
            username: 'qwe',
            token: getToken()
        });
        this.setState({
            cartMsgList: result.cartlist
        });
    }

    componentDidMount(){
        let {login} = store.getState().reducers.userInfo;
        if(!login){
            this.props.history.push("/login");
        }
        this.getAllMsg();
    }

    render(){
        const baseUrl = '/api/';
        return (
            <div className="cart">
                <div className="cart-title"></div>
                <div className="cart-body">
                    <ul>
                        {
                            this.state.cartMsgList.map(item => {
                                return (
                                    <li key={item.cartid}>
                                        <img src={baseUrl+item.category+'/'+item.imgurl} alt=""/>
                                        <span>{item.shopname}</span>
                                        <p>￥{item.price}</p>
                                        <div className="operate">
                                            <button onClick={()=>this.toBuy(item.shopid)}>立即购买</button>
                                            <button onClick={()=>this.delFromCart(item.cartid)}>移除</button>
                                        </div>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

export default Cart;