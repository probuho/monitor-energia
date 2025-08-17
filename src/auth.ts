import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          if (!response.ok) {
            throw new Error("Credenciales inválidas");
          }

          const data = await response.json();
          
          if (data.success) {
            return {
              id: data.usuario._id,
              name: data.usuario.nombre,
              email: data.usuario.email,
            };
          }

          return null;
        } catch (error) {
          console.error("Error en autenticación:", error);
          throw new Error("Error en la autenticación");
        }
      }
    })
  ],
  
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60,
  },
  
  callbacks: {
    async session({ session, user }) {
      if (user && session.user) {
        (session.user as any).id = user.id;
        (session.user as any).name = user.name;
        (session.user as any).email = user.email;
      }
      return session;
    }
  },
  
  pages: {
    signIn: "/login",
    error: "/login",
  },
  
  secret: process.env.NEXTAUTH_SECRET || "tu-secreto-seguro-aqui",
});
