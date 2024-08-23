import React, { createContext, useState } from 'react';

// Create Tenant Context
export const TenantContext = createContext();

// Create a Provider component to wrap your app
export const TenantProvider = ({ children }) => {
  const [tenantName, setTenantName] = useState('');
  const [tenantId, setTenantId] = useState('');

  return (
    <TenantContext.Provider value={{ tenantName, setTenantName, tenantId, setTenantId }}>
      {children}
    </TenantContext.Provider>
  );
};
