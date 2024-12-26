import NextAuth from "next-auth";

import KeycloakProvider from "next-auth/providers/keycloak";

export const authOptions = {
	providers: [
		KeycloakProvider({
			clientId: process.env.KEYCLOAK_CLIENT_ID,
			clientSecret: process.env.KEYCLOAK_CLIENT_SECRET,
			issuer: process.env.KEYCLOAK_ISSUER,
			jwks_endpoint: `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/microapp/protocol/openid-connect/certs`,
			wellKnown: undefined,
			authorization: {
				params: {
					scope: "openid email profile",
				},
				url: `${process.env.KEYCLOAK_ISSUER}/protocol/openid-connect/auth`,
			},
			token: `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/microapp/protocol/openid-connect/token`,
			userinfo: `${process.env.KEYCLOAK_AUTH_SERVER_URL}/realms/microapp/protocol/openid-connect/userinfo`,
		}),
	],
	callbacks: {
		async signIn({ user, account, profile }) {
			console.log("SignIn callback:", { user, account, profile });
			return true; // Allow the sign-in
		},
		async jwt({ token, user, account }) {
			// If this is the first login, persist the user details in the token
			if (account && user) {
				token.accessToken = account.access_token;
				token.idToken = account.id_token;
				token.user = user;
			}
			console.log("JWT callback:", token);
			return token;
		},
		async session({ session, token }) {
			// Add custom properties to the session
			session.user = token.user; // Assign user details from token
			session.accessToken = token.accessToken;
			session.idToken = token.idToken;
			console.log("Session callback:", session);
			return session;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
