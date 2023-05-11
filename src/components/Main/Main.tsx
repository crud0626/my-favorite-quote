import React from 'react';
import Nav from '~/components/Nav/Nav';
import Card from './Card/Card';
import ChevronBox from './ChevronBox/ChevronBox';
import LoginModal from '~/components/LoginModal/LoginModal';
import { useCardStore, useModalStore } from '~/hooks/stores';
import { CardWrapper, StyledMain } from './Main.styles';
import { CardPositionType } from '~/types/user.type';


const cardPositions: CardPositionType[] = ['front', 'back'];

const Main = () => {
    const { cardRotation } = useCardStore();
    const { isOpenLoginModal } = useModalStore();

    return(
        <StyledMain>
            <section className='section'>
                <div className='card_section'>
                    <CardWrapper 
                        className='card_wrapper' 
                        cardRotation={cardRotation}
                    >
                        {cardPositions.map((position, i) => (
                            <Card 
                                key={i}
                                position={position} 
                            />
                        ))}
                    </CardWrapper>
                    <ChevronBox />
                </div>
            </section>
            <Nav />
            {isOpenLoginModal && <LoginModal />}
        </StyledMain>
    );
}

export default Main;