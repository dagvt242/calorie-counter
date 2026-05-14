import DataManager from './patterns/DataManager.js';
import Observer from './patterns/Observer.js';
import Product from './models/Product.js';
import MealEntry from './models/MealEntry.js';
import DashboardUI from './ui/DashboardUI.js';
import FormUI from './ui/FormUI.js';
import WaterLog from './models/WaterLog.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log("Додаток ініціалізовано.");

    const db = new DataManager();
    const DAILY_CALORIE_GOAL = 2000;

    const waterTracker = new WaterLog(Date.now().toString());

    await db.loadData();

    const appObserver = new Observer();
    const dashboard = new DashboardUI('dashboard-container');
    const formUI = new FormUI('form-container');

    appObserver.subscribe('mealAdded', () => {
        const allMeals = db.getAllMeals();
        const totalCalories = allMeals.reduce((sum, meal) => sum + meal.totalCalories, 0);
        dashboard.updateDashboard(
            totalCalories,
            DAILY_CALORIE_GOAL,
            allMeals,
            waterTracker.currentVolume,
            waterTracker.targetVolume
        );
    });

    formUI.initMealForm(async (formData) => {
        try {
            const product = new Product(
                Date.now().toString(),
                formData.name, formData.calories, formData.proteins, formData.fats, formData.carbs
            );
            const mealEntry = new MealEntry(Date.now().toString(), product, formData.weight);

            await db.addMeal(mealEntry);

            appObserver.notify('mealAdded', mealEntry);
        } catch (error) {
            alert(`Помилка: ${error.message}`);
        }
    });

    document.getElementById('dashboard-container').addEventListener('click', (event) => {
        if (event.target.classList.contains('btn-water')) {
            const amount = parseInt(event.target.getAttribute('data-amount'));
            waterTracker.addWater(amount);

            appObserver.notify('mealAdded', null);
        }
    });

    appObserver.notify('mealAdded', null);
});