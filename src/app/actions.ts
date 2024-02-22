'use server'
 
//@todo continua e ver questao do tratamento erro
// tentar tratar no front tb, talvez tratando os eventos para liberar o botão
export async function createUser(formData: FormData) {
  console.log(formData)
  var object: any = {};
  formData.forEach((value, key) => object[key] = value);
  var json = JSON.stringify(object);
  console.log(json);

}