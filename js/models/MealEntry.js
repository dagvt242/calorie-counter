export default class MealEntry {
    constructor(id, product, weightInGrams, date = new Date()) {
        this.validate(product, weightInGrams);

        this.id = id;
        this.product = product;
        this.weightInGrams = weightInGrams;
        this.date = date;

        this.totalCalories = this.product.calculateCaloriesForWeight(this.weightInGrams);
        this.totalMacros = this.product.calculateMacrosForWeight(this.weightInGrams);
    }

    validate(product, weight) {
        if (!product) {
            throw new Error("Продукт обов'язковий для запису прийому їжі.");
        }
        if (weight <= 0) {
            throw new Error("Вага порції повинна бути більшою за нуль.");
        }
    }

    getSummary() {
        return {
            name: this.product.name,
            weight: this.weightInGrams,
            calories: this.totalCalories.toFixed(1),
            proteins: this.totalMacros.proteins.toFixed(1),
            fats: this.totalMacros.fats.toFixed(1),
            carbs: this.totalMacros.carbs.toFixed(1),
            time: this.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
    }
}