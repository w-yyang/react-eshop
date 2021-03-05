import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import './shoplist.less';

class ShopList extends Component{
    toDetail(shopid){
        this.props.history.push("/detail/" + shopid);
    }

    render(){
        const shopList = this.props.shopList;
        const {category} = this.props
        const baseUrl = "/api/" + category + "/";
        return (
            <div className="shoplist">
                <ul>
                    {
                        shopList.map((item) => {
                            return (
                                <li key={item.shopid} onClick={()=>this.toDetail(item.shopid)}>
                                    <img src={baseUrl+item.imgurl} alt=""/>
                                    <span>{item.shopname}</span>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default withRouter(ShopList);