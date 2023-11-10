import React, {ChangeEvent} from 'react';

interface FishSelectComponentProps {
    selectedFish: string | null;
    handleFishChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    fishListArray: string[];
}

export const FishSelectComponent: React.FC<FishSelectComponentProps> = ({ selectedFish, handleFishChange, fishListArray }) => {
    return (
        <select value={selectedFish || ""} onChange={handleFishChange}>
            <option value="">Choose a fish</option>
            {fishListArray.map((fishName) => (
                <option key={fishName} value={fishName}>
                    {fishName}
                </option>
            ))}
        </select>
    );
};