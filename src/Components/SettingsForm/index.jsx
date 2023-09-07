import { useContext, useState } from 'react';
import { SettingContext } from '../../Context/Settings';


function SettingsForm() {
    const settings = useContext(SettingContext)
    // const handleCheckboxChange = (e) => {

    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        const numericInputValue = e.target.numericInput.value;
        const scalesChecked = e.target.scales.checked;

        settings.setItemsPerPage(numericInputValue)
        settings.setShowCompleted(scalesChecked)
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="numericInput">Enter a number between 1 and 100:</label>
                <input type="number" id="numericInput" name="numericInput" min="1" max="100" step="1" />
                <input type="checkbox" id="scales" name="scales" />
                <label htmlFor="scales">Scales</label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default SettingsForm;