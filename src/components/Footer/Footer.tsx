import React from 'react';
import Icon from '~/components/Icon/Icon';
import * as colors from '~/styles/common/colors';
import { StyledFooter } from './StyledFooter';
import { GITHUB_LOGO_ICON } from '~/styles/common/iconPath';


const Footer = React.memo(() => {
    return (
        <StyledFooter>
            <div className="copyright">
                <span>{`Copyright 2022. \n CRUD0626 All rights reserved.`}</span>
            </div>
            <div className="github">
                <a 
                    target="_blank" 
                    href="https://github.com/crud0626" 
                    rel='noopener noreferrer' 
                >
                    <Icon 
                        define={GITHUB_LOGO_ICON}
                        color={colors.MAIN_WHITE}
                        isHoverColor={true}
                    />
                </a>
            </div>
        </StyledFooter>
    );
});

export default Footer;