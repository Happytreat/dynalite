import React from 'react';
import { Menu, Layout } from 'antd';
import './Navbar.css'

const { Header } = Layout;

export class NavBar extends React.Component {
    constructor(){
        super()
        this.state = { current: 1 }
    }

    handleClick = e => {
        this.setState({
          current: e.key,
        });
      };

    render() {
        return (
            <>
                <Layout>
                    <Header>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={["1"]}
                        selectedKeys={[this.state.current]}
                        onClick={this.handleClick}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">
                        <a href="day" rel="noopener noreferrer">
                            By Day
                        </a>    
                        </Menu.Item>
                        <Menu.Item key="2">
                            <a href="hour" rel="noopener noreferrer">
                                By Hour
                            </a>   
                        </Menu.Item>
                    </Menu>
                    </Header>
                </Layout>
            </>
        )
    }
}
