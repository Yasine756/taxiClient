const initialState = {
  pompiste: loadFromLocalStorage('pompiste') || null,
  admin: loadFromLocalStorage('admin') || null,
};
// Récupérer les données du localStorage lors de l'initialisation du reducer
const loadFromLocalStorage = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item && item !== "undefined" ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Erreur de parsing pour ${key}:`, error);
    return null;
  }
};

const authReducer = (state = {
  pompiste: loadFromLocalStorage('pompiste'),
  admin: loadFromLocalStorage('admin'),
}, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS_POMPISTE':
      return {
        ...state,
        pompiste: action.payload,
      };
    case 'LOGIN_SUCCESS_ADMIN':
      return {
        ...state,
        admin: action.payload,
      };
    case 'LOGOUT_POMPISTE':
      localStorage.removeItem('pompiste'); // Supprime uniquement le pompiste
      return {
        ...state,
        pompiste: null,
      };
    case 'LOGOUT_ADMIN':
      localStorage.removeItem('admin'); // Supprime uniquement l'admin
      return {
        ...state,
        admin: null,
      };
    default:
      return state;
  }
};

export default authReducer;
