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
                        selectedKeys={[this.state.current]}
                        onClick={this.handleClick}
                        style={{ lineHeight: '64px', textAlign: 'center' }}
                    >
                        <Menu.Item key="1">
                        <a href="https://www.evantay.com/tech/dynalite-api/" rel="noopener noreferrer">
                            Backend API
                        </a>    
                        </Menu.Item>
                        <Menu.Item key="2">
                            <a href="https://github.com/Happytreat/dynalite" rel="noopener noreferrer">
                                Github Repo
                            </a>   
                        </Menu.Item>
                    </Menu>
                    </Header>
                </Layout>
            </>
        )
    }
}
