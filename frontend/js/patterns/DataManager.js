export default class DataManager {
    constructor() {
        if (DataManager.instance) {
            console.log("[Singleton] Повертаємо існуючий екземпляр бази даних.");
            return DataManager.instance;
        }

        console.log("[Singleton] Створюємо першу і єдину базу даних.");

        this.meals = [];
        this.waterLogs = [];
        this.currentUser = null;

        DataManager.instance = this;
    }

    setUser(user) {
        this.currentUser = user;
    }

    getUser() {
        return this.currentUser;
    }

    addMeal(mealEntry) {
        this.meals.push(mealEntry);
    }

    getAllMeals() {
        return this.meals;
    }

    saveData() {
        console.log("Дані успішно збережено в локальне сховище (Симуляція).");
    }
}