import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import './tabbar.less';

class Tabbar extends Component{
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        };
    }

    pathArr = ["/", "/shop", "/cart", "/user"];
    btnWord = ["首页", "分类", "购物车", "个人"];
    iconArr = ["ai-home", "shangpinfenlei", "ziyuan", "yonghu"];

    jumpTo(path, index){
        if(this.state.selected != index){
            this.setState({
                selected: index
            })
        }
        this.props.history.push(path);
    };
    
    render(){
        return (
            <div className="footer">
               <ul>
                    {
                        this.btnWord.map((item, index) => {
                            return (
                                <li 
                                    className={index == this.state.selected ? "selected" : ""}
                                    onClick={() => this.jumpTo(this.pathArr[index], index)} 
                                    key={index}>
                                    <i className={"iconfont icon-" + this.iconArr[index]}></i>
                                    <span>{item}</span>
                                </li>
                            )
                        })
                    }
               </ul>
            </div>
        )
    }
}

export default withRouter(Tabbar);