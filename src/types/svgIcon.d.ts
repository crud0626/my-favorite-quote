declare module '*.svg' {
    import React from 'react';
    
    // 타입 분리 예정
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}