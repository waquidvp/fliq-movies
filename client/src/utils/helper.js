const elevationToShadow = elevation => ({
  shadowOpacity: elevation * 0.0015 + 0.18,
  shadowRadius: elevation * 0.54,
  shadowOffset: {
    height: elevation * 0.6,
  },
});

export { elevationToShadow };
