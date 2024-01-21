import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Typography, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const Pricing: React.FC = () => {
  const classes = useStyles();
  const [disabled, setDisabled] = useState<boolean>(true);

  return (
    <>
      <main>
        <div className={classes.pricing}>
          <Typography
            gutterBottom
            variant="h4"
            sx={{
              color: "#071B85",
              fontWeight: 700,
              fontSize: "36px",
              lineHeight: "45.94px",
              fontFamily: "Space Grotesk",
            }}>
            Flexible pricing to get you started.
          </Typography>
        </div>
        <div className={classes.wrapper}>
          <div className={classes.columns}>
            <div className={classes.column}>
              <div className={classes.content}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    marginInlineEnd: "auto",
                    gap: "1rem",
                  }}>
                  <CheckCircleIcon sx={{ color: "#B8D4EF" }} />
                  <Stack
                    direction="column"
                    sx={{ textAlign: "start", gap: "0.5rem" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Space Grotesk",
                        fontWeight: 700,
                        fontSize: "24px",
                        lineHeight: "31px",
                      }}>
                      Freemium
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Space Grotesk",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "20px",
                      }}>
                      Unlimited requests
                    </Typography>
                  </Stack>
                </div>
                <Stack direction="row" sx={{ textAlign: "start" }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 700,
                      fontSize: "36px",
                      lineHeight: "46px",
                      color: "#071B85",
                    }}>
                    $0
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 500,
                      fontSize: "20px",
                      lineHeight: "26px",
                      color: "#071B85",
                    }}></Typography>
                </Stack>
              </div>
            </div>
            <div
              className={classes.column}
              style={{
                opacity: disabled ? 0.25 : 1,
                pointerEvents: disabled ? "none" : "initial",
              }}>
              <div className={classes.content}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    textAlign: "center",
                    marginInlineEnd: "auto",
                    gap: "1rem",
                  }}>
                  <CheckCircleIcon sx={{ color: "#B8D4EF" }} />
                  <Stack
                    direction="column"
                    sx={{ textAlign: "start", gap: "0.5rem" }}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: "Space Grotesk",
                        fontWeight: 700,
                        fontSize: "24px",
                        lineHeight: "31px",
                      }}>
                      Basic
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: "Space Grotesk",
                        fontWeight: 500,
                        fontSize: "16px",
                        lineHeight: "20px",
                      }}>
                      5,000 requests
                    </Typography>
                  </Stack>
                </div>
                <Stack direction="row" sx={{ textAlign: "start" }}>
                  <Typography
                    variant="h1"
                    sx={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 700,
                      fontSize: "36px",
                      lineHeight: "46px",
                      color: "#071B85",
                    }}>
                    $5
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 500,
                      fontSize: "20px",
                      lineHeight: "26px",
                      color: "#071B85",
                    }}>
                    /month
                  </Typography>
                </Stack>
              </div>
            </div>
          </div>
          <div
            className={classes.coll}
            style={{
              opacity: disabled ? 0.25 : 1,
              pointerEvents: disabled ? "none" : "initial",
            }}>
            <div className={classes.content}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  marginInlineEnd: "auto",
                  gap: "1rem",
                }}>
                <CheckCircleIcon sx={{ color: "#B8D4EF" }} />
                <Stack
                  direction="column"
                  sx={{ textAlign: "start", gap: "0.5rem" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 700,
                      fontSize: "24px",
                      lineHeight: "31px",
                    }}>
                    Premium
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "20px",
                    }}>
                    10,000 requests
                  </Typography>
                </Stack>
              </div>
              <Stack direction="row" sx={{ textAlign: "start" }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: "Space Grotesk",
                    fontWeight: 700,
                    fontSize: "36px",
                    lineHeight: "46px",
                    color: "#071B85",
                  }}>
                  $10
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Space Grotesk",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: "26px",
                    color: "#071B85",
                  }}>
                  /month
                </Typography>
              </Stack>
            </div>
          </div>
          <div
            className={classes.coll}
            style={{
              opacity: disabled ? 0.25 : 1,
              pointerEvents: disabled ? "none" : "initial",
            }}>
            <div className={classes.content}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  marginInlineEnd: "auto",
                  gap: "1rem",
                }}>
                <CheckCircleIcon sx={{ color: "#B8D4EF" }} />
                <Stack
                  direction="column"
                  sx={{ textAlign: "start", gap: "0.5rem" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 700,
                      fontSize: "24px",
                      lineHeight: "31px",
                    }}>
                    Mega
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "20px",
                    }}>
                    50,000 requests
                  </Typography>
                </Stack>
              </div>
              <Stack direction="row" sx={{ textAlign: "start" }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: "Space Grotesk",
                    fontWeight: 700,
                    fontSize: "36px",
                    lineHeight: "46px",
                    color: "#071B85",
                  }}>
                  $50
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Space Grotesk",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: "26px",
                    color: "#071B85",
                  }}>
                  /month
                </Typography>
              </Stack>
            </div>
          </div>
          <div
            className={classes.coll}
            style={{
              opacity: disabled ? 0.25 : 1,
              pointerEvents: disabled ? "none" : "initial",
            }}>
            <div className={classes.content}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  marginInlineEnd: "auto",
                  gap: "1rem",
                }}>
                <CheckCircleIcon sx={{ color: "#B8D4EF" }} />
                <Stack
                  direction="column"
                  sx={{ textAlign: "start", gap: "0.5rem" }}>
                  <Typography
                    variant="h5"
                    sx={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 700,
                      fontSize: "24px",
                      lineHeight: "31px",
                    }}>
                    Entreprise
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Space Grotesk",
                      fontWeight: 500,
                      fontSize: "16px",
                      lineHeight: "20px",
                    }}>
                    Unlimited requests
                  </Typography>
                </Stack>
              </div>
              <Stack direction="row" sx={{ textAlign: "start" }}>
                <Typography
                  variant="h1"
                  sx={{
                    fontFamily: "Space Grotesk",
                    fontWeight: 700,
                    fontSize: "36px",
                    lineHeight: "46px",
                    color: "#071B85",
                  }}>
                  $100
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Space Grotesk",
                    fontWeight: 500,
                    fontSize: "20px",
                    lineHeight: "26px",
                    color: "#071B85",
                  }}>
                  /month
                </Typography>
              </Stack>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

const useStyles = makeStyles({
  pricing: {
    textAlign: "center",
    alignItem: "center",
  },
  wrapper: {
    padding: "32px",
    fontFamily: "Space Grotesk",
  },
  column: {
    width: "calc(50% - 30px)",
    backgroundColor: "#EDF5FD",
    color: "#071B85",
    margin: "0 15px 30px",
    padding: "20px",
    borderRadius: "4px",
    boxSizing: "border-box",
    "@media screen and (max-width: 800px)": {
      width: "100%",
      margin: "0 3px 30px",
    },
  },
  coll: {
    justifyContent: "space-around",
    marginLeft: "auto",
    width: "calc(50% - 30px)",
    backgroundColor: "#EDF5FD",
    color: "#071B85",
    margin: "0 15px 30px",
    padding: "20px",
    borderRadius: "4px",
    boxSizing: "border-box",
    "@media screen and (max-width: 800px)": {
      width: "100%",
    },
  },
  col: {
    marginLeft: "auto !important",
    width: "calc(50% - 30px)",
    backgroundColor: "#FFEA0080",
    color: "#071B85",
    margin: "0 15px 30px",
    padding: "20px",
    border: "1px solid #1331CA",
    borderRadius: "4px",
    boxSizing: "border-box",
    "@media screen and (max-width: 800px)": {
      width: "100%",
    },
  },

  columns: {
    display: "flex",
    flexWrap: "wrap",
  },
  content: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
    textAlign: "center",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
    position: "relative",
  },
  discount: {
    borderRadius: "4px",
    backgroundColor: "#AFF0B6",
    height: "26px",
    width: "81px",
    top: "-30px",
    left: "0",
    position: "absolute",
    padding: "2px 4px",
    border: "1px solid #0A9A18",
  },
});

export default Pricing;
