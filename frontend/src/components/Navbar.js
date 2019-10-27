import React from 'react';
import { Menu, Layout } from 'antd';
import './Navbar.css'

const { Header } = Layout;

export class NavBar extends React.Component {
    render() {
        return (
            <>
                <Layout>
                    <Header>
                    <div className="logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['2']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1">By Day</Menu.Item>
                        <Menu.Item key="2">By Hour</Menu.Item>
                    </Menu>
                    </Header>
                </Layout>
            </>
        )
    }
}
