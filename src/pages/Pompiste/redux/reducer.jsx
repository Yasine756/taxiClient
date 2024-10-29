import { Get_Pompiste,Add_Pompiste,Update_Pompiste,Delete_Pompiste,Pompiste_ERROR} from "./actionsStore"
const initialState = {
    pompistes: [],
    loading: true,
    error: null
}

const PompisteReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case Get_Pompiste:
            return { ...state, pompistes: payload, loading: false };

        case Add_Pompiste:
            return { ...state, pompistes: [...state.pompistes, payload] };

        case Update_Pompiste:
            return {
                ...state,
                pompistes: state.pompistes.map(pompiste => 
                    pompiste.id === payload.id ? payload : pompiste
                ),
                loading: false
            };

        case Delete_Pompiste:
            return {
                ...state,
                pompistes: state.pompistes.filter(pompiste => pompiste.id !== payload),
                loading: false
            };

        case Pompiste_ERROR:
            return { ...state, error: payload, loading: false };

        default:
            return state;
    }
}

export default PompisteReducer;
