const initialState = {
  data: [
    {
      blood_pressure: 0,
      distance: 0,
      heartbeat: 0,
      mode: "rest",
      oxygen_level: 0,
    },
  ],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "data":
      return {
        data: action.payload,
      };
    case "pushdata":
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};
