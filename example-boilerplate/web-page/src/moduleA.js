/**
 * Output given argument to console
 *
 * @param {string} arg1 any string you want
 */
export const f1 = (arg1) => {
  console.log(`f1 : arg = ${arg1}`);
};

/**
 * output person info to console
 * @param {App.Person} person the person instance
 */
export const f2 = ({ id, name = 'default name' }) => {
  console.log(`f2 : id = ${id}, name = ${name}`);
};

export const f3 = (arg1) => {
  console.log(`f3 : arg1 = ${arg1}`);
  f1(arg1);
};
