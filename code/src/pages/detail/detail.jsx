import React, {Component} from 'react';

import DetailBar from './detailbar/detailbar.jsx';
import {getThisShop} from '../../api/index';
import './detail.less';

export default class Detail extends Component{
    state = {
        shopdata: {}
    };

    async componentDidMount(){
        let {shopid} = this.props.match.params;
        let result = await getThisShop(shopid);
        this.setState({
            shopdata: result.shopdata
        });
    }

    render(){
        const {shopname, category, imgurl, shopid, price} = this.state.shopdata;
        const baseUrl = "/api/";
        return (
            <div className="detail">
                <div className="detailmsg">
                    <img src={baseUrl+category+'/'+imgurl} alt=""/>
                    <div className="shopmsg">
                        <span className="price">
                            ￥{price}
                        </span>
                        <span className="shopname">
                            {shopname}
                        </span>
                        <p className="description">
                            2021年优质商品，物美价廉经济实惠，特色产品精品水果,物美价廉经济实惠，特色产品精品水果物美价廉经济实惠，特色产品精品水果。
                        </p>
                    </div>
                    <div className="discount">
                        <div className="discount-msg">
                            <span>优惠</span>
                            <p>满三件赠1件</p>
                            <span>活动</span>
                            <p>逢节日打5折</p>
                            <span>运费</span>
                            <p>免运费</p>
                        </div>
                    </div>
                </div>
                <DetailBar shopmsg={this.state.shopdata}/>
            </div>
        )
    }
}