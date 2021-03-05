import React, {Component} from 'react';
import { 
    Toast,
    Stepper
} from 'antd-mobile';

import {
    getThisShop,
    buyShop,
    getUser,
} from '../../api/index';
import {getToken} from '../../utils/tokenutil';
import './buy.less';
import store from '../../stores/stores';

export default class Buy extends Component{
    state = {
        shopdata: {},
        count: 1,
        usermsg: {}
    };

    async buy(){
        let date = new Date();
        let time = date.getFullYear() + '-'+ (1 + date.getMonth()) + '-' + date.getDate();
        let count = this.state.count;
        let price = this.state.shopdata.price;
        let billObj = {
            username: 'qwe',
            shopname: this.state.shopdata.shopname,
            date: time,
            price:  count * price,
            token: getToken()
        };
        let result = await buyShop(billObj);
        Toast.success(result.msg, 1);
    }

    async getUserMsg(){
        let userdata = await getUser({username: 'qwe', token: getToken()});
        this.setState({
            usermsg: userdata.usermsg
        });
    }

    async getShop(){
        let {id} = this.props.match.params;
        let shopmsg = await getThisShop(id)
        this.setState({
            shopdata: shopmsg.shopdata
        });
    }

    onChange = (val) => {
        this.setState({
            count: val
        });
    }

    componentDidMount(){
        let {login} = store.getState().reducers.userInfo;
        if(!login){
            this.props.history.push("/login");
        }
       this.getUserMsg();
       this.getShop();
    }

    render(){
        const {shopname, category, imgurl, price} = this.state.shopdata;
        const {username, phone, address} = this.state.usermsg;
        const baseUrl = '/api/';
        return (
            <div className="buy">
                <div className="usermsg">
                    <i className="iconfont icon-dingwei"></i><span className="address">{address}</span>
                    <p><i className="iconfont icon-yonghu1"></i>{username}&nbsp;&nbsp;&nbsp;&nbsp;<i className="iconfont icon-shouji"></i>{phone}</p>
                </div>
                <hr/>
                <div className="shopmsg">
                    <img src={baseUrl+category+'/'+imgurl} alt=""/>
                    <div className="msg">
                        <p className="shopname">{shopname}</p>
                        <div className="count">
                            <span>数量</span>
                            <Stepper
                                style={{ width: '90px', marginLeft: '10px'}}
                                showNumber
                                max={10}
                                min={1}
                                value={this.state.count}
                                onChange={this.onChange}
                            />
                        </div>
                        <p className="price">￥{price * this.state.count}</p>
                    </div>
                </div>
                <div className="other">
                        <tr>
                            <td>商品金额</td>
                            <td>￥{price * this.state.count}</td>
                        </tr>
                        <tr>
                            <td>退换无忧</td>
                            <td>￥0.0</td>
                        </tr>
                        <tr>
                            <td>运费</td>
                            <td>免运费</td>
                        </tr>
                </div>
                <div className="paymoney">
                    {/* ant-mobile Button包含的文字中中不可嵌套{表达式} */}
                    <button className="submit" onClick={()=>this.buy()}>￥{price * this.state.count}&nbsp;&nbsp;&nbsp;&nbsp;交&nbsp;易</button>
                </div>
            </div>
        )
    }
};