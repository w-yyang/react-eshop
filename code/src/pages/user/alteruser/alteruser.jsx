import React from 'react';
import {
    Button,
    Toast
} from 'antd-mobile';
import {connect} from 'react-redux';

import store from '../../../stores/stores';
import {setUserMsg} from '../../../stores/actions';
import {
    alterUser,
} from '../../../api/index';
import './alteruser.less'
import { getToken } from '../../../utils/tokenutil';

class AlterUser extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone: '',
            address: ''
        };
    }

    //修改完成后需要修改redux
    async altermsg(){
        let alterObj = {
            username: 'qwe',
            phone: this.state.phone,
            address: this.state.address,
            token: getToken()
        };
        this.props.setUserMsg({
            phone: this.state.phone, 
            login: true,
            username: alterObj.username,
            address: alterObj.address
        });
        let result = await alterUser(alterObj);
        Toast.success(result.msg, 1);
    }

    getuser(){
        let {phone, address} = store.getState().reducers.userInfo;
        this.setState({
            phone: phone,
            address: address
        });
    }

    cPhone = (event) => {
        let phone = event.target.value;
        this.setState({
            phone: phone
        });
    };

    cAddress = (event) => {
        let address = event.target.value;
        this.setState({
            address: address
        });
    };

    componentDidMount(){
        this.getuser();
    }

    render(){
        return (
            <div className="altermsg">
                <label htmlFor="">手机号：</label>
                <input type="text" onChange={this.cPhone} value={this.state.phone}/>
                <label htmlFor="">邮寄地址：</label>
                <input type="text" onChange={this.cAddress} value={this.state.address}/>
                <Button className="alter" onClick={()=>this.altermsg()}>修改</Button>
                <Button className="cancel">取消</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return state;
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        setUserMsg: (userInfo) => dispatch(setUserMsg(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AlterUser);