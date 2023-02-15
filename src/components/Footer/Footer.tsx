import React from 'react';
import { FooterLinkBtn, StyledFooter } from './Footer.styles';
import { GithubIcon } from '~/assets/icons';

const Footer = React.memo(() => {
    return (
        <StyledFooter>
            <div className="copyright">
                <span>
                    {`Copyright 2022. \n CRUD0626 All rights reserved.`}
                </span>
            </div>
            <div>
                <FooterLinkBtn link='https://github.com/crud0626' >
                    <GithubIcon />
                </FooterLinkBtn>
            </div>
        </StyledFooter>
    );
});

export default Footer;