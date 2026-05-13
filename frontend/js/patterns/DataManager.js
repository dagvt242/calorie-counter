import Product from '../models/Product.js';
import MealEntry from '../models/MealEntry.js';

export default class DataManager {
    constructor() {
        if (DataManager.instance) return DataManager.instance;

        this.apiUrl = 'http://localhost:5000/api';
        this.meals = [];
        this.currentUser = null;

        DataManager.instance = this;
    }

    async loadData() {
        try {
            const response = await fetch(`${this.apiUrl}/data`);
            const data = await response.json();

            if (data.meals && data.meals.length > 0) {
                this.meals = data.meals.map(item => {
                    const p = item.product;
                    const product = new Product(p.id, p.name, p.caloriesPer100g, p.proteins, p.fats, p.carbs);
                    return new MealEntry(item.id, product, item.weightInGrams, new Date(item.date));
                });
            } else {
                this.meals = [];
            }

            console.log("[DataManager] Дані успішно завантажено та відновлено.");
            return this.meals;
        } catch (error) {
            console.error("[DataManager] Помилка завантаження:", error);
            return [];
        }
    }

    async addMeal(mealEntry) {
        try {
            const response = await fetch(`${this.apiUrl}/meals`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mealEntry)
            });

            if (response.ok) {
                this.meals.push(mealEntry);
                console.log("[DataManager] Запис успішно збережено на сервері.");
            }
        } catch (error) {
            console.error("[DataManager] Помилка збереження на сервері:", error);
        }
    }

    getAllMeals() {
        return this.meals;
    }
}