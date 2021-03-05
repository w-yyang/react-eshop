import React from 'react';

import Lunbo from './lunbo/lunbo.jsx';
import './home.less';
import {getShowShop} from '../../api';
import getCategory from '../../utils/getcate';

export default class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            shopShow: [],
            category: '',
            selected: 1
        }
    }

    nameArr = ["日用","服饰","美食","书籍","五金","水果"];
    iconArr = ["shenghuobaihuo","yifu","shiwu-","shuji","metal","shuiguo"];

    async changeSelect(index){
        let nowCategory = getCategory(index);
        let res = await getShowShop(nowCategory);
        this.setState({
            shopShow: res.data,
            category: nowCategory,
            selected: index
        });
    };

    async componentDidMount(){
        let nowCategory = getCategory(1);
        const result = await getShowShop(nowCategory);  //给类别写函数 别用序号
        this.setState({
            shopShow: result.data,
            category: nowCategory
        });
    }

    render(){
        const baseUrl = "/api/" + this.state.category + "/";
        return (
            <div className="home">
                 <Lunbo />
                 <div className="recommand-list">
                     <div className="recommand-title">
                         <ul>
                            {
                                this.nameArr.map((value, index) => {
                                    return (
                                        <li className={index == this.state.selected ? "active" : ""} key={index} onClick={()=>this.changeSelect(index)}>
                                            <i className={"iconfont icon-" + this.iconArr[index]}></i>
                                            <span>{value}</span>
                                        </li>
                                    )
                                })
                            }
                         </ul>
                     </div>
                     <div className="min-title">
                        <h4>推&nbsp;荐&nbsp;商&nbsp;品</h4>
                     </div>
                     <ul className="shoplist">
                         {
                             this.state.shopShow.map((item, index) => {
                                 return (
                                    <li key={item.shopid}>
                                        <img src={baseUrl+item.imgurl} alt=""/>
                                    </li>
                                 )
                             })
                         }
                     </ul>
                 </div>
            </div>
        );
    }
}