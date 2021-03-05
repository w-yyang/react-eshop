import React, {Component} from 'react';

import './msgback.less';

class MsgBack extends Component{
    render(){
        return (
            <div className="msgback">
                <label htmlFor="">软件体验反馈</label>
                <textarea onChange={this.writeFeel} name="" id="" cols="40" rows="8"></textarea>
                <button className="submit">反馈</button>
            </div>
        )
    }
}

export default MsgBack;