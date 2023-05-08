import Header from "../Login Page/Header";
import Login from "../Login Page/Login";
import logob from "../Login Page/logob.png"
export default function LoginPage() {
  return (
    <>
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
      <img src={logob} className="h-20 m-auto relative bottom-"></img>
    <Header
        heading="Login to your account"
        paragraph="Don't have an account yet? "
        linkName="Signup"
        linkUrl="/signup"
      />
    <Login />
    </div>
    </div>
    </>
  );
}
