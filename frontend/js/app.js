import DataManager from './patterns/DataManager.js';
import Observer from './patterns/Observer.js';

import Product from './models/Product.js';
import MealEntry from './models/MealEntry.js';

import DashboardUI from './ui/DashboardUI.js';
import FormUI from './ui/FormUI.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Додаток ініціалізовано.");

    const db = new DataManager();

    const initialMeals = await db.loadData();
    appObserver.notify('mealAdded', null);

    const DAILY_CALORIE_GOAL = 2000;

    const appObserver = new Observer();

    const dashboard = new DashboardUI('dashboard-container');
    const formUI = new FormUI('form-container');


    appObserver.subscribe('mealAdded', () => {
        const allMeals = db.getAllMeals();

        const totalCalories = allMeals.reduce((sum, meal) => sum + meal.totalCalories, 0);

        dashboard.updateDashboard(totalCalories, DAILY_CALORIE_GOAL, allMeals);
    });


    formUI.initMealForm((formData) => {
        try {
            const product = new Product(
                Date.now().toString(),
                formData.name,
                formData.calories,
                formData.proteins,
                formData.fats,
                formData.carbs
            );

            const mealEntry = new MealEntry(Date.now().toString(), product, formData.weight);

            db.addMeal(mealEntry);

            appObserver.notify('mealAdded', mealEntry);

        } catch (error) {
            alert(`Помилка: ${error.message}`);
        }
    });

    appObserver.notify('mealAdded', null);
});