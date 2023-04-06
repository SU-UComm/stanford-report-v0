import React, {useState} from 'react';
import {useAppState, useAppDispatch} from '../AppState/AppState.jsx';

export const AppStateExample = () => {
    const {exampleAppData} = useAppState();
    const appDispatch = useAppDispatch();
    const [newExampleAppData, setNewExampleAppData] = useState('');

    return (
        <>
            <strong>AppState</strong>
            <p>AppState will save to local storage.</p>
            <fieldset>
                <input
                    type="text"
                    value={newExampleAppData}
                    onChange={(e) => {
                        setNewExampleAppData(e.target.value);
                    }}
                ></input>
                <button
                    className="su-bg-black-70 su-p-6 su-text-white su-mx-5"
                    onClick={() => {
                        appDispatch({type: 'addExampleAppData', data: newExampleAppData});
                        setNewExampleAppData('');
                    }}
                >
                    Add to exampleAppData
                </button>
                <button
                    className="su-bg-black-70 su-p-6 su-text-white su-mx-5"
                    onClick={() => {
                        appDispatch({type: 'removeExampleAppData', data: newExampleAppData});
                        setNewExampleAppData('');
                    }}
                >
                    Remove from exampleAppData
                </button>
            </fieldset>
            <pre>
                <code>exampleData: {JSON.stringify(exampleAppData, null, 2)}</code>
            </pre>
        </>
    );
};
