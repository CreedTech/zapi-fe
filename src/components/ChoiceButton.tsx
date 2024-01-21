import React from "react";
import { Stack, Button } from "@mui/material";

interface Props {
    border: string;
    rejectColor: string;
    acceptColor: string;
    onAccept: (event: React.MouseEvent<HTMLButtonElement>) => void;
    onReject: (event: React.MouseEvent<HTMLButtonElement>) => void;
    acceptText: string;
    rejectText: string;
    radius: string;
    acceptBackgroundColor: string;
    rejectBackgroundColor: string;
    padding: string;
    outline: string;
    visible: boolean;
}

const ChoiceButton: React.FC<Props> = ({
    border,
    rejectColor,
    acceptColor,
    onAccept,
    onReject,
    acceptText,
    rejectText,
    radius,
    acceptBackgroundColor,
    rejectBackgroundColor,
    padding,
    outline,
    visible
}) => {
    return (
        <Stack direction="row" spacing={2} my={2} sx={{ display: visible ? 'flex' : 'none' }}>
            <Button
                onClick={onAccept}
                style={{
                    backgroundColor: acceptBackgroundColor,
                    border,
                    borderRadius: radius,
                    padding,
                    outline,
                    color: acceptColor
                }}
            >
                {acceptText}
            </Button>
            <Button
                onClick={onReject}
                style={{
                    backgroundColor: rejectBackgroundColor,
                    border,
                    borderRadius: radius,
                    padding,
                    outline,
                    color: rejectColor
                }}
            >
                {rejectText}
            </Button>
        </Stack>
    );
}

export default ChoiceButton;