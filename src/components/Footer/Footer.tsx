import React from 'react';
import Icon from '../Icon/Icon';
import * as colors from '../../styles/common/colors';
import { StyledFooter } from '../../styles/StyledFooter';
import { GITHUB_LOGO_ICON } from '../../styles/common/iconPath';

const Footer = () => {
    return (
        <StyledFooter>
            <div className="copyright">
                <span>Copyright 2022. CRUD0626 All rights reserved.</span>
            </div>
            <div className="github">
                <a href="https://github.com/crud0626" rel='noopener noreferrer' >
                    <Icon 
                        define={GITHUB_LOGO_ICON}
                        color={colors.MAIN_WHITE}
                        isHoverColor={true}
                    />
                </a>
            </div>
        </StyledFooter>
    );
};

export default Footer;