

function SettingsForm() {
    return (
        <div>
            <label htmlFor="numericInput">Enter a number between 1 and 100:</label>
            <input type="number" id="numericInput" name="numericInput" min="1" max="100" step="1" />

        </div>
    );
}

export default SettingsForm;