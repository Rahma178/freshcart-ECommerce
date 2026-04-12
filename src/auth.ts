import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import {jwtDecode} from 'jwt-decode'

export const nextAuthConfig: NextAuthOptions = {
   secret: process.env.NEXTAUTH_SECRET,
   
  providers: [
    Credentials({
      name: "credentials login!!",
      credentials: {
        email: { label: "user email", placeholder: "email" },
        password: {},
      },

      authorize: async (credentials) => {
       

        const data = await fetch(
          "https://ecommerce.routemisr.com/api/v1/auth/signin",
          {
            method: "post",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "content-type": "application/json",
            },
          }
        );

        if(!data.ok) {
          throw new Error (data.statusText)
        }
        const payload = await data.json();
        console.log(payload)

        const {name,email} = payload.user;
        const tokenData = jwtDecode<{id:string}>(payload.token)

        return {
          id:tokenData.id,
          name,
          email,
          token:payload.token
        }
      },
    }),
  ],
  callbacks:{
      jwt({token,user}){

        if(user){
          token.id = user.id
          token.token = user.token
        }

        return token
      },

      session:({token,session})=>{
        if(token){
          // session.user?.name = token.name!
          session.user.name = token.name!
        }
        return session
      }
  },

  pages:{
    signIn:'/login'
  }
};