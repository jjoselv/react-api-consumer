export const SET_NATIONALITY = 'SET_NATIONALITY';

export interface SetNationalityAction {
    type: typeof SET_NATIONALITY;
    payload: string;
};
    
export type SETTINGS_ACTION_TYPE = SetNationalityAction;
