import React, {Component} from 'react';
import {WingBlank, Carousel} from 'antd-mobile';

export default class Lunbo extends Component{
    state = {
        data: ['1', '2', '3'],
        imgHeight: 176,
        selected: 1
    };

    componentDidMount() {
        // simulate img loading
        setTimeout(() => {
          this.setState({
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
          });
        }, 100);
    }

    render(){
        return (
            <WingBlank>
                <Carousel
                autoplay={false}
                infinite
                beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                afterChange={index => console.log('slide to', index)}
                >
                {this.state.data.map((val, index) => (
                    <a
                    key={val}
                    href="javascript:;"
                    style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                    >
                    <img
                        src={"/api/lunbo/head"+index+".jpg"}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' }}
                        onLoad={() => {
                        // fire window resize event to change height
                        window.dispatchEvent(new Event('resize'));
                        this.setState({ imgHeight: '240px', selected: index });
                        }}
                    />
                    </a>
                ))}
                </Carousel>
            </WingBlank>
        )
    }
}