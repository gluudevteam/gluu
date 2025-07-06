import React, { createContext, useContext, useState } from 'react';

const NewItemContext = createContext();

export const NewItemProvider = ({ children }) => {
    const [images, setImages] = useState([]);
    const [itemDetails, setItemDetails] = useState({ brand: '', type: '', price: '' });

    const clearNewItem = () => {
        setImages([]);
        setItemDetails({ brand: '', type: '', price: '' });
    };

    return (
        <NewItemContext.Provider value={{
            images, setImages,
            itemDetails, setItemDetails,
            clearNewItem
        }}>
            {children}
        </NewItemContext.Provider>
    );
};

export const useNewItem = () => useContext(NewItemContext);