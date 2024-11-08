import UserInfoLayout from "./SignUpUserInfoLayout";

const UserInfo = ({
  password,
  showPassword,
  showVisibility,
  handleEmail,
  handleName,
  handlePassword,
  name,
  email,
  isValid,
  nameError,
  emailError,
  passwordError,
}) => {
  // All logic placed in SignUp component
  return (
    <div>
      <UserInfoLayout
        password={password}
        showPassword={showPassword}
        showVisibility={showVisibility}
        handlePassword={handlePassword}
        handleEmail={handleEmail}
        handleName={handleName}
        name={name}
        email={email}
        isValid={isValid}
        nameError={nameError}
        emailError={emailError}
        passwordError={passwordError}
      />
    </div>
  );
};

export default UserInfo;
