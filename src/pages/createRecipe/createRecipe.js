import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import usePostRecipe from '../../hooks/usePostRecipe.js';
import './createRecipe.css';

const CreateRecipe = () => {
    const [name, setName] = useState('');
    const [cookingTime, setCookingTime] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState(['']);
    const [instructions, setInstructions] = useState(['']);
    const [advices, setAdvices] = useState(['']);
    const [imgSrc, setImgSrc] = useState('');

    const { isLoading, error, postData } = usePostRecipe();

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

    const handleSubmit = async () => {
        const newRecipe = {
            imgSrc,
            name,
            description,
            cookingTime,
            ingredients: ingredients.filter(i => i.trim() !== ''),
            instructions: instructions.filter(i => i.trim() !== ''),
            advices: advices.filter(a => a.trim() !== ''),
            tags: [],
            rate: 0,
            myRecipe: true,
        };

        try {
            const savedRecipe = await postData(newRecipe);

            console.log('Рецепт успішно додано:', savedRecipe);

        } catch (err) {
            console.error('Помилка: ', err.message);
            alert(`Помилка: ${err.message}`);
        }
    };
    return (
        <section className='container create-recipe'>
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

                <label>Час приготування:</label>
                <input
                    type="text"
                    value={cookingTime}
                    onChange={(e) => setCookingTime(e.target.value)}
                    placeholder="Вкажіть Час приготування"
                />

                <label>Додати URL зображення:</label>
                <input
                    type="url"
                    value={imgSrc}
                    onChange={(e) => setImgSrc(e.target.value)}
                    placeholder="Введіть URL зображення"
                />
                <Link to='/my-recipes'><button className="submit-btn" onClick={() => handleSubmit()}>Готово</button></Link>
            </div>
        </section >
    );
};

export default CreateRecipe;


