import { useContext } from 'react';
import { AuthContext } from '@/contexts';

// Hook personalizado para acceder al contexto: AuthContext
export const useAuth = () => useContext(AuthContext);
