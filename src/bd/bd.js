const bd = {
    user: [
        { name: "Ivan Lyakh" }
    ],

    nav: [
        { name: "Головна", path: "#", id: 1 },
        { name: "Мої рецепти", path: "#", id: 2 },
        { name: "Збережене", path: "#", id: 3 },
        { name: "Вийти", path: "#", id: 4 },

    ],
    mainPage: {
        recipes: [
            { img: '', name: 'Суп звичайний', tags: ['Українська кухня', 'Пісна страва', 'Суп'], cookingTime: '10', rate: 5, key: 1 },
            { img: '', name: 'Суп звичайний', tags: ['Українська кухня', 'Пісна страва', 'Суп'], cookingTime: '10', rate: 5, key: 2 },
        ],

        searchInput: { img: '', text: 'Я шукаю...', buttonText: 'Знайти' }
    }
}

export default bd;