import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {
    NavBar,
    Icon
} from 'antd-mobile';

import './header.less';

class Header extends Component{
    backUp(){
        this.props.history.goBack();
    }

    render(){
        return (
            <div className="header">
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={()=>this.backUp()}
                rightContent={[
                    <Icon key="1" type="ellipsis" />,
                ]}>电商实例</NavBar>
            </div>
        )
    }
};

export default withRouter(Header);