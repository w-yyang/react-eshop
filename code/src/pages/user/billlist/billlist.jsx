import React from 'react';

import {
    getBillList,
    delBillMsg
} from '../../../api/index';
import { getToken } from '../../../utils/tokenutil';
import './billlist.less';

class BillList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            billlist: []
        }
    }

    async getAllBill(){
        let result = await getBillList({
            username: 'qwe',
            token: getToken()
        });
        this.setState({
            billlist: result.billlist
        });
    }

    async delBill(billid){
        let result = await delBillMsg(billid, getToken());
        // console.log(result);
        this.getAllBill();
    }

    componentDidMount(){
        this.getAllBill();
    }

    render(){
        return (
            <div className="billlist">
                <div className="title">
                    <table>
                        <tr>
                            <td>商品名</td>
                            <td>购买时间</td>
                            <td>价格</td>
                            <td>操作</td>
                        </tr>
                    </table>
                </div>
                <ul className="list">
                    {
                        this.state.billlist.map((item) => {
                            return (
                                <li key={item.billid}>
                                    <span>{item.shopname}</span>
                                    <p>{item.date}</p>
                                    <p>{item.price}</p>
                                    <button onClick={()=>this.delBill(item.billid)}>删除</button>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default BillList;