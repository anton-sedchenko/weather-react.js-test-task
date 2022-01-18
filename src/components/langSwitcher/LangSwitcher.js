import React from 'react';
import { Menu, Dropdown } from 'antd';
import { GlobalOutlined, UpOutlined } from '@ant-design/icons';

const LangSwitcher = () => {
    const langMenu = (
        <Menu>
            <Menu.Item>
                <p>
                    En
                </p>
                <p>
                    UA
                </p>
                <p>
                    HE
                </p>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="header__lang-switcher">
            <Dropdown overlay={langMenu}>
                <a className="ant-dropdown-link" style={{color: 'grey'}} onClick={e => e.preventDefault()}>
                    <GlobalOutlined />
                    <span style={{margin: '10px'}}>EN</span>
                    <UpOutlined />
                </a>
            </Dropdown>
        </div>
    );
};

export default LangSwitcher;
