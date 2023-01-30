import React from 'react';
import SVGIconBtn from '../SVGIconBtn/SVGIconBtn';
import * as colors from '~/styles/common/colors';
import * as sizes from '~/styles/common/sizes';
import { StyledFooter } from './StyledFooter';
import { GithubIcon } from '~/assets';

const Footer = React.memo(() => {
    return (
        <StyledFooter>
            <div className="copyright">
                <span>
                    {`Copyright 2022. \n CRUD0626 All rights reserved.`}
                </span>
            </div>
            <div className="github">
                <a 
                    target="_blank" 
                    href="https://github.com/crud0626" 
                    rel='noopener noreferrer' 
                >
                    <SVGIconBtn 
                        src={<GithubIcon />}
                        size={sizes.DEFAULT_ICON_SIZE}
                        color={colors.MAIN_WHITE}
                        hoverColor={colors.ICON_HOVER_COLOR}
                    />
                </a>
            </div>
        </StyledFooter>
    );
});

export default Footer;