import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";
import { BRANDS } from "../assets";

const Brand = () => {
  const classes = useStyles();

  return (
    <div className={classes.brandBox}>
      <div className={classes.brand}>
        <div className={classes.brandText}>
          <Typography
            gutterBottom
            variant="subtitle1"
            sx={{
              fontStyle: "normal",
              fontColor: "#071B85",
              fontFamily: "Space Grotesk",
              fontWeight: 500,
              fontSize: "24px",
              lineHeight: "30px",
            }}>
            Supported and trusted by global brands
          </Typography>
        </div>

        <div className={classes.brandlogo}>
          {BRANDS.map((brand: any, index: number) => (
            <img
              key={index}
              src={brand.img}
              className={classes.img}
              alt={brand.alt}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Brand;

const useStyles = makeStyles({
  brandBox: {
    width: "100%",
    background: "#EDF5FD",
    marginTop: "5rem",
    padding: "5rem 0",
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },

  brand: {
    background: "#F9FAFB",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "3rem",
    borderRadius: "16px",
    justifyContent: "center",
    padding: "3rem 4rem",
  },

  brandlogo: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "65px",
    flexWrap: "wrap",
  },
  brandText: {
    display: "flex",
    alignItems: "center",
    color: "#071B85",
  },
  img: {
    width: "160px",
    height: "50px",
    objectFit: "contain",
  },
});
