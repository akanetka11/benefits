import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { useFavoriteAnimation } from './useFavoriteAnimation';
export { useSplashIconAnimation } from './useSplashIconAnimation';
