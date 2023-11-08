import React, {ChangeEvent} from 'react';

interface SelectComponentProps {
    selectedOption: string;
    handleOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const UserFishSelection : React.FC<SelectComponentProps> = ({ selectedOption, handleOptionChange }) => {
    return (
        <select value={selectedOption} onChange={handleOptionChange}>
            <option value="userFish">Moje ryby</option>
            <option value="allFish">Ryby wszystkich użytkowników</option>
        </select>
    );
};
