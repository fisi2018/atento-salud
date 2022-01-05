export const getNameFormat=(nombres,apellidos)=>{
    const firstName=nombres.split(" ")[0];
    const firstLastName=apellidos.split(" ")[0];
    const nameFormat=firstName+" "+firstLastName;
    return nameFormat;
  }