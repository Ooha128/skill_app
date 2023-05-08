import Header from "../Login Page/Header";
import SignUp from "../Login Page/SignUp";
import logob from "../Login Page/logob.png"
export default function SignupPage() {
  return (
    <>
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      <img src={logob} className="h-20 m-auto relative bottom-"></img>
      <Header
        heading="Signup to create an account"
        paragraph="Already have an account? "
        linkName="Login"
        linkUrl="/"
      />
      <SignUp />
      </div>
      </div>
    </>
  );
}
