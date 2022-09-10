import React, { useRef } from 'react';
import styled from 'styled-components';
import ChevronWrapper from '~/components/Main/ChevronWrapper';
import CardWrapper from '~/components/Main/Section/CardWrapper/CardWrapper';
import { downloadToImg } from '~/services/html2canvas';
import { rotateRegex } from '~/utils/regexPatterns';
import { CardPositionType, QuoteData, QuoteStateType } from '~/App';
import * as sizes from '~/styles/common/sizes';

export type ChevronEventTypes = "prev" | "next";
interface IProps {
    quoteData: QuoteStateType;
    exposedCard: CardPositionType;
    requestData(id?: string): Promise<any>;
    onChangeFavorite(target: QuoteData): void;
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
        height: ${sizes.CARD_HEIGHT};
        aspect-ratio: ${sizes.CARD_ASPECT_RATIO};
    }
`;

const Section = ({ quoteData, exposedCard, requestData, onChangeFavorite }: IProps) => {
    const cardWrapperRef = useRef<HTMLDivElement | null>(null);

    const onDownload = (): void => {
        if(cardWrapperRef.current) {
            downloadToImg(cardWrapperRef.current);
        }
    }

    const handleCardFilp = async (direction: ChevronEventTypes): Promise<any> => {
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
                    exposedCard={exposedCard}
                    quoteData={quoteData}
                    onDownload={onDownload}
                    onChangeFavorite={onChangeFavorite}
                />
                <ChevronWrapper handleCardFilp={handleCardFilp} />
            </div>
        </StyledSection>
    );
};

export default Section;