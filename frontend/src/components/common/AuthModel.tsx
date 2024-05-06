import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";
import useGoogleLogin from "../../hooks/auth/useGoogleLogin";

function AuthModel({
  children,
  page,
}: {
  children: React.ReactNode;
  page: string;
}) {
  const googleLogin = useGoogleLogin();

  // Function to handle google signin
  const handleGoogleSignIn = (credentialResponse: { credential?: string }) => {
    if (credentialResponse?.credential) {
      const decoded = jwtDecode(credentialResponse.credential);
      const { email, given_name, name } = decoded as {
        email: string;
        given_name: string;
        name: string;
      };
      googleLogin({
        email,
        firstName: name?.split(" ")[0],
        lastName: name?.split(" ")[1],
        given_name,
      });
    }
  };

  const renderAuthLink = () => {
    if (page === "Sign Up") {
      return (
        <>
          Already have an account?{" "}
          <Link to="/" className="ml-2 text-blue-500 hover:underline">
            Log in
          </Link>
        </>
      );
    } else if (page === "Login") {
      return (
        <>
          Create an account!{" "}
          <Link to="/signup" className="ml-2 text-blue-500 hover:underline">
            Sign up
          </Link>
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div
      className="p-4 min-h-screen flex flex-col items-center justify-center bg-cover bg-center font-poppins"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4)),url('/bg.jpg')",
      }}
    >
      <div className="w-full max-w-md p-6 rounded-lg bg-white bg-clip-padding flex flex-col items-center">
        <img
          className="rounded-md h-11 mt-4"
          src="/public/logo.webp"
          alt="site logo"
        />
        <div className="mt-4 text-center">
          <h3 className="font-semibold text-3xl">{page}</h3>
          <p className="mt-2 text-sm">{renderAuthLink()}</p>
          {(page === "sign up" || page === "Login") && (
            <GoogleLogin onSuccess={handleGoogleSignIn} />
          )}
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t-2 border-gray-400"></div>
            {(page === "Sign Up" || page === "Login") && (
              <span className="flex-shrink mx-4 text-gray-400">OR</span>
            )}
            <div className="flex-grow border-t-2 border-gray-400"></div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export default AuthModel;
