Cypress.Commands.add('login', (username, password) => {
    cy.log(`Logging in as ${username}`);

    cy.request({
        method: 'POST',
        url: 'http://localhost:5000/auth/login',
        body: {
            login: username,
            password: password
        }
    }).then((resp) => {
        window.localStorage.setItem('token', resp.body.token);
        window.localStorage.setItem('userlogin', resp.body.user.login);
    });
});