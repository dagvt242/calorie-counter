export default class Product {
    constructor(id, name, caloriesPer100g, proteins = 0, fats = 0, carbs = 0) {
        this.validate(name, caloriesPer100g, proteins, fats, carbs);

        this.id = id;
        this.name = name;
        this.caloriesPer100g = caloriesPer100g;
        this.proteins = proteins;
        this.fats = fats;
        this.carbs = carbs;
    }

    validate(name, calories, proteins, fats, carbs) {
        if (!name || name.trim() === '') {
            throw new Error("Назва продукту не може бути порожньою.");
        }
        if (calories < 0 || proteins < 0 || fats < 0 || carbs < 0) {
            throw new Error("Макронутрієнти та калорії не можуть бути від'ємними.");
        }
    }

    calculateCaloriesForWeight(weightInGrams) {
        if (weightInGrams <= 0) return 0;
        return (this.caloriesPer100g * weightInGrams) / 100;
    }

    calculateMacrosForWeight(weightInGrams) {
        if (weightInGrams <= 0) return { proteins: 0, fats: 0, carbs: 0 };
        return {
            proteins: (this.proteins * weightInGrams) / 100,
            fats: (this.fats * weightInGrams) / 100,
            carbs: (this.carbs * weightInGrams) / 100
        };
    }
}