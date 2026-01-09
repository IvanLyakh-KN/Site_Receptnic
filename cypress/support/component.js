// Імпорт стилів (якщо є глобальні стилі, наприклад index.css або App.css)
import './commands'
// Якщо у вас є глобальні стилі у проекті, розкоментуйте та вкажіть шлях:
// import '../../src/index.css' 

// Імпорт підтримки code coverage
import '@cypress/code-coverage/support'

// ВАЖЛИВО: Використовуйте 'cypress/react' замість 'cypress/react18'
import { mount } from 'cypress/react'

Cypress.Commands.add('mount', mount)