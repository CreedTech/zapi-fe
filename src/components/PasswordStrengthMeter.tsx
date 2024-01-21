import React from "react";
import '../../src/index.css'
import zxcvbn from 'zxcvbn';
import { EMAIL_REGEX, PASSWORD_REGEX, MATCH_CHECKER, SPECIAL_CHAR }from "../utils" 

interface IPasswordStrengthMeterProps {
    password: string | any;
};

const PasswordStrengthMeter: React.FC<IPasswordStrengthMeterProps> = ({password}) => {
    const createPasswordLabel = (result:any) => {
        switch (result.score) {
          case 0:
            return 'Weak';
          case 1:
            return 'Weak';
          case 2:
            return 'Fair';
          case 3:
            return 'Good';
          case 4:
            return 'Strong';
          default:
            return 'Weak';
        }
    }
  const testedResult = zxcvbn(password);

  return (
    <div className="password-strength-meter">
        <progress
          className={`password-strength-meter-progress strength-${createPasswordLabel(testedResult)}`}
          value={testedResult.score}
          max="4"
          />
          &nbsp;<label
        className="password-strength-meter-label"
      >
        {password && (
          <>
            {createPasswordLabel(testedResult)}
          </>
        )}
      </label>
      </div>
  )
}


export default PasswordStrengthMeter