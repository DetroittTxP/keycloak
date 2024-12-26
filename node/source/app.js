const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const Keycloak = require("keycloak-connect");

const app = express();

app.use(cors());
app.use(bodyparser.json());

const port = 9460;

const keycloakConfig = {
	clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
	bearerOnly: true,
	serverUrl: `${process.env.KEYCLOAK_SERVER_URL}`,
	realm: `${process.env.KEYCLOAK_REALM}`,
	credentials: {
	  secret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
	},
}

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});

