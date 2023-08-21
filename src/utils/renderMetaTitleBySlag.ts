export const renderMetaTitleBySlag = (title: string) => {
  const nameArray = title.split("-");

  for (let i = 0; i < nameArray.length; i++) {
    nameArray[i] = nameArray[i].charAt(0).toUpperCase() + nameArray[i].slice(1);
  }

  nameArray[nameArray.length - 1] = ` (${nameArray[nameArray.length - 1]})`;

  return nameArray.join(" ");
};
