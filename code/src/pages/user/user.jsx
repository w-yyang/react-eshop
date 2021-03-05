import React, {Component} from 'react';
import { NavLink,Route,Switch } from 'react-router-dom'

import AlterUser from './alteruser/alteruser.jsx';
import BillList from './billlist/billlist.jsx';
import MsgBack from './msgback/msgback.jsx';
import './user.less';
import userimg from '../../assets/images/h-img.jpg';
import store from '../../stores/stores.js';
import { connect } from 'react-redux';

class User extends Component{

    state = {
        usermsg: {}
    };

    componentDidMount(){
        let {login} = store.getState().reducers.userInfo;
        if(!login){
            this.props.history.push("/login");
        }
    }

    render(){
        let {phone, username} = this.props.reducers.userInfo;
        return (
            <div className="user">
                <div className="usermsg">
                    <img src={userimg} alt=""/>
                    <div className="user-msg">
                        <span>{username}</span>
                        <span>手机号：{phone}</span>
                    </div>
                </div>
                <div className="operate">
                    <ul>
                        <li>
                            <i className="iconfont icon-icondd1"></i>
                            <span>
                                <NavLink activeClassName="selected" className="cover" to="/user/billlist">交易订单</NavLink>
                            </span>
                        </li>
                        <li>
                            <i className="iconfont icon-tuihuanhuo"></i>
                            <span>
                                <NavLink activeClassName="selected" className="cover" to="/user" exact={true}>软件反馈</NavLink>
                            </span>
                        </li>
                        <li>
                            <i className="iconfont icon-xiugai"></i>
                            <span>
                                <NavLink activeClassName="selected" className="cover" to="/user/altermsg">信息修改</NavLink>
                            </span>
                        </li>
                    </ul>
                </div>
                <div className="childroute">
                    <Switch>
                        <Route exact path="/user" component={MsgBack}></Route>
                        <Route exact path="/user/billlist" component={BillList}></Route>
                        <Route exact path="/user/altermsg" render={()=><AlterUser change={this.change}/>}></Route>
                    </Switch>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, null)(User);