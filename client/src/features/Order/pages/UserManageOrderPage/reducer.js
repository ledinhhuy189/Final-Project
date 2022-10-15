export const initialsTableValue = {
   status: undefined,
   createdAtDirection: 'desc',
};

const tableReducer = (state, action) => {
   switch (action.type) {
      case 'CHANGE_STATUS':
         return {
            ...state,
            status: action.payload,
         };

      case 'CHANGE_CREATED_AT_DIRECTION':
         return {
            ...state,
            createdAtDirection: action.payload,
         };

      default:
         throw new Error({
            message: 'NOT_FOUND_ACTION',
         });
   }
};

export default tableReducer;
