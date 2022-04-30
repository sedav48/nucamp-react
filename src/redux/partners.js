import { PARTNERS } from '../shared/partners';
import * as ActionTypes from './ActionTypes';

export const Partners = (state = PARTNERS, action) => {
    switch (action.type) {
        
            case ActionTypes.ADD_PARTNERS:
                return { ...state, errMess: null, partners: action.payload};
            
            case ActionTypes.PARTNERS_FAILED:
                return { ...state, errMess: action.payload};
    
            case ActionTypes.PARTNERS_LOADING:
                const partner = action.payload;
               
                return {...state, partners: state.partners.concat(partner)};
            default:
                return state;
        }
    };
 