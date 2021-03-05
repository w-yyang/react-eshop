import React from 'react';
import {Drawer, List} from 'antd-mobile';

import ShopList from '../shoplist/shoplist.jsx';
import {getShop} from '../../../api';
import getCategory from '../../../utils/getcate'
import './leftmenu.less';

class LeftMenu extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      shopList: [],
      category: '',
      selected: 7
    };
  }

  listArr = ["日用百货","流行服饰","美味食品","经典书刊","常用五金","新鲜水果","美妆护肤","电子产品"];

  async changeShop(index){
    let nowCategory = getCategory(index);
    let result = await getShop(nowCategory);
    this.setState({
      shopList: result.data,
      category: nowCategory,
      selected: index
    });
  }

  async componentDidMount(){
    let nowCategory = getCategory(7);
    let result = await getShop(nowCategory);
    this.setState({
      shopList: result.data,
      category: nowCategory
    });
  }

  render() {
    const sidebar = (<List>
      {
        this.listArr.map((value, index) => {
          return (
            <List.Item 
              key={index}
              className={this.state.selected == index ? "active" : ""}
              onClick={()=>this.changeShop(index)}>
              {value}
            </List.Item>
          );
        })
      }
    </List>);

    return (
    <div style={{ height: '80%' }}>
      <Drawer
        className="my-drawer"
        style={{ minHeight: document.documentElement.clientHeight }}
        contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
        sidebarStyle={{ border: '1px solid #ddd' }}
        sidebar={sidebar}
        docked={true}>
        <ShopList shopList={this.state.shopList} category={this.state.category}/>
      </Drawer>
    </div>);
  }
}

export default LeftMenu;