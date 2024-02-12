# User Authorization
The project involved the development of a REST API using the ExpressJS framework, integrating GitHub as the third-party authorization API for user authentication. By implementing OAuth, security is elevated, removing the requirement for users to log in with passwords. This setup establishes a robust and streamlined authentication process, leveraging users' GitHub accounts for secure access to the system.

Key steps include:
• Establishing an Express server to handle client requests.
• Crafting an HTML page to serve as the response when clients access the root path of the application.
• Organizing static files within a dedicated folder for better maintenance.
• Implementing a redirection mechanism to direct users to GitHub for login authentication.
• Utilizing GitHub's authentication process to acquire an access token.
• Utilizing the obtained token to authenticate users within the Node.js application and storing the token securely within a cookie.
