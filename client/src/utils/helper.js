const elevationToShadow = elevation => ({
  shadowOpacity: elevation * 0.0015 + 0.18,
  shadowRadius: elevation * 0.54,
  shadowOffset: {
    height: elevation * 0.6,
  },
});

const minsToHours = minutes => {
  let hours = minutes / 60;
  hours = Math.floor(hours);

  let minutesLeft = minutes - hours * 60;

  return {
    hours,
    minutes: minutesLeft,
  };
};

export { elevationToShadow, minsToHours };
