import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode, JwtPayload } from "jwt-decode";

interface AuthJwt extends JwtPayload {
  id?: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },

      async authorize(credentials) {
        const response = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: { "content-type": "application/json" },
          },
        );
        const data = await response.json();
        //console.log(data);

        if (data.message === "success") {
          const decodedToken = jwtDecode<AuthJwt>(data.token);
          //console.log(decodedToken);
          return {
            id: decodedToken.id ?? decodedToken?.sub ?? "",
            user: data.user,
            token: data.token,
          };
        } else {
          throw new Error(data.message || "something is wrong");
        }
      },
    }),
  ],
  callbacks:{
    async jwt({token,user}) {
        if(user){
            token.user = user.user;
            token.token = user.token;
        }
        return token
    },
    async session({ session, token }) {
        if(token){
            session.user = token.user;
        }
      return session
    },
  }
};
