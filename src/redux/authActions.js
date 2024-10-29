// src/redux/actions/authActions.js

// Action de login réussie pour le pompiste
export const loginPompisteSuccess = (pompiste) => {
  if (pompiste) {
    localStorage.setItem('pompiste', JSON.stringify(pompiste));
  }

  return {
    type: 'LOGIN_SUCCESS_POMPISTE',
    payload: pompiste,
  };
};

// Action de login réussie pour l'admin
export const loginAdminSuccess = (admin) => {
  localStorage.setItem('admin', JSON.stringify(admin));
  return {
    type: 'LOGIN_SUCCESS_ADMIN',
    payload: admin,
  };
};

// Action de déconnexion pour le pompiste
export const logoutPompiste = () => {
  return {
    type: 'LOGOUT_POMPISTE',
  };
};

// Action de déconnexion pour l'admin
export const logoutAdmin = () => {
  return {
    type: 'LOGOUT_ADMIN',
  };
};
