export const backgroundColorType = (type) => {
  switch (type) {
    case "":
      return "#fff";
    case "unknown":
      return "#fff";
    case "shadow":
      return "#fff";
    case "bug":
      return "#729f3f";
    case "dragon":
      return "#f16e57";
    case "fairy":
      return "#fdb9e9";
    case "fire":
      return "#fd7d24";
    case "ghost":
      return "#7b62a3";
    case "ground":
      return "#f7de3f";
    case "normal":
      return "#a4acaf";
    case "psychic":
      return "#f366b9";
    case "steel":
      return "#9eb7b8";
    case "dark":
      return "#707070";
    case "electric":
      return "#eed535";
    case "fighting":
      return "#d56723";
    case "flying":
      return "#3dc7ef";
    case "grass":
      return "#9bcc50";
    case "ice":
      return "#51c4e7";
    case "poison":
      return "#b97fc9";
    case "rock":
      return "#a38c21";
    case "water":
      return "#4592c4";
    default:
      return "";
  }
};

export const colorTextType = (type) => {
  switch (type) {
    case "bug":
      return "#fff";
    case "dragon":
      return "#fff";
    case "fire":
      return "#fff";
    case "ground":
      return "#fff";
    case "psychic":
      return "#fff";
    case "dark":
      return "#fff";
    case "fighting":
      return "#fff";
    case "poison":
      return "#fff";
    case "rock":
      return "#fff";
    case "water":
      return "#fff";
    case "unknown":
      return "#000";
    case "shadow":
      return "#000";
    case "fairy":
      return "#000";
    case "ghost":
      return "#000";
    case "normal":
      return "#000";
    case "steel":
      return "#000";
    case "electric":
      return "#000";
    case "flying":
      return "#fff";
    case "grass":
      return "#000";
    case "ice":
      return "#000";
    default:
      return "";
  }
};
