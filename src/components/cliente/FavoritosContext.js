import React, { createContext, useState } from 'react';

export const FavoritosContext = createContext();

export const FavoritosProvider = ({ children }) => {
    const [favoritos, setFavoritos] = useState([]);

    return (
        <FavoritosContext.Provider value={{ favoritos, setFavoritos }}>
            {children}
        </FavoritosContext.Provider>
    );
};