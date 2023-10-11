export const getErrorMessageByPropertyName = (
  object: Record<string, any>,
  propertyPath: string
) => {
  //propertyPath= admin.name.firstName
  const properties = propertyPath.split(".");
  //[admin, name, firstName]

  let value = object;

  for (let prop of properties) {
    if (value[prop]) {
      //value[admin]
      value = value[prop]; //set the value of value admin property
    } else {
      return undefined;
    }
  }

  return value.message;
};
