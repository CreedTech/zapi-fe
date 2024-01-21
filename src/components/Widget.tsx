import { Typography } from "@mui/material";
import React from "react";

interface WidgetProps {
  title?: string;
  subtitle?: string;
  span?: string;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  buttonText?: string;
  buttonText2?: string;
  image?: string;
}

const Widget: React.FC<WidgetProps> = ({
  title,
  subtitle,
  className,
  span,
  buttonText,
  onClick,
  buttonText2,
  image,
}) => {
  return (
    <>
      <div>
        {buttonText ? (
          <div className={className} onClick={onClick}>
            <img src={image} />
            <div>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
                gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {subtitle}
              </Typography>
              <Typography sx={{ fontSize: "2rem", fontWeight: 200 }}>
                {span}
              </Typography>
              <div>
                <button>{buttonText}</button>
                <button>{buttonText2}</button>
              </div>
            </div>
          </div>
        ) : (
          <div className={className} onClick={onClick}>
            <img src={image} />
            <div>
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: "bold" }}
                gutterBottom>
                {title}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {subtitle}
              </Typography>
              <Typography sx={{ fontSize: "2rem", fontWeight: 200 }}>
                {span}
              </Typography>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Widget;
