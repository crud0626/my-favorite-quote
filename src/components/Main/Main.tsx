import React from 'react';
import Nav from '~/components/Nav/Nav';
import Card from './Card/Card';
import ChevronBox from './ChevronBox/ChevronBox';
import { CardWrapper, StyledMain } from './Main.styles';
import { CardPositionType } from '~/types/user.type';
import { useCardStore } from '~/stores/useCardStore';

const cardPositions: CardPositionType[] = ['front', 'back'];

const Main = () => {
    const { cardRotate } = useCardStore();

    return(
        <StyledMain>
            <section className='section'>
                <div className='card_section'>
                    <CardWrapper className='card_wrapper' cardRotate={cardRotate}>
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
        </StyledMain>
    );
}

export default Main;