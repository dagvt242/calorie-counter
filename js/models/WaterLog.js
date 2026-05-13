export default class WaterLog {
    constructor(id, targetVolume = 2000, date = new Date()) {
        this.validate(targetVolume);

        this.id = id;
        this.targetVolume = targetVolume;
        this.currentVolume = 0;
        this.date = date;
        this.records = [];
    }

    validate(target) {
        if (target <= 0) {
            throw new Error("Цільовий об'єм води має бути більшим за нуль.");
        }
    }

    addWater(amountInMl) {
        if (amountInMl <= 0) {
            throw new Error("Кількість випитої води має бути більшою за нуль.");
        }

        this.currentVolume += amountInMl;

        this.records.push({
            amount: amountInMl,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    }

    getRemaining() {
        const remaining = this.targetVolume - this.currentVolume;
        return remaining > 0 ? remaining : 0;
    }

    getProgressPercentage() {
        const percent = (this.currentVolume / this.targetVolume) * 100;
        return percent > 100 ? 100 : Math.round(percent);
    }
}