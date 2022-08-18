import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { StyledFooter } from '../../styles/StyledFooter';

const Footer = () => {
    return (
        <StyledFooter>
            <div className="copyright">
                <span>Copyright 2022. CRUD0626 All rights reserved.</span>
            </div>
            <div className="github">
                <a href="https://github.com/crud0626" rel='noopener noreferrer' >
                    <FontAwesomeIcon 
                        icon={faGithub} 
                        style={{ width: "100%", height: "100%" }} 
                    />
                </a>
            </div>
        </StyledFooter>
    );
};

export default Footer;