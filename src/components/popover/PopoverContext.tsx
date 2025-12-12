import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useMemo, useState } from "react";
import { Shape } from '../../types/Shape';

export type Position = 'bottom' | 'left' | 'right' | 'top';

interface PopoverProviderProps {
    children: ReactNode;
    preferredPosition: Position;
    shape?: Shape;
}

const defaultTriggerPosition = {  
    top: 0,
    left: 0,
    width: 0,
    height: 0
}

export type Rect = Pick<DOMRect, 'left' | 'top' | 'width' | 'height'>;

const PopoverContext = createContext<{
    isOpened: boolean,
    setIsOpened: Dispatch<SetStateAction<boolean>>;
    preferredPosition: Position,
    triggerPosition: Rect,
    setTriggerPosition: Dispatch<SetStateAction<typeof defaultTriggerPosition>>,
    shape?: Shape
} | undefined>({
    isOpened: false,
    setIsOpened: () => {},
    preferredPosition: 'bottom',
    triggerPosition: defaultTriggerPosition,
    setTriggerPosition: () => { },
    shape: Shape.DEFAULT,
});

export const PopoverProvider = ({children, preferredPosition, shape}: PopoverProviderProps) => {
    const [isOpened, setIsOpened] = useState(false);
    const [triggerPosition, setTriggerPosition] = useState(defaultTriggerPosition);

    const value = useMemo(() => ({
      isOpened,
      setIsOpened,
      preferredPosition,
      triggerPosition,
      setTriggerPosition,
      shape
    }), [
        isOpened, 
        setIsOpened, 
        preferredPosition, 
        triggerPosition,
        setTriggerPosition,
        shape
    ]);

    return <PopoverContext.Provider value={value}>
        {children}
    </PopoverContext.Provider>  
}

export const usePopover = () => {
    const context = useContext(PopoverContext);

    if(!context) {
        throw new Error('usePopover must be used inside PopoverProvider');
    }

    return context;
}