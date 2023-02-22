import React, { useState } from 'react';

type DetectType = 'horizontal' | 'vertical' | 'all';

interface ICoordinate {
    X: number | null;
    Y: number | null;
}

/**
 * 유저의 터치 이벤트를 감지하기 위한 커스텀 훅
 * @param callbackFn 이벤트 감지 후 호출 될 콜백함수
 * @param detect 감지하고 싶은 방향
 * @param {number} [standard=25] 콜백함수를 호출하기 위한 픽셀 기준 이벤트의 최소 이동량
 */
export const useTouchSlide = (
    callbackFn: () => void, 
    detect: DetectType, 
    standard: number = 25
) => {
    const [startPos, setStartPos] = useState<ICoordinate>({
        X: null,
        Y: null
    });

    const checkValidEvent = (distanceX: number, distanceY: number): void => {
        if (distanceX === distanceY) return;
        
        const targetDistance = (function() {
            if (detect === 'horizontal') return distanceX;
            if (detect === 'vertical') return distanceY;

            // detect가 all인 경우 
            return Math.abs(distanceX) > Math.abs(distanceY) ? distanceX : distanceY;
        })();

        if (Math.abs(targetDistance) > standard) {
            callbackFn();
        }
    }

    const setTouchStart = (e: React.TouchEvent): void => {
        const { pageX, pageY } = e.changedTouches[0];

        setStartPos({ X: pageX, Y: pageY });
    }

    const setTouchEnd = (e: React.TouchEvent): void => {
        if (!startPos.X || !startPos.Y) return;

        const { pageX, pageY } = e.changedTouches[0];
        const distanceX = startPos.X - pageX;
        const distanceY = startPos.Y - pageY;

        checkValidEvent(distanceX, distanceY);

        setStartPos({ X: null, Y: null });
    }
    
    return [setTouchStart, setTouchEnd];
}