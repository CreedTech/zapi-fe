import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  SelectChangeEvent,
  Paper,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import ReactGA from "react-ga4";

const TermsConditions: React.FC = () => {
  const classes = useStyles();

  ReactGA.send({ hitType: "pageview", page: "/terms-conditions" });

  return (
    <div className={classes.body}>
      <Paper elevation={1} className={classes.paper}>
        <div className={classes.container}>
          <div>
            <Typography variant="body1" fontSize="30px" fontWeight={800}>
              Terms and Conditions
            </Typography>
            <p>General Terms – All Users</p>
            <Typography variant="body1" fontSize="25px" fontWeight={800}>
              1. Your Relationship With Us
            </Typography>
            <p className={classes.paragraph}>
              Welcome to Zapi (the “Platform”), which is provided by Zummit
              Africa. or one of its affiliates (“Zummit”, “we” or “us”).
            </p>

            <p className={classes.paragraph}>
              You are reading the terms of service (the “Terms”), which govern
              the relationship and serve as an agreement between you and us and
              set forth the terms and conditions by which you may access and use
              the Platform and our related websites, services, applications,
              products and content (collectively, the “Services”). Our Services
              are provided for private, non-commercial use. For purposes of
              these Terms, “you” and “your” means you as the user of the
              Services.
            </p>

            <p className={classes.paragraph}>
              The Terms form a legally binding agreement between you and us.
              Please take the time to read them carefully.
            </p>

            <Typography variant="body1" fontSize="25px" fontWeight={800}>
              2. Accepting the Terms
            </Typography>
            <p className={classes.paragraph}>
              By accessing or using our Services, you confirm that you can form
              a binding contract with Zapi, that you accept these Terms and that
              you agree to comply with them. Your access to and use of our
              Services is also subject to our Privacy Policy and Community
              Guidelines, the terms of which can be found directly on the
              Platform, or where the Platform is made available for download, on
              your mobile device’s applicable app store, and are incorporated
              herein by reference. By using the Services, you consent to the
              terms of the Privacy Policy.
            </p>

            <p className={classes.paragraph}>
              If you access or use the Services from within a jurisdiction for
              which there are separate supplemental terms, you also hereby agree
              to the supplemental terms applicable to users in each jurisdiction
              as outlined below, and in the event of a conflict between the
              provisions of the Supplemental Terms – Jurisdiction-Specific that
              are relevant to your jurisdiction from which you access or use the
              Services, and the rest of these Terms, the relevant jurisdictions’
              Supplemental Terms – Jurisdiction-Specific will supersede and
              control. If you do not agree to these Terms, you must not access
              or use our Services.
            </p>

            <p className={classes.paragraph}>
              If you are accessing or using the Services on behalf of a business
              or entity, then (a) “you” and “your” includes you and that
              business or entity, (b) you represent and warrant that you are an
              authorized representative of the business or entity with the
              authority to bind the entity to these Terms, and that you agree to
              these Terms on the entity’s behalf, and (c) your business or
              entity is legally and financially responsible for your access or
              use of the Services as well as for the access or use of your
              account by others affiliated with your entity, including any
              employees, agents or contractors.
            </p>

            <p className={classes.paragraph}>
              You can accept the Terms by accessing or using our Services. You
              understand and agree that we will treat your access or use of the
              Services as acceptance of the Terms from that point onwards.
            </p>

            <p className={classes.paragraph}>
              You should print off or save a local copy of the Terms for your
              records.
            </p>

            <Typography variant="body1" fontSize="25px" fontWeight={800}>
              3. Changes to the Terms
            </Typography>
            <p className={classes.paragraph}>
              We amend these Terms from time to time, for instance when we
              update the functionality of our Services, when we combine multiple
              apps or services operated by us or our affiliates into a single
              combined service or app, or when there are regulatory changes. We
              will use commercially reasonable efforts to generally notify all
              users of any material changes to these Terms, such as through a
              notice on our Platform, however, you should look at the Terms
              regularly to check for such changes. We will also update the “Last
              Updated” date at the top of these Terms, which reflect the
              effective date of such Terms. Your continued access or use of the
              Services after the date of the new Terms constitutes your
              acceptance of the new Terms. If you do not agree to the new Terms,
              you must stop accessing or using the Services.
            </p>

            <Typography variant="body1" fontSize="25px" fontWeight={800}>
              4. Your Account with Us
            </Typography>
            <p className={classes.paragraph}>
              To access or use some of our Services, you must create an account
              with us. When you create this account, you must provide accurate
              and up-to-date information. It is important that you maintain and
              promptly update your details and any other information you provide
              to us, to keep such information current and complete.
            </p>

            <p className={classes.paragraph}>
              It is important that you keep your account password confidential
              and that you do not disclose it to any third party. If you know or
              suspect that any third party knows your password or has accessed
              your account, you must notify us
            </p>

            <p className={classes.paragraph}>
              You agree that you are solely responsible (to us and to others)
              for the activity that occurs under your account.
            </p>

            <p className={classes.paragraph}>
              We reserve the right to disable your user account at any time,
              including if you have failed to comply with any of the provisions
              of these Terms, or if activities occur on your account which, in
              our sole discretion, would or might cause damage to or impair the
              Services or infringe or violate any third party rights, or violate
              any applicable laws or regulations.
            </p>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default TermsConditions;

const useStyles = makeStyles({
  paper: {
    width: "950px",
    marginTop: "20px",
    padding: "2rem 2rem",
  },
  body: {
    width: "80%",
    margin: "auto",
  },
  container: {
    background: "inherit",
    borderRadius: "5px",
    width: "100%",
    padding: "20px",
  },
  paragraph: {
    marginBottom: "10px",
  },
});
