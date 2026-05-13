export default class FormUI {
    constructor(containerId) {
        this.containerId = containerId;
    }

    renderMealForm() {
        return `
            <div class="form-card">
                <h3>Додати прийом їжі</h3>
                <form id="addMealForm">
                    <div class="form-group">
                        <label>Назва продукту:</label>
                        <input type="text" id="productName" required placeholder="Наприклад: Вівсянка">
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Калорії (на 100г):</label>
                            <input type="number" id="productCalories" required min="0" step="0.1" placeholder="350">
                        </div>
                        <div class="form-group">
                            <label>Вага порції (г):</label>
                            <input type="number" id="mealWeight" required min="1" placeholder="150">
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label>Білки (г):</label>
                            <input type="number" id="productProteins" value="0" min="0" step="0.1">
                        </div>
                        <div class="form-group">
                            <label>Жири (г):</label>
                            <input type="number" id="productFats" value="0" min="0" step="0.1">
                        </div>
                        <div class="form-group">
                            <label>Вуглеводи (г):</label>
                            <input type="number" id="productCarbs" value="0" min="0" step="0.1">
                        </div>
                    </div>
                    <button type="submit" class="btn-primary">Додати продукт</button>
                </form>
            </div>
        `;
    }

    initMealForm(onSubmitCallback) {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error(`[FormUI] Контейнер '${this.containerId}' не знайдено.`);
            return;
        }

        container.innerHTML = this.renderMealForm();

        const form = document.getElementById('addMealForm');
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const formData = {
                name: document.getElementById('productName').value.trim(),
                calories: parseFloat(document.getElementById('productCalories').value),
                weight: parseFloat(document.getElementById('mealWeight').value),
                proteins: parseFloat(document.getElementById('productProteins').value) || 0,
                fats: parseFloat(document.getElementById('productFats').value) || 0,
                carbs: parseFloat(document.getElementById('productCarbs').value) || 0
            };

            onSubmitCallback(formData);

            form.reset();
            console.log("[FormUI] Дані зібрано, форму очищено.");
        });
    }
}