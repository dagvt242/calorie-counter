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
            this.meals = data.meals || [];
            console.log("[DataManager] Дані успішно завантажено з сервера.");
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
                console.log("[DataManager] Запис успішно збережено у файлі.");
            }
        } catch (error) {
            console.error("[DataManager] Помилка збереження на сервері:", error);
        }
    }

    getAllMeals() {
        return this.meals;
    }
}