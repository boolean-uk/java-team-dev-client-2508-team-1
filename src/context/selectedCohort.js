import React, { createContext, useContext, useState } from 'react';

const CohortContext = createContext();

export const CohortProvider = ({ children }) => {
  const [cohortId, setCohortId] = useState({ cohort: ''});

  return (
    <CohortContext.Provider value={{ cohortId, setCohortId }}>
      {children}
    </CohortContext.Provider>
  );
};

export const useSelectedCohortId = () => useContext(CohortContext);
