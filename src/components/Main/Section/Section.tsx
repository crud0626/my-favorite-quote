import React, { useRef } from 'react';
import styled from 'styled-components';
import { IQuoteData, IQuotesState } from '~/types/interface';
import { CardPositionType, ChevronEventType } from '~/types/type';
import ChevronWrapper from '~/components/Main/ChevronWrapper';
import CardWrapper from '~/components/Main/Section/CardWrapper/CardWrapper';
import { downloadToImg } from '~/services/html2canvas';
import { rotateRegex } from '~/utils/regexPatterns';
import * as sizes from '~/styles/common/sizes';

interface IProps {
    displayQuotes: IQuotesState;
    cardPosition: CardPositionType;
    requestData(id?: string): Promise<any>;
    onChangeFavorite(target: IQuoteData): void;
}

const StyledSection = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: transparent;

    & .card_section {
        position: relative;
        max-width: 90%;
        height: ${sizes.CARD_HEIGHT};
        aspect-ratio: ${sizes.CARD_ASPECT_RATIO};
    }

    @media screen and (max-width: ${sizes.TABLET_VIEWPORT_SIZE}){
        & .card_section {
            height: ${sizes.MOBILE_CARD_HEIGHT};
        }
    }
`;

const Section = ({ displayQuotes, cardPosition, requestData, onChangeFavorite }: IProps) => {
    const cardWrapperRef = useRef<HTMLDivElement | null>(null);

    const onDownload = (): void => {
        if(cardWrapperRef.current) {
            downloadToImg(cardWrapperRef.current);
        }
    }

    const handleCardFilp = async (direction: ChevronEventType): Promise<any> => {
        if(cardWrapperRef.current) {
            const res = await requestData();
            if(res) {
                const matched = cardWrapperRef.current.style.transform.match(rotateRegex);
                const prevValue = matched ? +matched[0] : 0;
                const newValue = direction === "prev" ? prevValue - 0.5 : prevValue + 0.5;
    
                cardWrapperRef.current.style.transform = `rotateY(${newValue}turn)`;
            }
        }
    }

    return (
        <StyledSection>
            <div className='card_section'>
                <CardWrapper 
                    ref={cardWrapperRef} 
                    cardPosition={cardPosition}
                    displayQuotes={displayQuotes}
                    onDownload={onDownload}
                    onChangeFavorite={onChangeFavorite}
                />
                <ChevronWrapper handleCardFilp={handleCardFilp} />
            </div>
        </StyledSection>
    );
};

export default Section;