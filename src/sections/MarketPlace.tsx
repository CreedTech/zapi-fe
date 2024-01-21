import { Typography, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { MarketPlaceText } from "../assets";

const MarketPlace = () => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.marketPlace}>
        <div className={classes.marketplaceText}>
          <Typography
            gutterBottom
            variant="h2"
            sx={{
              color: "#071B85",
              fontFamily: "Space Grotesk",
              fontWeight: 700,
              fontSize: "36px",
              lineHeight: "45.94px",
              textAlign: "center",
              marginTop: "116px",
            }}>
            Explore API hub
          </Typography>

          <Typography
            gutterBottom
            variant="h3"
            sx={{
              padding: "0 19rem",
              color: "#071B85",
              fontFamily: "Space Grotesk",
              fontStyle: "normal",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "40px",
              textAlign: "center",
              marginTop: "28px",
              "@media screen and (max-width:800px)": {
                padding: "0 2rem",
                fontSize: "16px",
              },
            }}>
            Best Artificial Intelligence and Machine learning API hub. Featuring
            APISs for various use cases in the industry
          </Typography>
        </div>
        <div className={classes.marketApi}>
          <div className={classes.column}>
            {MarketPlaceText.map((market, index) => (
              <div key={index} className={classes.columnText}>
                <>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    sx={{
                      color: "#071B85",
                      fontFamily: "Space Grotesk",
                      fontStyle: "normal",
                      fontWeight: 700,
                      fontSize: "24px",
                      height: "30px",
                    }}>
                    {market.title}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="subtitle1"
                    sx={{
                      color: "#071B85",
                      fontFamily: "Space Grotesk",
                      fontStyle: "normal",
                      fontWeight: 400,
                      fontSize: "20px",
                      lineHeight: "26px",
                    }}>
                    {market.subtitle}
                  </Typography>
                  {market.apis.map((api, index) => (
                    <div key={index} className={classes.api}>
                      <img src={api.image} alt={api.name} />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: "#071B85",
                          fontFamily: "Space Grotesk",
                          fontStyle: "normal",
                          fontWeight: 400,
                          fontSize: "20px",
                        }}>
                        {api.name}
                      </Typography>
                    </div>
                  ))}
                </>
              </div>
            ))}
          </div>
        </div>
        <button className={classes.button}>
          <Typography>
            <Link
              style={{ color: "#FFEA00", textDecoration: "none" }}
              href="/api-hub">
              Explore the marketplace
            </Link>
          </Typography>
          <img className={classes.arrow} src="images/arrow.jpg" />
        </button>
      </div>
    </>
  );
};

export default MarketPlace;

const useStyles = makeStyles({
  marketPlace: {
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  marketplaceText: {},
  columnText: {
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
    width: "370px",
    "&:nth-child(1)": {
      borderRight: "1px solid rgba(19, 50, 159, 0.45)",
      "@media screen and (max-width:1200px)": {
        borderRight: "none",
      },
    },
    "&:nth-child(2)": {
      borderRight: "1px solid rgba(19, 50, 159, 0.45)",
      "@media screen and (max-width:1200px)": {
        borderTop: "1px solid rgba(19, 50, 159, 0.45)",
        borderRight: "none",
      },
    },
    "&:nth-child(3)": {
      "@media screen and (max-width:1200px)": {
        borderTop: "1px solid rgba(19, 50, 159, 0.45)",
      },
    },
  },
  marketApi: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "2rem",
    paddingTop: "3rem",
    paddingBottom: "5rem",
    margin: "0 auto",
    "@media screen and (max-width:1200px)": {
      flexDirection: "column",
    },
  },
  column: {
    position: "relative",
    left: "30px",
    display: "flex",
    gap: "2.25rem",
    "@media screen and (max-width:1200px)": {
      flexDirection: "column",
    },
  },
  api: {
    display: "flex",
    aligItems: "center",
    gap: "1rem",
  },

  button: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2rem",
    backgroundColor: "#081F4A",
    border: "none",
    color: "#FFEA00",
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "20.42px",
    padding: "1.5rem 3rem",
    borderRadius: "4px",
    margin: "0 auto",
    cursor: "pointer",
    "@media screen and (max-width: 375px)": {
      width: "auto",
      gap: "1rem",
      fontSize: "11px",
      padding: "1rem 2rem",
    },
  },

  arrow: {
    width: "13px",
    height: "13px",
    background: "#081F4A",
    "@media screen and (max-width: 375px)": {
      width: "auto",
      height: "auto",
    },
  },
});
