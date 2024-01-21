import React from "react";
import { makeStyles } from "@mui/styles";
import ListItem from '@mui/material/ListItem';
import { Box } from '@mui/material';




const Wrapper = ({ background, size, ...rest }: any) => {
    return <a style={listItemStyle({ background, size })} {...rest} />;
};





const IconWrapper = ({ isOpen, ...rest }: any) => {
    return <Box sx={boxStyle({ isOpen })} {...rest} />;
};

export interface MainButtonProps {
    iconActive: any;
    iconResting: any;
    isOpen?: boolean;
    background: string;
    onClick: any;
    size: number;
}

const MainButton = ({
    iconResting,
    iconActive,
    isOpen,
    ...rest
}: MainButtonProps) => {
    return (
        <Wrapper {...rest}>
            <IconWrapper isOpen={isOpen}>
                {isOpen ? iconActive : iconResting}
            </IconWrapper>
        </Wrapper>
    );
};

export default MainButton;
const listItemStyle = ({ background, size, ...rest }: any) => ({
    display: 'flex',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 0 4px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.28)',
    cursor: 'pointer',
    outline: 'none',
    padding: '0',
    WebkitUserDrag: 'none',
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
    width: size,
    height: size,
    background,
    WebkitAnimation: 'pulse 1s infinite',
    animation: 'pulse 1s infinite',
});
const boxStyle = ({ isOpen }: any) => ({
    display: 'flex',
    textDecoration: 'none',
    WebkitTransition: '-webkit-transform 300ms',
    transition: 'transform 300ms',
    WebkitTransform: `rotate(${isOpen ? 180 : 0}deg)`,
});
