import { useUser } from "@auth0/nextjs-auth0";

export default function Index() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>{error.message}</div>;

  if (user) {
    return (
      <>
        <div>Welcome {user.name}!</div>
        <div>
          <a href="/dashboard">View profile</a>
        </div>
        <div>
          <a href="/api/auth/logout">Logout</a>
        </div>
      </>
    );
  }

  return <a href="/api/auth/login">Login</a>;
}
