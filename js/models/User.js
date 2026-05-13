export default class User {
    constructor(id, name, gender, age, weight, height, activityLevel, goal = 'maintain') {
        this.validate(name, age, weight, height);

        this.id = id;
        this.name = name;
        this.gender = gender;
        this.age = age;
        this.weight = weight;
        this.height = height;
        this.activityLevel = activityLevel;
        this.goal = goal;
    }

    validate(name, age, weight, height) {
        if (!name || name.trim() === '') {
            throw new Error("Ім'я не може бути порожнім.");
        }
        if (age <= 0 || weight <= 0 || height <= 0) {
            throw new Error("Вік, вага та зріст повинні бути більшими за нуль.");
        }
    }

    calculateBMR() {
        let bmr = (10 * this.weight) + (6.25 * this.height) - (5 * this.age);
        if (this.gender === 'male') {
            bmr += 5;
        } else {
            bmr -= 161;
        }
        return bmr;
    }

    calculateDailyCalories() {
        const maintenanceCalories = this.calculateBMR() * this.activityLevel;

        switch (this.goal) {
            case 'lose':
                return maintenanceCalories - 500;
            case 'gain':
                return maintenanceCalories + 500;
            case 'maintain':
            default:
                return maintenanceCalories;
        }
    }

    calculateMacroSplit() {
        const totalCalories = this.calculateDailyCalories();
        let proteinPercent, fatPercent, carbPercent;

        if (this.goal === 'lose') {
            proteinPercent = 0.40; fatPercent = 0.30; carbPercent = 0.30;
        } else if (this.goal === 'gain') {
            proteinPercent = 0.30; fatPercent = 0.25; carbPercent = 0.45;
        } else {
            proteinPercent = 0.30; fatPercent = 0.30; carbPercent = 0.40;
        }

        return {
            proteins: Math.round((totalCalories * proteinPercent) / 4),
            fats: Math.round((totalCalories * fatPercent) / 9),
            carbs: Math.round((totalCalories * carbPercent) / 4)
        };
    }
}