import { useContext } from 'react';
import { AuthContext } from '@/contexts';

// Hook personalizado para acceder al contexto
export const useAuth = () => useContext(AuthContext);
