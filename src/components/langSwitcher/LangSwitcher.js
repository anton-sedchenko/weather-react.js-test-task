import React, {useEffect, useState} from 'react';
import { GlobalOutlined } from '@ant-design/icons';
import './LangSwitcher.css';
import i18next from 'i18next';
import { getCurrentLanguage } from '../../utils/utils';

const LangSwitcher = () => {
    const currentLanguage = getCurrentLanguage();
    const [language, setLanguage] = useState(currentLanguage);
    const languages = [
        {
            lang: 'En',
            code: 'en'
        },
        {
            lang: 'Ua',
            code: 'ua'
        },
        {
            lang: 'He',
            code: 'he',
            dir: 'rtl'
        }
    ];

    useEffect(() => {
        document.body.dir = currentLanguage.dir || 'ltr';
    }, []);

    return (
        <div className="dropdown dropup header__lang-switcher">
            <button
                className="btn btn-secondary dropdown-toggle header__lang-switcher-btn"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <GlobalOutlined />
                <span style={{'margin': '0 5px'}}>{language}</span>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                {languages.map(({lang, code}) => (
                    <li key={`${lang}_${new Date().getTime()}`}>
                        <button className="dropdown-item"
                            onClick={(e) => {
                                i18next.changeLanguage(code);
                                setLanguage(lang);
                            }}
                        >
                            {lang}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LangSwitcher;
