describe('Повний сценарій користувача (E2E)', () => {
    const uniqueId = Date.now();
    const username = `User_${uniqueId}`;
    const password = 'password123';

    it('1. Гість може бачити головну сторінку та шукати рецепти', () => {
        cy.visit('/');

        cy.get('.recipe').should('have.length.greaterThan', 0);

        // Перевірка пошуку
        cy.get('input[placeholder="Я шукаю..."]').type('Суп');
    });

    it('2. Реєстрація нового користувача', () => {
        cy.visit('#/authorization');

        cy.contains('Створити акаунт').click();

        cy.get('input[placeholder="Логін:"]').type(username);
        cy.get('input[placeholder="Пароль:"]').type(password);

        cy.get('button[type="submit"]').click();

        cy.url().should('eq', Cypress.config().baseUrl + '/#/');
        cy.contains(username).should('be.visible');
    });

    it('3. Створення рецепту', () => {
        cy.visit('#/authorization');
        cy.get('input[placeholder="Логін:"]').type(username);
        cy.get('input[placeholder="Пароль:"]').type(password);
        cy.get('button[type="submit"]').click();
        cy.get('a[href="#/my-recipes"]').click();
        cy.get('a[href="#/create-recipe"]').click();

        cy.get('input').eq(0).type('Мій E2E Рецепт'); // Назва
        cy.get('textarea').eq(0).type('Дуже смачний тест'); // Опис
        cy.get('input[placeholder*="Інгредієнт 1"]').type('Вода'); // Інгредієнт
        cy.get('textarea[placeholder*="Крок"]').type('Закип\'ятити'); // Інструкція
        cy.get('input[placeholder="Вкажіть Час приготування"]').type('10');
        cy.get('input[placeholder="Введіть URL зображення"]').type('https://i.obozrevatel.com/food/recipemain/2019/2/28/gg.jpg?size=636x424');

        cy.contains('Готово').click();

        cy.url().should('include', '#/my-recipes');
        cy.contains('Мій E2E Рецепт').should('be.visible');
    });
});