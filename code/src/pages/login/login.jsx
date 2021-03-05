import React from 'react';
import {connect} from 'react-redux';
import {
    Button, 
    Toast,
    Modal
} from 'antd-mobile';

import {setUserMsg} from '../../stores/actions';
import {addUser, userLogin} from '../../api/index';
import './login.less';
import logimg from '../../assets/images/h-img.jpg';
import {saveToken} from '../../utils/tokenutil';

const prompt = Modal.prompt;

class Login extends React.Component{
    state = {
        username: '',
        password: '',
        phone: '',
        address: '',
        show: false
    };

    async login(){
        let {username, password} = this.state;
        if(!username.trim() || !password.trim()){
            Toast.fail("用户名或密码不能为空！", 1);
            return;
        }
        let loginData = {
            username: username,
            password: password
        };
        let result = await userLogin(loginData);
        saveToken(result.token);
        this.props.setUserMsg(result.userinfo);
        // console.log(result.userinfo, 'login');
        if(result && result.userinfo.login == true){
            this.props.history.push("/user");
        }
    }

    async register(){
        this.setState({
            show: false
        });
        let {username, password} = this.state;
        if(!username.trim() || !password.trim()){
            Toast.fail("用户名或密码不能为空！", 1);
            return;
        }
        let userData = {
            username: username,
            password: password,
            phone: this.state.phone,
            address: this.state.address
        };
        console.log(userData)
        let result = await addUser(userData);
        Toast.success(result.msg, 1);
    }

    loginC = (e) => {
        this.setState({
            username: e.target.value
        });
    };

    passC = (e) => {
        this.setState({
            password: e.target.value
        })
    };

    phoneC = (e) => {
        this.setState({
            phone: e.target.value
        });
    };

    addressC = (e) => {
        this.setState({
            address: e.target.value
        })
    };

    isShow(){
        this.setState({
            show: true
        });
    }

    cancelShow(){
        this.setState({
            show: false
        });
    }

    showView(){
        if(this.state.show){
            return (
                <div className="bg">
                    <div className="othermsg">
                        <label htmlFor="">电话号</label>
                        <input
                            value={this.state.phone}
                            onChange={this.phoneC} 
                            className="phone" type="text"/>
                        <label htmlFor="">地址</label>
                        <input 
                            className="address" 
                            value={this.state.address}
                            onChange={this.addressC}
                            type="text"/>
                        <Button className="confirm" onClick={()=>this.register()}>确定</Button>
                        <Button className="cancel" onClick={()=>this.cancelShow()}>取消</Button>
                    </div>
                </div>
            )
        }
    }

    render(){
        return (
            <div className="login">
                <div className="login-title">
                    <img src={logimg} alt=""/>
                </div>
                <div className="inp">
                    <label htmlFor="">用户名</label>
                    <input 
                        type="text" 
                        value={this.state.username}
                        onChange={this.loginC}/>
                    <label htmlFor="">密&nbsp;&nbsp;&nbsp;码</label>
                    <input 
                        type="password" 
                        value={this.state.password}
                        onChange={this.passC}/>
                    <Button 
                        className="logbtn"
                        onClick={()=>this.login()}>登&nbsp;录</Button>
                    <Button 
                        className="register"
                        onClick={()=>this.isShow()}>注&nbsp;册</Button>
                    {
                        this.showView()
                    }
                </div>
                <div className="cover"></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);