export default class DashboardUI {
    constructor(containerId) {
        this.containerId = containerId;
    }

    renderProgress(currentCalories, targetCalories) {
        const target = targetCalories > 0 ? targetCalories : 2000;
        const percentage = Math.min((currentCalories / target) * 100, 100).toFixed(1);

        const isExceeded = currentCalories > target;
        const colorClass = isExceeded ? 'danger' : 'success';

        return `
            <div class="dashboard-widget calories-widget">
                <h3>Калорії за день</h3>
                <div class="progress-bar-container">
                    <div class="progress-bar ${colorClass}" style="width: ${percentage}%"></div>
                </div>
                <p class="stats-text">
                    <strong>${currentCalories.toFixed(0)}</strong> / ${target.toFixed(0)} ккал (${percentage}%)
                </p>
                ${isExceeded ? '<p class="warning-text">Обережно! Денний ліміт перевищено!</p>' : ''}
            </div>
        `;
    }

    renderMealList(meals) {
        if (!meals || meals.length === 0) {
            return `
                <div class="dashboard-widget meal-list-widget">
                    <h3>Щоденник харчування</h3>
                    <p class="empty-state">Ви ще нічого не додали сьогодні. Час перекусити!</p>
                </div>
            `;
        }

        const listHtml = meals.map(meal => {
            const summary = meal.getSummary();
            return `
                <li class="meal-item">
                    <span class="meal-time">${summary.time}</span>
                    <span class="meal-name">${summary.name} <small>(${summary.weight}г)</small></span>
                    <span class="meal-cals"><strong>${summary.calories} ккал</strong></span>
                </li>
            `;
        }).join('');

        return `
            <div class="dashboard-widget meal-list-widget">
                <h3>Щоденник харчування</h3>
                <ul class="meal-list">${listHtml}</ul>
            </div>
        `;
    }

    updateDashboard(currentCalories, targetCalories, meals) {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`[DashboardUI] Помилка: елемент з ID '${this.containerId}' не знайдено на сторінці.`);
            return;
        }

        const progressHtml = this.renderProgress(currentCalories, targetCalories);
        const mealsHtml = this.renderMealList(meals);

        container.innerHTML = progressHtml + mealsHtml;
        console.log("[DashboardUI] Інтерфейс головної панелі успішно оновлено.");
    }
}