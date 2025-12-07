import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from './useAppDispatch';
import { logout } from '@/store/userSlice';

export function useLogout() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return useCallback(() => {
        dispatch(logout());
        navigate('/signin');
    }, [dispatch, navigate]);
}

