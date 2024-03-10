import { signIn } from "next-auth/client"

export default () => (
  <button onClick={() => signIn("google")}>Sign in with Google</button>
)