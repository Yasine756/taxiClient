export const Get_Pompiste = "GetPompiste"
export const Add_Pompiste = "AddPompiste"
export const Update_Pompiste = "UpdatePompiste"
export const Delete_Pompiste = "DeletePompiste"
export const Pompiste_ERROR = 'Pompiste_ERROR';
import axios from 'axios'

const API_URL = 'http://localhost:5000/pompistes'

// Action pour récupérer tous les pompistes
export const getPompistes = () => async (dispatch) => {
    try {
      const res = await axios.get(API_URL);
      dispatch({
        type: Get_Pompiste,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: Pompiste_ERROR,
        payload: error.response ? error.response.data : error.message
      });
    }
  };
  
  // Action pour ajouter un nouveau pompiste (CREATE)
  export const addPompiste = (pompiste) => async (dispatch) => {
    try {
      const res = await axios.post(`${API_URL}/addPompiste`, pompiste);
      dispatch({
        type: Add_Pompiste,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: Pompiste_ERROR,
        payload: error.response ? error.response.data : error.message
      });
    }
  };
  
  // Action pour supprimer un pompiste (DELETE)
  export const deletePompiste = (id) => async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/deletePompiste/${id}`);
      dispatch({
        type: Delete_Pompiste,
        payload: id
      });
    } catch (error) {
      dispatch({
        type: Pompiste_ERROR,
        payload: error.response ? error.response.data : error.message
      });
    }
  };
  
  // Action pour mettre à jour un client (UPDATE)
  export const updatePompiste = (id, pompiste) => async (dispatch) => {
    try {
      const res = await axios.put(`${API_URL}/updatePompiste/${id}`, pompiste);
      dispatch({
        type: Update_Pompiste,
        payload: res.data
      });
    } catch (error) {
      dispatch({
        type: Pompiste_ERROR,
        payload: error.response ? error.response.data : error.message
      });
    }
  };