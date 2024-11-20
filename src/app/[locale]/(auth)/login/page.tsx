import LoginForm from "@/components/auth/LoginForm";
import { getCurrentUser } from "../../../../../actions/getCurrentUser";

const LoginPage = async () => {
  const currentUser = await getCurrentUser();

  return (
    <div>
      <LoginForm currentUser={currentUser} />
    </div>
  );
};

export default LoginPage;
