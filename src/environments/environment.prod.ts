const keycloakConfig = {
  url: 'https://localhost/auth',
  realm: 'real',
  clientId: 'cliId',
};

export const environment = {
  production: true,
  apiUrl: 'http://localhost:8080/api',
  keycloakConfig,
};
