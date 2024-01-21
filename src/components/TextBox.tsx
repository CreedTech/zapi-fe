import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

interface TextBoxProps {
  data?: Array<any>;
  className?: string;
}

const TextBox: React.FC<TextBoxProps> = ({ data, className }) => {
  const classes = useStyles();

  return (
    <div className={classes.textBox}>
      {data?.map((text, index) => (
        <div key={index} className={className}>
          {" "}
          <Typography
            id={text.id}
            variant="subtitle1"
            sx={{
              fontFamily: "Space Grotesk",
              fontWeight: 500,
              fontSize: "16px",
              lineHeight: "30px",
              display: "flex",
              alignItems: "center",
              color: "#071B85",
            }}>
            {text.text}
          </Typography>
        </div>
      ))}
    </div>
  );
};

export default TextBox;

const useStyles = makeStyles({
  textBox: {
    paddingTop: "1.5rem",
    paddingBottom: "3rem",
    display: "flex",
    gap: "1.5rem",
  },
});
