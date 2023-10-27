import React, {useState} from 'react';
import {useDataState, useDataDispatch} from '../DataState/DataState.jsx';

export const DataStateExample = () => {
    const {exampleData} = useDataState();
    const dataDispatch = useDataDispatch();
    const [newExampleData, setNewExampleData] = useState('');

    return (
        <>
            {' '}
            <strong>DataState</strong>
            <p>DataState is not saved anywhere.</p>
            <fieldset>
                <input
                    type="text"
                    value={newExampleData}
                    onChange={(e) => {
                        setNewExampleData(e.target.value);
                    }}
                ></input>
                <button
                    className="su-bg-black-70 su-p-6 su-text-white su-mx-5"
                    onClick={() => {
                        dataDispatch({type: 'setData', data: newExampleData});
                        setNewExampleData('');
                    }}
                >
                    Set exampleData
                </button>
                <button
                    className="su-bg-black-70 su-p-6 su-text-white su-mx-5"
                    onClick={() => {
                        dataDispatch({type: 'clearData'});
                        setNewExampleData('');
                    }}
                >
                    Clear exampleData
                </button>
            </fieldset>
            <pre>
                <code>exampleData: {JSON.stringify(exampleData, null, 2)}</code>
            </pre>
        </>
    );
};
