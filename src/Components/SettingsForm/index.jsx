import { useContext } from 'react';
import { SettingContext } from '../../Context/Settings';
import "./settingsForm.scss"


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
        <section>
            <h2>Mange Settings</h2>
            <div className='body'>

                <form onSubmit={handleSubmit} className='left-section'>
                    <h3>Update Settings</h3>
                    <label htmlFor="numericInput">Enter a number between 1 and 100:</label>
                    <input type="number" id="numericInput" name="numericInput" min="1" max="100" step="1" />
                    <label htmlFor="scales">
                        Show Completed
                        <input type="checkbox" id="scales" name="scales" />
                    </label>

                    <button type="submit">Show New Settings</button>
                </form>
                <div className='right-section' >
                    <h3>Updated Settings</h3>
                    <p>Items Peer page: <b>{settings.itemsPerPage}</b></p>
                    <p>Show Completed: <b>{settings.showCompleted.toString()}</b> </p>
                </div>
            </div>
        </section >
    );
}

export default SettingsForm;