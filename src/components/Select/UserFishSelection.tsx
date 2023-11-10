import React, {ChangeEvent} from 'react';

interface SelectComponentProps {
    selectedOption: string;
    handleOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const UserFishSelection : React.FC<SelectComponentProps> = ({ selectedOption, handleOptionChange }) => {
    return (
        <select value={selectedOption} onChange={handleOptionChange}>
            <option value="userFish">My Fish</option>
            <option value="allFish">Fish of all users</option>
        </select>
    );
};
