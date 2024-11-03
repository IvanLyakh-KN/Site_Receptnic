import React, { useState } from 'react';
import recipesDb from '../../bd/recipesDb'; // Імпортуємо базу даних для додавання нового рецепта
import './createRecipe.css';

const CreateRecipe = ({ openMyRecipesPage }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState(['']);
    const [advices, setAdvices] = useState(['']);
    const [imgSrc, setImgSrc] = useState('');

    // Функція для динамічного додавання інгредієнтів
    const addIngredient = () => setIngredients([...ingredients, '']);
    const handleIngredientChange = (index, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = value;
        setIngredients(newIngredients);
    };

    // Функція для динамічного додавання кроків
    const addInstruction = () => setInstructions([...instructions, '']);
    const handleInstructionChange = (index, value) => {
        const newInstructions = [...instructions];
        newInstructions[index] = value;
        setInstructions(newInstructions);
    };

    // Функція для динамічного додавання порад
    const addAdvice = () => setAdvices([...advices, '']);
    const handleAdviceChange = (index, value) => {
        const newAdvices = [...advices];
        newAdvices[index] = value;
        setAdvices(newAdvices);
    };

    // Зберігає рецепт у базу даних
    const handleSubmit = () => {
        const newRecipe = {
            imgSrc,
            name,
            description,
            cookingTime: '',
            ingredients,
            instructions,
            advices,
            tags: [],
            rate: 0,
            myRecipe: true,
            key: recipesDb.length + 1
        };

        recipesDb.push(newRecipe); // Додаємо рецепт у базу даних
    };

    return (
        <section className='container create-recipe'>
            <div className="addRecipeImg">
                <p>Додати зображення страви *обов’язково</p>
                <span className="myRecipes__plusIcon"></span>
            </div>
            <div className="createRecipe__body">
                <label>Введіть назву страви *обов’язково:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />

                <label>Опис страви (*обов’язково):</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />

                <label>Додати інгредієнти (*обов’язково):</label>
                {ingredients.map((ingredient, index) => (
                    <input
                        key={index}
                        type="text"
                        value={ingredient}
                        onChange={(e) => handleIngredientChange(index, e.target.value)}
                        placeholder={`Інгредієнт ${index + 1}`}
                    />
                ))}
                <button type="button" onClick={addIngredient}>Додати інгредієнт</button>

                <label>Покрокові дії для приготування (*обов’язково):</label>
                {instructions.map((step, index) => (
                    <textarea
                        key={index}
                        value={step}
                        onChange={(e) => handleInstructionChange(index, e.target.value)}
                        placeholder={`Крок ${index + 1}`}
                    />
                ))}
                <button type="button" onClick={addInstruction}>Додати крок</button>

                <label>Поради (необов’язково):</label>
                {advices.map((advice, index) => (
                    <input
                        key={index}
                        type="text"
                        value={advice}
                        onChange={(e) => handleAdviceChange(index, e.target.value)}
                        placeholder={`Порада ${index + 1}`}
                    />
                ))}
                <button type="button" onClick={addAdvice}>Додати пораду</button>

                <label>Додати URL зображення:</label>
                <input
                    type="url"
                    value={imgSrc}
                    onChange={(e) => setImgSrc(e.target.value)}
                    placeholder="Введіть URL зображення"
                />
                <button className="submit-btn" onClick={() => { openMyRecipesPage(); handleSubmit(); }}>Готово</button>
            </div>
        </section>
    );
};

export default CreateRecipe;
