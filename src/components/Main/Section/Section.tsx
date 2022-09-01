import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ChevronWrapper from '../ChevronWrapper';
import CardWrapper from './CardWrapper/CardWrapper';
import * as sizes from '../../../styles/common/sizes';
import { rotateRegex } from '../../../utils/regexPatterns';
import { QuoteData } from '../../../services/quotesApi';
import { downloadToImg } from '../../../services/html2canvas';

export type ChevronEventTypes = "prev" | "next";
export type CardPositionTypes = "front" | "back";
interface IProps {
    quoteData: QuoteData | null;
    requestData(id?: string): Promise<any>;
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

const Section = ({ quoteData, requestData }: IProps) => {
    const cardWrapperRef = useRef<HTMLDivElement | null>(null);
    
    const [exposedCard, setExposedCard] = useState<CardPositionTypes>("front");

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
                setExposedCard((prevState) => prevState === "front" ? "back" : "front");
            }
        }
    }

    return (
        <StyledSection>
            <div className='card_section'>
                <CardWrapper 
                    ref={cardWrapperRef} 
                    exposedCard={exposedCard}
                    onDownload={onDownload}
                    quoteData={quoteData}
                />
                <ChevronWrapper handleCardFilp={handleCardFilp} />
            </div>
        </StyledSection>
    );
};

export default Section;