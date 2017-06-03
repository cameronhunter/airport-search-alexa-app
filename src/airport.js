export default ({ name, country_name, code, brief = false, index }) => {
  if (brief) {
    return (
      <speak>
        <s>{name}, {country_name}: <say-as interpret-as='characters'>{code}</say-as></s>
      </speak>
    );
  } else {
    return (
      <speak>
        <s>The airport code for {name}, {country_name} is <say-as interpret-as='characters'>{code}</say-as></s>
      </speak>
    );
  }
};
